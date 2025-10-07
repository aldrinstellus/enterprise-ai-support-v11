'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus,
  Settings,
  MessageSquare,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  Sparkles,
  Send,
  PanelLeft,
  PanelLeftClose,
  User,
  Shield,
  History,
  Zap,
  Star,
  ChevronDown,
  ChevronRight,
  Trash2,
  Target,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  AlertTriangle,
  Check,
  Copy,
  RotateCw,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  MoreVertical,
  Pin,
  Archive,
  Share2,
  Download,
  Edit2,
  CheckCircle,
  Database,
  Mail,
  GitBranch,
  Headphones,
  Crown,
  AlertOctagon,
  Globe,
  Key,
  ShieldCheck,
  Eye,
  Lock,
  Award,
  FileText,
  Timer,
  BarChart,
  MessageCircle,
  Phone,
  Link2,
  ThumbsUp as ThumbsUpIcon,
  UserPlus,
  UserMinus,
  BarChart3,
  Percent,
  ArrowRight,
  Briefcase,
  DollarSign,
  LineChart,
  PieChart,
  Package,
  Wrench,
  CreditCard,
  UserCheck,
  Scale,
  Heart,
  HardDrive,
  Link,
  FileCheck,
  Webhook,
  ArrowDown,
} from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { usePersona } from '@/hooks/use-persona';
import type { PersonaType } from '@/types/persona';
import type { WidgetType, WidgetData } from '@/types/widget';
import { WidgetRenderer } from '@/components/widgets/WidgetRenderer';
import { WidgetSkeleton } from '@/components/widgets/WidgetSkeleton';
import { detectWidgetQuery, type PersonaId } from '@/lib/query-detection';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  executionResult?: ExecutionResult;
  feedback?: 'like' | 'dislike';
  dashboard?: DashboardData;  // KEEP for backward compatibility with existing quick actions
  dashboardLoading?: boolean;
  codeBlock?: string;
  // NEW: Widget support for Bhanu's assistant-first interface (additive, backward compatible)
  widgetType?: WidgetType;
  widgetData?: WidgetData;
  widgetLoading?: boolean;
}

interface ExecutionResult {
  title: string;
  integrations: string[];
  steps: ExecutionStep[];
}

interface ExecutionStep {
  number: number;
  title: string;
  items: StepItem[];
}

interface StepItem {
  text: string;
  status?: 'success' | 'error' | 'info';
  email?: string;
  metadata?: string;
}

interface DashboardData {
  type: 'system-health' | 'user-activity' | 'performance' | 'alerts' | 'security' | 'config' | 'integrations-status' | 'security-audit' | 'agent-performance' | 'churn-risk' | 'sla-performance' | 'api-limits' | 'my-ticket-queue' | 'agent-personal-performance' | 'customer-interaction' | 'workflow-assistant' | 'team-analytics' | 'team-operations' | 'customer-priority' | 'customer-tickets' | 'customer-health' | 'executive-summary' | 'revenue-impact' | 'customer-satisfaction' | 'retention-metrics' | 'resource-allocation' | 'integration-roi' | 'competitive-analysis' | 'system-compliance' | 'cross-department' | 'webhook-config';
  metrics: MetricCard[];
  alerts?: AlertItem[];
}

interface MetricCard {
  label: string;
  value: string | number;
  status: 'success' | 'warning' | 'error' | 'info';
  icon: string; // Icon name from lucide-react
  change?: string; // e.g., "+12%" or "-3%"
  trend?: 'up' | 'down' | 'stable';
  uptime?: string; // e.g., "99.9%"
  lastSync?: string; // e.g., "2 mins ago"
  timer?: string; // e.g., "2h 15m remaining"
  severity?: 'low' | 'medium' | 'high' | 'critical';
  customerName?: string; // e.g., "TechCorp Solutions"
  ticketId?: string; // e.g., "DESK-1002"
}

interface AlertItem {
  level: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  title: string;
  timestamp: Date;
  messages: Message[];
  personaId: PersonaType;
  personaName: string;
  pinned?: boolean;
  archived?: boolean;
  tags?: string[];
}

export default function Home() {
  // Persona management
  const { currentPersona, setPersona, availablePersonas } = usePersona();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    // Initialize from localStorage to prevent flash
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarOpen');
      return saved !== null ? JSON.parse(saved) : true; // Default to open
    }
    return true;
  });
  const [isStreaming, setIsStreaming] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string>('');
  // Use ref for synchronous access to conversation ID (prevents race conditions)
  const currentConversationIdRef = useRef<string>('');
  const [demoScenariosOpen, setDemoScenariosOpen] = useState(false);
  const [savedQueriesOpen, setSavedQueriesOpen] = useState(false);
  const [savedQueries, setSavedQueries] = useState<string[]>([]);
  const [showArchivedConversations, setShowArchivedConversations] = useState(false);
  const [conversationMenuOpen, setConversationMenuOpen] = useState<string | null>(null);
  const [renamingConversation, setRenamingConversation] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  // Message ID counter for truly unique IDs (prevents collisions)
  const messageIdCounter = useRef<number>(0);

  // Refs for smart auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const latestMessageRef = useRef<HTMLDivElement>(null);

  // Track scroll position for smart auto-scroll
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Check if we have any messages (determines layout mode)
  const hasMessages = messages.length > 0;

  // LocalStorage helper functions
  const getConversationsKey = () => `conversations`; // Global - shared across all personas
  const getSavedQueriesKey = () => `savedQueries-${currentPersona.id}`; // Per-persona saved queries

  // Date grouping helper (Claude-style: Today, Yesterday, Previous 7 Days, etc.)
  const getDateGroup = (date: Date): string => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date(today);
    monthAgo.setDate(monthAgo.getDate() - 30);

    const convDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if (convDate.getTime() === today.getTime()) return 'Today';
    if (convDate.getTime() === yesterday.getTime()) return 'Yesterday';
    if (date >= weekAgo) return 'Previous 7 Days';
    if (date >= monthAgo) return 'Previous 30 Days';
    return 'Older';
  };

  // Load conversations from localStorage and clear current messages when persona changes
  useEffect(() => {
    const key = getConversationsKey();
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Convert timestamp strings back to Date objects
        const conversationsWithDates = parsed.map((conv: Conversation) => ({
          ...conv,
          timestamp: new Date(conv.timestamp),
          messages: conv.messages.map((msg: Message) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        }));
        setConversations(conversationsWithDates);
      } catch (e) {
        console.error('Failed to load conversations:', e);
      }
    } else {
      // Clear conversations if no saved data for this persona
      setConversations([]);
    }

    // Clear current messages when switching personas
    setMessages([]);
    setCurrentConversationId('');
    currentConversationIdRef.current = '';
  }, [currentPersona.id]);

  // Inject persona theme colors as CSS variables for dynamic branding
  useEffect(() => {
    const root = document.documentElement;

    // Inject primary and accent colors (Tailwind v4 uses --color-* variables)
    root.style.setProperty('--color-primary', currentPersona.theme.primary);
    root.style.setProperty('--color-accent', currentPersona.theme.accent);
    root.style.setProperty('--color-ring', currentPersona.theme.primary);

    // Also set base variables for consistency
    root.style.setProperty('--primary', currentPersona.theme.primary);
    root.style.setProperty('--accent', currentPersona.theme.accent);
    root.style.setProperty('--ring', currentPersona.theme.primary);
  }, [currentPersona]);

  // Load saved queries from localStorage
  useEffect(() => {
    const key = getSavedQueriesKey();
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setSavedQueries(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved queries:', e);
        setSavedQueries([]);
      }
    } else {
      setSavedQueries([]);
    }
  }, [currentPersona.id, getSavedQueriesKey]);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    if (conversations.length > 0) {
      const key = getConversationsKey();
      localStorage.setItem(key, JSON.stringify(conversations));
    }
  }, [conversations, currentPersona.id]);

  // Save queries to localStorage whenever they change
  useEffect(() => {
    if (savedQueries.length > 0) {
      const key = getSavedQueriesKey();
      localStorage.setItem(key, JSON.stringify(savedQueries));
    }
  }, [savedQueries, currentPersona.id, getSavedQueriesKey]);

  // Save sidebar state to localStorage
  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  // Detect if user is at bottom of scroll container
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

      // Consider "at bottom" if within 100px
      const atBottom = distanceFromBottom < 100;
      setIsAtBottom(atBottom);

      // Show scroll button if scrolled up more than 200px
      setShowScrollButton(distanceFromBottom > 200);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Smart auto-scroll: scroll to START of latest message for better UX
  useEffect(() => {
    // Don't auto-scroll during streaming to avoid jarring UX
    // Scroll to show the TOP of the latest message (not bottom) so users see response text first
    if (isAtBottom && !isStreaming && latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',      // Position element at TOP of viewport
        inline: 'nearest'
      });
    }
  }, [messages, isAtBottom, isStreaming]);

  // Keyboard shortcut: Cmd/Ctrl + B to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setSidebarOpen((prev: boolean) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Persona toggle state
  const [personaSelectorOpen, setPersonaSelectorOpen] = useState(false);

  // Conversation management functions
  const saveCurrentConversation = () => {
    if (messages.length === 0) return;

    setConversations((prev) => {
      // Use ref for synchronous access to current conversation ID
      const conversationId = currentConversationIdRef.current || Date.now().toString();

      // Find existing conversation to preserve its properties
      const existingConv = prev.find((c) => c.id === conversationId);

      // Generate dynamic title showing multiple user questions
      const userMessages = messages.filter(m => m.type === 'user');
      const title = userMessages.length === 0
        ? 'New conversation'
        : userMessages
            .slice(0, 3) // Show first 3 questions max
            .map(m => m.content.slice(0, 30).trim()) // 30 chars per question
            .join(' • ') + (userMessages.length > 3 ? ' ...' : '');

      const conversation: Conversation = {
        id: conversationId,
        title,
        timestamp: new Date(),
        messages,
        personaId: currentPersona.id,
        personaName: currentPersona.name,
        // Preserve these properties if they exist
        pinned: existingConv?.pinned,
        archived: existingConv?.archived,
        tags: existingConv?.tags,
      };

      const filtered = prev.filter((c) => c.id !== conversation.id);
      return [conversation, ...filtered].slice(0, 20); // Keep max 20 conversations
    });
  };

  const handleNewConversation = () => {
    // Save current conversation if it has messages
    if (messages.length > 0) {
      saveCurrentConversation();
    }

    // Clear messages and create new conversation ID
    setMessages([]);
    const newId = Date.now().toString();
    setCurrentConversationId(newId);
    currentConversationIdRef.current = newId;
  };

  const handleResetApp = () => {
    if (
      confirm(
        'Are you sure you want to reset all data? This will delete all conversations and saved queries for all personas. This action cannot be undone.'
      )
    ) {
      // Clear all localStorage
      localStorage.clear();
      // Reset state
      setMessages([]);
      setConversations([]);
      setSavedQueries([]);
      setCurrentConversationId('');
      currentConversationIdRef.current = '';
      // Reload page to reset persona to default
      location.reload();
    }
  };

  const handleLoadConversation = (conversation: Conversation) => {
    // Save current conversation first if it has messages
    if (messages.length > 0) {
      saveCurrentConversation();
    }

    // Load selected conversation
    setMessages(conversation.messages);
    setCurrentConversationId(conversation.id);
    currentConversationIdRef.current = conversation.id;

    // Switch to the conversation's persona if different
    if (conversation.personaId !== currentPersona.id) {
      setPersona(conversation.personaId);
    }
  };

  const handleDeleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));

    // If deleting current conversation, clear messages
    if (id === currentConversationId) {
      setMessages([]);
      setCurrentConversationId('');
      currentConversationIdRef.current = '';
    }
  };

  const handleSaveQuery = (query: string) => {
    setSavedQueries((prev) => {
      // Avoid duplicates
      if (prev.includes(query)) return prev;
      return [query, ...prev].slice(0, 50); // Keep max 50 queries
    });
  };

  // Conversation action handlers
  const handlePinConversation = (id: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, pinned: !c.pinned } : c))
    );
  };

  const handleArchiveConversation = (id: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, archived: !c.archived } : c))
    );
    setConversationMenuOpen(null);
  };

  const handleRenameConversation = (id: string, newTitle: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title: newTitle } : c))
    );
    setRenamingConversation(null);
    setRenameValue('');
    setConversationMenuOpen(null);
  };

  const handleExportConversation = (id: string, format: 'text' | 'json') => {
    const conversation = conversations.find((c) => c.id === id);
    if (!conversation) return;

    let content: string;
    let filename: string;
    let mimeType: string;

    if (format === 'json') {
      content = JSON.stringify(conversation, null, 2);
      filename = `${conversation.title.replace(/[^a-z0-9]/gi, '_')}.json`;
      mimeType = 'application/json';
    } else {
      // Text format
      content = `${conversation.title}\n${conversation.timestamp.toLocaleString()}\nPersona: ${conversation.personaName}\n\n`;
      conversation.messages.forEach((msg) => {
        content += `[${msg.type === 'user' ? 'You' : 'AI'}] ${msg.content}\n\n`;
      });
      filename = `${conversation.title.replace(/[^a-z0-9]/gi, '_')}.txt`;
      mimeType = 'text/plain';
    }

    // Create download
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);

    setConversationMenuOpen(null);
  };

  const handleCopyConversation = (id: string) => {
    const conversation = conversations.find((c) => c.id === id);
    if (!conversation) return;

    let content = `${conversation.title}\n${conversation.timestamp.toLocaleString()}\nPersona: ${conversation.personaName}\n\n`;
    conversation.messages.forEach((msg) => {
      content += `[${msg.type === 'user' ? 'You' : 'AI'}] ${msg.content}\n\n`;
    });

    navigator.clipboard.writeText(content);
    setConversationMenuOpen(null);
  };

  const handleShareConversation = (id: string) => {
    // Generate shareable link (for now, just copy conversation ID)
    const shareLink = `${window.location.origin}/?conversation=${id}`;
    navigator.clipboard.writeText(shareLink);
    setConversationMenuOpen(null);
  };

  // Message action handlers
  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const handleRegenerateMessage = (query: string) => {
    handleSendMessage(query);
  };

  const handleMessageFeedback = (messageId: string, feedback: 'like' | 'dislike') => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, feedback: msg.feedback === feedback ? undefined : feedback }
          : msg
      )
    );
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setIsAtBottom(true);
    setShowScrollButton(false);
  };

  // Auto-save conversation when messages change
  useEffect(() => {
    if (messages.length > 0) {
      const timeoutId = setTimeout(() => {
        saveCurrentConversation();
      }, 2000); // Debounce save by 2 seconds

      return () => clearTimeout(timeoutId);
    }
  }, [messages, saveCurrentConversation]);

  const handleSendMessage = async (prompt?: string) => {
    const messageText = prompt || input;
    if (!messageText.trim() || isStreaming) return;

    // Initialize conversation ID if this is the first message
    // Use ref for synchronous access to prevent race conditions
    if (!currentConversationIdRef.current) {
      const newId = Date.now().toString();
      setCurrentConversationId(newId);
      currentConversationIdRef.current = newId;
    }

    // Generate truly unique message IDs using counter + timestamp
    // This prevents ID collisions when messages are sent rapidly
    messageIdCounter.current += 1;
    const userId = `user-${Date.now()}-${messageIdCounter.current}`;
    const assistantId = `assistant-${Date.now()}-${messageIdCounter.current}`;

    // Add user message
    const userMessage: Message = {
      id: userId,
      type: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsStreaming(true);

    // Create placeholder for AI response
    const assistantMessage: Message = {
      id: assistantId,
      type: 'assistant',
      content: '',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, assistantMessage]);

    // NEW: Smart widget query detection (Bhanu's assistant-first interface)
    // Detects natural language queries and routes to appropriate widgets based on persona
    const widgetMatch = detectWidgetQuery(messageText, currentPersona.id as PersonaId);

    // Debug logging to track widget detection
    console.log('[Widget Detection]', {
      query: messageText,
      persona: currentPersona.id,
      matched: !!widgetMatch,
      widgetType: widgetMatch?.widgetType,
      assistantId: assistantId,
    });

    if (widgetMatch) {
      // Capture the values in local variables to avoid closure issues
      const matchedWidgetType = widgetMatch.widgetType;
      const matchedWidgetData = widgetMatch.widgetData;
      const matchedResponseText = widgetMatch.responseText;
      const capturedAssistantId = assistantId;

      console.log('[Widget] Captured values for setTimeout:', {
        matchedWidgetType,
        matchedResponseText: matchedResponseText.substring(0, 50) + '...',
        capturedAssistantId,
        timestamp: Date.now(),
      });

      // User query matched a widget pattern - respond with the widget
      // First, show the response text and loading skeleton
      setTimeout(() => {
        console.log('[Widget] Step 1: Setting response text and widget loading', {
          capturedAssistantId,
          matchedResponseText: matchedResponseText.substring(0, 50) + '...',
        });

        setIsStreaming(false);
        setMessages((prev) => {
          const updated = prev.map((msg) =>
            msg.id === capturedAssistantId
              ? {
                  ...msg,
                  content: matchedResponseText,
                  widgetLoading: true,
                }
              : msg
          );
          console.log('[Widget] Step 1 complete. Message updated with content and widgetLoading');
          return updated;
        });

        // Then, after a brief delay, show the actual widget with animation
        setTimeout(() => {
          console.log('[Widget] Step 2: Setting widget type and data', {
            capturedAssistantId,
            matchedWidgetType,
          });

          setMessages((prev) => {
            const updated = prev.map((msg) =>
              msg.id === capturedAssistantId
                ? {
                    ...msg,
                    widgetLoading: false,
                    widgetType: matchedWidgetType,
                    widgetData: matchedWidgetData,
                  }
                : msg
            );
            console.log('[Widget] Step 2 complete. Widget rendered:', {
              messageId: capturedAssistantId,
              widgetType: matchedWidgetType,
            });
            return updated;
          });
        }, 600); // Widget data "arrives" after 600ms
      }, 500); // Text response arrives after 500ms
      return;
    }

    try {
      // Call streaming API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No reader available');
      }

      let accumulatedText = '';
      const toolsUsed: string[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              setIsStreaming(false);
              break;
            }

            try {
              const parsed = JSON.parse(data);

              if (parsed.type === 'tool_use') {
                // Track tools being used
                if (!toolsUsed.includes(parsed.tool)) {
                  toolsUsed.push(parsed.tool);
                }
              } else if (parsed.type === 'text') {
                accumulatedText = parsed.content;

                // Check if response contains EXECUTION_RESULT
                // Parse DASHBOARD_DATA if present
                if (accumulatedText.includes('DASHBOARD_DATA:')) {
                  const dashboardIndex = accumulatedText.indexOf('DASHBOARD_DATA:');
                  const beforeDashboard = accumulatedText.substring(0, dashboardIndex).trim();
                  const afterMarker = accumulatedText.substring(dashboardIndex + 'DASHBOARD_DATA:'.length).trim();

                  // Find the JSON object (starts with { and ends with matching })
                  const jsonStart = afterMarker.indexOf('{');
                  if (jsonStart !== -1) {
                    let braceCount = 0;
                    let jsonEnd = -1;
                    for (let i = jsonStart; i < afterMarker.length; i++) {
                      if (afterMarker[i] === '{') braceCount++;
                      if (afterMarker[i] === '}') {
                        braceCount--;
                        if (braceCount === 0) {
                          jsonEnd = i;
                          break;
                        }
                      }
                    }

                    if (jsonEnd !== -1) {
                      const jsonStr = afterMarker.substring(jsonStart, jsonEnd + 1);
                      const afterJson = afterMarker.substring(jsonEnd + 1).trim();
                      const fullText = beforeDashboard + (afterJson ? '\n\n' + afterJson : '');

                      try {
                        const dashboard = JSON.parse(jsonStr);

                        // Add realistic delay before showing data (simulate data fetching)
                        setTimeout(() => {
                          setMessages((prev) =>
                            prev.map((msg) =>
                              msg.id === assistantId
                                ? { ...msg, content: fullText, dashboard, dashboardLoading: false }
                                : msg
                            )
                          );
                        }, 150); // 150ms delay for realistic loading feel
                      } catch (e) {
                        console.error('Failed to parse dashboard JSON:', e);
                        // Fallback: show text without JSON
                        setMessages((prev) =>
                          prev.map((msg) =>
                            msg.id === assistantId
                              ? { ...msg, content: fullText }
                              : msg
                          )
                        );
                      }
                    }
                  }
                } else if (accumulatedText.includes('EXECUTION_RESULT:')) {
                  const parts = accumulatedText.split('EXECUTION_RESULT:');
                  const textPart = parts[0].trim();
                  const jsonPart = parts[1].trim();

                  try {
                    const executionResult = JSON.parse(jsonPart);
                    // Update message with execution result
                    setMessages((prev) =>
                      prev.map((msg) =>
                        msg.id === assistantId
                          ? { ...msg, content: textPart, executionResult }
                          : msg
                      )
                    );
                  } catch {
                    // If JSON parsing fails, just show the text
                    setMessages((prev) =>
                      prev.map((msg) =>
                        msg.id === assistantId
                          ? { ...msg, content: accumulatedText }
                          : msg
                      )
                    );
                  }
                } else {
                  // Filter out DASHBOARD_DATA/EXECUTION_RESULT markers during streaming
                  let displayText = accumulatedText;

                  if (displayText.includes('DASHBOARD_DATA:')) {
                    // Extract text before and after JSON (if JSON is complete)
                    const dashboardIndex = displayText.indexOf('DASHBOARD_DATA:');
                    const beforeDashboard = displayText.substring(0, dashboardIndex).trim();
                    const afterMarker = displayText.substring(dashboardIndex + 'DASHBOARD_DATA:'.length).trim();

                    // Try to find complete JSON object
                    const jsonStart = afterMarker.indexOf('{');
                    if (jsonStart !== -1) {
                      let braceCount = 0;
                      let jsonEnd = -1;
                      for (let i = jsonStart; i < afterMarker.length; i++) {
                        if (afterMarker[i] === '{') braceCount++;
                        if (afterMarker[i] === '}') {
                          braceCount--;
                          if (braceCount === 0) {
                            jsonEnd = i;
                            break;
                          }
                        }
                      }

                      if (jsonEnd !== -1) {
                        // JSON is complete, include text after it
                        const afterJson = afterMarker.substring(jsonEnd + 1).trim();
                        displayText = beforeDashboard + (afterJson ? '\n\n' + afterJson : '');
                      } else {
                        // JSON not complete yet, show skeleton loader
                        displayText = beforeDashboard;
                        // Set loading state to show skeleton
                        setMessages((prev) =>
                          prev.map((msg) =>
                            msg.id === assistantId
                              ? { ...msg, content: displayText, dashboardLoading: true }
                              : msg
                          )
                        );
                        continue; // Skip the regular update below
                      }
                    } else {
                      // No JSON start found yet, only show text before
                      displayText = beforeDashboard;
                    }
                  } else if (displayText.includes('EXECUTION_RESULT:')) {
                    // Only show text before the execution result
                    displayText = displayText.split('EXECUTION_RESULT:')[0].trim();
                  }

                  // Update message with cleaned text (no JSON visible)
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === assistantId
                        ? { ...msg, content: displayText }
                        : msg
                    )
                  );
                }
              }
            } catch (error) {
              console.error('Failed to parse chunk:', error);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error streaming response:', error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? { ...msg, content: 'Sorry, I encountered an error. Please try again.' }
            : msg
        )
      );
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="relative flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`relative z-20 border-r border-border/50 liquid-glass transition-all duration-300 ${
          sidebarOpen ? 'w-80' : 'w-0'
        }`}
      >
        <div className={`flex h-full flex-col ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-200`}>
          {/* Header */}
          <div className="border-b border-border p-4">
            <button
              onClick={handleNewConversation}
              className="flex w-full items-center gap-3 rounded-lg border border-border p-3 hover:bg-muted transition-all duration-200 hover:shadow-md hover:border-primary/30"
            >
              <Plus className="h-5 w-5" />
              <span className="font-medium">New Conversation</span>
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-auto p-4">
            {/* Conversations */}
            <div className="mb-6">
              {/* Pinned Conversations */}
              {conversations.filter(c => c.pinned && !c.archived).length > 0 && (
                <div className="mb-4">
                  <h3 className="mb-3 text-sm font-semibold text-muted-foreground flex items-center gap-2">
                    <Pin className="h-4 w-4" />
                    Pinned ({conversations.filter(c => c.pinned && !c.archived).length})
                  </h3>
                  <div className="space-y-1">
                    {conversations.filter(c => c.pinned && !c.archived).map((conv) => (
                      <ConversationCard
                        key={conv.id}
                        conv={conv}
                        availablePersonas={availablePersonas}
                        conversationMenuOpen={conversationMenuOpen}
                        renamingConversation={renamingConversation}
                        renameValue={renameValue}
                        onLoadConversation={handleLoadConversation}
                        onMenuToggle={setConversationMenuOpen}
                        onPin={handlePinConversation}
                        onArchive={handleArchiveConversation}
                        onRename={(id, title) => handleRenameConversation(id, title)}
                        onStartRename={(id, title) => {
                          setRenamingConversation(id);
                          setRenameValue(title);
                        }}
                        onRenameValueChange={setRenameValue}
                        onExport={handleExportConversation}
                        onCopy={handleCopyConversation}
                        onShare={handleShareConversation}
                        onDelete={handleDeleteConversation}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Conversations - Grouped by Date (Claude-style) */}
              {conversations.filter(c => !c.archived).length === 0 ? (
                <>
                  <h3 className="mb-3 text-sm font-semibold text-muted-foreground flex items-center gap-2">
                    <History className="h-4 w-4" />
                    Recent Conversations
                  </h3>
                  <p className="text-xs text-muted-foreground px-2 py-4 text-center">No conversations yet</p>
                </>
              ) : (
                <>
                  {(() => {
                    // Group conversations by date
                    const unpinnedConvs = conversations.filter(c => !c.pinned && !c.archived);
                    const grouped = unpinnedConvs.reduce((groups, conv) => {
                      const group = getDateGroup(conv.timestamp);
                      if (!groups[group]) groups[group] = [];
                      groups[group].push(conv);
                      return groups;
                    }, {} as Record<string, typeof unpinnedConvs>);

                    // Define order of date groups
                    const groupOrder = ['Today', 'Yesterday', 'Previous 7 Days', 'Previous 30 Days', 'Older'];

                    return groupOrder.map(groupName => {
                      const groupConvs = grouped[groupName];
                      if (!groupConvs || groupConvs.length === 0) return null;

                      return (
                        <div key={groupName} className="mb-4">
                          <h4 className="mb-2 text-xs font-semibold text-muted-foreground">{groupName}</h4>
                          <div className="space-y-1">
                            {groupConvs.map((conv) => (
                              <ConversationCard
                                key={conv.id}
                                conv={conv}
                                availablePersonas={availablePersonas}
                                conversationMenuOpen={conversationMenuOpen}
                                renamingConversation={renamingConversation}
                                renameValue={renameValue}
                                onLoadConversation={handleLoadConversation}
                                onMenuToggle={setConversationMenuOpen}
                                onPin={handlePinConversation}
                                onArchive={handleArchiveConversation}
                                onRename={(id, title) => handleRenameConversation(id, title)}
                                onStartRename={(id, title) => {
                                  setRenamingConversation(id);
                                  setRenameValue(title);
                                }}
                                onRenameValueChange={setRenameValue}
                                onExport={handleExportConversation}
                                onCopy={handleCopyConversation}
                                onShare={handleShareConversation}
                                onDelete={handleDeleteConversation}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    });
                  })()}
                </>
              )}

              {/* Archived Conversations */}
              {conversations.filter(c => c.archived).length > 0 && (
                <div className="mt-4">
                  <button
                    onClick={() => setShowArchivedConversations(!showArchivedConversations)}
                    className="mb-3 flex w-full items-center justify-between text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Archive className="h-4 w-4" />
                      Archived ({conversations.filter(c => c.archived).length})
                    </div>
                    {showArchivedConversations ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </button>
                  {showArchivedConversations && (
                    <div className="space-y-1">
                      {conversations.filter(c => c.archived).slice(0, 5).map((conv) => (
                        <ConversationCard
                          key={conv.id}
                          conv={conv}
                          availablePersonas={availablePersonas}
                          conversationMenuOpen={conversationMenuOpen}
                          renamingConversation={renamingConversation}
                          renameValue={renameValue}
                          onLoadConversation={handleLoadConversation}
                          onMenuToggle={setConversationMenuOpen}
                          onPin={handlePinConversation}
                          onArchive={handleArchiveConversation}
                          onRename={(id, title) => handleRenameConversation(id, title)}
                          onStartRename={(id, title) => {
                            setRenamingConversation(id);
                            setRenameValue(title);
                          }}
                          onRenameValueChange={setRenameValue}
                          onExport={handleExportConversation}
                          onCopy={handleCopyConversation}
                          onShare={handleShareConversation}
                          onDelete={handleDeleteConversation}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                {currentPersona.quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={() => handleSendMessage(action.query)}
                      className="w-full rounded-lg border border-border bg-card p-3 text-left text-sm hover:bg-muted transition-all duration-200 hover:shadow-md hover:border-primary/30 group"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <Icon className="h-4 w-4 flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                          <span className="text-foreground truncate">{action.label}</span>
                        </div>
                        <div className={`${action.badgeColor} px-2 py-0.5 rounded-full text-xs font-semibold ${action.badgeColor === 'bg-success' ? 'text-foreground' : 'text-white'} flex-shrink-0`}>
                          {action.badge}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Demo Scenarios */}
            <div className="mb-6">
              <button
                onClick={() => setDemoScenariosOpen(!demoScenariosOpen)}
                className="w-full flex items-center justify-between mb-3 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Demo Scenarios
                </div>
                {demoScenariosOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>

              {demoScenariosOpen && (
                <div className="space-y-4">
                  {Object.entries(currentPersona.demoScenarios).map(([category, queries]) => (
                    <div key={category}>
                      <h4 className="text-xs font-medium text-muted-foreground mb-2 px-2">{category}</h4>
                      <div className="space-y-1">
                        {queries.map((query, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(query)}
                            className="w-full rounded-lg border border-border bg-card p-2 text-left text-xs hover:bg-muted transition-all duration-200 hover:shadow-md hover:border-primary/30 group"
                          >
                            <div className="flex items-start gap-2">
                              <Sparkles className="h-3 w-3 flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors mt-0.5" />
                              <span className="text-foreground">{query}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Saved Queries (Future) */}
            <div className="mb-6">
              <button
                onClick={() => setSavedQueriesOpen(!savedQueriesOpen)}
                className="w-full flex items-center justify-between mb-3 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Saved Queries
                </div>
                {savedQueriesOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>

              {savedQueriesOpen && (
                <div className="space-y-1">
                  {savedQueries.length === 0 ? (
                    <p className="text-xs text-muted-foreground px-2 py-4 text-center">
                      Save queries by clicking the star icon in chat
                    </p>
                  ) : (
                    savedQueries.map((query, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(query)}
                        className="w-full rounded-lg border border-border bg-card p-2 text-left text-xs hover:bg-muted transition-all duration-200 hover:shadow-md hover:border-primary/30 group"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-start gap-2 flex-1 min-w-0">
                            <Star className="h-3 w-3 flex-shrink-0 text-primary mt-0.5" fill="currentColor" />
                            <span className="text-foreground truncate">{query}</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSavedQueries(savedQueries.filter((_, i) => i !== idx));
                            }}
                            className="p-1 hover:bg-destructive/20 rounded transition-colors"
                          >
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </button>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* User Profile with Persona Selector */}
          <div className="border-t border-border p-4">
            <div className="relative space-y-3">
              {/* Reset Button */}
              <button
                onClick={handleResetApp}
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/20 transition-colors"
                title="Reset all conversations and data"
              >
                <RotateCcw className="h-4 w-4" />
                Reset All Data
              </button>

              {/* Persona Badge - Own Section */}
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
                  {/* Avatar - Simple solid */}
                  <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${currentPersona.theme.badgeSolid} shadow-md`}>
                    <User className="h-6 w-6 text-white" strokeWidth={2.5} />
                  </div>

                  {/* User Info - Clean, no badge */}
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
                          }}
                          className={`w-full p-3 relative transition-colors ${
                            isActive ? 'bg-primary/10' : 'hover:bg-muted'
                          }`}
                        >
                          <div className="flex flex-col items-center gap-2">
                            {/* Avatar with solid color */}
                            <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${persona.theme.badgeSolid} shadow-md`}>
                              <User className="h-5 w-5 text-white" strokeWidth={2.5} />
                            </div>
                            <div className="w-full text-center">
                              <div className="flex items-center justify-center gap-2">
                                <p className="text-sm font-medium truncate">{persona.name}</p>
                                {/* Solid badge */}
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

      {/* Main Chat Area */}
      <main className="relative z-10 flex flex-1 flex-col">
        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="glass-card absolute left-4 top-4 z-10 flex items-center justify-center rounded-lg border p-2 hover:bg-white/10 transition-all"
          title={`${sidebarOpen ? 'Close' : 'Open'} sidebar (⌘B)`}
        >
          {sidebarOpen ? (
            <PanelLeftClose className="h-5 w-5 text-muted-foreground" />
          ) : (
            <PanelLeft className="h-5 w-5 text-muted-foreground" />
          )}
        </button>

        {!hasMessages ? (
          /* EMPTY STATE - Centered Input Only */
          <div className="flex-1 flex items-center justify-center px-8">
            <motion.div
              className="w-full max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Hero Text */}
              <div className="text-center mb-8">
                <h1 className="text-5xl font-bold mb-2 font-serif">
                  AI that <span className="italic">actually</span> gets work done
                </h1>
                <p className="text-muted-foreground">
                  Connect your tools. Ask AI. Watch it happen.
                </p>
              </div>

              {/* Centered Input */}
              <motion.div
                className="relative rounded-2xl border border-border p-2"
                layout
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="flex gap-3 rounded-xl bg-background p-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="What would you like to do?"
                    className="flex-1 rounded-lg border-0 bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-200"
                    autoFocus
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:scale-105 active:scale-95"
                  >
                    <Send className="h-4 w-4" />
                    Send
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        ) : (
          /* ACTIVE STATE - Chat with Bottom-Fixed Input */
          <motion.div
            className="flex-1 flex flex-col min-h-0"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {/* Messages Container */}
            <div ref={messagesContainerRef} className="flex-1 overflow-auto px-8 pt-20 pb-32">
              <div className="max-w-4xl mx-auto">
                <div className="space-y-6">
                  {messages.map((message, idx) => {
                    // Find the last user query before this assistant message for regeneration
                    const lastUserQuery =
                      message.type === 'assistant'
                        ? messages
                            .slice(0, idx)
                            .reverse()
                            .find((m) => m.type === 'user')?.content
                        : undefined;

                    return (
                      <motion.div
                        key={message.id}
                        ref={idx === messages.length - 1 ? latestMessageRef : null}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: idx * 0.05,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                      >
                        {message.type === 'user' ? (
                          <UserMessage message={message} onSave={handleSaveQuery} />
                        ) : (
                          <AssistantMessage
                            message={message}
                            onCopy={handleCopyMessage}
                            onRegenerate={handleRegenerateMessage}
                            onFeedback={handleMessageFeedback}
                            lastUserQuery={lastUserQuery}
                          />
                        )}
                      </motion.div>
                    );
                  })}
                  {/* Scroll anchor for auto-scroll */}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </div>

            {/* Scroll to Bottom Button */}
            <AnimatePresence>
              {showScrollButton && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                  onClick={scrollToBottom}
                  className="fixed bottom-24 right-8 z-20 p-3 rounded-full bg-primary/90 hover:bg-primary text-primary-foreground shadow-lg backdrop-blur-sm border border-primary/20 transition-colors"
                  aria-label="Scroll to bottom"
                >
                  <ArrowDown className="h-5 w-5" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Bottom-Fixed Input */}
            <motion.div
              className="sticky bottom-0 z-10 border-t border-border/50 bg-background/80 backdrop-blur-sm"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              style={{ paddingBottom: '32px' }}
            >
              <div className="max-w-4xl mx-auto px-8 pt-4">
                <div className="relative rounded-2xl border border-border p-2">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                  />
                  <div className="flex gap-3 rounded-xl bg-background p-3">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="What would you like to do?"
                      className="flex-1 rounded-lg border-0 bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-200"
                    />
                    <button
                      onClick={() => handleSendMessage()}
                      className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:scale-105 active:scale-95"
                    >
                      <Send className="h-4 w-4" />
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

interface ConversationCardProps {
  conv: Conversation;
  availablePersonas: typeof import('@/data/personas').personas;
  conversationMenuOpen: string | null;
  renamingConversation: string | null;
  renameValue: string;
  onLoadConversation: (conv: Conversation) => void;
  onMenuToggle: (id: string | null) => void;
  onPin: (id: string) => void;
  onArchive: (id: string) => void;
  onRename: (id: string, title: string) => void;
  onStartRename: (id: string, title: string) => void;
  onRenameValueChange: (value: string) => void;
  onExport: (id: string, format: 'text' | 'json') => void;
  onCopy: (id: string) => void;
  onShare: (id: string) => void;
  onDelete: (id: string) => void;
}

function ConversationCard({
  conv,
  availablePersonas,
  conversationMenuOpen,
  renamingConversation,
  renameValue,
  onLoadConversation,
  onMenuToggle,
  onPin,
  onArchive,
  onRename,
  onStartRename,
  onRenameValueChange,
  onExport,
  onCopy,
  onShare,
  onDelete,
}: ConversationCardProps) {
  const personaBadge = availablePersonas.find((p) => p.id === conv.personaId);
  const isMenuOpen = conversationMenuOpen === conv.id;
  const isRenaming = renamingConversation === conv.id;

  // Ref for click-outside detection
  const menuRef = useRef<HTMLDivElement>(null);

  // Click-outside detection to close menu
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onMenuToggle(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, onMenuToggle]);

  return (
    <div className="group relative">
      <button
        onClick={() => onLoadConversation(conv)}
        className="w-full rounded-lg border border-border bg-card p-2 text-left text-sm hover:bg-muted transition-all duration-200 hover:shadow-md hover:border-primary/30"
      >
        <div className="flex items-start gap-2">
          <MessageSquare className="h-4 w-4 flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors mt-0.5" />
          <div className="flex-1 min-w-0">
            {isRenaming ? (
              <input
                type="text"
                value={renameValue}
                onChange={(e) => onRenameValueChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onRename(conv.id, renameValue);
                  } else if (e.key === 'Escape') {
                    onStartRename('', '');
                  }
                }}
                onBlur={() => onRename(conv.id, renameValue)}
                className="w-full bg-background border border-primary rounded px-2 py-1 text-sm"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <div className="flex items-center gap-2">
                {conv.pinned && <Pin className="h-3 w-3 text-primary fill-current flex-shrink-0" />}
                <p className="text-foreground truncate flex-1">{conv.title}</p>
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              {conv.timestamp.toLocaleDateString()} • {conv.messages.length} messages
            </p>
          </div>
        </div>
      </button>

      {/* 3-Dot Menu */}
      <div
        ref={menuRef}
        className="absolute top-2 right-2 opacity-60 group-hover:opacity-100 transition-opacity"
        onMouseLeave={() => {
          if (isMenuOpen) {
            onMenuToggle(null);
          }
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMenuToggle(isMenuOpen ? null : conv.id);
          }}
          className="p-1 hover:bg-muted rounded transition-all"
        >
          <MoreVertical className="h-4 w-4 text-muted-foreground" />
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-8 z-50 w-56 rounded-lg border border-border bg-card shadow-xl"
            >
            <div className="py-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStartRename(conv.id, conv.title);
                  onMenuToggle(null);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors"
              >
                <Edit2 className="h-4 w-4" />
                Rename
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPin(conv.id);
                  onMenuToggle(null);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors"
              >
                <Pin className="h-4 w-4" />
                {conv.pinned ? 'Unpin' : 'Pin to Top'}
              </button>
              <div className="my-1 border-t border-border" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onExport(conv.id, 'text');
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors"
              >
                <Download className="h-4 w-4" />
                Export as Text
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onExport(conv.id, 'json');
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors"
              >
                <Download className="h-4 w-4" />
                Export as JSON
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCopy(conv.id);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors"
              >
                <Copy className="h-4 w-4" />
                Copy to Clipboard
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(conv.id);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors"
              >
                <Share2 className="h-4 w-4" />
                Share Link
              </button>
              <div className="my-1 border-t border-border" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onArchive(conv.id);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors"
              >
                <Archive className="h-4 w-4" />
                {conv.archived ? 'Unarchive' : 'Archive'}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm('Delete this conversation?')) {
                    onDelete(conv.id);
                  }
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function UserMessage({ message, onSave }: { message: Message; onSave?: (query: string) => void }) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    if (onSave && !isSaved) {
      onSave(message.content);
      setIsSaved(true);
    }
  };

  return (
    <div className="flex justify-end gap-4 group">
      <div className="max-w-[80%] rounded-lg bg-primary px-4 py-3 text-primary-foreground shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] relative">
        <p className="text-sm">{message.content}</p>
        {onSave && (
          <button
            onClick={handleSave}
            className={`absolute -left-8 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-all duration-200 ${
              isSaved
                ? 'bg-primary text-primary-foreground opacity-100'
                : 'bg-muted text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-primary/20 hover:text-primary'
            }`}
            title={isSaved ? 'Saved to queries' : 'Save as query'}
          >
            <Star className={`h-3.5 w-3.5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        )}
      </div>
      {/* User Avatar */}
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary via-chart-2 to-primary shadow-md ring-2 ring-primary/30">
        <User className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
      </div>
    </div>
  );
}

function AssistantMessage({
  message,
  onCopy,
  onRegenerate,
  onFeedback,
  lastUserQuery,
}: {
  message: Message;
  onCopy?: (content: string) => void;
  onRegenerate?: (query: string) => void;
  onFeedback?: (messageId: string, feedback: 'like' | 'dislike') => void;
  lastUserQuery?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (onCopy) {
      onCopy(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getRelativeTime = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="flex gap-4 group">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary shadow-md">
        <Sparkles className="h-4 w-4 text-primary-foreground" />
      </div>
      <div className="flex-1">
        {message.content ? (
          <>
            <p className="mb-2 text-sm text-foreground whitespace-pre-wrap">{message.content}</p>

            {/* Dashboard View (backward compatibility) */}
            {message.dashboardLoading && <DashboardSkeleton />}
            {message.dashboard && !message.dashboardLoading && <DashboardView data={message.dashboard} />}

            {/* Widget View (NEW: Bhanu's assistant-first interface) */}
            {message.widgetLoading && <WidgetSkeleton />}
            {message.widgetType && message.widgetData && !message.widgetLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <WidgetRenderer type={message.widgetType} data={message.widgetData} />
              </motion.div>
            )}

            {/* Code Block */}
            {message.codeBlock && (
              <div className="my-4 rounded-lg border border-border bg-muted/50 p-4 font-mono text-xs overflow-x-auto">
                <pre>{message.codeBlock}</pre>
              </div>
            )}

            {message.executionResult && <ExecutionResultCard result={message.executionResult} />}

            {/* Action Bar */}
            <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                title="Copy to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-success" />
                    <span className="text-success">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              {onRegenerate && lastUserQuery && (
                <button
                  onClick={() => onRegenerate(lastUserQuery)}
                  className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  title="Regenerate response"
                >
                  <RotateCw className="h-3.5 w-3.5" />
                  <span>Regenerate</span>
                </button>
              )}

              <div className="flex items-center gap-1">
                <button
                  onClick={() => onFeedback?.(message.id, 'like')}
                  className={`rounded-md p-1.5 transition-colors ${
                    message.feedback === 'like'
                      ? 'bg-success/10 text-success'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                  title="Good response"
                >
                  <ThumbsUp className={`h-3.5 w-3.5 ${message.feedback === 'like' ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => onFeedback?.(message.id, 'dislike')}
                  className={`rounded-md p-1.5 transition-colors ${
                    message.feedback === 'dislike'
                      ? 'bg-destructive/10 text-destructive'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                  title="Poor response"
                >
                  <ThumbsDown className={`h-3.5 w-3.5 ${message.feedback === 'dislike' ? 'fill-current' : ''}`} />
                </button>
              </div>

              <span className="ml-auto text-xs text-muted-foreground">
                {getRelativeTime(message.timestamp)}
              </span>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex gap-1">
              <span className="animate-bounce" style={{ animationDelay: '0ms' }}>●</span>
              <span className="animate-bounce" style={{ animationDelay: '150ms' }}>●</span>
              <span className="animate-bounce" style={{ animationDelay: '300ms' }}>●</span>
            </div>
            <span>Thinking...</span>
          </div>
        )}
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-4 my-4">
      {/* Metrics Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, idx) => (
          <div
            key={idx}
            className="glass-card rounded-lg border border-border/50 p-4 backdrop-blur-sm animate-pulse"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="h-5 w-5 bg-muted rounded"></div>
              <div className="h-4 w-12 bg-muted rounded"></div>
            </div>
            <div className="h-8 w-20 bg-muted rounded mb-1"></div>
            <div className="h-3 w-24 bg-muted rounded"></div>
          </div>
        ))}
      </div>

      {/* Alerts Section Skeleton */}
      <div className="glass-card rounded-lg border border-border/50 bg-card/70 p-4 backdrop-blur-md animate-pulse">
        <div className="h-5 w-32 bg-muted rounded mb-3"></div>
        <div className="space-y-2">
          {[...Array(5)].map((_, idx) => (
            <div
              key={idx}
              className="border-l-4 border-l-muted bg-muted/10 rounded p-3"
            >
              <div className="h-4 w-full bg-muted rounded mb-2"></div>
              <div className="h-3 w-24 bg-muted rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardView({ data }: { data: DashboardData }) {
  // Map icon names to components
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    'Activity': Activity,
    'Users': Users,
    'Zap': Zap,
    'AlertTriangle': AlertTriangle,
    'Clock': Clock,
    'TrendingUp': TrendingUp,
    'TrendingDown': TrendingDown,
    'Shield': Shield,
    'Settings': Settings,
    'CheckCircle2': CheckCircle2,
    'AlertCircle': AlertCircle,
    'Target': Target,
    'Database': Database,
    'Mail': Mail,
    'MessageSquare': MessageSquare,
    'Calendar': Calendar,
    'GitBranch': GitBranch,
    'Headphones': Headphones,
    'Crown': Crown,
    'AlertOctagon': AlertOctagon,
    'Globe': Globe,
    'Key': Key,
    'ShieldCheck': ShieldCheck,
    'Eye': Eye,
    'XCircle': XCircle,
    'Lock': Lock,
    'Award': Award,
    'CheckCircle': CheckCircle,
    'FileText': FileText,
    'Timer': Timer,
    'BarChart': BarChart,
    'MessageCircle': MessageCircle,
    'Phone': Phone,
    'Link2': Link2,
    'ThumbsUp': ThumbsUpIcon,
    'RotateCw': RotateCw,
    'User': User,
    'UserPlus': UserPlus,
    'UserMinus': UserMinus,
    'BarChart3': BarChart3,
    'Percent': Percent,
    'ArrowRight': ArrowRight,
    'Briefcase': Briefcase,
    'DollarSign': DollarSign,
    'LineChart': LineChart,
    'PieChart': PieChart,
    'Package': Package,
    'Wrench': Wrench,
    'CreditCard': CreditCard,
    'UserCheck': UserCheck,
    'Scale': Scale,
    'Heart': Heart,
    'HardDrive': HardDrive,
    'Link': Link,
    'FileCheck': FileCheck,
    'Webhook': Webhook,
  };

  return (
    <div className="space-y-4 my-4">
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.metrics.map((metric, idx) => {
          const IconComponent = iconMap[metric.icon] || Activity;
          const statusColors = {
            success: 'bg-success/10 border-success/30 text-success',
            warning: 'bg-chart-4/10 border-chart-4/30 text-chart-4',
            error: 'bg-destructive/10 border-destructive/30 text-destructive',
            info: 'bg-chart-3/10 border-chart-3/30 text-chart-3',
          };

          return (
            <div
              key={idx}
              className={`glass-card rounded-lg border ${statusColors[metric.status]} p-4 backdrop-blur-sm`}
            >
              <div className="flex items-start justify-between mb-2">
                <IconComponent className="h-5 w-5" />
                {metric.change && (
                  <span className={`text-xs font-medium ${metric.trend === 'up' ? 'text-success' : metric.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {metric.change}
                  </span>
                )}
              </div>
              <div className="text-2xl font-bold mb-1">{metric.value}</div>
              <div className="text-xs text-muted-foreground">{metric.label}</div>

              {/* Integration-specific details */}
              {(metric.uptime || metric.lastSync) && (
                <div className="mt-2 pt-2 border-t border-border/50 space-y-1">
                  {metric.uptime && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Uptime:</span>
                      <span className="font-medium">{metric.uptime}</span>
                    </div>
                  )}
                  {metric.lastSync && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Last Sync:</span>
                      <span className="font-medium">{metric.lastSync}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Alerts Section */}
      {data.alerts && data.alerts.length > 0 && (
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Active Alerts
          </h4>
          <div className="space-y-2">
            {data.alerts.map((alert, idx) => {
              const alertColors = {
                critical: 'bg-destructive/10 border-l-destructive text-destructive',
                warning: 'bg-chart-4/10 border-l-chart-4 text-chart-4',
                info: 'bg-chart-3/10 border-l-chart-3 text-chart-3',
              };

              return (
                <div
                  key={idx}
                  className={`border-l-4 ${alertColors[alert.level]} rounded p-3 text-sm`}
                >
                  <div className="font-medium mb-1">{alert.message}</div>
                  <div className="text-xs text-muted-foreground">{alert.timestamp}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function ExecutionResultCard({ result }: { result: ExecutionResult }) {
  return (
    <div className="glass-card rounded-lg border border-border bg-card/70 p-6 shadow-xl backdrop-blur-md">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">{result.title}</h3>
        <div className="flex items-center gap-2">
          {result.integrations.map((integration) => (
            <span
              key={integration}
              className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm"
            >
              {integration}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {result.steps.map((step) => (
          <ExecutionStepDisplay key={step.number} step={step} />
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button className="flex items-center gap-2 rounded-lg border border-border bg-background/50 px-4 py-2 text-sm font-medium text-foreground backdrop-blur-sm hover:bg-muted transition-all duration-200 hover:shadow-md hover:border-primary/30">
          <ExternalLink className="h-4 w-4" />
          View in Zoho
        </button>
        <button className="flex items-center gap-2 rounded-lg border border-border bg-background/50 px-4 py-2 text-sm font-medium text-foreground backdrop-blur-sm hover:bg-muted transition-all duration-200 hover:shadow-md hover:border-primary/30">
          <MessageSquare className="h-4 w-4" />
          Open Slack
        </button>
      </div>
    </div>
  );
}

function ExecutionStepDisplay({ step }: { step: ExecutionStep }) {
  return (
    <div className="border-l-2 border-primary pl-6">
      <div className="relative">
        <div className="absolute -left-[2.1rem] flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-md">
          {step.number}
        </div>
        <h4 className="font-semibold text-foreground">{step.title}</h4>
        <ul className="mt-3 space-y-2">
          {step.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm">
              {item.status === 'success' && <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-success" />}
              {item.status === 'error' && <XCircle className="h-5 w-5 flex-shrink-0 text-destructive" />}
              {item.status === 'info' && <Clock className="h-5 w-5 flex-shrink-0 text-chart-3" />}
              {!item.status && <div className="h-1.5 w-1.5 flex-shrink-0 translate-y-1.5 rounded-full bg-muted-foreground" />}
              <div className="flex-1">
                <span className="text-foreground">{item.text}</span>
                {item.email && (
                  <a href={`mailto:${item.email}`} className="ml-2 text-primary hover:underline">
                    ({item.email})
                  </a>
                )}
                {item.metadata && (
                  <span className="ml-2 text-muted-foreground">{item.metadata}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
