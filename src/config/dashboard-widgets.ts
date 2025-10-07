import { WidgetType } from '@/types/widget';
import { PersonaType } from '@/types/persona';

export interface DashboardWidget {
  id: string;
  type: WidgetType;
  title: string;
  description: string;
  query: string;
  icon?: string;
}

export const dashboardWidgets: Record<PersonaType, DashboardWidget[]> = {
  'c-level': [
    {
      id: 'executive-summary',
      type: 'executive-summary',
      title: 'Executive Summary',
      description: 'High-level overview of all key metrics',
      query: 'Generate comprehensive executive dashboard summary',
    },
    {
      id: 'sla-performance',
      type: 'sla-performance-chart',
      title: 'SLA Performance',
      description: 'Service level agreement compliance trends',
      query: 'Show me SLA performance dashboard for this quarter',
    },
    {
      id: 'customer-risk',
      type: 'customer-risk-list',
      title: 'Customer Risk Analysis',
      description: 'Accounts at risk of churning',
      query: 'Which customers are at highest risk of churning?',
    },
    {
      id: 'analytics-dashboard',
      type: 'analytics-dashboard',
      title: 'Analytics Overview',
      description: 'Detailed analytics and insights',
      query: 'Show me detailed analytics dashboard',
    },
    {
      id: 'agent-performance',
      type: 'agent-performance-stats',
      title: 'Agent Performance',
      description: 'Team productivity and efficiency metrics',
      query: 'Show me agent performance metrics overview',
    },
    {
      id: 'team-workload',
      type: 'team-workload-dashboard',
      title: 'Team Workload',
      description: 'Current team capacity and distribution',
      query: 'Show me team workload distribution',
    },
  ],

  'cs-manager': [
    {
      id: 'team-workload',
      type: 'team-workload-dashboard',
      title: 'Team Workload',
      description: 'Agent assignments and capacity',
      query: 'Show me team workload distribution and recommend reassignments',
    },
    {
      id: 'agent-comparison',
      type: 'agent-performance-comparison',
      title: 'Agent Performance',
      description: 'Compare team member metrics',
      query: 'Show me agent performance metrics for this week',
    },
    {
      id: 'sla-alerts',
      type: 'sla-performance-chart',
      title: 'SLA Status',
      description: 'Service level compliance and alerts',
      query: 'Show me tickets at risk of SLA breach',
    },
    {
      id: 'priority-customers',
      type: 'customer-risk-list',
      title: 'Priority Customers',
      description: 'High-value accounts needing attention',
      query: 'Show me all high-priority customers needing attention',
    },
    {
      id: 'escalations',
      type: 'escalation-path',
      title: 'Escalation Queue',
      description: 'Tickets requiring manager intervention',
      query: 'Show me all escalated tickets requiring manager attention',
    },
    {
      id: 'agent-dashboard',
      type: 'agent-dashboard',
      title: 'Agent Overview',
      description: 'Individual agent status and metrics',
      query: 'Show me comprehensive agent dashboard',
    },
  ],

  'support-agent': [
    {
      id: 'my-dashboard',
      type: 'agent-dashboard',
      title: 'My Dashboard',
      description: 'Your personal ticket queue and stats',
      query: 'Show me all my currently open support tickets',
    },
    {
      id: 'my-tickets',
      type: 'ticket-list',
      title: 'My Open Tickets',
      description: 'Currently assigned support tickets',
      query: 'Show me my ticket queue prioritized by urgency',
    },
    {
      id: 'todays-meetings',
      type: 'meeting-scheduler',
      title: "Today's Meetings",
      description: 'Scheduled customer calls and meetings',
      query: 'Show me my scheduled customer meetings for today',
    },
    {
      id: 'knowledge-search',
      type: 'knowledge-base-search',
      title: 'Knowledge Base',
      description: 'Quick access to documentation',
      query: 'Search knowledge base for common issues',
    },
    {
      id: 'response-templates',
      type: 'response-composer',
      title: 'Response Templates',
      description: 'Pre-written responses and drafts',
      query: 'Show me response templates for common scenarios',
    },
    {
      id: 'call-prep',
      type: 'call-prep-notes',
      title: 'Call Preparation',
      description: 'Notes for upcoming customer calls',
      query: 'Prep notes for my next customer call',
    },
  ],
};

export function getDashboardWidgets(persona: PersonaType): DashboardWidget[] {
  return dashboardWidgets[persona] || [];
}
