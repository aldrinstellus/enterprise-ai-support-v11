'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Command, TrendingUp, Users, Headphones, ArrowRight } from 'lucide-react';
import { DashboardWidget } from '@/config/dashboard-widgets';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  widgets: DashboardWidget[];
  onWidgetClick: (query: string) => void;
}

export function CommandPalette({ isOpen, onClose, widgets, onWidgetClick }: CommandPaletteProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredWidgets = widgets.filter((widget) =>
    widget.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    widget.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredWidgets.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredWidgets.length) % filteredWidgets.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredWidgets[selectedIndex]) {
          onWidgetClick(filteredWidgets[selectedIndex].query);
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredWidgets, onWidgetClick, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm pt-[20vh]"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl mx-4"
        >
          <div className="bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
              <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search widgets or ask a question..."
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs text-muted-foreground">
                <Command className="h-3 w-3" />
                <span>K</span>
              </div>
            </div>

            {/* Widget Results */}
            <div className="max-h-[400px] overflow-y-auto">
              {searchQuery === '' && (
                <div className="p-4">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Suggested for you
                  </h4>
                </div>
              )}

              {filteredWidgets.length > 0 ? (
                <div className="py-2">
                  {filteredWidgets.map((widget, index) => (
                    <button
                      key={widget.id}
                      onClick={() => {
                        onWidgetClick(widget.query);
                        onClose();
                      }}
                      className={`w-full px-4 py-3 flex items-center justify-between transition-colors ${
                        index === selectedIndex
                          ? 'bg-primary/10 border-l-2 border-primary'
                          : 'hover:bg-muted border-l-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                          index === selectedIndex ? 'bg-primary/20' : 'bg-muted'
                        }`}>
                          <Search className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <p className="text-sm font-medium text-foreground truncate">
                            {widget.title}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {widget.description}
                          </p>
                        </div>
                      </div>
                      {index === selectedIndex && (
                        <ArrowRight className="h-4 w-4 text-primary flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-12 text-center">
                  <p className="text-sm text-muted-foreground">
                    No widgets found matching "{searchQuery}"
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border px-4 py-3 bg-muted/30">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-background border border-border rounded">↑</kbd>
                    <kbd className="px-1.5 py-0.5 bg-background border border-border rounded">↓</kbd>
                    to navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-background border border-border rounded">Enter</kbd>
                    to select
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-background border border-border rounded">Esc</kbd>
                  to close
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
