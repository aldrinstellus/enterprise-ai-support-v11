/**
 * Zoho Desk Webhook Endpoint
 * Receives ticket events and triggers processing
 */

import { NextRequest, NextResponse } from 'next/server';
import type { ZohoWebhookRequest } from '@/types/zoho';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/zoho/webhook
 * Receive webhook events from Zoho Desk
 */
export async function POST(req: NextRequest) {
  try {
    // Parse webhook payload
    const body: ZohoWebhookRequest = await req.json();

    console.log('[Zoho Webhook] Received event:', {
      eventType: body.body[0]?.eventType,
      ticketId: body.body[0]?.payload?.ticketId || body.body[0]?.payload?.id,
      channel: body.body[0]?.payload?.channel,
    });

    // Validate webhook has required data
    if (!body.body || body.body.length === 0) {
      return NextResponse.json(
        { error: 'Invalid webhook payload: missing body' },
        { status: 400 }
      );
    }

    const event = body.body[0];
    const { eventType, payload } = event;

    // Filter: Only process EMAIL channel
    if (payload.channel !== 'EMAIL' && payload.channel !== 'Email') {
      console.log('[Zoho Webhook] Skipping non-EMAIL channel:', payload.channel);
      return NextResponse.json({
        success: true,
        message: 'Non-EMAIL channel ignored',
      });
    }

    // Process ticket based on event type
    let ticketId: string;
    if (eventType === 'Ticket_Thread_Add') {
      ticketId = payload.ticketId || '';
    } else {
      ticketId = payload.id || '';
    }

    if (!ticketId) {
      return NextResponse.json(
        { error: 'Missing ticket ID in payload' },
        { status: 400 }
      );
    }

    // In a production system, you would queue this for background processing
    // For now, we'll trigger processing inline (with timeout protection)
    const processingUrl = new URL('/api/zoho/process-ticket', req.url);
    const processingReq = await fetch(processingUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ticketId,
        eventType,
        payload,
        headers: {
          host: req.headers.get('host') || '',
        },
      }),
      signal: AbortSignal.timeout(55000), // 55 second timeout (Vercel limit is 60s)
    });

    if (!processingReq.ok) {
      const error = await processingReq.text();
      console.error('[Zoho Webhook] Processing failed:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Ticket processing failed',
          details: error,
        },
        { status: 500 }
      );
    }

    const result = await processingReq.json();

    return NextResponse.json({
      success: true,
      ticketId,
      processing: result,
    });

  } catch (error) {
    console.error('[Zoho Webhook] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/zoho/webhook
 * Webhook validation endpoint (for Zoho Desk setup)
 */
export async function GET() {
  return NextResponse.json({
    status: 'active',
    message: 'Zoho Desk webhook endpoint is ready',
    timestamp: new Date().toISOString(),
  });
}
