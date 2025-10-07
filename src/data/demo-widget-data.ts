// Demo widget data based on Bhanu's ai_assistant_demo_data.js structure
// This provides realistic data for testing widgets

import type {
  ExecutiveSummaryData,
  AnalyticsDashboardData,
  PerformanceTrendsData,
  SentimentAnalysisData,
  CustomerRiskProfileData,
  TicketDetailData,
  SLAPerformanceChartData,
  AgentPerformanceComparisonData,
  CallPrepNotesData,
  ResponseComposerData,
  TeamWorkloadDashboardData,
  CustomerRiskListData,
  TicketListData,
  AgentDashboardData,
  MeetingSchedulerData,
  SimilarTicketsAnalysisData,
  AgentPerformanceStatsData,
  KnowledgeBaseSearchData,
  KnowledgeArticleData,
  MessageComposerData,
} from '@/types/widget';

// C-Level: Executive Summary Widget Data
export const executiveSummaryDemo: ExecutiveSummaryData = {
  title: 'Executive Summary',
  date: new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }),
  sections: [
    {
      title: 'SLA Performance',
      status: 'warning',
      value: '87%',
      change: '-3%',
      description: 'Below target of 90%. 8 tickets breached SLA in last 24 hours.',
    },
    {
      title: 'Customer Health',
      status: 'critical',
      value: '3 at-risk',
      change: '+1',
      description: 'Acme Corp escalated to high risk. Requires immediate attention.',
    },
    {
      title: 'Ticket Volume',
      status: 'success',
      value: '142',
      change: '-12%',
      description: '24% decrease from last week. Trending positively.',
    },
    {
      title: 'Team Performance',
      status: 'success',
      value: '4.2h',
      change: '-0.5h',
      description: 'Average resolution time improved by 10%.',
    },
  ],
  keyInsights: [
    "Acme Corp's risk score increased to 82 due to 3 critical unresolved tickets and declining sentiment.",
    'Engineering escalations up 15% - may indicate product quality issues.',
    'Sarah Chen is top performer with 95% customer satisfaction.',
  ],
  recommendedActions: [
    {
      priority: 'critical',
      action: 'Schedule executive call with Acme Corp',
      reason: 'Customer at risk of churn (78% probability)',
    },
    {
      priority: 'high',
      action: 'Review engineering escalation trends with Product team',
      reason: '15% increase suggests systemic issues',
    },
  ],
};

// C-Level: Analytics Dashboard Widget Data (with Recharts visualization)
export const analyticsDashboardDemo: AnalyticsDashboardData = {
  ticketVolume: [
    { date: "Dec 13", tickets: 45 },
    { date: "Dec 14", tickets: 52 },
    { date: "Dec 15", tickets: 38 },
    { date: "Dec 16", tickets: 61 },
    { date: "Dec 17", tickets: 55 },
    { date: "Dec 18", tickets: 48 },
    { date: "Dec 19", tickets: 58 }
  ],
  responseTime: [
    { hour: "9am", avgMinutes: 12 },
    { hour: "11am", avgMinutes: 18 },
    { hour: "1pm", avgMinutes: 25 },
    { hour: "3pm", avgMinutes: 22 },
    { hour: "5pm", avgMinutes: 15 }
  ],
  resolution: {
    resolved: 142,
    pending: 38,
    escalated: 12
  }
};

// C-Level/Manager: Performance Trends Widget Data (Multi-line chart)
export const performanceTrendsDemo: PerformanceTrendsData = {
  period: 'Last 7 Days',
  metrics: [
    { date: 'Dec 13', responseTime: 3.2, resolutionTime: 18.5, satisfaction: 87 },
    { date: 'Dec 14', responseTime: 3.8, resolutionTime: 20.1, satisfaction: 85 },
    { date: 'Dec 15', responseTime: 2.9, resolutionTime: 16.8, satisfaction: 89 },
    { date: 'Dec 16', responseTime: 4.5, resolutionTime: 22.3, satisfaction: 82 },
    { date: 'Dec 17', responseTime: 3.5, resolutionTime: 19.2, satisfaction: 86 },
    { date: 'Dec 18', responseTime: 3.1, resolutionTime: 17.9, satisfaction: 88 },
    { date: 'Dec 19', responseTime: 4.2, resolutionTime: 21.5, satisfaction: 84 },
  ],
};

// C-Level: Sentiment Analysis Widget Data
export const sentimentAnalysisDemo: SentimentAnalysisData = {
  overall: 'negative',
  score: 45,
  breakdown: {
    positive: 20,
    neutral: 35,
    negative: 45,
  },
  recentComments: [
    {
      text: 'Authentication issues are causing major disruptions to our workflow',
      sentiment: 'negative',
      timestamp: '2 hours ago',
    },
    {
      text: 'Data export feature is still not working properly',
      sentiment: 'negative',
      timestamp: '5 hours ago',
    },
    {
      text: 'API rate limiting is affecting our integration',
      sentiment: 'negative',
      timestamp: '1 day ago',
    },
  ],
};

// C-Level: Customer Risk Profile Widget Data
export const customerRiskProfileDemo: CustomerRiskProfileData = {
  customerId: 'CUST-001',
  customerName: 'Acme Corporation',
  riskScore: 82,
  riskLevel: 'critical',
  previousScore: 58,
  trend: 'increasing',
  accountValue: '$450,000 ARR',
  contractRenewal: '45 days',
  riskFactors: [
    {
      factor: 'Critical Open Tickets',
      severity: 'high',
      count: 3,
      description: 'Authentication failures, data export issues, API rate limiting',
      impact: '+15 points',
    },
    {
      factor: 'Sentiment Declining',
      severity: 'high',
      trend: 'down',
      currentValue: '45%',
      previousValue: '78%',
      description: 'Negative sentiment in last 5 communications',
      impact: '+12 points',
    },
    {
      factor: 'Escalations',
      severity: 'medium',
      count: 2,
      description: 'CEO contacted support directly twice',
      impact: '+8 points',
    },
    {
      factor: 'Response Time',
      severity: 'medium',
      description: '82% slower than average response time',
      impact: '+5 points',
    },
  ],
  recentActivity: [
    {
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0], // yesterday
      event: 'CEO escalation',
      description: 'CEO emailed support@ directly about authentication issues',
    },
    {
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days ago
      event: 'Critical ticket opened',
      description: 'Data export failing for 200+ users',
    },
    {
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days ago
      event: 'Negative feedback',
      description: 'CTO expressed frustration on support call',
    },
  ],
  aiAnalysis:
    "Acme Corp is experiencing a critical period. The combination of recurring technical issues, executive-level escalations, and declining sentiment indicates significant dissatisfaction. Their contract renewal is in 45 days, making this a high-priority retention risk. The authentication issue has persisted for 8 days despite multiple support interactions, suggesting either complexity or insufficient prioritization.",
  recommendations: [
    {
      priority: 'critical',
      action: 'Executive Call',
      description: 'Schedule call between your team and Acme CEO within 24 hours',
      estimatedImpact: 'High - Direct executive engagement shows commitment',
    },
    {
      priority: 'critical',
      action: 'Dedicated Task Force',
      description: 'Assign senior engineering team to resolve authentication issue immediately',
      estimatedImpact: 'High - Resolves primary pain point',
    },
    {
      priority: 'high',
      action: 'Account Review',
      description: 'Conduct full account health review with CSM and technical team',
      estimatedImpact: 'Medium - Identifies additional issues proactively',
    },
    {
      priority: 'medium',
      action: 'Compensation Package',
      description: 'Prepare service credit or compensation proposal',
      estimatedImpact: 'Medium - Demonstrates goodwill',
    },
  ],
};

// Ticket Detail Widget Data (All personas - most critical widget)
export const ticketDetailDemo: TicketDetailData = {
  ticketId: 'TICK-001',
  priority: 'critical',
  status: 'in-progress',
  subject: 'Authentication failures affecting 200+ users',
  customer: {
    name: 'Acme Corporation',
    id: 'CUST-001',
    plan: 'Enterprise Plus',
    arr: '$450,000',
    contactName: 'John Smith',
    contactEmail: 'john.smith@acmecorp.com',
    contactPhone: '+1 (555) 123-4567',
    riskScore: 82,
    riskLevel: 'critical',
  },
  metadata: {
    created: '2025-09-24 09:15 AM',
    createdBy: 'John Smith (Customer)',
    assignedTo: 'Mike Johnson',
    assignedAt: '2025-09-24 09:22 AM',
    lastUpdated: '2 hours ago',
    tags: ['authentication', 'production-down', 'p0'],
    category: 'Security & Access',
    product: 'Platform Core',
  },
  sla: {
    responseTime: {
      target: '1 hour',
      actual: '7 minutes',
      status: 'met',
    },
    resolutionTime: {
      target: '4 hours',
      deadline: 'Today 1:15 PM',
      elapsed: '6d 14h',
      status: 'breached',
      breachedBy: '6d 10h',
    },
  },
  description:
    'Our users are experiencing intermittent authentication failures when trying to log into the platform. This started approximately 6 days ago and is affecting approximately 200+ users across multiple departments. The issue appears to be random - some users can log in successfully while others receive "Invalid credentials" errors even with correct passwords. This is severely impacting our operations and causing significant business disruption. We need this resolved immediately.',
  timeline: [
    {
      timestamp: '2025-09-24 09:15 AM',
      type: 'created',
      actor: 'John Smith',
      action: 'Ticket created',
    },
    {
      timestamp: '2025-09-24 09:22 AM',
      type: 'assigned',
      actor: 'System',
      action: 'Assigned to Mike Johnson',
    },
    {
      timestamp: '2025-09-24 09:30 AM',
      type: 'response',
      actor: 'Mike Johnson',
      action: 'Acknowledged ticket',
      content:
        'Thank you for reporting this issue. I\'ve escalated this to our authentication team and they are investigating the root cause. I\'ll keep you updated every 2 hours.',
    },
    {
      timestamp: '2025-09-25 02:15 PM',
      type: 'internal-note',
      actor: 'Mike Johnson',
      action: 'Added internal note',
      content: 'Engineering identified potential issue with Redis cache. Testing fix in staging.',
    },
    {
      timestamp: '2025-09-27 10:00 AM',
      type: 'escalated',
      actor: 'Mike Johnson',
      action: 'Escalated to Engineering Leadership',
      content: 'Customer CEO reached out directly. Escalating to VP Engineering for immediate attention.',
    },
    {
      timestamp: '2025-09-28 04:30 PM',
      type: 'customer-reply',
      actor: 'John Smith',
      action: 'Customer replied',
      content:
        'This is still not resolved after 4 days. Our CEO is extremely unhappy and considering alternatives. We need a resolution timeline immediately.',
    },
    {
      timestamp: '2025-09-30 11:45 AM',
      type: 'status-change',
      actor: 'Mike Johnson',
      action: 'Changed status to In Progress',
      content: 'Engineering has deployed a fix to production. Monitoring for 24 hours.',
      jiraTicket: 'ENG-5821',
    },
  ],
  relatedTickets: [
    {
      id: 'TKT-2891',
      subject: 'Password reset not working',
      customer: 'Acme Corporation',
      status: 'Open',
      priority: 'High',
    },
    {
      id: 'TKT-2756',
      subject: 'Previous authentication issue (resolved)',
      customer: 'Acme Corporation',
      status: 'Closed',
      priority: 'Medium',
    },
  ],
  jiraIntegration: {
    linkedIssue: 'ENG-5821',
    issueTitle: 'Redis cache invalidation causing auth failures',
    status: 'In Progress',
    priority: 'P0',
    assignee: 'Sarah Chen (Engineering)',
    lastUpdated: '1 hour ago',
    comments: [
      {
        timestamp: '45 minutes ago',
        author: 'Sarah Chen',
        content:
          'Deployed fix to production. Cache invalidation logic has been corrected. Monitoring error rates.',
      },
      {
        timestamp: '2 hours ago',
        author: 'David Lee',
        content:
          'Root cause identified: Redis cache was not properly invalidating expired auth tokens, causing intermittent failures.',
      },
    ],
  },
  aiInsights: {
    sentiment: {
      current: 'Very Negative',
      score: 15,
      trend: 'declining',
      analysis:
        'Customer sentiment has deteriorated significantly over the 6-day period. Initial patience has turned to frustration, evidenced by CEO escalation and threat to consider alternatives. The phrase "extremely unhappy" and "considering alternatives" indicates high churn risk.',
    },
    recommendedActions: [
      {
        priority: 'critical',
        action: 'Executive Outreach',
        details:
          'Schedule immediate call with Acme Corp CEO to provide update, apologize for delay, and outline resolution plan with specific timeline.',
      },
      {
        priority: 'critical',
        action: 'Root Cause Documentation',
        details:
          'Prepare detailed post-mortem document explaining what went wrong, why it took 6 days, and preventive measures for future.',
      },
      {
        priority: 'high',
        action: 'Service Credit',
        details:
          'Propose service credit or compensation package to demonstrate goodwill and commitment to relationship.',
      },
      {
        priority: 'medium',
        action: 'Proactive Monitoring',
        details:
          'Set up enhanced monitoring for this customer for next 30 days to catch any issues immediately.',
      },
    ],
  },
};

// SLA Performance Chart Widget Data (C-Level, CS Manager)
export const slaPerformanceChartDemo: SLAPerformanceChartData = {
  title: 'SLA Performance Analysis',
  overallCompliance: 87,
  target: 90,
  byCategory: [
    {
      category: 'First Response Time',
      target: '< 1 hour',
      compliance: 94,
      trend: 'stable',
      breaches: 8,
      avgTime: '42 minutes',
      status: 'success',
    },
    {
      category: 'Critical Resolution',
      target: '< 4 hours',
      compliance: 72,
      trend: 'declining',
      breaches: 15,
      avgTime: '6.2 hours',
      status: 'error',
    },
    {
      category: 'High Priority Resolution',
      target: '< 8 hours',
      compliance: 85,
      trend: 'improving',
      breaches: 12,
      avgTime: '7.1 hours',
      status: 'warning',
    },
    {
      category: 'Medium Priority Resolution',
      target: '< 24 hours',
      compliance: 91,
      trend: 'stable',
      breaches: 6,
      avgTime: '18 hours',
      status: 'success',
    },
    {
      category: 'Low Priority Resolution',
      target: '< 72 hours',
      compliance: 96,
      trend: 'improving',
      breaches: 2,
      avgTime: '48 hours',
      status: 'success',
    },
  ],
  trendData: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Overall SLA Compliance',
        data: [85, 88, 86, 87],
      },
      {
        label: 'Critical Resolution SLA',
        data: [78, 75, 70, 72],
      },
    ],
  },
  topBreaches: [
    {
      ticketId: 'TKT-2847',
      customer: 'Acme Corporation',
      priority: 'Critical',
      slaTarget: '4 hours',
      actualTime: '6d 14h',
      reason: 'Complex technical issue requiring engineering escalation',
      assignedTo: 'Mike Johnson',
    },
    {
      ticketId: 'TKT-2901',
      customer: 'TechStart Inc',
      priority: 'Critical',
      slaTarget: '4 hours',
      actualTime: '18 hours',
      reason: 'Awaiting third-party vendor response',
      assignedTo: 'Lisa Wong',
    },
    {
      ticketId: 'TKT-2889',
      customer: 'Global Systems',
      priority: 'High',
      slaTarget: '8 hours',
      actualTime: '12 hours',
      reason: 'Required multiple internal teams coordination',
      assignedTo: 'David Chen',
    },
  ],
  rootCauses: [
    {
      cause: 'Complex Technical Issues',
      percentage: 35,
      count: 18,
      description: 'Issues requiring engineering team involvement and deep debugging',
    },
    {
      cause: 'Third-party Dependencies',
      percentage: 28,
      count: 14,
      description: 'Delays due to external vendor response times',
    },
    {
      cause: 'Insufficient Information',
      percentage: 22,
      count: 11,
      description: 'Required multiple back-and-forth with customer for details',
    },
    {
      cause: 'Resource Constraints',
      percentage: 15,
      count: 8,
      description: 'High workload periods with insufficient agent availability',
    },
  ],
  recommendations: [
    'Implement automated escalation for critical tickets that remain unresolved after 2 hours',
    'Create dedicated engineering support rotation for critical customer issues',
    'Develop standard information collection templates to reduce back-and-forth',
    'Consider expanding team during peak hours (9 AM - 12 PM)',
    'Establish SLA exception process for third-party dependencies',
  ],
};

// Agent Performance Comparison Widget Data (CS Manager)
export const agentPerformanceComparisonDemo: AgentPerformanceComparisonData = {
  title: 'Agent Performance Comparison',
  period: 'Last 30 Days',
  teamAverage: {
    ticketsResolved: 47,
    avgResolutionTime: '4.2 hours',
    slaCompliance: 87,
    customerSatisfaction: 4.3,
    firstResponseTime: '38 minutes',
  },
  topPerformers: [
    {
      rank: 1,
      name: 'Sarah Chen',
      avatar: 'SC',
      metrics: {
        ticketsResolved: 68,
        avgResolutionTime: '3.1 hours',
        slaCompliance: 95,
        customerSatisfaction: 4.8,
        firstResponseTime: '18 minutes',
      },
      strengths: ['Technical expertise', 'Fast response', 'Customer empathy'],
      badge: 'Star Performer',
    },
    {
      rank: 2,
      name: 'Mike Johnson',
      avatar: 'MJ',
      metrics: {
        ticketsResolved: 61,
        avgResolutionTime: '3.5 hours',
        slaCompliance: 92,
        customerSatisfaction: 4.6,
        firstResponseTime: '22 minutes',
      },
      strengths: ['Complex problem solving', 'Documentation', 'Mentoring'],
      badge: 'Top Performer',
    },
    {
      rank: 3,
      name: 'Lisa Wong',
      avatar: 'LW',
      metrics: {
        ticketsResolved: 58,
        avgResolutionTime: '3.8 hours',
        slaCompliance: 90,
        customerSatisfaction: 4.5,
        firstResponseTime: '25 minutes',
      },
      strengths: ['Communication', 'Follow-through', 'Escalation management'],
      badge: 'Excellence',
    },
  ],
  needsAttention: [
    {
      rank: 12,
      name: 'Tom Anderson',
      avatar: 'TA',
      metrics: {
        ticketsResolved: 28,
        avgResolutionTime: '6.8 hours',
        slaCompliance: 68,
        customerSatisfaction: 3.7,
        firstResponseTime: '58 minutes',
      },
      concerns: [
        'SLA compliance 22% below team average',
        'Response time significantly slower than peers',
        'Lower ticket resolution count',
      ],
      recommendations: [
        'Pair with Sarah Chen for shadowing and mentoring',
        'Focus training on time management and prioritization',
        'Review workflow efficiency and tools usage',
      ],
      status: 'Performance Improvement Plan',
    },
  ],
};

// Call Prep Notes Widget Data (Support Agent)
export const callPrepNotesDemo: CallPrepNotesData = {
  title: 'Call Preparation Notes',
  customer: {
    name: 'Acme Corporation',
    id: 'CUST-001',
    contactPerson: 'John Smith',
    contactEmail: 'john.smith@acmecorp.com',
    contactPhone: '+1 (555) 123-4567',
    plan: 'Enterprise Plus',
    arr: '$450,000',
    riskScore: 82,
    riskLevel: 'critical',
  },
  callDetails: {
    purpose: 'Discuss authentication issue resolution and account concerns',
    scheduledTime: 'Today at 2:00 PM EST',
    duration: '30 minutes',
    attendees: ['John Smith (Customer)', 'Mike Johnson (Support)', 'Sarah Chen (Engineering)'],
    type: 'escalation',
  },
  context: {
    recentTickets: [
      {
        id: 'TKT-2847',
        subject: 'Authentication failures affecting 200+ users',
        status: 'In Progress',
        priority: 'Critical',
        created: '6 days ago',
      },
      {
        id: 'TKT-2891',
        subject: 'Password reset not working',
        status: 'Open',
        priority: 'High',
        created: '3 days ago',
      },
      {
        id: 'TKT-2756',
        subject: 'Previous authentication issue',
        status: 'Closed',
        priority: 'Medium',
        created: '45 days ago',
      },
    ],
    accountHealth: {
      openTickets: 5,
      criticalTickets: 2,
      avgResponseTime: '42 minutes',
      slaCompliance: 72,
      lastContact: '2 hours ago',
    },
    sentiment: {
      current: 'Very Negative',
      trend: 'declining',
      recentFeedback: 'CEO is extremely unhappy and considering alternatives',
    },
  },
  talkingPoints: [
    {
      topic: 'Acknowledge Impact & Apologize',
      priority: 'high',
      description:
        'Recognize the 6-day issue duration and business disruption caused to their team',
      suggestedApproach:
        'Start with genuine apology: "I want to apologize for the extended time it took to resolve this authentication issue. I understand it impacted 200+ users and caused significant disruption to your operations."',
    },
    {
      topic: 'Explain Root Cause & Resolution',
      priority: 'high',
      description: 'Clearly explain what went wrong and how it was fixed',
      suggestedApproach:
        'Technical explanation: "The issue was caused by a Redis cache invalidation bug that prevented expired authentication tokens from being properly cleared. Our engineering team deployed a fix to production yesterday, and we\'re monitoring it closely."',
    },
    {
      topic: 'Present Preventive Measures',
      priority: 'high',
      description: 'Outline steps taken to prevent similar issues',
      suggestedApproach:
        'Share improvements: "We\'ve implemented enhanced monitoring specifically for authentication services and established a faster escalation path for authentication-related issues. We\'ve also added this scenario to our automated test suite."',
    },
    {
      topic: 'Discuss Compensation',
      priority: 'medium',
      description: 'Propose service credit or compensation for the disruption',
      suggestedApproach:
        'Make offer: "To demonstrate our commitment to your success, we\'d like to offer [X days/percentage] service credit and assign a dedicated technical account manager for the next 90 days."',
    },
  ],
  potentialObjections: [
    {
      objection: 'Why did it take 6 days to fix this?',
      response:
        'I understand your frustration. The issue was complex because it was intermittent, making it difficult to reproduce consistently. Our team had to analyze logs from multiple services to identify the root cause in the cache layer. In hindsight, we should have escalated to our senior engineering team sooner. We\'ve learned from this and updated our escalation procedures.',
    },
    {
      objection: 'How can we trust this won\'t happen again?',
      response:
        'We\'ve taken several concrete steps: First, we\'ve added this specific scenario to our automated testing suite. Second, we\'ve implemented real-time monitoring with alerts for authentication service health. Third, we\'ve established a dedicated on-call rotation for authentication issues. We\'re also preparing a detailed post-mortem document that I\'ll share with you outlining all preventive measures.',
    },
    {
      objection: 'We\'re considering switching to a competitor.',
      response:
        'I completely understand why you\'d be considering alternatives after this experience. We value your partnership highly, which is why we want to make this right. Beyond the service credit, we\'d like to assign a dedicated technical account manager to your account, conduct a comprehensive account health review, and establish a direct escalation path to our engineering leadership for any future critical issues. Can we schedule a meeting with our VP of Customer Success to discuss how we can rebuild your confidence?',
    },
  ],
  successCriteria: [
    'Customer acknowledges understanding of root cause and resolution',
    'Agreement reached on compensation/service credit terms',
    'Customer sentiment improves from "Very Negative" to at least "Neutral"',
    'Scheduled follow-up meeting to review account health',
    'Customer confirms willingness to continue partnership',
  ],
  aiRecommendations: [
    {
      type: 'preparation',
      recommendation:
        'Review the engineering post-mortem document before the call so you can speak confidently about technical details',
    },
    {
      type: 'conversation',
      recommendation:
        'Let the customer express their frustration fully before moving to solutions. Active listening is critical here.',
    },
    {
      type: 'conversation',
      recommendation:
        'Have Sarah Chen (Engineering) on the call to add credibility and answer technical questions directly',
    },
    {
      type: 'follow-up',
      recommendation:
        'Send detailed summary email within 1 hour of call with all commitments documented',
    },
    {
      type: 'follow-up',
      recommendation:
        'Schedule check-in calls for next 3 weeks to monitor resolution and rebuild trust',
    },
  ],
};

// Response Composer Widget Data (Support Agent)
export const responseComposerDemo: ResponseComposerData = {
  ticketId: 'TKT-2891',
  customer: 'Acme Corporation',
  subject: 'Password reset not working',
  priority: 'high',
  lastMessage: {
    from: 'John Smith',
    timestamp: '45 minutes ago',
    content:
      'I\'ve tried resetting my password 3 times now and I\'m not receiving the reset email. I checked my spam folder and it\'s not there either. This is blocking me from accessing the system to prepare for tomorrow\'s client presentation. Can you please help urgently?',
  },
  suggestedTone: 'empathetic',
  templateOptions: [
    {
      name: 'Standard Support Response',
      description: 'Professional tone with troubleshooting steps',
      preview:
        'Thank you for contacting support. I understand you\'re experiencing issues with password reset emails. Let me help you troubleshoot this...',
    },
    {
      name: 'Urgent Issue Response',
      description: 'Acknowledges urgency and provides immediate action',
      preview:
        'I understand this is urgent given your client presentation tomorrow. I\'m escalating this immediately to our authentication team...',
    },
  ],
  aiGeneratedResponse: {
    content: `Hi John,

I completely understand how frustrating this must be, especially with your client presentation tomorrow. Let me help you get back into your account immediately.

I've just reset your password manually on our end and you should receive a new temporary password at this email address within the next 2 minutes. If you don't see it, please check your spam/junk folder one more time.

In the meantime, I'm also investigating why the automated password reset emails weren't being delivered to you. I see you attempted the reset 3 times in the past hour, which suggests there may be a delivery issue specific to your email domain or an issue with our email service.

**Next Steps:**
1. Check your email for the temporary password (arriving in ~2 minutes)
2. Log in with the temporary password
3. You'll be prompted to set a new permanent password
4. If you encounter any issues, please reply immediately or call me directly at the number below

I'll follow up with you tomorrow to confirm everything is working smoothly for your presentation. Please don't hesitate to reach out if you need anything else.

Best regards,
Mike Johnson
Senior Support Specialist
Direct: +1 (555) 987-6543`,
    keyPoints: [
      'Acknowledged urgency and empathized with situation',
      'Provided immediate solution (manual password reset)',
      'Explained the issue (email delivery problem)',
      'Offered direct contact method for faster resolution',
      'Committed to follow-up to ensure resolution',
    ],
    nextSteps: [
      'Send response immediately',
      'Manually reset password in admin panel',
      'Monitor for customer login within next 30 minutes',
      'Investigate email delivery logs for root cause',
      'Follow up tomorrow morning before presentation',
    ],
    estimatedSentiment: 'positive',
  },
  knowledgeBaseArticles: [
    {
      id: 'KB-1247',
      title: 'How to Reset Your Password',
      relevance: 0.95,
      excerpt:
        'Step-by-step guide for resetting your password including troubleshooting common issues with email delivery...',
    },
    {
      id: 'KB-1289',
      title: 'Email Delivery Issues and Troubleshooting',
      relevance: 0.88,
      excerpt:
        'Learn about common email delivery problems and how to resolve them, including spam filter configuration...',
    },
    {
      id: 'KB-1156',
      title: 'Manual Password Reset by Support Team',
      relevance: 0.82,
      excerpt:
        'Internal guide for support agents on how to manually reset customer passwords when automated system fails...',
    },
  ],
};

// CS Manager: Team Workload Dashboard Widget Data
export const teamWorkloadDashboardDemo: TeamWorkloadDashboardData = {
  title: 'Team Workload Dashboard',
  lastUpdated: new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }),
  teamSize: 8,
  agentsOnline: 6,
  totalTickets: 47,
  avgTicketsPerAgent: 5.9,
  agents: [
    {
      id: 'agent-1',
      name: 'Sarah Chen',
      avatar: 'SC',
      status: 'online',
      statusColor: 'success',
      ticketCount: 4,
      capacity: 10,
      loadPercentage: 40,
      loadStatus: 'low',
      avgResponseTime: '12m',
      slaCompliance: 98,
      activeTickets: {
        critical: 0,
        high: 1,
        medium: 2,
        low: 1,
      },
      alerts: [],
      performance: 'excellent',
    },
    {
      id: 'agent-2',
      name: 'Marcus Johnson',
      avatar: 'MJ',
      status: 'online',
      statusColor: 'success',
      ticketCount: 6,
      capacity: 10,
      loadPercentage: 60,
      loadStatus: 'moderate',
      avgResponseTime: '18m',
      slaCompliance: 95,
      activeTickets: {
        critical: 1,
        high: 2,
        medium: 2,
        low: 1,
      },
      alerts: ['1 critical ticket requires attention'],
      performance: 'good',
    },
    {
      id: 'agent-3',
      name: 'Emily Rodriguez',
      avatar: 'ER',
      status: 'busy',
      statusColor: 'warning',
      ticketCount: 9,
      capacity: 10,
      loadPercentage: 90,
      loadStatus: 'high',
      avgResponseTime: '35m',
      slaCompliance: 88,
      activeTickets: {
        critical: 1,
        high: 3,
        medium: 4,
        low: 1,
      },
      alerts: ['High workload', '2 tickets approaching SLA breach'],
      performance: 'needs-attention',
    },
    {
      id: 'agent-4',
      name: 'David Park',
      avatar: 'DP',
      status: 'overloaded',
      statusColor: 'error',
      ticketCount: 12,
      capacity: 10,
      loadPercentage: 120,
      loadStatus: 'overloaded',
      avgResponseTime: '52m',
      slaCompliance: 78,
      activeTickets: {
        critical: 2,
        high: 4,
        medium: 5,
        low: 1,
      },
      alerts: [
        'Exceeded capacity',
        '3 tickets breached SLA',
        'Needs immediate support',
      ],
      performance: 'needs-attention',
    },
    {
      id: 'agent-5',
      name: 'Aisha Williams',
      avatar: 'AW',
      status: 'online',
      statusColor: 'success',
      ticketCount: 5,
      capacity: 10,
      loadPercentage: 50,
      loadStatus: 'moderate',
      avgResponseTime: '15m',
      slaCompliance: 96,
      activeTickets: {
        critical: 0,
        high: 1,
        medium: 3,
        low: 1,
      },
      alerts: [],
      performance: 'excellent',
    },
    {
      id: 'agent-6',
      name: 'James Taylor',
      avatar: 'JT',
      status: 'online',
      statusColor: 'success',
      ticketCount: 7,
      capacity: 10,
      loadPercentage: 70,
      loadStatus: 'moderate',
      avgResponseTime: '22m',
      slaCompliance: 92,
      activeTickets: {
        critical: 1,
        high: 2,
        medium: 3,
        low: 1,
      },
      alerts: ['1 critical ticket'],
      performance: 'good',
    },
    {
      id: 'agent-7',
      name: 'Lisa Anderson',
      avatar: 'LA',
      status: 'offline',
      statusColor: 'disabled',
      ticketCount: 0,
      capacity: 10,
      loadPercentage: 0,
      loadStatus: 'offline',
      avgResponseTime: 'N/A',
      slaCompliance: 0,
      activeTickets: {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
      },
      alerts: [],
      performance: 'good',
    },
    {
      id: 'agent-8',
      name: 'Robert Kim',
      avatar: 'RK',
      status: 'offline',
      statusColor: 'disabled',
      ticketCount: 4,
      capacity: 10,
      loadPercentage: 40,
      loadStatus: 'offline',
      avgResponseTime: 'N/A',
      slaCompliance: 0,
      activeTickets: {
        critical: 0,
        high: 1,
        medium: 2,
        low: 1,
      },
      alerts: ['Agent offline with active tickets'],
      performance: 'needs-attention',
    },
  ],
  aiRecommendation: {
    type: 'workload-rebalancing',
    severity: 'high',
    message:
      'David Park is significantly overloaded (120% capacity) while Sarah Chen and Aisha Williams have capacity available. Recommend immediate ticket redistribution.',
    suggestedActions: [
      {
        action: 'Redistribute 4 tickets from David Park to Sarah Chen',
        impact: 'Will balance load and prevent SLA breaches',
        tickets: ['#2891', '#2889', '#2887', '#2884'],
      },
      {
        action: 'Redistribute 3 tickets from David Park to Aisha Williams',
        impact: 'Reduce David\'s load to manageable 50%',
        tickets: ['#2886', '#2883', '#2881'],
      },
      {
        action: 'Schedule coaching session with Emily Rodriguez',
        impact: 'Address efficiency issues (90% load, declining SLA)',
      },
    ],
  },
};

// CS Manager: Customer Risk List Widget Data
export const customerRiskListDemo: CustomerRiskListData = {
  title: 'High-Risk Customers',
  count: 8,
  totalCustomers: 127,
  customers: [
    {
      name: 'Acme Corporation',
      id: 'CUST-1001',
      riskScore: 92,
      riskLevel: 'critical',
      arr: '$450K',
      openTickets: 8,
      criticalTickets: 3,
      escalations: 2,
      sentiment: 'negative',
      sentimentScore: 28,
      contractRenewal: '45 days',
      csm: 'Sarah Chen',
      lastContact: '2 hours ago',
      primaryIssues: [
        'Authentication system downtime',
        'Data migration delays',
        'Multiple SLA breaches',
      ],
    },
    {
      name: 'TechStart Industries',
      id: 'CUST-1089',
      riskScore: 85,
      riskLevel: 'critical',
      arr: '$280K',
      openTickets: 6,
      criticalTickets: 2,
      escalations: 1,
      sentiment: 'mixed',
      sentimentScore: 45,
      contractRenewal: '90 days',
      csm: 'Marcus Johnson',
      lastContact: '5 hours ago',
      primaryIssues: [
        'Integration API errors',
        'Performance degradation',
        'Missing features from roadmap',
      ],
    },
    {
      name: 'Global Finance Group',
      id: 'CUST-1034',
      riskScore: 78,
      riskLevel: 'high',
      arr: '$620K',
      openTickets: 5,
      criticalTickets: 1,
      escalations: 1,
      sentiment: 'negative',
      sentimentScore: 32,
      contractRenewal: '120 days',
      csm: 'Emily Rodriguez',
      lastContact: '1 day ago',
      primaryIssues: [
        'Compliance concerns',
        'Security audit findings',
        'Slow response times',
      ],
    },
    {
      name: 'MedTech Solutions',
      id: 'CUST-1156',
      riskScore: 72,
      riskLevel: 'high',
      arr: '$195K',
      openTickets: 4,
      criticalTickets: 1,
      escalations: 0,
      sentiment: 'neutral',
      sentimentScore: 58,
      contractRenewal: '180 days',
      csm: 'David Park',
      lastContact: '3 days ago',
      primaryIssues: [
        'Training requests not addressed',
        'Feature adoption challenges',
        'Support response delays',
      ],
    },
    {
      name: 'Retail Innovations LLC',
      id: 'CUST-1203',
      riskScore: 68,
      riskLevel: 'high',
      arr: '$340K',
      openTickets: 7,
      criticalTickets: 0,
      escalations: 1,
      sentiment: 'mixed',
      sentimentScore: 52,
      contractRenewal: '60 days',
      csm: 'Aisha Williams',
      lastContact: '6 hours ago',
      primaryIssues: [
        'Customization limitations',
        'Reporting inaccuracies',
        'Mobile app issues',
      ],
    },
    {
      name: 'EduTech Partners',
      id: 'CUST-1178',
      riskScore: 65,
      riskLevel: 'high',
      arr: '$175K',
      openTickets: 3,
      criticalTickets: 0,
      escalations: 0,
      sentiment: 'neutral',
      sentimentScore: 61,
      contractRenewal: '240 days',
      csm: 'James Taylor',
      lastContact: '2 days ago',
      primaryIssues: [
        'User onboarding complexity',
        'Documentation gaps',
        'Integration setup delays',
      ],
    },
    {
      name: 'CloudFirst Systems',
      id: 'CUST-1245',
      riskScore: 62,
      riskLevel: 'medium',
      arr: '$520K',
      openTickets: 4,
      criticalTickets: 1,
      escalations: 0,
      sentiment: 'mixed',
      sentimentScore: 55,
      contractRenewal: '150 days',
      csm: 'Sarah Chen',
      lastContact: '4 hours ago',
      primaryIssues: [
        'API rate limiting concerns',
        'Pricing model questions',
        'Feature parity with competitors',
      ],
    },
    {
      name: 'Manufacturing Dynamics',
      id: 'CUST-1067',
      riskScore: 58,
      riskLevel: 'medium',
      arr: '$410K',
      openTickets: 3,
      criticalTickets: 0,
      escalations: 0,
      sentiment: 'neutral',
      sentimentScore: 64,
      contractRenewal: '210 days',
      csm: 'Marcus Johnson',
      lastContact: '1 day ago',
      primaryIssues: [
        'Bulk operation performance',
        'Export functionality limitations',
        'Timezone handling issues',
      ],
    },
  ],
};

// CS Manager + Support Agent: Ticket List Widget Data
export const ticketListDemo: TicketListData = {
  title: 'My Tickets',
  count: 12,
  filters: {
    status: ['open', 'in-progress'],
    priority: ['critical', 'high', 'medium'],
  },
  tickets: [
    {
      id: '#2901',
      priority: 'critical',
      priorityColor: 'error',
      subject: 'Production deployment failing - authentication errors',
      customer: 'Acme Corporation',
      status: 'in-progress',
      created: '2 hours ago',
      ageInDays: 0,
      slaDeadline: '2 hours remaining',
      slaStatus: 'at-risk',
      slaRemaining: '2h 15m',
      lastUpdate: '45 minutes ago',
      lastUpdateBy: 'Marcus Johnson',
      tags: ['deployment', 'authentication', 'production'],
      customerRisk: 'critical',
    },
    {
      id: '#2898',
      priority: 'critical',
      priorityColor: 'error',
      subject: 'Complete system outage affecting all users',
      customer: 'TechStart Industries',
      status: 'in-progress',
      created: '4 hours ago',
      ageInDays: 0,
      slaDeadline: 'Breached',
      slaStatus: 'breached',
      slaBreachedBy: '30 minutes',
      lastUpdate: '15 minutes ago',
      lastUpdateBy: 'Emily Rodriguez',
      tags: ['outage', 'critical', 'all-users'],
      customerRisk: 'critical',
    },
    {
      id: '#2894',
      priority: 'high',
      priorityColor: 'warning',
      subject: 'Data export functionality returning incomplete results',
      customer: 'Global Finance Group',
      status: 'open',
      created: '6 hours ago',
      ageInDays: 0,
      slaDeadline: '6 hours remaining',
      slaStatus: 'on-track',
      slaRemaining: '6h 22m',
      lastUpdate: '2 hours ago',
      lastUpdateBy: 'Sarah Chen',
      tags: ['data-export', 'reporting', 'data-integrity'],
      customerRisk: 'high',
    },
    {
      id: '#2890',
      priority: 'high',
      priorityColor: 'warning',
      subject: 'API rate limit errors during peak hours',
      customer: 'CloudFirst Systems',
      status: 'in-progress',
      created: '1 day ago',
      ageInDays: 1,
      slaDeadline: '4 hours remaining',
      slaStatus: 'at-risk',
      slaRemaining: '4h 10m',
      lastUpdate: '3 hours ago',
      lastUpdateBy: 'David Park',
      tags: ['api', 'performance', 'rate-limiting'],
      customerRisk: 'medium',
    },
    {
      id: '#2885',
      priority: 'high',
      priorityColor: 'warning',
      subject: 'Integration webhook not triggering for events',
      customer: 'MedTech Solutions',
      status: 'pending',
      created: '1 day ago',
      ageInDays: 1,
      slaDeadline: '10 hours remaining',
      slaStatus: 'on-track',
      slaRemaining: '10h 45m',
      lastUpdate: '8 hours ago',
      lastUpdateBy: 'Aisha Williams',
      tags: ['integration', 'webhooks', 'automation'],
      customerRisk: 'high',
    },
    {
      id: '#2882',
      priority: 'medium',
      priorityColor: 'info',
      subject: 'Dashboard loading slowly for large datasets',
      customer: 'Retail Innovations LLC',
      status: 'open',
      created: '2 days ago',
      ageInDays: 2,
      slaDeadline: '1 day remaining',
      slaStatus: 'on-track',
      slaRemaining: '1d 6h',
      lastUpdate: '1 day ago',
      lastUpdateBy: 'James Taylor',
      tags: ['performance', 'dashboard', 'optimization'],
      customerRisk: 'high',
    },
    {
      id: '#2878',
      priority: 'medium',
      priorityColor: 'info',
      subject: 'User permissions not syncing with directory service',
      customer: 'EduTech Partners',
      status: 'in-progress',
      created: '3 days ago',
      ageInDays: 3,
      slaDeadline: '1 day remaining',
      slaStatus: 'on-track',
      slaRemaining: '1d 2h',
      lastUpdate: '5 hours ago',
      lastUpdateBy: 'Sarah Chen',
      tags: ['permissions', 'authentication', 'ldap'],
      customerRisk: 'high',
    },
    {
      id: '#2874',
      priority: 'medium',
      priorityColor: 'info',
      subject: 'Custom report templates not saving correctly',
      customer: 'Manufacturing Dynamics',
      status: 'open',
      created: '3 days ago',
      ageInDays: 3,
      slaDeadline: '2 days remaining',
      slaStatus: 'on-track',
      slaRemaining: '2d 4h',
      lastUpdate: '1 day ago',
      lastUpdateBy: 'Marcus Johnson',
      tags: ['reporting', 'templates', 'customization'],
      customerRisk: 'medium',
    },
    {
      id: '#2871',
      priority: 'low',
      priorityColor: 'success',
      subject: 'Feature request: Bulk edit for ticket assignments',
      customer: 'Acme Corporation',
      status: 'open',
      created: '4 days ago',
      ageInDays: 4,
      slaDeadline: '3 days remaining',
      slaStatus: 'on-track',
      slaRemaining: '3d 12h',
      lastUpdate: '2 days ago',
      lastUpdateBy: 'Emily Rodriguez',
      tags: ['feature-request', 'ui', 'productivity'],
      customerRisk: 'critical',
    },
    {
      id: '#2867',
      priority: 'low',
      priorityColor: 'success',
      subject: 'Documentation update needed for API endpoints',
      customer: 'CloudFirst Systems',
      status: 'pending',
      created: '5 days ago',
      ageInDays: 5,
      slaDeadline: '2 days remaining',
      slaStatus: 'on-track',
      slaRemaining: '2d 8h',
      lastUpdate: '3 days ago',
      lastUpdateBy: 'David Park',
      tags: ['documentation', 'api', 'developer-experience'],
      customerRisk: 'medium',
    },
    {
      id: '#2863',
      priority: 'medium',
      priorityColor: 'info',
      subject: 'Mobile app notifications not appearing',
      customer: 'Retail Innovations LLC',
      status: 'open',
      created: '5 days ago',
      ageInDays: 5,
      slaDeadline: 'Breached',
      slaStatus: 'breached',
      slaBreachedBy: '6 hours',
      lastUpdate: '4 days ago',
      lastUpdateBy: 'Aisha Williams',
      tags: ['mobile', 'notifications', 'push-notifications'],
      customerRisk: 'high',
    },
    {
      id: '#2859',
      priority: 'low',
      priorityColor: 'success',
      subject: 'Request for training materials on new features',
      customer: 'MedTech Solutions',
      status: 'pending',
      created: '6 days ago',
      ageInDays: 6,
      slaDeadline: '1 day remaining',
      slaStatus: 'on-track',
      slaRemaining: '1d 4h',
      lastUpdate: '5 days ago',
      lastUpdateBy: 'James Taylor',
      tags: ['training', 'documentation', 'customer-success'],
      customerRisk: 'high',
    },
  ],
  summary: {
    critical: 2,
    high: 3,
    medium: 5,
    low: 2,
    breached: 2,
    atRisk: 2,
    onTrack: 8,
  },
};

// Support Agent: Agent Dashboard Widget Data
export const agentDashboardDemo: AgentDashboardData = {
  title: 'My Dashboard',
  agentName: 'Marcus Johnson',
  date: new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
  summary: {
    totalTickets: 6,
    critical: 1,
    high: 2,
    medium: 2,
    low: 1,
    dueSoon: 3,
    needsResponse: 4,
  },
  priorities: [
    {
      type: 'SLA Breach Risk',
      severity: 'high',
      message: '2 tickets approaching SLA deadline in the next hour',
      tickets: ['#2901', '#2890'],
    },
    {
      type: 'Critical Customer',
      severity: 'high',
      message: 'Acme Corporation (critical risk) has 1 unresolved ticket',
      tickets: ['#2901'],
    },
    {
      type: 'Customer Waiting',
      severity: 'medium',
      message: '3 customers waiting for your response for >2 hours',
      tickets: ['#2894', '#2890', '#2874'],
    },
  ],
  aiSuggestions: [
    {
      type: 'Prioritization',
      message:
        'Focus on ticket #2901 first - it has both SLA risk and critical customer priority.',
    },
    {
      type: 'Knowledge Base',
      message:
        'Ticket #2890 (API rate limiting) has 3 related KB articles that may help with resolution.',
    },
    {
      type: 'Efficiency',
      message:
        'Consider using response templates for tickets #2894 and #2874 to save time.',
    },
  ],
  upcomingMeetings: [
    {
      time: '2:00 PM',
      title: 'Call with Acme Corp - Escalation Review',
      duration: '30 min',
      attendees: ['Sarah Chen (CSM)', 'Emily Rodriguez (Manager)'],
    },
    {
      time: '4:30 PM',
      title: 'Team Standup',
      duration: '15 min',
      attendees: ['All Support Agents', 'Emily Rodriguez (Manager)'],
    },
  ],
  performanceSnapshot: {
    ticketsResolvedToday: 3,
    ticketsResolvedThisWeek: 18,
    avgResponseTime: '18 minutes',
    customerSatisfaction: 4.6,
    slaCompliance: 95,
  },
};

// C-Level + CS Manager: Meeting Scheduler Widget Data
export const meetingSchedulerDemo: MeetingSchedulerData = {
  title: 'Schedule Executive Call',
  duration: '30 minutes',
  type: 'Executive Escalation Call',
  availableSlots: [
    {
      date: 'Today',
      time: '2:00 PM - 2:30 PM',
      timezone: 'PST',
      status: 'preferred',
      note: 'All attendees available',
    },
    {
      date: 'Today',
      time: '3:30 PM - 4:00 PM',
      timezone: 'PST',
      status: 'available',
      conflicts: ['CTO has another meeting at 3:45 PM'],
      note: 'Partially overlapping with another commitment',
    },
    {
      date: 'Tomorrow',
      time: '10:00 AM - 10:30 AM',
      timezone: 'PST',
      status: 'available',
      note: 'All attendees available',
    },
    {
      date: 'Tomorrow',
      time: '2:00 PM - 2:30 PM',
      timezone: 'PST',
      status: 'available',
      note: 'All attendees available',
    },
    {
      date: 'Tomorrow',
      time: '4:00 PM - 4:30 PM',
      timezone: 'PST',
      status: 'unavailable',
      conflicts: ['CEO has board meeting', 'CTO traveling'],
      note: 'Multiple conflicts',
    },
  ],
  attendees: [
    {
      name: 'Sarah Chen (CSM)',
      status: 'organizer',
      required: true,
    },
    {
      name: 'Emily Rodriguez (CS Manager)',
      status: 'available',
      required: true,
    },
    {
      name: 'John Smith (CEO, Acme Corp)',
      status: 'external',
      required: true,
    },
    {
      name: 'Jane Doe (CTO, Acme Corp)',
      status: 'external',
      required: false,
    },
  ],
  agenda: [
    'Review current authentication system issues',
    'Discuss timeline for resolution',
    'Review compensation for service disruption',
    'Next steps and action items',
  ],
  suggestedAgenda: [
    'Open with acknowledgment of impact and apology',
    'Present detailed root cause analysis',
    'Share comprehensive remediation plan with timeline',
    'Discuss preventive measures for future',
    'Address any immediate concerns or questions',
    'Confirm follow-up schedule',
  ],
  coachingTips: [
    'Start with empathy - acknowledge the frustration and business impact',
    'Be transparent about what went wrong and why',
    'Focus on concrete solutions and timelines, not excuses',
    'Come prepared with compensation options',
    'End with clear next steps and accountability',
  ],
};

// Support Agent: Similar Tickets Analysis Widget Data
export const similarTicketsAnalysisDemo: SimilarTicketsAnalysisData = {
  title: 'Your Resolution Patterns - Integrations',
  category: 'Integration Issues',
  ticketsAnalyzed: 47,
  avgResolutionTime: '22 minutes',
  successRate: '96%',
  commonPatterns: [
    {
      pattern: 'Authentication/Token Issues',
      frequency: 32,
      percentage: 68,
      avgResolutionTime: '12 minutes',
      typicalSolution: 'Token refresh or re-authentication',
      examples: ['#4524', '#4401', '#4378', '#4312'],
    },
    {
      pattern: 'Permissions/Scope Issues',
      frequency: 8,
      percentage: 17,
      avgResolutionTime: '35 minutes',
      typicalSolution: 'Update OAuth scopes or admin permissions',
      examples: ['#4445', '#4389', '#4234'],
    },
    {
      pattern: 'API Rate Limiting',
      frequency: 5,
      percentage: 11,
      avgResolutionTime: '45 minutes',
      typicalSolution: 'Adjust sync frequency or implement batching',
      examples: ['#4421', '#4356'],
    },
    {
      pattern: 'Configuration Errors',
      frequency: 2,
      percentage: 4,
      avgResolutionTime: '28 minutes',
      typicalSolution: 'Correct field mappings or webhook URLs',
      examples: ['#4467', '#4298'],
    },
  ],
  yourStrengths: [
    'Fastest at diagnosing token expiration issues (avg 3 min)',
    'Clear step-by-step instructions reduce back-and-forth',
    'Proactive KB article sharing increases first-contact resolution',
  ],
  improvementOpportunities: [
    'API rate limiting tickets take 2x longer than team average',
    'Consider creating custom troubleshooting script for complex permission issues',
  ],
  bestPractices: [
    {
      practice: 'Identify error message pattern first',
      impact: 'Reduces diagnostic time by 60%',
    },
    {
      practice: 'Include KB article with screenshots',
      impact: 'Increases self-service resolution by 40%',
    },
    {
      practice: 'Offer to verify after customer action',
      impact: 'Higher customer satisfaction scores',
    },
  ],
};

// Support Agent: Agent Performance Stats Widget Data
export const agentPerformanceStatsDemo: AgentPerformanceStatsData = {
  title: 'Your Performance - This Week',
  period: 'Jan 9-15, 2024',
  agentName: 'Marcus Johnson',
  keyMetrics: {
    ticketsResolved: {
      value: 28,
      trend: '+3',
      comparison: 'Team avg: 19',
      percentile: '95th',
    },
    avgResolutionTime: {
      value: '3.2 hours',
      trend: '-0.4 hours',
      comparison: 'Team avg: 4.2 hours',
      percentile: '88th',
    },
    firstResponseTime: {
      value: '0.8 hours',
      trend: '-0.1 hours',
      comparison: 'Team avg: 1.5 hours',
      percentile: '98th',
    },
    slaCompliance: {
      value: '95%',
      trend: '+2%',
      comparison: 'Team avg: 87%',
      percentile: '92nd',
    },
    customerSatisfaction: {
      value: '4.8 / 5.0',
      trend: '+0.1',
      comparison: 'Team avg: 4.4',
      percentile: '96th',
    },
  },
  trendChart: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Tickets Resolved',
        data: [6, 5, 7, 6, 4],
      },
      {
        label: 'Avg Resolution Time (hours)',
        data: [3.5, 3.2, 2.8, 3.4, 3.1],
      },
    ],
  },
  categoryBreakdown: [
    {
      category: 'Technical Issues',
      count: 12,
      percentage: 43,
      avgTime: '4.2 hours',
    },
    {
      category: 'Account/Billing',
      count: 8,
      percentage: 29,
      avgTime: '2.1 hours',
    },
    {
      category: 'Integration',
      count: 5,
      percentage: 18,
      avgTime: '2.8 hours',
    },
    {
      category: 'How-to Questions',
      count: 3,
      percentage: 10,
      avgTime: '1.2 hours',
    },
  ],
  achievements: [
    {
      badge: '⭐ Top Performer',
      description: 'Highest CSAT score on team',
      dateEarned: '2024-01-15',
    },
    {
      badge: '⚡ Speed Demon',
      description: 'Fastest average response time',
      dateEarned: '2024-01-15',
    },
    {
      badge: '🎯 SLA Champion',
      description: '95%+ SLA compliance for 4 consecutive weeks',
      dateEarned: '2024-01-15',
    },
  ],
  feedback: [
    {
      date: 'Jan 14, 2024',
      customer: 'CloudFirst Systems',
      rating: 5,
      comment: 'Marcus was incredibly helpful and resolved my issue quickly!',
    },
    {
      date: 'Jan 13, 2024',
      customer: 'Retail Innovations LLC',
      rating: 5,
      comment: 'Great communication and technical expertise.',
    },
    {
      date: 'Jan 12, 2024',
      customer: 'MedTech Solutions',
      rating: 4,
      comment: 'Issue resolved, though it took a bit longer than expected.',
    },
  ],
};

// Support Agent: Knowledge Base Search Widget Data
export const knowledgeBaseSearchDemo: KnowledgeBaseSearchData = {
  query: 'SSO authentication issues troubleshooting',
  resultsCount: 8,
  topResults: [
    {
      id: 'KB-892',
      title: 'Troubleshooting SSO Authentication Failures',
      category: 'Authentication',
      relevance: 98,
      excerpt:
        'Complete guide to diagnosing and resolving SSO authentication issues including SAML, OAuth, and Okta integrations...',
      views: 1243,
      lastUpdated: '2024-01-10',
      rating: 4.7,
      tags: ['sso', 'authentication', 'troubleshooting', 'saml', 'okta'],
    },
    {
      id: 'KB-845',
      title: 'Common SSO Error Messages and Solutions',
      category: 'Authentication',
      relevance: 95,
      excerpt: 'Reference guide for interpreting SSO error messages and applying quick fixes...',
      views: 892,
      lastUpdated: '2024-01-05',
      rating: 4.8,
      tags: ['sso', 'errors', 'quick-reference'],
    },
    {
      id: 'KB-734',
      title: 'Okta SSO Integration Setup and Troubleshooting',
      category: 'Integrations',
      relevance: 89,
      excerpt: 'Step-by-step guide for configuring and troubleshooting Okta SSO integration...',
      views: 1567,
      lastUpdated: '2023-12-20',
      rating: 4.6,
      tags: ['okta', 'sso', 'integration', 'setup'],
    },
    {
      id: 'KB-621',
      title: 'Enterprise SSO Best Practices',
      category: 'Authentication',
      relevance: 82,
      excerpt: 'Best practices for implementing and maintaining enterprise SSO solutions...',
      views: 445,
      lastUpdated: '2023-11-15',
      rating: 4.5,
      tags: ['sso', 'enterprise', 'best-practices'],
    },
  ],
  relatedSearches: [
    'SAML authentication troubleshooting',
    'OAuth 2.0 error codes',
    'SSO token expiration',
    'Multi-tenant SSO configuration',
  ],
  aiSuggestion:
    'Based on your current ticket (#4521), I recommend starting with KB-892 which covers Okta-specific troubleshooting. The section on "Invalid Credentials with Correct Password" is particularly relevant.',
};

// Support Agent: Knowledge Article Widget Data
export const knowledgeArticleDemo: KnowledgeArticleData = {
  id: 'KB-892',
  title: 'Troubleshooting SSO Authentication Failures',
  category: 'Authentication',
  lastUpdated: '2024-01-10',
  author: 'Engineering Team',
  views: 1243,
  rating: 4.7,
  tags: ['sso', 'authentication', 'troubleshooting', 'saml', 'okta'],
  sections: [
    {
      heading: 'Overview',
      content:
        'This guide covers systematic troubleshooting for SSO authentication failures across SAML, OAuth, and Okta integrations.',
      type: 'text',
    },
    {
      heading: 'Common Causes',
      content: '',
      type: 'list',
      items: [
        'Token Expiration - Refresh tokens expire after 90 days',
        'Configuration Changes - IDP settings modified without updating our platform',
        'Certificate Expiration - SAML certificates expired',
        'Network Issues - Firewall blocking SSO endpoints',
        'User Permissions - User role changed in IDP',
        'Multi-tenant Issues - Incorrect tenant ID in configuration',
      ],
    },
    {
      heading: 'Diagnostic Steps',
      content:
        'Follow these steps systematically to identify and resolve SSO authentication issues:\n\n1. Identify the exact error pattern from the error message\n2. Verify basic configuration (Entity ID, Callback URLs)\n3. Check token or certificate status\n4. Test with different user accounts to isolate the issue',
      type: 'text',
    },
    {
      heading: 'OAuth Token Refresh Example',
      content: '',
      type: 'code',
      code: {
        language: 'bash',
        snippet: `# Navigate to integration settings
curl -X POST https://api.example.com/oauth/refresh \\
  -H "Authorization: Bearer OLD_TOKEN" \\
  -d "grant_type=refresh_token" \\
  -d "refresh_token=YOUR_REFRESH_TOKEN"`,
      },
    },
    {
      heading: 'Important Warning',
      content:
        'Always verify you are working with the correct tenant configuration before making changes. Modifying the wrong tenant can cause authentication failures for all users in that organization.',
      type: 'warning',
    },
    {
      heading: 'Pro Tip',
      content:
        'Set up alerts 30 days before token/certificate expiration to proactively prevent authentication failures. This gives you time to coordinate with customers for renewal.',
      type: 'tip',
    },
  ],
  relatedArticles: [
    {
      id: 'KB-845',
      title: 'Common SSO Error Messages and Solutions',
      relevance: 95,
    },
    {
      id: 'KB-734',
      title: 'Okta SSO Integration Setup',
      relevance: 89,
    },
    {
      id: 'KB-621',
      title: 'Enterprise SSO Best Practices',
      relevance: 82,
    },
  ],
  helpfulCount: 87,
  notHelpfulCount: 13,
};

// CS Manager: Message Composer Widget Data
export const messageComposerDemo: MessageComposerData = {
  title: 'Compose Message to Customer',
  recipient: {
    name: 'John Smith',
    role: 'CEO',
    company: 'Acme Corporation',
    email: 'john.smith@acmecorp.com',
  },
  context: {
    reason: 'Escalation follow-up after service disruption',
    relatedTickets: ['#2847', '#2849', '#2851'],
    customerHealth: 'Critical - High risk of churn',
    lastContact: '2 days ago',
  },
  suggestedTone: 'empathetic',
  aiDraftedMessage: {
    subject: 'Our Commitment to Resolving Your Authentication Issues',
    body: `Dear John,

I wanted to reach out personally regarding the authentication issues you've been experiencing over the past week. I understand the significant impact this has had on your team's productivity, and I sincerely apologize for the disruption.

I want to assure you that we've identified the root cause and have implemented immediate fixes:

• Authentication service has been stabilized with 99.9% uptime over the last 48 hours
• We've added additional monitoring to catch any issues before they impact users
• Our engineering team is implementing long-term infrastructure improvements

To make things right, we'd like to offer:
• One month of service credit (approximately $12,500)
• Dedicated technical account manager for the next 90 days
• Priority support queue access for your entire team

I'd appreciate the opportunity to discuss this with you directly. Would you be available for a call tomorrow or Friday? I have slots at 10 AM or 2 PM PST.

Thank you for your patience and partnership. We're committed to earning back your trust.

Best regards,
Sarah Chen
Customer Success Manager`,
  },
  talkingPoints: [
    'Acknowledge the impact and apologize sincerely',
    'Provide specific details on resolution and prevention',
    'Offer meaningful compensation and support',
    'Request meeting to discuss in person',
    'Express commitment to the partnership',
  ],
  templateOptions: [
    {
      name: 'Formal Executive Apology',
      description: 'More formal tone with emphasis on accountability',
      preview: 'Dear Mr. Smith, I am writing to formally apologize for the service disruption...',
    },
    {
      name: 'Solution-Focused Update',
      description: 'Emphasizes technical resolution and prevention',
      preview: 'Hi John, I wanted to update you on the resolution of the authentication issues...',
    },
  ],
  schedulingSuggestion: {
    preferredTimes: ['Tomorrow 10 AM PST', 'Tomorrow 2 PM PST', 'Friday 10 AM PST'],
    meetingDuration: '30 minutes',
  },
};

// Helper function to get demo data for each widget type
export function getWidgetDemoData(widgetType: string): any {
  const dataMap: Record<string, any> = {
    'executive-summary': executiveSummaryDemo,
    'analytics-dashboard': analyticsDashboardDemo,
    'performance-trends': performanceTrendsDemo,
    'sentiment-analysis': sentimentAnalysisDemo,
    'customer-risk-profile': customerRiskProfileDemo,
    'customer-risk-list': customerRiskListDemo,
    'ticket-detail': ticketDetailDemo,
    'ticket-list': ticketListDemo,
    'similar-tickets-analysis': similarTicketsAnalysisDemo,
    'sla-performance-chart': slaPerformanceChartDemo,
    'agent-performance-stats': agentPerformanceStatsDemo,
    'agent-performance-comparison': agentPerformanceComparisonDemo,
    'agent-dashboard': agentDashboardDemo,
    'team-workload-dashboard': teamWorkloadDashboardDemo,
    'call-prep-notes': callPrepNotesDemo,
    'response-composer': responseComposerDemo,
    'message-composer': messageComposerDemo,
    'meeting-scheduler': meetingSchedulerDemo,
    'knowledge-base-search': knowledgeBaseSearchDemo,
    'knowledge-article': knowledgeArticleDemo,
    'escalation-path': ticketListDemo, // Reuse ticket list for now
    'meeting-confirmation': meetingSchedulerDemo, // Reuse meeting scheduler for now
  };

  return dataMap[widgetType] || {};
}
