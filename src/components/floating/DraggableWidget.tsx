'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Minimize2, Maximize2, GripHorizontal } from 'lucide-react';
import { WidgetRenderer } from '../widgets/WidgetRenderer';
import { DashboardWidget } from '@/config/dashboard-widgets';
import { WidgetType, WidgetData } from '@/types/widget';

interface DraggableWidgetProps {
  widget: DashboardWidget;
  widgetData: WidgetData;
  initialPosition: { x: number; y: number };
  onClose: () => void;
  zIndex: number;
  onFocus: () => void;
}

export function DraggableWidget({
  widget,
  widgetData,
  initialPosition,
  onClose,
  zIndex,
  onFocus,
}: DraggableWidgetProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const dx = e.clientX - dragStartPos.current.x;
      const dy = e.clientY - dragStartPos.current.y;

      setPosition((prev) => ({
        x: prev.x + dx,
        y: prev.y + dy,
      }));

      dragStartPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return; // Don't drag when clicking buttons
    onFocus();
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (isMaximized) setIsMaximized(false);
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (isMinimized) setIsMinimized(false);
  };

  return (
    <motion.div
      ref={widgetRef}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        x: isMaximized ? 0 : position.x,
        y: isMaximized ? 0 : position.y,
        width: isMaximized ? '100vw' : isMinimized ? '300px' : '500px',
        height: isMaximized ? '100vh' : isMinimized ? 'auto' : '400px',
      }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="fixed bg-card border border-border rounded-lg shadow-2xl overflow-hidden flex flex-col"
      style={{
        zIndex,
        top: isMaximized ? 0 : undefined,
        left: isMaximized ? 0 : undefined,
      }}
      onClick={onFocus}
    >
      {/* Header */}
      <div
        onMouseDown={handleMouseDown}
        className={`
          flex items-center justify-between px-4 py-2.5 border-b border-border
          bg-gradient-to-r from-card to-muted/30 backdrop-blur-xl
          ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
        `}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <GripHorizontal className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <h3 className="text-sm font-semibold text-foreground truncate">
            {widget.title}
          </h3>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleMinimize}
            className="p-1.5 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-foreground"
            title={isMinimized ? 'Expand' : 'Minimize'}
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={toggleMaximize}
            className="p-1.5 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-foreground"
            title={isMaximized ? 'Restore' : 'Maximize'}
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-destructive/10 hover:text-destructive rounded transition-colors text-muted-foreground"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      {!isMinimized && (
        <div className="flex-1 overflow-auto p-4">
          <WidgetRenderer type={widget.type} data={widgetData} />
        </div>
      )}
    </motion.div>
  );
}
