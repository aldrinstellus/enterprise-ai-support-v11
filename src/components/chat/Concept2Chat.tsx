'use client';

import { useState } from 'react';
import { WorkspaceSidebar } from '../concepts/WorkspaceSidebar';
import { InteractiveChat } from './InteractiveChat';
import { useSidebar } from '@/contexts/SidebarContext';

export function Concept2Chat() {
  const { sidebarOpen, toggleSidebar } = useSidebar();

  const handleWidgetClick = (query: string) => {
    // Trigger the query in InteractiveChat via URL parameter
    const url = new URL(window.location.href);
    url.searchParams.set('query', query);
    window.history.pushState({}, '', url);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleNewConversation = () => {
    window.location.reload();
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all data?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Enhanced Workspace Sidebar */}
      <WorkspaceSidebar
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        onNewConversation={handleNewConversation}
        onResetData={handleResetData}
        onWidgetClick={handleWidgetClick}
      />

      {/* Chat Area */}
      <div className="flex-1">
        <InteractiveChat />
      </div>
    </div>
  );
}
