/**
 * API Route: Fetch Single Ticket Details from Zoho Desk
 * Provides comprehensive ticket data including conversations and metadata
 */

import { NextRequest, NextResponse } from 'next/server';
import { getZohoDeskClient } from '@/lib/integrations/zoho-desk';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{
    ticketNumber: string;
  }>;
}

/**
 * GET /api/tickets/[ticketNumber]
 * Fetch detailed information for a specific ticket
 */
export async function GET(
  req: NextRequest,
  context: RouteContext
) {
  try {
    const { ticketNumber } = await context.params;

    if (!ticketNumber) {
      return NextResponse.json(
        { success: false, error: 'Ticket number is required' },
        { status: 400 }
      );
    }

    const zohoClient = getZohoDeskClient();

    // First, search for the ticket by ticket number
    // Zoho API requires us to get the list and filter by ticketNumber
    const searchResponse = await zohoClient.request<any>(
      `/api/v1/tickets?limit=100&sortBy=-createdTime`
    );

    // Find the ticket with matching ticketNumber
    const ticket = searchResponse.data?.find((t: any) => t.ticketNumber === ticketNumber);

    if (!ticket) {
      return NextResponse.json(
        { success: false, error: `Ticket #${ticketNumber} not found` },
        { status: 404 }
      );
    }

    // Fetch conversations/threads for the ticket
    let conversations: any[] = [];
    try {
      const conversationsResponse = await zohoClient.getConversations(ticket.id);
      conversations = conversationsResponse.data || [];
    } catch (error: any) {
      console.warn('[API /tickets/[ticketNumber]] Failed to fetch conversations:', error.message);
      // Continue without conversations
    }

    // Transform to detailed ticket format
    const detailedTicket = {
      // Basic Info
      id: ticket.id,
      ticketNumber: ticket.ticketNumber,
      subject: ticket.subject || 'No subject',
      description: ticket.description || '',
      priority: mapPriority(ticket.priority),
      status: ticket.status || 'Open',
      channel: ticket.channel || 'Unknown',

      // Customer/Contact Info
      contact: {
        name: [ticket.contact?.firstName, ticket.contact?.lastName]
          .filter(Boolean)
          .join(' ') || 'Unknown',
        email: ticket.contact?.email || '',
        phone: ticket.contact?.phone || ticket.contact?.mobile || '',
        id: ticket.contact?.id || '',
      },

      // Assignment
      assignee: {
        name: ticket.assignee?.name || null,
        email: ticket.assignee?.email || null,
        id: ticket.assignee?.id || null,
      },

      // Metadata
      createdTime: ticket.createdTime,
      modifiedTime: ticket.modifiedTime || ticket.createdTime,
      closedTime: ticket.closedTime,
      dueDate: ticket.dueDate,

      // Categorization
      department: ticket.department?.name || null,
      category: ticket.category?.name || null,
      subCategory: ticket.subCategory || null,
      product: ticket.productId?.productName || null,

      // Custom Fields
      customFields: ticket.cf || {},

      // SLA Tracking
      sla: {
        responseDue: ticket.responseDue,
        resolutionDue: ticket.resolutionDue,
        responseOverdue: ticket.isResponseOverdue || false,
        resolutionOverdue: ticket.isOverDue || false,
      },

      // Conversations/Timeline
      conversations: conversations.map((conv: any) => ({
        id: conv.id,
        direction: conv.direction?.toUpperCase() || 'INTERNAL', // in -> INCOMING, out -> OUTGOING
        summary: conv.summary || '',
        content: conv.content || conv.summary || '',
        contentType: conv.contentType || 'plainText',
        from: conv.from || '',
        to: conv.to || '',
        cc: conv.cc || [],
        bcc: conv.bcc || [],
        author: typeof conv.author === 'string' ? conv.author : conv.author?.name || 'Unknown',
        createdTime: conv.createdTime,
        isPublic: conv.isPublic !== false,
        attachments: (conv.attachments || []).map((att: any) => ({
          id: att.id,
          name: att.name,
          size: att.size,
          href: att.href,
        })),
      })),

      // Tags
      tags: ticket.tags || [],

      // Additional metadata
      webUrl: ticket.webUrl || '',
      commentCount: ticket.commentCount || 0,
      threadCount: ticket.threadCount || 0,
      attachmentCount: ticket.attachmentCount || 0,
    };

    return NextResponse.json({
      success: true,
      ticket: detailedTicket,
    });

  } catch (error: any) {
    console.error('[API /tickets/[ticketNumber]] Error:', error.message);

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch ticket details',
      },
      { status: 500 }
    );
  }
}

/**
 * Map Zoho priority to standard format
 */
function mapPriority(zohoPriority: string): 'High' | 'Medium' | 'Low' {
  const priority = (zohoPriority || '').toLowerCase();

  if (priority === 'high' || priority === 'urgent') {
    return 'High';
  } else if (priority === 'low') {
    return 'Low';
  }

  return 'Medium';
}
