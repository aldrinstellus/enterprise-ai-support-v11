'use client';

import { QuickActionProvider } from '@/contexts/QuickActionContext';
import { SidebarProvider } from '@/contexts/SidebarContext';

export default function Concept3Layout({ children }: { children: React.ReactNode }) {
  return (
    <QuickActionProvider>
      <SidebarProvider value={{ sidebarOpen: false, toggleSidebar: () => {} }}>
        {children}
      </SidebarProvider>
    </QuickActionProvider>
  );
}
