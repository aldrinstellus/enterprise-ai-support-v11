// Widget type definitions for Bhanu's assistant-first interface
// These are ADDITIVE to the existing dashboard system (backward compatible)

export type WidgetType =
  | 'executive-summary'
  | 'analytics-dashboard'
  | 'performance-trends'
  | 'sentiment-analysis'
  | 'customer-risk-profile'
  | 'sla-performance-chart'
  | 'team-workload-dashboard'
  | 'ticket-list'
  | 'agent-performance-comparison'
  | 'agent-dashboard'
  | 'ticket-detail'
  | 'meeting-scheduler'
  | 'message-composer'
  | 'call-prep-notes'
  | 'response-composer'
  | 'similar-tickets-analysis'
  | 'agent-performance-stats'
  | 'knowledge-base-search'
  | 'customer-risk-list'
  | 'knowledge-article';

// ============================================================================
// WIDGET DATA INTERFACES (Based on Bhanu's Demo Data)
// ============================================================================

// Executive Summary Widget (C-Level)
export interface ExecutiveSummaryData {
  title: string;
  date: string;
  sections: Array<{
    title: string;
    status: 'success' | 'warning' | 'critical' | 'info';
    value: string;
    change: string;
    description: string;
  }>;
  keyInsights: string[];
  recommendedActions: Array<{
    priority: 'critical' | 'high' | 'medium' | 'low';
    action: string;
    reason: string;
  }>;
}

// Analytics Dashboard Widget (C-Level, CS Manager)
export interface AnalyticsDashboardData {
  ticketVolume: Array<{
    date: string;
    tickets: number;
  }>;
  responseTime: Array<{
    hour: string;
    avgMinutes: number;
  }>;
  resolution: {
    resolved: number;
    pending: number;
    escalated: number;
  };
}

// Performance Trends Widget (C-Level, CS Manager)
export interface PerformanceTrendsData {
  period: string;
  metrics: Array<{
    date: string;
    responseTime: number;
    resolutionTime: number;
    satisfaction: number;
  }>;
}

// Sentiment Analysis Widget (C-Level)
export interface SentimentAnalysisData {
  overall: 'positive' | 'neutral' | 'negative';
  score: number;
  breakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  recentComments: Array<{
    text: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    timestamp: string;
  }>;
}

// Customer Risk Profile Widget (C-Level, CS Manager)
export interface CustomerRiskProfileData {
  customerId: string;
  customerName: string;
  riskScore: number;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  previousScore: number;
  trend: 'increasing' | 'stable' | 'decreasing';
  accountValue: string;
  contractRenewal: string;
  riskFactors: Array<{
    factor: string;
    severity: 'high' | 'medium' | 'low';
    count?: number;
    trend?: 'up' | 'down' | 'stable';
    currentValue?: string;
    previousValue?: string;
    description: string;
    impact: string;
  }>;
  recentActivity: Array<{
    date: string;
    event: string;
    description: string;
  }>;
  aiAnalysis: string;
  recommendations: Array<{
    priority: 'critical' | 'high' | 'medium' | 'low';
    action: string;
    description: string;
    estimatedImpact: string;
  }>;
}

// Team Workload Dashboard Widget (CS Manager)
export interface TeamWorkloadDashboardData {
  title: string;
  lastUpdated: string;
  teamSize: number;
  agentsOnline: number;
  totalTickets: number;
  avgTicketsPerAgent: number;
  agents: Array<{
    id: string;
    name: string;
    avatar: string;
    status: 'online' | 'busy' | 'offline' | 'overloaded';
    statusColor: 'success' | 'warning' | 'error' | 'disabled';
    ticketCount: number;
    capacity: number;
    loadPercentage: number;
    loadStatus: 'low' | 'moderate' | 'high' | 'overloaded' | 'offline';
    avgResponseTime: string;
    slaCompliance: number;
    activeTickets: {
      critical: number;
      high: number;
      medium: number;
      low: number;
    };
    alerts: string[];
    performance: 'excellent' | 'good' | 'needs-attention';
  }>;
  aiRecommendation?: {
    type: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    message: string;
    suggestedActions: Array<{
      action: string;
      impact: string;
      tickets?: string[];
    }>;
  };
}

// SLA Performance Chart Widget (C-Level, CS Manager)
export interface SLAPerformanceChartData {
  title: string;
  overallCompliance: number;
  target: number;
  byCategory: Array<{
    category: string;
    target: string;
    compliance: number;
    trend: 'improving' | 'stable' | 'declining';
    breaches: number;
    avgTime: string;
    status: 'success' | 'warning' | 'error';
  }>;
  trendData: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
    }>;
  };
  topBreaches: Array<{
    ticketId: string;
    customer: string;
    priority: string;
    slaTarget: string;
    actualTime: string;
    reason: string;
    assignedTo: string;
  }>;
  rootCauses: Array<{
    cause: string;
    percentage: number;
    count: number;
    description: string;
  }>;
  recommendations: string[];
}

// Agent Dashboard Widget (Support Agent)
export interface AgentDashboardData {
  title: string;
  agentName: string;
  date: string;
  summary: {
    totalTickets: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
    dueSoon: number;
    needsResponse: number;
  };
  priorities: Array<{
    type: string;
    severity: 'high' | 'medium' | 'low';
    message: string;
    tickets: string[];
  }>;
  aiSuggestions: Array<{
    type: string;
    message: string;
  }>;
  upcomingMeetings: Array<{
    time: string;
    title: string;
    duration: string;
    attendees: string[];
  }>;
  performanceSnapshot: {
    ticketsResolvedToday: number;
    ticketsResolvedThisWeek: number;
    avgResponseTime: string;
    customerSatisfaction: number;
    slaCompliance: number;
  };
}

// Ticket Detail Widget (All personas)
export interface TicketDetailData {
  ticketId: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'in-progress' | 'pending' | 'resolved' | 'closed';
  subject: string;
  customer: {
    name: string;
    id: string;
    plan: string;
    arr: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    riskScore: number;
    riskLevel: 'critical' | 'high' | 'medium' | 'low';
  };
  metadata: {
    created: string;
    createdBy: string;
    assignedTo: string;
    assignedAt: string;
    lastUpdated: string;
    tags: string[];
    category: string;
    product: string;
  };
  sla: {
    responseTime: {
      target: string;
      actual: string;
      status: 'met' | 'breached';
    };
    resolutionTime: {
      target: string;
      deadline: string;
      elapsed: string;
      status: 'met' | 'at-risk' | 'breached';
      breachedBy?: string;
    };
  };
  description: string;
  timeline: Array<{
    timestamp: string;
    type: 'created' | 'assigned' | 'response' | 'internal-note' | 'escalated' | 'customer-reply' | 'status-change';
    actor: string;
    action: string;
    content?: string;
    jiraTicket?: string;
  }>;
  relatedTickets: Array<{
    id: string;
    subject: string;
    customer: string;
    status: string;
    priority: string;
  }>;
  jiraIntegration?: {
    linkedIssue: string;
    issueTitle: string;
    status: string;
    priority: string;
    assignee: string;
    lastUpdated: string;
    comments: Array<{
      timestamp: string;
      author: string;
      content: string;
    }>;
  };
  aiInsights: {
    sentiment: {
      current: string;
      score: number;
      trend: 'improving' | 'stable' | 'declining';
      analysis: string;
    };
    recommendedActions: Array<{
      priority: 'critical' | 'high' | 'medium' | 'low';
      action: string;
      details: string;
    }>;
  };
}

// Ticket List Widget (CS Manager, Support Agent)
export interface TicketListData {
  title: string;
  count: number;
  filters?: Record<string, unknown>;
  tickets: Array<{
    id: string;
    priority: 'critical' | 'high' | 'medium' | 'low';
    priorityColor: 'error' | 'warning' | 'info' | 'success';
    subject: string;
    customer: string;
    status: 'open' | 'in-progress' | 'pending' | 'resolved' | 'closed';
    created: string;
    ageInDays: number;
    slaDeadline?: string;
    slaStatus: 'on-track' | 'at-risk' | 'breached';
    slaRemaining?: string;
    slaBreachedBy?: string;
    lastUpdate: string;
    lastUpdateBy: string;
    tags: string[];
    customerRisk: 'critical' | 'high' | 'medium' | 'low';
  }>;
  summary: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    breached: number;
    atRisk: number;
    onTrack: number;
  };
}

// Agent Performance Comparison Widget (CS Manager)
export interface AgentPerformanceComparisonData {
  title: string;
  period: string;
  topPerformers: Array<{
    rank: number;
    name: string;
    avatar: string;
    metrics: {
      ticketsResolved: number;
      avgResolutionTime: string;
      slaCompliance: number;
      customerSatisfaction: number;
      firstResponseTime: string;
    };
    strengths: string[];
    badge: string;
  }>;
  needsAttention: Array<{
    rank: number;
    name: string;
    avatar: string;
    metrics: {
      ticketsResolved: number;
      avgResolutionTime: string;
      slaCompliance: number;
      customerSatisfaction: number;
      firstResponseTime: string;
    };
    concerns: string[];
    recommendations: string[];
    status: string;
  }>;
  teamAverage: {
    ticketsResolved: number;
    avgResolutionTime: string;
    slaCompliance: number;
    customerSatisfaction: number;
    firstResponseTime: string;
  };
}

// Customer Risk List Widget (CS Manager)
export interface CustomerRiskListData {
  title: string;
  count: number;
  totalCustomers: number;
  customers: Array<{
    name: string;
    id: string;
    riskScore: number;
    riskLevel: 'critical' | 'high' | 'medium' | 'low';
    arr: string;
    openTickets: number;
    criticalTickets: number;
    escalations: number;
    sentiment: 'positive' | 'neutral' | 'negative' | 'mixed';
    sentimentScore: number;
    contractRenewal: string;
    csm: string;
    lastContact: string;
    primaryIssues: string[];
  }>;
}

// Meeting Scheduler Widget (All personas)
export interface MeetingSchedulerData {
  title: string;
  duration: string;
  type?: string;
  availableSlots: Array<{
    date: string;
    time: string;
    timezone: string;
    status: 'available' | 'preferred' | 'unavailable';
    conflicts?: string[];
    note?: string;
  }>;
  attendees: Array<{
    name: string;
    status: 'organizer' | 'available' | 'external' | 'tentative';
    required: boolean;
  }>;
  agenda?: string[];
  suggestedAgenda?: string[];
  coachingTips?: string[];
}

// Call Prep Notes Widget (Support Agent)
export interface CallPrepNotesData {
  title: string;
  customer: {
    name: string;
    id: string;
    contactPerson: string;
    contactEmail: string;
    contactPhone: string;
    plan: string;
    arr: string;
    riskScore: number;
    riskLevel: 'critical' | 'high' | 'medium' | 'low';
  };
  callDetails: {
    purpose: string;
    scheduledTime: string;
    duration: string;
    attendees: string[];
    type: 'support-call' | 'escalation' | 'follow-up' | 'onboarding' | 'renewal';
  };
  context: {
    recentTickets: Array<{
      id: string;
      subject: string;
      status: string;
      priority: string;
      created: string;
    }>;
    accountHealth: {
      openTickets: number;
      criticalTickets: number;
      avgResponseTime: string;
      slaCompliance: number;
      lastContact: string;
    };
    sentiment: {
      current: string;
      trend: 'improving' | 'stable' | 'declining';
      recentFeedback: string;
    };
  };
  talkingPoints: Array<{
    topic: string;
    priority: 'high' | 'medium' | 'low';
    description: string;
    suggestedApproach: string;
  }>;
  potentialObjections: Array<{
    objection: string;
    response: string;
  }>;
  successCriteria: string[];
  aiRecommendations: Array<{
    type: 'preparation' | 'conversation' | 'follow-up';
    recommendation: string;
  }>;
}

// Response Composer Widget (Support Agent)
export interface ResponseComposerData {
  ticketId: string;
  customer: string;
  subject: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  lastMessage: {
    from: string;
    timestamp: string;
    content: string;
  };
  suggestedTone: 'professional' | 'empathetic' | 'technical' | 'apologetic';
  templateOptions: Array<{
    name: string;
    description: string;
    preview: string;
  }>;
  aiGeneratedResponse: {
    content: string;
    keyPoints: string[];
    nextSteps: string[];
    estimatedSentiment: 'positive' | 'neutral' | 'negative';
  };
  knowledgeBaseArticles: Array<{
    id: string;
    title: string;
    relevance: number;
    excerpt: string;
  }>;
}

// Similar Tickets Analysis Widget (Support Agent)
export interface SimilarTicketsAnalysisData {
  title: string;
  category: string;
  ticketsAnalyzed: number;
  avgResolutionTime: string;
  successRate: string;
  commonPatterns: Array<{
    pattern: string;
    frequency: number;
    percentage: number;
    avgResolutionTime: string;
    typicalSolution: string;
    examples: string[];
  }>;
  yourStrengths: string[];
  improvementOpportunities: string[];
  bestPractices: Array<{
    practice: string;
    impact: string;
  }>;
}

// Agent Performance Stats Widget (Support Agent)
export interface AgentPerformanceStatsData {
  title: string;
  period: string;
  agentName: string;
  keyMetrics: {
    ticketsResolved: {
      value: number;
      trend: string;
      comparison: string;
      percentile: string;
    };
    avgResolutionTime: {
      value: string;
      trend: string;
      comparison: string;
      percentile: string;
    };
    firstResponseTime: {
      value: string;
      trend: string;
      comparison: string;
      percentile: string;
    };
    slaCompliance: {
      value: string;
      trend: string;
      comparison: string;
      percentile: string;
    };
    customerSatisfaction: {
      value: string;
      trend: string;
      comparison: string;
      percentile: string;
    };
  };
  trendChart: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
    }>;
  };
  categoryBreakdown: Array<{
    category: string;
    count: number;
    percentage: number;
    avgTime: string;
  }>;
  achievements: Array<{
    badge: string;
    description: string;
    dateEarned: string;
  }>;
  feedback: Array<{
    date: string;
    customer: string;
    rating: number;
    comment: string;
  }>;
}

// Knowledge Base Search Widget (Support Agent)
export interface KnowledgeBaseSearchData {
  query: string;
  resultsCount: number;
  topResults: Array<{
    id: string;
    title: string;
    category: string;
    relevance: number;
    excerpt: string;
    views: number;
    lastUpdated: string;
    rating: number;
    tags: string[];
  }>;
  relatedSearches: string[];
  aiSuggestion?: string;
}

// Knowledge Article Widget (Support Agent)
export interface KnowledgeArticleData {
  id: string;
  title: string;
  category: string;
  lastUpdated: string;
  author: string;
  views: number;
  rating: number;
  tags: string[];
  sections: Array<{
    heading: string;
    content: string;
    type?: 'text' | 'code' | 'list' | 'warning' | 'tip';
    items?: string[];
    code?: {
      language: string;
      snippet: string;
    };
  }>;
  relatedArticles: Array<{
    id: string;
    title: string;
    relevance: number;
  }>;
  helpfulCount: number;
  notHelpfulCount: number;
}

// Message Composer Widget (CS Manager)
export interface MessageComposerData {
  title: string;
  recipient: {
    name: string;
    role: string;
    company: string;
    email: string;
  };
  context: {
    reason: string;
    relatedTickets: string[];
    customerHealth: string;
    lastContact: string;
  };
  suggestedTone: 'professional' | 'empathetic' | 'direct' | 'formal';
  aiDraftedMessage: {
    subject: string;
    body: string;
  };
  talkingPoints: string[];
  templateOptions: Array<{
    name: string;
    description: string;
    preview: string;
  }>;
  schedulingSuggestion?: {
    preferredTimes: string[];
    meetingDuration: string;
  };
}

// Union type for all widget data
export type WidgetData =
  | ExecutiveSummaryData
  | AnalyticsDashboardData
  | PerformanceTrendsData
  | SentimentAnalysisData
  | CustomerRiskProfileData
  | TeamWorkloadDashboardData
  | SLAPerformanceChartData
  | AgentDashboardData
  | TicketDetailData
  | TicketListData
  | AgentPerformanceComparisonData
  | CustomerRiskListData
  | MeetingSchedulerData
  | CallPrepNotesData
  | ResponseComposerData
  | SimilarTicketsAnalysisData
  | AgentPerformanceStatsData
  | KnowledgeBaseSearchData
  | KnowledgeArticleData
  | MessageComposerData;
