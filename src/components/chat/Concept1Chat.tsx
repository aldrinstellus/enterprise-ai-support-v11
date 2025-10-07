'use client';

import { useState, useEffect } from 'react';
import { InteractiveChat } from './InteractiveChat';
import { WidgetTray } from '../concepts/WidgetTray';
import { usePersona } from '@/hooks/use-persona';
import { getDashboardWidgets } from '@/config/dashboard-widgets';

export function Concept1Chat() {
  const { currentPersona } = usePersona();
  const [showWidgetTray, setShowWidgetTray] = useState(true);
  const [widgetQuery, setWidgetQuery] = useState('');

  const widgets = getDashboardWidgets(currentPersona.id);

  const handleWidgetClick = (query: string) => {
    setWidgetQuery(query);
    setShowWidgetTray(false);

    // Trigger the query in InteractiveChat via URL parameter
    const url = new URL(window.location.href);
    url.searchParams.set('query', query);
    window.history.pushState({}, '', url);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // Show tray on empty state or when user hasn't interacted yet
  useEffect(() => {
    // Hide tray after first interaction
    if (widgetQuery) {
      setShowWidgetTray(false);
    }
  }, [widgetQuery]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-hidden">
        <InteractiveChat />
      </div>

      {/* Widget Tray - appears above input */}
      <WidgetTray
        widgets={widgets}
        isVisible={showWidgetTray}
        onClose={() => setShowWidgetTray(false)}
        onWidgetClick={handleWidgetClick}
      />
    </div>
  );
}
