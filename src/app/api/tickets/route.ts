/**
 * API Route: Fetch Real Zoho Desk Tickets
 * Provides ticket data formatted for dashboard consumption
 */

import { NextRequest, NextResponse } from 'next/server';
import { getZohoDeskClient } from '@/lib/integrations/zoho-desk';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface DashboardTicket {
  id: string;
  ticketNumber: string;
  summary: string;
  priority: 'High' | 'Medium' | 'Low';
  status: string;
  assignedAgent: string | null;
  reporter: string;
  reporterEmail: string;
  createdDate: string;
  lastUpdated: string;
  category: string | null;
  channel: string;
  aiProcessed: boolean;
  aiClassification: string | null;
}

/**
 * GET /api/tickets
 * Fetch recent tickets from Zoho Desk
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const status = searchParams.get('status'); // Open, In Progress, Closed
    const channel = searchParams.get('channel'); // EMAIL, Phone, Web

    const zohoClient = getZohoDeskClient();

    // Build Zoho API query
    let apiUrl = `/api/v1/tickets?limit=${limit}&sortBy=-createdTime`;

    if (status) {
      apiUrl += `&status=${status}`;
    }

    // Fetch tickets from Zoho
    const response = await zohoClient.request<{ data: any[] }>(apiUrl);
    const zohoTickets = response.data || [];

    // Transform Zoho tickets to dashboard format
    const dashboardTickets: DashboardTicket[] = zohoTickets
      .filter(ticket => {
        // Filter by channel if specified
        if (channel && ticket.channel !== channel) {
          return false;
        }
        return true;
      })
      .map(ticket => ({
        id: ticket.id,
        ticketNumber: ticket.ticketNumber,
        summary: ticket.subject || 'No subject',
        priority: mapPriority(ticket.priority),
        status: ticket.status || 'Open',
        assignedAgent: ticket.assignee?.name || null,
        reporter: ticket.contact?.lastName || ticket.contact?.firstName || 'Unknown',
        reporterEmail: ticket.contact?.email || '',
        createdDate: ticket.createdTime,
        lastUpdated: ticket.modifiedTime || ticket.createdTime,
        category: ticket.category?.name || null,
        channel: ticket.channel || 'Unknown',
        aiProcessed: false, // We'll enhance this later
        aiClassification: null,
      }));

    return NextResponse.json({
      success: true,
      count: dashboardTickets.length,
      tickets: dashboardTickets,
    });

  } catch (error: any) {
    console.error('[API /tickets] Error:', error.message);

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch tickets',
        tickets: [],
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
