// Query Detection Module for Bhanu's Assistant-First Interface
// Maps natural language queries to appropriate widgets based on persona and intent

import type { WidgetType, WidgetData } from '@/types/widget';
import { findBestMatch as findCLevelMatch } from './c-level-conversation';
import { findBestMatch as findCSManagerMatch } from './cs-manager-conversation';
import {
  executiveSummaryDemo,
  analyticsDashboardDemo,
  performanceTrendsDemo,
  sentimentAnalysisDemo,
  customerRiskProfileDemo,
  ticketDetailDemo,
  slaPerformanceChartDemo,
  agentPerformanceComparisonDemo,
  callPrepNotesDemo,
  responseComposerDemo,
  teamWorkloadDashboardDemo,
  customerRiskListDemo,
  ticketListDemo,
  agentDashboardDemo,
  meetingSchedulerDemo,
  similarTicketsAnalysisDemo,
  agentPerformanceStatsDemo,
  knowledgeBaseSearchDemo,
  knowledgeArticleDemo,
  messageComposerDemo,
} from '@/data/demo-widget-data';

export interface QueryMatch {
  widgetType: WidgetType | null;
  widgetData: WidgetData | null;
  responseText: string;
}

export type PersonaId = 'c-level' | 'cs-manager' | 'support-agent';

/**
 * Detect widget intent from user query
 */
export function detectWidgetQuery(
  query: string,
  personaId: PersonaId
): QueryMatch | null {
  const q = query.toLowerCase().trim();

  // Route based on persona
  switch (personaId) {
    case 'c-level':
      return detectCLevelQuery(q);
    case 'cs-manager':
      return detectManagerQuery(q);
    case 'support-agent':
      return detectAgentQuery(q);
    default:
      return null;
  }
}

// ============================================================================
// C-LEVEL EXECUTIVE QUERIES
// ============================================================================

function detectCLevelQuery(q: string): QueryMatch | null {
  // NEW: Use Bhanu's pattern matching from c-level-conversation.ts
  const bhanuMatch = findCLevelMatch(q);
  if (bhanuMatch) {
    // Map Bhanu's widget types to our WidgetType
    return {
      widgetType: bhanuMatch.widgetType as WidgetType,
      widgetData: bhanuMatch.widgetData,
      responseText: bhanuMatch.aiResponse,
    };
  }

  // FALLBACK: Original pattern matching for backward compatibility
  // EXACT QUERY MATCHING (checked first - no ambiguity, no cache issues)
  const exactMatches: Record<string, QueryMatch> = {
    'show me the sla performance breakdown': {
      widgetType: 'sla-performance-chart',
      widgetData: slaPerformanceChartDemo,
      responseText: "Here's the detailed SLA performance breakdown: [v2]",
    },
    'which categories are we failing': {
      widgetType: 'sla-performance-chart',
      widgetData: slaPerformanceChartDemo,
      responseText: "We're currently failing in these SLA categories: [v2]",
    },
  };

  // Check for exact match
  if (exactMatches[q]) {
    return exactMatches[q];
  }

  // PATTERN MATCHING (fallback for query variations)
  // 1. Executive Summary
  if (
    q.includes('executive summary') ||
    q.includes('system health') ||
    (q.includes('good morning') && q.includes('summary')) ||
    (q.includes('show me') && (q.includes('dashboard') || q.includes('summary')))
  ) {
    return {
      widgetType: 'executive-summary',
      widgetData: executiveSummaryDemo,
      responseText: "Good morning. Here's your executive summary for today:",
    };
  }

  // 2. Customer Risk Profile & High-Risk Customers
  if (
    q.includes('high-risk customers') ||
    q.includes('at-risk customers') ||
    q.includes('customer risk') ||
    (q.includes('show me') && q.includes('risk'))
  ) {
    return {
      widgetType: 'customer-risk-list',
      widgetData: customerRiskListDemo,
      responseText: "Here's the list of all high-risk customers requiring attention:",
    };
  }

  if (
    q.includes('tell me more about') ||
    q.includes('risk score') ||
    q.includes('why did') ||
    (q.includes('acme') && (q.includes('risk') || q.includes('increase')))
  ) {
    return {
      widgetType: 'customer-risk-profile',
      widgetData: customerRiskProfileDemo,
      responseText: "Let me pull up the detailed risk profile:",
    };
  }

  // 3a. SLA Failing Categories (specific query - check first)
  if (q.includes('which categories') && q.includes('failing')) {
    return {
      widgetType: 'sla-performance-chart',
      widgetData: slaPerformanceChartDemo,
      responseText: "We're currently failing in these SLA categories:",
    };
  }

  // 3b. SLA Performance Breakdown (general queries)
  if (
    q.includes('sla performance') ||
    q.includes('sla breakdown') ||
    (q.includes('show me') && q.includes('sla'))
  ) {
    return {
      widgetType: 'sla-performance-chart',
      widgetData: slaPerformanceChartDemo,
      responseText: "Here's the detailed SLA performance breakdown:",
    };
  }

  // 4. Ticket Detail (specific ticket numbers)
  if (
    q.includes('ticket #') ||
    q.includes('ticket number') ||
    /tick-?\d+/i.test(q) ||
    (q.includes('show me ticket') && /\d+/.test(q)) ||
    (q.includes('details') && /\d+/.test(q))
  ) {
    return {
      widgetType: 'ticket-detail',
      widgetData: ticketDetailDemo,
      responseText: "Here are the complete details for this ticket:",
    };
  }

  // 5. Meeting Scheduler
  if (
    q.includes('schedule') ||
    q.includes('book') ||
    (q.includes('executive call') && q.includes('attend'))
  ) {
    return {
      widgetType: 'meeting-scheduler',
      widgetData: meetingSchedulerDemo,
      responseText: "I've found available time slots for the executive call:",
    };
  }

  return null;
}

// ============================================================================
// CS MANAGER QUERIES
// ============================================================================

function detectManagerQuery(q: string): QueryMatch | null {
  // NEW: Use conversation pattern matching from cs-manager-conversation.ts
  const conversationMatch = findCSManagerMatch(q);
  if (conversationMatch) {
    // Map conversation entry to QueryMatch
    return {
      widgetType: conversationMatch.widgetType as WidgetType,
      widgetData: conversationMatch.widgetData as any,
      responseText: conversationMatch.aiResponse,
    };
  }

  // FALLBACK: Original pattern matching for backward compatibility
  // 1. Team Workload Dashboard
  if (
    q.includes("team's status") ||
    q.includes('team status') ||
    q.includes('team workload') ||
    q.includes('show me my team') ||
    (q.includes('good morning') && q.includes('team'))
  ) {
    return {
      widgetType: 'team-workload-dashboard',
      widgetData: teamWorkloadDashboardDemo,
      responseText: "Here's your team's current workload status:",
    };
  }

  // 2. Agent Performance Comparison
  if (
    q.includes('top and bottom performers') ||
    q.includes('performance comparison') ||
    q.includes('compare performance') ||
    q.includes('compare agent performance') ||
    q.includes('top performers') ||
    q.includes('bottom performers') ||
    (q.includes('show me') && q.includes('performers'))
  ) {
    return {
      widgetType: 'agent-performance-comparison',
      widgetData: agentPerformanceComparisonDemo,
      responseText: "Here's the agent performance comparison for this week:",
    };
  }

  // 3. High-Risk Customers List
  if (
    q.includes('high-risk customers') ||
    q.includes('at-risk customers') ||
    q.includes('customer risk') ||
    q.includes('customers at risk') ||
    (q.includes('show me all') && q.includes('risk'))
  ) {
    return {
      widgetType: 'customer-risk-list',
      widgetData: customerRiskListDemo,
      responseText: "Here's the list of all high-risk customers requiring attention:",
    };
  }

  // 4. Ticket List (for specific agent)
  if (
    (q.includes('show me') && q.includes('tickets')) ||
    q.includes('his tickets') ||
    q.includes('her tickets')
  ) {
    // Extract agent name from query (e.g., "Sarah" from "Show me Sarah's tickets")
    const nameMatch = q.match(/(?:show me |his |her )(\w+)(?:'s)?\s*tickets/i);
    const agentName = nameMatch ? nameMatch[1] : "the agent";
    const capitalizedName = agentName.charAt(0).toUpperCase() + agentName.slice(1);

    return {
      widgetType: 'ticket-list',
      widgetData: {
        ...ticketListDemo,
        title: `${capitalizedName}'s Tickets`
      },
      responseText: `Here are ${capitalizedName}'s current tickets:`,
    };
  }

  // 5. Meeting Scheduler (for 1-on-1) - Now handled by cs-manager-conversation.ts

  // 6. Message Composer (for customer communication)
  if (
    q.includes('draft message') ||
    q.includes('draft a message') ||
    q.includes('compose message') ||
    q.includes('write email') ||
    q.includes('write a message') ||
    (q.includes('message') && q.includes('customer'))
  ) {
    return {
      widgetType: 'message-composer',
      widgetData: messageComposerDemo,
      responseText: "I've drafted a message for you to review:",
    };
  }

  return null;
}

// ============================================================================
// SUPPORT AGENT QUERIES
// ============================================================================

function detectAgentQuery(q: string): QueryMatch | null {
  // Button Actions (Response Composer)
  if (q.includes('send the response') || q.includes('send response')) {
    return {
      widgetType: null,
      widgetData: null,
      responseText: '✓ Response sent successfully! The customer will receive your message within the next few minutes.',
    };
  }

  if (q.includes('edit and customize')) {
    return {
      widgetType: null,
      widgetData: null,
      responseText: 'Opening response editor... You can now customize the message before sending.',
    };
  }

  if (q.includes('regenerate response')) {
    return {
      widgetType: null,
      widgetData: null,
      responseText: '✓ Regenerating response with a different approach...',
    };
  }

  // 1. Agent Dashboard (daily overview)
  if (
    q.includes("what's on my plate") ||
    q.includes('my plate today') ||
    (q.includes('good morning') && !q.includes('summary'))
  ) {
    return {
      widgetType: 'agent-dashboard',
      widgetData: agentDashboardDemo,
      responseText: "Good morning! Here's what's on your plate today:",
    };
  }

  // 2. Ticket Detail
  if (
    q.includes('ticket #') ||
    q.includes('ticket number') ||
    (q.includes('show me ticket') && /\d+/.test(q)) ||
    (q.includes('details') && /\d+/.test(q))
  ) {
    return {
      widgetType: 'ticket-detail',
      widgetData: ticketDetailDemo,
      responseText: "Here are the complete details for this ticket:",
    };
  }

  // 3. Call Prep Notes
  if (
    q.includes('prepare for') && q.includes('call') ||
    q.includes('draft prep notes') ||
    q.includes('call preparation') ||
    q.includes('help me prepare')
  ) {
    return {
      widgetType: 'call-prep-notes',
      widgetData: callPrepNotesDemo,
      responseText: "I've prepared comprehensive notes for your upcoming call:",
    };
  }

  // 4. Response Composer
  if (
    q.includes('draft response') ||
    q.includes('draft a response') ||
    q.includes('help me respond') ||
    q.includes('compose response')
  ) {
    return {
      widgetType: 'response-composer',
      widgetData: responseComposerDemo,
      responseText: "I've drafted a response for you to review:",
    };
  }

  // 5. Ticket List (agent's own tickets)
  if (
    q.includes('my tickets') ||
    q.includes('tickets that need attention') ||
    (q.includes('show me') && q.includes('other tickets'))
  ) {
    return {
      widgetType: 'ticket-list',
      widgetData: ticketListDemo,
      responseText: "Here are your current tickets:",
    };
  }

  // 6. Similar Tickets Analysis
  if (
    q.includes('similar tickets') ||
    q.includes('learn the patterns') ||
    (q.includes('tickets i') && q.includes('resolved'))
  ) {
    return {
      widgetType: 'similar-tickets-analysis',
      widgetData: similarTicketsAnalysisDemo,
      responseText: "Here are patterns from similar tickets you've successfully resolved:",
    };
  }

  // 7. Agent Performance Stats
  if (
    q.includes('performance stats') ||
    q.includes('my stats') ||
    q.includes('my performance') ||
    (q.includes('show me') && q.includes('stats'))
  ) {
    return {
      widgetType: 'agent-performance-stats',
      widgetData: agentPerformanceStatsDemo,
      responseText: "Here's your performance summary for this week:",
    };
  }

  // 8. Knowledge Base Search
  if (
    q.includes('how do i troubleshoot') ||
    q.includes('how to') ||
    q.includes('how can i') ||
    q.includes('search kb') ||
    q.includes('knowledge base')
  ) {
    return {
      widgetType: 'knowledge-base-search',
      widgetData: knowledgeBaseSearchDemo,
      responseText: "I've searched the knowledge base for you:",
    };
  }

  // 9. Knowledge Article
  if (q.includes('open kb') || /kb-?\d+/.test(q)) {
    const kbMatch = q.match(/kb-?(\d+)/i);
    const kbId = kbMatch ? `KB-${kbMatch[1]}` : 'KB-892';

    return {
      widgetType: 'knowledge-article',
      widgetData: { ...knowledgeArticleDemo, id: kbId },
      responseText: `Here's ${kbId}:`,
    };
  }

  return null;
}
