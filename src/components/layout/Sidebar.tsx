'use client';

import { useState } from 'react';
import { User, Plus, TrendingUp, AlertTriangle, BarChart3, Target, Users, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar } from '@/components/ui/Avatar';
import { usePersona } from '@/hooks/use-persona';
import { useConversation } from '@/contexts/ConversationContext';

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
  onQuickAction?: (query: string) => void;
  onNewConversation?: () => void;
  onResetData?: () => void;
}

export function Sidebar({
  isOpen = true,
  onToggle,
  onQuickAction,
  onNewConversation,
  onResetData,
}: SidebarProps) {
  const pathname = usePathname();
  const { currentPersona, setPersona, availablePersonas } = usePersona();
  const { messagesByPersona } = useConversation();
  const [personaSelectorOpen, setPersonaSelectorOpen] = useState(false);

  // Get current persona's message count
  const currentMessages = messagesByPersona[currentPersona.id] || [];
  const messageCount = currentMessages.length;

  // Get first user message as preview (if exists)
  const firstUserMessage = currentMessages.find(msg => msg.type === 'user');
  const conversationPreview = firstUserMessage?.content?.substring(0, 50) || null;

  const quickActions = [
    {
      id: 'sla',
      icon: Target,
      label: 'SLA Performance',
      value: '92%',
      query: 'Show me SLA performance breakdown',
    },
    {
      id: 'churn',
      icon: AlertTriangle,
      label: 'Churn Risk',
      badge: '5',
      badgeColor: 'bg-destructive text-destructive-foreground',
      query: 'Show me customer churn risk analysis',
    },
    {
      id: 'executive',
      icon: BarChart3,
      label: 'Executive Summary',
      badge: '94',
      badgeColor: 'bg-primary text-primary-foreground',
      query: 'Give me the executive summary',
    },
    {
      id: 'board',
      icon: TrendingUp,
      label: 'Board Metrics',
      badge: 'Ready',
      badgeColor: 'bg-chart-2 text-white',
      query: 'Show me board-level metrics',
    },
    {
      id: 'accounts',
      icon: Users,
      label: 'High-Value Accounts',
      badge: '18',
      badgeColor: 'bg-chart-2 text-white',
      query: 'Show me high-value account status',
    },
  ];

  return (
    <aside
      className={`h-screen bg-card border-r border-border transition-all duration-300 ${
        isOpen ? 'w-[300px]' : 'w-0'
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

      {/* Recent Conversations */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Recent Conversations
        </div>
        {messageCount === 0 ? (
          <div className="text-xs text-muted-foreground/60 py-4 text-center">
            No conversations yet
          </div>
        ) : (
          <div className="space-y-2">
            <div className="rounded-lg border border-border/50 bg-background/50 p-3">
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="text-xs font-medium text-foreground">Current Session</span>
                <span className="text-xs text-muted-foreground">{messageCount} msgs</span>
              </div>
              {conversationPreview && (
                <p className="text-xs text-muted-foreground/80 truncate">
                  {conversationPreview}{conversationPreview.length >= 50 ? '...' : ''}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
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
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          Quick Actions
        </div>
        <div className="space-y-1">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => onQuickAction?.(action.query)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-muted transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                  <span className="text-sm text-foreground">{action.label}</span>
                </div>
                {action.value && (
                  <span className="text-sm font-medium text-foreground">{action.value}</span>
                )}
                {action.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${action.badgeColor}`}
                  >
                    {action.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

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
              {/* Avatar */}
              <Avatar name={currentPersona.name} size={48} />

              {/* User Info */}
              <div className="w-full text-center">
                <p className="font-semibold text-foreground truncate">{currentPersona.name}</p>
                <p className="text-xs text-muted-foreground truncate">{currentPersona.email}</p>
                <p className="text-[10px] text-muted-foreground/70 truncate">{currentPersona.role}</p>
              </div>

              {/* Dropdown Icon */}
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
                        // Navigate to persona's URL
                        window.location.href = `/demo/${persona.id}`;
                      }}
                      className={`w-full p-3 relative transition-colors ${
                        isActive ? 'bg-primary/10' : 'hover:bg-muted'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        {/* Avatar */}
                        <Avatar name={persona.name} size={40} />
                        <div className="w-full text-center">
                          <div className="flex items-center justify-center gap-2">
                            <p className="text-sm font-medium truncate">{persona.name}</p>
                            {/* Badge */}
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
