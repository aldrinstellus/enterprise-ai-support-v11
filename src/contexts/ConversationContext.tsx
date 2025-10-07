'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Message {
  id: string;
  type: 'user' | 'ai' | 'widget';
  content?: string;
  timestamp: Date;
}

interface ConversationContextType {
  messagesByPersona: Record<string, Message[]>;
  setMessagesByPersona: React.Dispatch<React.SetStateAction<Record<string, Message[]>>>;
  clearAllConversations: () => void;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export function ConversationProvider({ children }: { children: ReactNode }) {
  // Per-persona message storage with localStorage persistence
  const [messagesByPersona, setMessagesByPersona] = useState<Record<string, Message[]>>(() => {
    // Load from localStorage on mount
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('messagesByPersona');
        if (saved) {
          const parsed = JSON.parse(saved);
          // Convert ISO string dates back to Date objects
          Object.keys(parsed).forEach(key => {
            parsed[key] = parsed[key].map((msg: any) => ({
              ...msg,
              timestamp: new Date(msg.timestamp),
            }));
          });
          console.log('[ConversationContext] Loaded messages from localStorage:', parsed);
          return parsed;
        }
      } catch (error) {
        console.error('[ConversationContext] Failed to load messages from localStorage:', error);
      }
    }
    return {};
  });

  // Save to localStorage whenever messagesByPersona changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('messagesByPersona', JSON.stringify(messagesByPersona));
        console.log('[ConversationContext] Saved messages to localStorage');
      } catch (error) {
        console.error('[ConversationContext] Failed to save messages to localStorage:', error);
      }
    }
  }, [messagesByPersona]);

  const clearAllConversations = () => {
    setMessagesByPersona({});
    if (typeof window !== 'undefined') {
      localStorage.removeItem('messagesByPersona');
      console.log('[ConversationContext] Cleared all conversations');
    }
  };

  return (
    <ConversationContext.Provider value={{ messagesByPersona, setMessagesByPersona, clearAllConversations }}>
      {children}
    </ConversationContext.Provider>
  );
}

export function useConversation() {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error('useConversation must be used within ConversationProvider');
  }
  return context;
}
