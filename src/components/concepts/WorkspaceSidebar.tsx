'use client';

import { useState } from 'react';
import { User, Plus, ChevronDown, Check, Pin, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Avatar } from '@/components/ui/Avatar';
import { usePersona } from '@/hooks/use-persona';
import { getDashboardWidgets } from '@/config/dashboard-widgets';
import { WidgetRenderer } from '@/components/widgets/WidgetRenderer';
import { getWidgetDemoData } from '@/data/demo-widget-data';

interface WorkspaceSidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
  onNewConversation?: () => void;
  onResetData?: () => void;
  onWidgetClick: (query: string) => void;
}

export function WorkspaceSidebar({
  isOpen = true,
  onToggle,
  onNewConversation,
  onResetData,
  onWidgetClick,
}: WorkspaceSidebarProps) {
  const { currentPersona, setPersona, availablePersonas } = usePersona();
  const [personaSelectorOpen, setPersonaSelectorOpen] = useState(false);
  const [expandedWidget, setExpandedWidget] = useState<string | null>(null);
  const [pinnedWidgets, setPinnedWidgets] = useState<Set<string>>(new Set());

  const widgets = getDashboardWidgets(currentPersona.id);

  const toggleWidgetExpand = (widgetId: string) => {
    setExpandedWidget(expandedWidget === widgetId ? null : widgetId);
  };

  const togglePin = (widgetId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newPinned = new Set(pinnedWidgets);
    if (newPinned.has(widgetId)) {
      newPinned.delete(widgetId);
    } else {
      newPinned.add(widgetId);
    }
    setPinnedWidgets(newPinned);
  };

  const sortedWidgets = [...widgets].sort((a, b) => {
    const aIsPinned = pinnedWidgets.has(a.id);
    const bIsPinned = pinnedWidgets.has(b.id);
    if (aIsPinned && !bIsPinned) return -1;
    if (!aIsPinned && bIsPinned) return 1;
    return 0;
  });

  return (
    <aside
      className={`h-screen bg-card border-r border-border transition-all duration-300 ${
        isOpen ? 'w-[350px]' : 'w-0'
      }`}
    >
      <div
        className={`flex h-full flex-col ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } transition-opacity duration-200`}
      >
        {/* New Conversation Button */}
        <div className="p-4 border-b border-border">
          <button
            onClick={onNewConversation}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium text-foreground transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Conversation
          </button>
        </div>

        {/* Widget Workspace */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Workspace
            </h3>
            <span className="text-xs text-muted-foreground">
              {widgets.length} widgets
            </span>
          </div>

          <div className="space-y-2">
            {sortedWidgets.map((widget) => {
              const isExpanded = expandedWidget === widget.id;
              const isPinned = pinnedWidgets.has(widget.id);

              return (
                <div key={widget.id} className="space-y-1">
                  <button
                    onClick={() => toggleWidgetExpand(widget.id)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <ChevronRight
                        className={`w-3 h-3 text-muted-foreground transition-transform ${
                          isExpanded ? 'rotate-90' : ''
                        }`}
                      />
                      <span className="text-sm text-foreground truncate">
                        {widget.title}
                      </span>
                    </div>
                    <button
                      onClick={(e) => togglePin(widget.id, e)}
                      className={`p-1 rounded hover:bg-background transition-colors ${
                        isPinned ? 'text-primary' : 'text-muted-foreground opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <Pin className="w-3 h-3" fill={isPinned ? 'currentColor' : 'none'} />
                    </button>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div
                          onClick={() => onWidgetClick(widget.query)}
                          className="ml-5 cursor-pointer rounded-lg border border-border bg-background/50 p-3 hover:border-primary/30 transition-colors"
                        >
                          <p className="text-xs text-muted-foreground mb-2">
                            {widget.description}
                          </p>
                          <div className="text-xs text-primary hover:underline">
                            Click to explore →
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reset Data */}
        <div className="px-4 py-3 border-t border-border">
          <button
            onClick={onResetData}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reset All Data
          </button>
        </div>

        {/* User Profile with Persona Selector */}
        <div className="border-t border-border p-4">
          <div className="relative space-y-3">
            {/* Persona Badge */}
            <div className="w-full">
              <div className={`w-full flex items-center justify-center gap-2 rounded-lg ${currentPersona.theme.badgeSolid} px-3 py-1.5 shadow-sm`}>
                {(() => {
                  const BadgeIcon = currentPersona.badge.icon;
                  return <BadgeIcon className="h-3.5 w-3.5 text-white" />;
                })()}
                <span className="text-xs font-bold uppercase tracking-wider text-white">{currentPersona.badge.label}</span>
              </div>
            </div>

            {/* Profile Button */}
            <button
              onClick={() => setPersonaSelectorOpen(!personaSelectorOpen)}
              className="w-full relative overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm backdrop-blur-sm transition-all duration-200 hover:shadow-md hover:border-primary/30"
            >
              <div className="flex flex-col items-center gap-2">
                <Avatar name={currentPersona.name} size={48} />
                <div className="w-full text-center">
                  <p className="font-semibold text-foreground truncate">{currentPersona.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{currentPersona.email}</p>
                  <p className="text-[10px] text-muted-foreground/70 truncate">{currentPersona.role}</p>
                </div>
                <div className="absolute top-2 right-2">
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${personaSelectorOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </button>

            {/* Persona Selector Dropdown */}
            <AnimatePresence>
              {personaSelectorOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute bottom-full left-0 right-0 mb-2 overflow-hidden rounded-lg border border-border bg-card shadow-xl"
                >
                  {availablePersonas.map((persona) => {
                    const BadgeIcon = persona.badge.icon;
                    const isActive = persona.id === currentPersona.id;
                    return (
                      <button
                        key={persona.id}
                        onClick={() => {
                          setPersona(persona.id);
                          setPersonaSelectorOpen(false);
                        }}
                        className={`w-full p-3 relative transition-colors ${
                          isActive ? 'bg-primary/10' : 'hover:bg-muted'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Avatar name={persona.name} size={40} />
                          <div className="w-full text-center">
                            <div className="flex items-center justify-center gap-2">
                              <p className="text-sm font-medium truncate">{persona.name}</p>
                              <div className={`flex items-center gap-1 rounded-md ${persona.theme.badgeSolid} px-1.5 py-0.5`}>
                                <BadgeIcon className="h-2.5 w-2.5 text-white" />
                                <span className="text-[9px] font-bold uppercase text-white">{persona.badge.label}</span>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground truncate">{persona.role}</p>
                          </div>
                          {isActive && (
                            <div className="absolute top-2 right-2">
                              <Check className="h-4 w-4 text-primary flex-shrink-0" />
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </aside>
  );
}
