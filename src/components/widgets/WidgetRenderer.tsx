import type { WidgetType, WidgetData } from '@/types/widget';
import { ExecutiveSummaryWidget } from './ExecutiveSummaryWidget';
import { AnalyticsDashboardWidget } from './AnalyticsDashboardWidget';
import { PerformanceTrendsWidget } from './PerformanceTrendsWidget';
import { SentimentAnalysisWidget } from './SentimentAnalysisWidget';
import { CustomerRiskProfileWidget } from './CustomerRiskProfileWidget';
import { TicketListWidget } from './TicketListWidget';
import { AgentDashboardWidget } from './AgentDashboardWidget';
import { TeamWorkloadDashboardWidget } from './TeamWorkloadDashboardWidget';
import { MeetingSchedulerWidget } from './MeetingSchedulerWidget';
import { MeetingConfirmationWidget } from './MeetingConfirmationWidget';
import { CustomerRiskListWidget } from './CustomerRiskListWidget';
import { TicketDetailWidget } from './TicketDetailWidget';
import { SLAPerformanceChartWidget } from './SLAPerformanceChartWidget';
import { AgentPerformanceComparisonWidget } from './AgentPerformanceComparisonWidget';
import { CallPrepNotesWidget } from './CallPrepNotesWidget';
import { ResponseComposerWidget } from './ResponseComposerWidget';
import { SimilarTicketsAnalysisWidget } from './SimilarTicketsAnalysisWidget';
import { AgentPerformanceStatsWidget } from './AgentPerformanceStatsWidget';
import { KnowledgeBaseSearchWidget } from './KnowledgeBaseSearchWidget';
import { KnowledgeArticleWidget } from './KnowledgeArticleWidget';
import { MessageComposerWidget } from './MessageComposerWidget';

interface WidgetRendererProps {
  type: WidgetType;
  data: WidgetData;
  onAction?: (action: string) => void;
}

export function WidgetRenderer({ type, data, onAction }: WidgetRendererProps) {
  // Render widget component based on type
  const renderWidget = () => {
    switch (type) {
      case 'executive-summary':
        return <ExecutiveSummaryWidget data={data as any} />;

      case 'analytics-dashboard':
        return <AnalyticsDashboardWidget data={data as any} />;

      case 'performance-trends':
        return <PerformanceTrendsWidget data={data as any} />;

      case 'sentiment-analysis':
        return <SentimentAnalysisWidget data={data as any} />;

      case 'customer-risk-profile':
        return <CustomerRiskProfileWidget data={data as any} />;

      case 'ticket-list':
        return <TicketListWidget data={data as any} />;

      case 'agent-dashboard':
        return <AgentDashboardWidget data={data as any} />;

      case 'team-workload-dashboard':
        return <TeamWorkloadDashboardWidget data={data as any} />;

      case 'meeting-scheduler':
        return <MeetingSchedulerWidget data={data as any} />;

      case 'meeting-confirmation':
        return <MeetingConfirmationWidget data={data as any} />;

      case 'customer-risk-list':
        return <CustomerRiskListWidget data={data as any} />;

      case 'ticket-detail':
        return <TicketDetailWidget data={data as any} />;

      case 'sla-performance-chart':
        return <SLAPerformanceChartWidget data={data as any} />;

      case 'agent-performance-comparison':
        return <AgentPerformanceComparisonWidget data={data as any} />;

      case 'call-prep-notes':
        return <CallPrepNotesWidget data={data as any} />;

      case 'response-composer':
        return <ResponseComposerWidget data={data as any} onAction={onAction} />;

      case 'similar-tickets-analysis':
        return <SimilarTicketsAnalysisWidget data={data as any} />;

      case 'agent-performance-stats':
        return <AgentPerformanceStatsWidget data={data as any} />;

      case 'knowledge-base-search':
        return <KnowledgeBaseSearchWidget data={data as any} />;

      case 'knowledge-article':
        return <KnowledgeArticleWidget data={data as any} />;

      case 'message-composer':
        return <MessageComposerWidget data={data as any} onAction={onAction} />;

      default:
        // Fallback for unimplemented widgets
        return (
          <div className="my-4 rounded-lg border border-chart-4/30 bg-chart-4/5 p-4">
            <p className="text-sm text-muted-foreground">
              Widget type <span className="font-mono font-semibold text-foreground">{type}</span> is not yet implemented.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              This widget is coming soon. For now, check the data in the browser console.
            </p>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-3">
                <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
                  View raw data (development only)
                </summary>
                <pre className="mt-2 text-xs bg-muted/50 p-2 rounded overflow-x-auto">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </details>
            )}
          </div>
        );
    }
  };

  // Wrap widget in container with data-widget-type for E2E testing
  return (
    <div data-widget-type={type}>
      {renderWidget()}
    </div>
  );
}
