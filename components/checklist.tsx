'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckSquare2, Download, Copy } from 'lucide-react';

interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  category: string;
}

interface ChecklistProps {
  items: ChecklistItem[];
  onToggleItem: (id: string) => void;
  onDownload: () => void;
  onCopy: () => void;
}

export default function Checklist({
  items,
  onToggleItem,
  onDownload,
  onCopy,
}: ChecklistProps) {
  if (!items.length) {
    return null;
  }

  const categories = Array.from(new Set(items.map((item) => item.category)));
  const completedCount = items.filter((item) => item.completed).length;
  const progressPercent = (completedCount / items.length) * 100;

  return (
    <Card className="w-full backdrop-blur-sm bg-card/50 border-border shadow-lg overflow-hidden">
      <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex items-center gap-2 mb-2">
          <CheckSquare2 className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Document Checklist</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          {completedCount} of {items.length} items completed
        </p>
        <div className="mt-3 w-full bg-secondary rounded-full h-2">
          <div
            className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {categories.map((category) => {
            const categoryItems = items.filter((item) => item.category === category);
            return (
              <div key={category}>
                <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide opacity-70">
                  {category}
                </h4>
                <div className="space-y-2">
                  {categoryItems.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => onToggleItem(item.id)}
                        className="w-4 h-4 rounded accent-primary"
                        aria-label={item.label}
                      />
                      <span
                        className={`text-sm ${
                          item.completed
                            ? 'text-muted-foreground line-through'
                            : 'text-foreground'
                        }`}
                      >
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-6 border-t border-border flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onCopy}
            className="gap-2 flex-1 bg-transparent"
          >
            <Copy className="w-4 h-4" />
            Copy
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onDownload}
            className="gap-2 flex-1 bg-transparent"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
        </div>
      </div>
    </Card>
  );
}
