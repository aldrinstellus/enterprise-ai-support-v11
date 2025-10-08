'use client';

import { useEffect, useState } from 'react';
import { Loader2, AlertCircle, Clock, User, Mail, Phone, Calendar, Tag, MessageSquare, Paperclip } from 'lucide-react';

interface LiveTicketDetailProps {
  ticketNumber: string;
}

export function LiveTicketDetailWidget({ ticketNumber }: LiveTicketDetailProps) {
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/tickets/${ticketNumber}`);

        if (!response.ok) {
          throw new Error('Failed to fetch ticket details');
        }

        const data = await response.json();

        if (data.success) {
          setTicket(data.ticket);
        } else {
          throw new Error(data.error || 'Unknown error');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTicketDetails();
  }, [ticketNumber]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 my-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-3 text-muted-foreground">Loading ticket details from Zoho Desk...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 my-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <div>
            <h3 className="font-semibold text-destructive">Failed to load ticket</h3>
            <p className="text-sm text-muted-foreground mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return null;
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'border-red-500/50 bg-red-500/10 text-red-600';
      case 'Low':
        return 'border-blue-500/50 bg-blue-500/10 text-blue-600';
      default:
        return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'border-green-500/50 bg-green-500/10 text-green-600';
      case 'in progress':
        return 'border-blue-500/50 bg-blue-500/10 text-blue-600';
      case 'escalated':
        return 'border-orange-500/50 bg-orange-500/10 text-orange-600';
      case 'closed':
        return 'border-gray-500/50 bg-gray-500/10 text-gray-600';
      default:
        return 'border-gray-500/50 bg-gray-500/10 text-gray-600';
    }
  };

  return (
    <div className="space-y-6 my-4">
      {/* Header - Ticket ID & Status */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className="text-xl font-bold font-mono text-primary">#{ticket.ticketNumber}</h3>
            <span className={`text-xs font-semibold uppercase px-2 py-1 rounded border ${getPriorityColor(ticket.priority)}`}>
              {ticket.priority}
            </span>
            <span className={`text-xs font-semibold uppercase px-2 py-1 rounded border ${getStatusColor(ticket.status)}`}>
              {ticket.status}
            </span>
            {ticket.channel && (
              <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                {ticket.channel}
              </span>
            )}
          </div>
          <h4 className="text-lg font-semibold text-foreground">{ticket.subject}</h4>
        </div>
      </div>

      {/* Customer/Contact Info Card */}
      <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
        <h5 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
          <User className="h-4 w-4 text-primary" />
          Contact Information
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="flex items-center gap-1 mb-1">
              <User className="h-3 w-3 text-primary" />
              <span className="text-xs text-muted-foreground">Name</span>
            </div>
            <div className="text-sm font-semibold text-foreground">{ticket.contact.name}</div>
          </div>
          {ticket.contact.email && (
            <div>
              <div className="flex items-center gap-1 mb-1">
                <Mail className="h-3 w-3 text-primary" />
                <span className="text-xs text-muted-foreground">Email</span>
              </div>
              <div className="text-sm font-medium text-foreground truncate">{ticket.contact.email}</div>
            </div>
          )}
          {ticket.contact.phone && (
            <div>
              <div className="flex items-center gap-1 mb-1">
                <Phone className="h-3 w-3 text-primary" />
                <span className="text-xs text-muted-foreground">Phone</span>
              </div>
              <div className="text-sm font-medium text-foreground">{ticket.contact.phone}</div>
            </div>
          )}
        </div>
      </div>

      {/* Metadata & Assignment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Metadata */}
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
          <h5 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            Ticket Metadata
          </h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created:</span>
              <span className="font-medium text-foreground">{new Date(ticket.createdTime).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Updated:</span>
              <span className="font-medium text-foreground">{new Date(ticket.modifiedTime).toLocaleString()}</span>
            </div>
            {ticket.closedTime && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Closed:</span>
                <span className="font-medium text-foreground">{new Date(ticket.closedTime).toLocaleString()}</span>
              </div>
            )}
            {ticket.category && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category:</span>
                <span className="font-medium text-foreground">{ticket.category}</span>
              </div>
            )}
            {ticket.department && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Department:</span>
                <span className="font-medium text-foreground">{ticket.department}</span>
              </div>
            )}
            {ticket.product && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Product:</span>
                <span className="font-medium text-foreground">{ticket.product}</span>
              </div>
            )}
          </div>
        </div>

        {/* Assignment & SLA */}
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
          <h5 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <Clock className="h-4 w-4 text-primary" />
            Assignment & SLA
          </h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Assigned To:</span>
              <span className="font-medium text-foreground">
                {ticket.assignee.name || <span className="italic">Unassigned</span>}
              </span>
            </div>
            {ticket.sla.responseDue && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Response Due:</span>
                <span className={`font-medium ${ticket.sla.responseOverdue ? 'text-red-600' : 'text-foreground'}`}>
                  {new Date(ticket.sla.responseDue).toLocaleString()}
                </span>
              </div>
            )}
            {ticket.sla.resolutionDue && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Resolution Due:</span>
                <span className={`font-medium ${ticket.sla.resolutionOverdue ? 'text-red-600' : 'text-foreground'}`}>
                  {new Date(ticket.sla.resolutionDue).toLocaleString()}
                </span>
              </div>
            )}
            {ticket.dueDate && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Due Date:</span>
                <span className="font-medium text-foreground">{new Date(ticket.dueDate).toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      {ticket.description && (
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
          <h5 className="text-sm font-semibold mb-3 text-foreground">Description</h5>
          <div
            className="text-sm text-foreground/90 leading-relaxed prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: ticket.description }}
          />
        </div>
      )}

      {/* Tags */}
      {ticket.tags && ticket.tags.length > 0 && (
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
          <h5 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <Tag className="h-4 w-4 text-primary" />
            Tags
          </h5>
          <div className="flex items-center gap-2 flex-wrap">
            {ticket.tags.map((tag: string, idx: number) => (
              <span key={idx} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Conversations/Timeline */}
      {ticket.conversations && ticket.conversations.length > 0 && (
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
          <h5 className="text-sm font-semibold mb-4 flex items-center gap-2 text-foreground">
            <MessageSquare className="h-4 w-4 text-primary" />
            Conversation Timeline ({ticket.conversations.length})
          </h5>
          <div className="space-y-4">
            {ticket.conversations.map((conv: any, idx: number) => (
              <div key={idx} className="flex gap-3 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                <div className="flex-shrink-0 mt-1">
                  <div className={`w-3 h-3 rounded-full ${
                    conv.direction === 'INCOMING' ? 'bg-blue-500' :
                    conv.direction === 'OUTGOING' ? 'bg-green-500' :
                    'bg-gray-500'
                  }`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1 gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-foreground">{conv.author || conv.from || 'System'}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        conv.direction === 'INCOMING' ? 'bg-blue-100 text-blue-800' :
                        conv.direction === 'OUTGOING' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {conv.direction || 'INTERNAL'}
                      </span>
                      {!conv.isPublic && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-orange-100 text-orange-800">
                          Private
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(conv.createdTime).toLocaleString()}
                    </span>
                  </div>
                  {conv.summary && conv.summary !== conv.content && (
                    <p className="text-sm font-medium text-foreground mb-2">{conv.summary}</p>
                  )}
                  {conv.content && (
                    <div
                      className="text-sm text-foreground/80 mt-2 p-3 rounded bg-muted/30 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: conv.content }}
                    />
                  )}
                  {conv.attachments && conv.attachments.length > 0 && (
                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                      {conv.attachments.map((att: any, attIdx: number) => (
                        <a
                          key={attIdx}
                          href={att.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs flex items-center gap-1 px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        >
                          <Paperclip className="h-3 w-3" />
                          {att.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Link to Zoho Desk */}
      {ticket.webUrl && (
        <div className="flex justify-center">
          <a
            href={ticket.webUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            Open in Zoho Desk
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}
