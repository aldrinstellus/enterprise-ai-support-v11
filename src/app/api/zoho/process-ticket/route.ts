/**
 * Zoho Ticket Processing Pipeline
 * Main orchestration logic for AI-powered ticket handling
 */

import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { getZohoDeskClient } from '@/lib/integrations/zoho-desk';
import { smartKBSearch } from '@/lib/integrations/dify';
import { getJiraClient } from '@/lib/integrations/jira';
import { aggregateConversation, detectEscalationSignals, consolidateForAI } from '@/lib/conversation-aggregator';
import { cleanEmailContent } from '@/lib/email-cleaner';
import type { TicketProcessingResult, TicketClassification, TicketCategory, ProcessingStep } from '@/types/ticket';
import type { ZohoEventType, ZohoTicketPayload } from '@/types/zoho';
import { TICKET_CATEGORIES } from '@/types/ticket';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Maximum execution time

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * POST /api/zoho/process-ticket
 * Process a Zoho ticket with AI classification, KB search, and response generation
 */
export async function POST(req: NextRequest) {
  const startTime = new Date().toISOString();
  const timeline: ProcessingStep[] = [];

  try {
    const { ticketId, eventType, payload, headers } = await req.json() as {
      ticketId: string;
      eventType: ZohoEventType;
      payload: ZohoTicketPayload;
      headers: { host: string };
    };

    console.log(`[Processing] Starting ticket ${ticketId}`);

    // Initialize clients
    const zohoClient = getZohoDeskClient();
    const jiraClient = getJiraClient();

    // Step 1: Extract ticket information
    timeline.push({
      step: 'extract_info',
      status: 'in_progress',
      timestamp: new Date().toISOString(),
    });

    const isThread = eventType === 'Ticket_Thread_Add';
    const extractedInfo = {
      ticket_id: ticketId,
      subject: payload.subject || '',
      original_query: cleanEmailContent(
        isThread ? payload.content || '' : payload.firstThread?.content || ''
      ),
      customer_email: isThread ? payload.author?.email || '' : payload.contact?.email || '',
      vendor_email: isThread ? payload.to || '' : payload.firstThread?.to || '',
      channel: payload.channel,
      ticketNumber: payload.ticketNumber,
    };

    timeline[timeline.length - 1].status = 'completed';
    timeline[timeline.length - 1].duration = 50;

    // Step 2: Get conversations
    timeline.push({
      step: 'get_conversations',
      status: 'in_progress',
      timestamp: new Date().toISOString(),
    });

    const conversations = await zohoClient.getConversations(ticketId);

    // Extract thread messages
    const threads = conversations.data
      .filter(conv => conv.type === 'thread')
      .map(conv => ({
        id: conv.id,
        content: conv.content || '',
        authorType: conv.author.type,
        createdTime: conv.createdTime,
        channel: conv.channel,
      }));

    timeline[timeline.length - 1].status = 'completed';
    timeline[timeline.length - 1].duration = 200;

    // Step 3: Aggregate conversation
    const aggregated = aggregateConversation(threads);
    const optimizedQuery = consolidateForAI(aggregated, {
      maxLength: 200,
      focusOnTechnical: true,
    });

    console.log(`[Processing] Optimized query: ${optimizedQuery}`);

    // Step 4: Classify ticket
    timeline.push({
      step: 'classify_ticket',
      status: 'in_progress',
      timestamp: new Date().toISOString(),
    });

    const classification = await classifyTicket({
      subject: extractedInfo.subject,
      conversation: payload.firstThread?.content || extractedInfo.original_query,
      priority: payload.priority,
      category: payload.category || '',
      customer: payload.contact?.lastName || '',
      ticketNumber: payload.ticketNumber,
      status: payload.status,
    });

    timeline[timeline.length - 1].status = 'completed';
    timeline[timeline.length - 1].duration = 1500;

    console.log(`[Processing] Classification: ${classification.primary_category} (${classification.confidence})`);

    // Step 5: Route based on classification
    const categoryConfig = TICKET_CATEGORIES[classification.primary_category];

    if (classification.primary_category === 'DATA_GENERATION') {
      // Direct to Jira for report requests
      timeline.push({
        step: 'create_jira_report',
        status: 'in_progress',
        timestamp: new Date().toISOString(),
      });

      const jiraTicket = await jiraClient.createZohoEscalation({
        title: `[REPORT] - ${extractedInfo.subject}`,
        description: `Customer: ${payload.contact?.lastName || 'Unknown'} (${extractedInfo.customer_email})\n\nRequest:\n${extractedInfo.original_query}`,
        zohoTicketId: ticketId,
        zohoTicketUrl: payload.webUrl,
        priority: payload.priority === 'High' ? 'High' : 'Medium',
        customer: `${payload.contact?.lastName} (${extractedInfo.customer_email})`,
      });

      timeline[timeline.length - 1].status = 'completed';
      timeline[timeline.length - 1].duration = 800;

      const result: TicketProcessingResult = {
        ticketId,
        ticketNumber: payload.ticketNumber,
        status: 'completed',
        classification,
        jiraTicket: {
          key: jiraTicket.key,
          id: jiraTicket.id,
          url: jiraTicket.self,
          summary: `[REPORT] - ${extractedInfo.subject}`,
          created: new Date().toISOString(),
        },
        timeline,
        startTime,
        endTime: new Date().toISOString(),
        totalDuration: Date.now() - new Date(startTime).getTime(),
      };

      return NextResponse.json(result);
    }

    // Step 6: Knowledge base search (for non-DATA_GENERATION tickets)
    timeline.push({
      step: 'kb_search',
      status: 'in_progress',
      timestamp: new Date().toISOString(),
    });

    const kbResult = await smartKBSearch(optimizedQuery);

    timeline[timeline.length - 1].status = 'completed';
    timeline[timeline.length - 1].duration = 1200;

    // Step 7: Generate AI response
    timeline.push({
      step: 'generate_response',
      status: 'in_progress',
      timestamp: new Date().toISOString(),
    });

    const aiResponse = await generateResponse({
      query: optimizedQuery,
      context: kbResult.answer || kbResult.context || '',
    });

    timeline[timeline.length - 1].status = 'completed';
    timeline[timeline.length - 1].duration = 2500;

    // Step 8: Send reply to Zoho
    timeline.push({
      step: 'send_reply',
      status: 'in_progress',
      timestamp: new Date().toISOString(),
    });

    const replyResponse = await zohoClient.sendReply(ticketId, {
      contentType: 'plainText',
      content: aiResponse.text,
      fromEmailAddress: extractedInfo.vendor_email,
      to: extractedInfo.customer_email,
      isForward: false,
      channel: payload.channel,
    });

    timeline[timeline.length - 1].status = 'completed';
    timeline[timeline.length - 1].duration = 500;

    // Step 9: Check if Jira escalation needed
    timeline.push({
      step: 'check_escalation',
      status: 'in_progress',
      timestamp: new Date().toISOString(),
    });

    const escalation = detectEscalationSignals(aiResponse.text);
    let jiraTicket = undefined;

    if (escalation.hasSignals || !classification.auto_resolvable) {
      timeline.push({
        step: 'create_jira_escalation',
        status: 'in_progress',
        timestamp: new Date().toISOString(),
      });

      const createdJira = await jiraClient.createZohoEscalation({
        title: extractedInfo.subject,
        description: `User Query: ${optimizedQuery}\n\nAgent Response: ${aiResponse.text}`,
        zohoTicketId: ticketId,
        zohoTicketUrl: payload.webUrl,
        priority: payload.priority === 'High' ? 'High' : 'Medium',
        customer: `${payload.contact?.lastName} (${extractedInfo.customer_email})`,
      });

      jiraTicket = {
        key: createdJira.key,
        id: createdJira.id,
        url: createdJira.self,
        summary: extractedInfo.subject,
        created: new Date().toISOString(),
      };

      timeline[timeline.length - 1].status = 'completed';
      timeline[timeline.length - 1].duration = 800;
    }

    timeline[timeline.length - 2].status = 'completed';
    timeline[timeline.length - 2].duration = 100;

    // Build final result
    const result: TicketProcessingResult = {
      ticketId,
      ticketNumber: payload.ticketNumber,
      status: 'completed',
      classification,
      kbSearch: {
        query: optimizedQuery,
        method: kbResult.method,
        matches: kbResult.matches,
      },
      aiResponse: {
        text: aiResponse.text,
        confidence: 0.85,
        needsEscalation: escalation.hasSignals,
        escalationSignals: escalation.signals,
      },
      zohoReply: {
        id: replyResponse.id,
        sent: true,
        timestamp: replyResponse.createdTime,
      },
      jiraTicket,
      timeline,
      startTime,
      endTime: new Date().toISOString(),
      totalDuration: Date.now() - new Date(startTime).getTime(),
    };

    console.log(`[Processing] Completed ticket ${ticketId} in ${result.totalDuration}ms`);

    return NextResponse.json(result);

  } catch (error) {
    console.error('[Processing] Error:', error);

    const errorResult: TicketProcessingResult = {
      ticketId: '',
      ticketNumber: '',
      status: 'failed',
      classification: {
        primary_category: 'ESCALATION_NEEDED',
        secondary_categories: [],
        confidence: 0,
        reasoning: 'Processing failed',
        required_info: [],
        estimated_complexity: 'high',
        auto_resolvable: false,
      },
      timeline,
      startTime,
      endTime: new Date().toISOString(),
      error: {
        step: timeline[timeline.length - 1]?.step || 'unknown',
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      },
    };

    return NextResponse.json(errorResult, { status: 500 });
  }
}

/**
 * Classify ticket using Claude
 */
async function classifyTicket(input: {
  subject: string;
  conversation: string;
  priority: string;
  category: string;
  customer: string;
  ticketNumber: string;
  status: string;
}): Promise<TicketClassification> {
  const prompt = `You are a support ticket classifier for an e-learning platform. Analyze this ticket and classify it.

**Subject**: ${input.subject}
**Conversation**: ${input.conversation}
**Priority**: ${input.priority}
**Current Category**: ${input.category}
**Customer**: ${input.customer}
**Ticket #**: ${input.ticketNumber}
**Status**: ${input.status}

**Categories**:
- DATA_GENERATION: Reports, analytics, data exports
- BACKEND_INVESTIGATION: System bugs, technical debugging
- MANUAL_ADMIN: User/account management
- CONTENT_MANAGEMENT: Course creation, content publishing
- CONFIGURATION: System settings, integrations
- SIMPLE_RESPONSE: How-to questions, information requests
- ESCALATION_NEEDED: Complex issues requiring human judgment

Return JSON:
{
  "primary_category": "CATEGORY_NAME",
  "secondary_categories": ["CATEGORY_NAME2"],
  "confidence": 0.95,
  "reasoning": "Brief explanation",
  "required_info": ["missing_info"],
  "estimated_complexity": "low|medium|high",
  "auto_resolvable": true|false
}`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: prompt,
    }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  const json = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

  return json || {
    primary_category: 'SIMPLE_RESPONSE',
    secondary_categories: [],
    confidence: 0.5,
    reasoning: 'Failed to parse classification',
    required_info: [],
    estimated_complexity: 'medium',
    auto_resolvable: false,
  };
}

/**
 * Generate AI response using Claude
 */
async function generateResponse(input: {
  query: string;
  context: string;
}): Promise<{ text: string }> {
  const prompt = `You are a support agent. Use the following context to answer the question. If you don't have enough details, let the user know you need to check with the team.

**Question**: ${input.query}
**Context**: ${input.context}

Provide a helpful, professional response.`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: prompt,
    }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  return { text };
}
