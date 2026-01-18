'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface FormExplanationProps {
  explanation: string;
  isLoading: boolean;
  onSummarize: () => void;
  onCopy: () => void;
  simpleModeEnabled: boolean;
}

export default function FormExplanation({
  explanation,
  isLoading,
  onSummarize,
  onCopy,
  simpleModeEnabled,
}: FormExplanationProps) {
  const formatExplanation = (text: string) => {
    // Split by bullet points and key phrases
    const lines = text.split('\n').filter((line) => line.trim());
    return lines;
  };

  if (!explanation && !isLoading) {
    return null;
  }

  return (
    <Card className="w-full backdrop-blur-sm bg-card/50 border-border shadow-lg overflow-hidden">
      <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-foreground">Form Explanation</h3>
        </div>
        {simpleModeEnabled && (
          <p className="text-xs text-muted-foreground mt-1">Simple language for easy understanding</p>
        )}
      </div>

      <div className="p-6">
        {isLoading ? (
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded-full w-3/4 animate-pulse" />
            <div className="h-4 bg-muted rounded-full w-full animate-pulse" />
            <div className="h-4 bg-muted rounded-full w-5/6 animate-pulse" />
          </div>
        ) : explanation ? (
          <div className="space-y-4">
            <div className="bg-background/50 rounded-lg p-5 border border-border max-h-[400px] md:max-h-[500px] overflow-y-auto overflow-x-hidden">
              <div className="space-y-3">
                {formatExplanation(explanation).map((line, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="text-primary font-bold mt-1">•</div>
                    <p className="text-foreground text-sm leading-relaxed">{line.trim()}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={onSummarize}
                className="bg-transparent"
              >
                Summarize in 5 Lines
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onCopy}
                className="bg-transparent"
              >
                Copy
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </Card>
  );
}
