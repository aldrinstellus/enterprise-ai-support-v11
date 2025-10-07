'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Command, LayoutDashboard, Zap } from 'lucide-react';
import { DashboardWidget } from '@/config/dashboard-widgets';
import { DashboardGrid } from '../dashboard/DashboardGrid';

interface EnhancedCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  widgets: DashboardWidget[];
  onWidgetClick: (query: string) => void;
}

type TabType = 'quick-launch' | 'dashboard';

export function EnhancedCommandPalette({
  isOpen,
  onClose,
  widgets,
  onWidgetClick,
}: EnhancedCommandPaletteProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<TabType>('quick-launch');
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredWidgets = widgets.filter(
    (widget) =>
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

      if (e.key === 'ArrowDown' && activeTab === 'quick-launch') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredWidgets.length);
      } else if (e.key === 'ArrowUp' && activeTab === 'quick-launch') {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + filteredWidgets.length) % filteredWidgets.length
        );
      } else if (e.key === 'Enter' && activeTab === 'quick-launch') {
        e.preventDefault();
        if (filteredWidgets[selectedIndex]) {
          onWidgetClick(filteredWidgets[selectedIndex].query);
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Tab') {
        e.preventDefault();
        setActiveTab((prev) =>
          prev === 'quick-launch' ? 'dashboard' : 'quick-launch'
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredWidgets, onWidgetClick, onClose, activeTab]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm pt-[15vh]"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl mx-4"
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

            {/* Tabs */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/30">
              <button
                onClick={() => setActiveTab('quick-launch')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'quick-launch'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Zap className="w-4 h-4" />
                Quick Launch
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard View
              </button>
              <div className="ml-auto text-xs text-muted-foreground">
                Press <kbd className="px-1.5 py-0.5 bg-muted rounded">Tab</kbd> to switch
              </div>
            </div>

            {/* Content */}
            <div className="max-h-[60vh] overflow-y-auto">
              {activeTab === 'quick-launch' ? (
                // Quick Launch Tab
                <>
                  {searchQuery === '' && (
                    <div className="px-4 py-3">
                      <p className="text-xs text-muted-foreground mb-3">
                        QUICK ACTIONS
                      </p>
                    </div>
                  )}

                  {filteredWidgets.length === 0 ? (
                    <div className="px-4 py-8 text-center text-muted-foreground">
                      No widgets found
                    </div>
                  ) : (
                    <div className="pb-2">
                      {filteredWidgets.map((widget, idx) => (
                        <button
                          key={widget.id}
                          onClick={() => {
                            onWidgetClick(widget.query);
                            onClose();
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                            idx === selectedIndex
                              ? 'bg-primary/10 border-l-2 border-primary'
                              : 'hover:bg-muted border-l-2 border-transparent'
                          }`}
                        >
                          <div className="flex-1 text-left">
                            <div className="font-medium text-sm text-foreground">
                              {widget.title}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {widget.description}
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">↵</div>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                // Dashboard View Tab
                <div className="p-4">
                  <DashboardGrid
                    widgets={widgets}
                    onWidgetClick={(widget) => {
                      onWidgetClick(widget.query);
                      // Keep palette open for dashboard view
                    }}
                  />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-border bg-muted/30 text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <span>
                  <kbd className="px-1.5 py-0.5 bg-muted rounded">↑↓</kbd> Navigate
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 bg-muted rounded">↵</kbd> Select
                </span>
              </div>
              <span>
                <kbd className="px-1.5 py-0.5 bg-muted rounded">Esc</kbd> Close
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
