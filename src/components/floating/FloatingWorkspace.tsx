'use client';

import { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Send, LayoutDashboard, Plus } from 'lucide-react';
import { InteractiveChat, type InteractiveChatRef } from '../chat/InteractiveChat';
import { DraggableWidget } from './DraggableWidget';
import { usePersona } from '@/hooks/use-persona';
import { useSidebar } from '@/contexts/SidebarContext';
import { getDashboardWidgets, DashboardWidget } from '@/config/dashboard-widgets';
import {
  executiveSummaryDemo,
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
import type { WidgetType, WidgetData } from '@/types/widget';

interface FloatingWidget {
  id: string;
  widget: DashboardWidget;
  position: { x: number; y: number };
}

const widgetDataMap: Record<WidgetType, WidgetData> = {
  'executive-summary': executiveSummaryDemo,
  'customer-risk-profile': customerRiskProfileDemo,
  'customer-risk-list': customerRiskListDemo,
  'ticket-detail': ticketDetailDemo,
  'ticket-list': ticketListDemo,
  'sla-performance-chart': slaPerformanceChartDemo,
  'agent-performance-comparison': agentPerformanceComparisonDemo,
  'agent-performance-stats': agentPerformanceStatsDemo,
  'agent-dashboard': agentDashboardDemo,
  'team-workload-dashboard': teamWorkloadDashboardDemo,
  'call-prep-notes': callPrepNotesDemo,
  'response-composer': responseComposerDemo,
  'message-composer': messageComposerDemo,
  'meeting-scheduler': meetingSchedulerDemo,
  'meeting-confirmation': meetingSchedulerDemo,
  'similar-tickets-analysis': similarTicketsAnalysisDemo,
  'knowledge-base-search': knowledgeBaseSearchDemo,
  'knowledge-article': knowledgeArticleDemo,
  'analytics-dashboard': executiveSummaryDemo,
  'escalation-path': ticketListDemo,
};

export function FloatingWorkspace() {
  const { currentPersona } = usePersona();
  const { sidebarOpen } = useSidebar();
  const [floatingWidgets, setFloatingWidgets] = useState<FloatingWidget[]>([]);
  const [focusedWidgetId, setFocusedWidgetId] = useState<string | null>(null);
  const [dockOpen, setDockOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<InteractiveChatRef>(null);
  const widgets = getDashboardWidgets(currentPersona.id);

  const addFloatingWidget = (widget: DashboardWidget) => {
    const id = `widget-${Date.now()}`;
    const newWidget: FloatingWidget = {
      id,
      widget,
      position: {
        x: Math.random() * 200 + 100, // Random position offset
        y: Math.random() * 100 + 50,
      },
    };

    setFloatingWidgets((prev) => [...prev, newWidget]);
    setFocusedWidgetId(id);
    setDockOpen(false);
  };

  const removeFloatingWidget = (id: string) => {
    setFloatingWidgets((prev) => prev.filter((w) => w.id !== id));
    if (focusedWidgetId === id) {
      setFocusedWidgetId(null);
    }
  };

  const handleWidgetFocus = (id: string) => {
    setFocusedWidgetId(id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    chatRef.current?.submitQuery(inputValue);
    setInputValue('');
  };

  // Calculate z-index based on focus
  const getZIndex = (id: string) => {
    return id === focusedWidgetId ? 100 : 50;
  };

  return (
    <div className="relative h-full">
      {/* Chat fullscreen */}
      <style jsx global>{`
        .floating-workspace-chat .border-t.border-border.bg-card {
          display: none;
        }
      `}</style>

      <div className="floating-workspace-chat h-full">
        <InteractiveChat ref={chatRef} persona={currentPersona} />
      </div>

      {/* Floating Input Bar */}
      <div
        className={`fixed bottom-8 ${
          sidebarOpen ? 'left-[calc(50%+150px)]' : 'left-1/2'
        } -translate-x-1/2 w-full max-w-4xl px-6 flex items-center gap-3 z-10 transition-all duration-300`}
      >
        <form onSubmit={handleSubmit} className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What would you like to do?"
            className="w-full pl-6 pr-14 py-4 bg-card/90 backdrop-blur-xl border border-border/50 rounded-full text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-xl transition-all"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Widget Dock */}
      <div className="fixed top-1/2 -translate-y-1/2 right-0 z-20">
        <div className="relative">
          {/* Dock toggle button */}
          <button
            onClick={() => setDockOpen(!dockOpen)}
            className={`
              flex items-center gap-2 px-3 py-3 rounded-l-lg
              bg-card/90 backdrop-blur-xl border border-r-0 border-border shadow-xl
              transition-all duration-300
              ${dockOpen ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}
            `}
          >
            <LayoutDashboard className="w-5 h-5" />
            {!dockOpen && (
              <span className="text-xs font-medium">Widgets</span>
            )}
          </button>

          {/* Dock panel */}
          {dockOpen && (
            <div className="absolute top-0 right-full mr-3 w-64 bg-card border border-border rounded-lg shadow-2xl overflow-hidden">
              <div className="p-3 border-b border-border bg-muted/30">
                <h3 className="text-sm font-semibold text-foreground">Available Widgets</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Click to float on screen
                </p>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-2">
                {widgets.map((widget) => (
                  <button
                    key={widget.id}
                    onClick={() => addFloatingWidget(widget)}
                    className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left group"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Plus className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground">
                        {widget.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {widget.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Widgets */}
      <AnimatePresence>
        {floatingWidgets.map((floatingWidget) => (
          <DraggableWidget
            key={floatingWidget.id}
            widget={floatingWidget.widget}
            widgetData={widgetDataMap[floatingWidget.widget.type]}
            initialPosition={floatingWidget.position}
            onClose={() => removeFloatingWidget(floatingWidget.id)}
            zIndex={getZIndex(floatingWidget.id)}
            onFocus={() => handleWidgetFocus(floatingWidget.id)}
          />
        ))}
      </AnimatePresence>

      {/* Keyboard shortcuts hint */}
      {floatingWidgets.length > 0 && (
        <div className="fixed bottom-4 right-4 z-30 px-3 py-2 bg-card/90 backdrop-blur-xl border border-border rounded-lg shadow-lg">
          <div className="text-xs text-muted-foreground">
            <kbd className="px-1.5 py-0.5 bg-muted rounded">Drag</kbd> header to move •{' '}
            <kbd className="px-1.5 py-0.5 bg-muted rounded">Click</kbd> to focus
          </div>
        </div>
      )}
    </div>
  );
}
