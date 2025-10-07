'use client';

import { ClickableWidgetCard } from './ClickableWidgetCard';
import { WidgetRenderer } from '@/components/widgets/WidgetRenderer';
import { DashboardWidget } from '@/config/dashboard-widgets';
import { getWidgetDemoData } from '@/data/demo-widget-data';

interface DashboardWidgetGridProps {
  widgets: DashboardWidget[];
}

export function DashboardWidgetGrid({ widgets }: DashboardWidgetGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {widgets.map((widget) => (
        <ClickableWidgetCard key={widget.id} widget={widget}>
          <WidgetRenderer type={widget.type} data={getWidgetDemoData(widget.type)} />
        </ClickableWidgetCard>
      ))}
    </div>
  );
}
