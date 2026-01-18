'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { FileUp, BookOpen } from 'lucide-react';

interface HeaderProps {
  onUploadClick: () => void;
  onDemoClick: () => void;
}

export default function Header({ onUploadClick, onDemoClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-sm bg-background/95 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">FormEase</h1>
            <p className="text-xs text-muted-foreground font-medium">Scan → Translate → Understand</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDemoClick();
            }}
            className="bg-transparent"
          >
            Try Demo
          </Button>
          <Button
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onUploadClick();
            }}
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          >
            <FileUp className="w-4 h-4" />
            Upload Form
          </Button>
        </div>
      </div>
    </header>
  );
}
