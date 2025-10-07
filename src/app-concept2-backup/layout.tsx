'use client';

import { QuickActionProvider } from '@/contexts/QuickActionContext';
import { SidebarProvider } from '@/contexts/SidebarContext';
import { useState, useEffect } from 'react';

export default function Concept2Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('concept2-sidebarOpen');
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem('concept2-sidebarOpen', JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  // Keyboard shortcut: Cmd/Ctrl + B to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setSidebarOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <QuickActionProvider>
      <SidebarProvider
        value={{ sidebarOpen, toggleSidebar: () => setSidebarOpen(!sidebarOpen) }}
      >
        {children}
      </SidebarProvider>
    </QuickActionProvider>
  );
}
