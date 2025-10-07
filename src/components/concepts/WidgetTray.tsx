'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X } from 'lucide-react';
import { DashboardWidget } from '@/config/dashboard-widgets';
import { getWidgetDemoData } from '@/data/demo-widget-data';

interface WidgetTrayProps {
  widgets: DashboardWidget[];
  isVisible: boolean;
  onClose: () => void;
  onWidgetClick: (query: string) => void;
}

export function WidgetTray({ widgets, isVisible, onClose, onWidgetClick }: WidgetTrayProps) {
  // Show only first 4 widgets
  const displayWidgets = widgets.slice(0, 4);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="px-6 pb-4"
        >
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-medium text-foreground">Quick Insights</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-muted rounded-md transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Widget Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {displayWidgets.map((widget) => (
                <motion.button
                  key={widget.id}
                  onClick={() => onWidgetClick(widget.query)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4 text-left transition-all hover:border-primary/30 hover:shadow-md"
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Content */}
                  <div className="relative">
                    <h4 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {widget.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {widget.description}
                    </p>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                      <Sparkles className="h-3 w-3 text-primary" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
