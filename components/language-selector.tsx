'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Globe, Lightbulb, CheckSquare2, Zap } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'mr', label: 'Marathi' },
  { code: 'ta', label: 'Tamil' },
  { code: 'te', label: 'Telugu' },
  { code: 'bn', label: 'Bengali' },
  { code: 'gu', label: 'Gujarati' },
  { code: 'kn', label: 'Kannada' },
  { code: 'ml', label: 'Malayalam' },
  { code: 'pa', label: 'Punjabi' },
];

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  onTranslate: () => void;
  onExplain: () => void;
  onGenerateChecklist: () => void;
  isTranslating: boolean;
  isExplaining: boolean;
  isGeneratingChecklist: boolean;
  simpleModeEnabled: boolean;
  onSimpleModeToggle: () => void;
}

export default function LanguageSelector({
  selectedLanguage,
  onLanguageChange,
  onTranslate,
  onExplain,
  onGenerateChecklist,
  isTranslating,
  isExplaining,
  isGeneratingChecklist,
  simpleModeEnabled,
  onSimpleModeToggle,
}: LanguageSelectorProps) {
  return (
    <Card className="w-full backdrop-blur-sm bg-card/50 border-border shadow-lg">
      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left side: Language Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">
                Select Language
              </h3>
            </div>

            <div className="space-y-3">
              <Select value={selectedLanguage} onValueChange={onLanguageChange}>
                <SelectTrigger className="bg-background/50 border-border">
                  <SelectValue placeholder="Choose a language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <label className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                <input
                  type="checkbox"
                  checked={simpleModeEnabled}
                  onChange={onSimpleModeToggle}
                  className="w-4 h-4 rounded accent-primary"
                  aria-label="Enable Simple Mode for parents"
                />
                <div>
                  <p className="font-medium text-foreground text-sm">
                    Simple Mode for Parents
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Simplified explanations
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Right side: Action Buttons */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold text-foreground">Actions</h3>
            </div>

            <div className="space-y-3">
              <Button
                onClick={onTranslate}
                disabled={isTranslating || isExplaining}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              >
                {isTranslating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Translating...
                  </>
                ) : (
                  <>
                    <Globe className="w-4 h-4" />
                    Translate Now
                  </>
                )}
              </Button>

              <Button
                onClick={onExplain}
                disabled={isExplaining || isTranslating}
                variant="secondary"
                className="w-full gap-2"
              >
                {isExplaining ? (
                  <>
                    <div className="w-4 h-4 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Lightbulb className="w-4 h-4" />
                    Explain This Form
                  </>
                )}
              </Button>

              <Button
                onClick={onGenerateChecklist}
                disabled={isGeneratingChecklist || isExplaining}
                variant="outline"
                className="w-full gap-2 bg-transparent"
              >
                {isGeneratingChecklist ? (
                  <>
                    <div className="w-4 h-4 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <CheckSquare2 className="w-4 h-4" />
                    Generate Checklist
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
