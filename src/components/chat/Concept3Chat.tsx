'use client';

import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { InteractiveChat } from './InteractiveChat';
import { CommandPalette } from '../concepts/CommandPalette';
import { usePersona } from '@/hooks/use-persona';
import { getDashboardWidgets } from '@/config/dashboard-widgets';

export function Concept3Chat() {
  const { currentPersona } = usePersona();
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const widgets = getDashboardWidgets(currentPersona.id);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K to toggle command palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleWidgetClick = (query: string) => {
    // Trigger the query in InteractiveChat via URL parameter
    const url = new URL(window.location.href);
    url.searchParams.set('query', query);
    window.history.pushState({}, '', url);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Trigger query via URL parameter
    const url = new URL(window.location.href);
    url.searchParams.set('query', inputValue);
    window.history.pushState({}, '', url);
    window.dispatchEvent(new PopStateEvent('popstate'));

    // Clear input
    setInputValue('');
  };

  return (
    <div className="relative h-screen">
      {/* Hide InteractiveChat's default input with CSS */}
      <style jsx global>{`
        .concept3-wrapper .border-t.border-border.bg-card {
          display: none;
        }
      `}</style>

      <div className="concept3-wrapper">
        <InteractiveChat />
      </div>

      {/* Floating Input Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6 flex items-center gap-3 z-10">
        {/* Input with inline Send button */}
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

        {/* Quick Launch Button */}
        <button
          onClick={() => setIsPaletteOpen(true)}
          className="flex items-center gap-2 px-5 py-4 bg-primary text-primary-foreground rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105 hover:bg-primary/90 whitespace-nowrap"
        >
          <span className="text-sm font-medium">Quick Launch</span>
          <kbd className="px-2 py-1 bg-primary-foreground/20 rounded text-xs">⌘K</kbd>
        </button>
      </div>

      {/* Command Palette */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        widgets={widgets}
        onWidgetClick={handleWidgetClick}
      />
    </div>
  );
}
