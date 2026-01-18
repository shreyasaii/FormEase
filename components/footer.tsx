'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Shield, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">About FormEase</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Helping parents and students understand complex government and
              college forms through AI-powered translation and simple
              explanations.
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Technology
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>Google Cloud Vision OCR</li>
              <li>Google Translate API</li>
              <li>Google Gemini AI</li>
            </ul>
          </div>

          {/* Privacy */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Privacy
            </h3>
            <p className="text-sm text-muted-foreground">
              Your files are processed securely. We never store your uploaded
              documents. Your privacy is our priority.
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Built with{' '}
            <span className="text-primary font-semibold">
              Google OCR + Translate + Gemini
            </span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            © 2024 FormEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
