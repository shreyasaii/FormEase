'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, Download } from 'lucide-react';

interface ExtractionViewerProps {
  originalText: string;
  translatedText: string;
  onCopy: (text: string, type: 'original' | 'translated') => void;
  onDownload: (text: string, type: 'original' | 'translated') => void;
}

export default function ExtractionViewer({
  originalText,
  translatedText,
  onCopy,
  onDownload,
}: ExtractionViewerProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Original Text Panel */}
      <Card className="backdrop-blur-sm bg-card/50 border-border shadow-lg overflow-hidden">
        <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
          <h3 className="text-lg font-semibold text-foreground">
            Extracted Text (Original)
          </h3>
        </div>
        <div className="p-6">
          <div className="bg-background/50 rounded-lg p-4 min-h-[300px] max-h-[400px] overflow-y-auto border border-border mb-4">
            <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">
              {originalText || 'No text extracted yet. Upload a form to begin.'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onCopy(originalText, 'original')}
              className="gap-2 flex-1"
              disabled={!originalText}
            >
              <Copy className="w-4 h-4" />
              Copy
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDownload(originalText, 'original')}
              className="gap-2 flex-1"
              disabled={!originalText}
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
        </div>
      </Card>

      {/* Translated Text Panel */}
      <Card className="backdrop-blur-sm bg-card/50 border-border shadow-lg overflow-hidden">
        <div className="p-6 border-b border-border bg-gradient-to-r from-accent/5 to-transparent">
          <h3 className="text-lg font-semibold text-foreground">
            Translated Text
          </h3>
        </div>
        <div className="p-6">
          <div className="bg-background/50 rounded-lg p-4 min-h-[300px] max-h-[400px] overflow-y-auto border border-border mb-4">
            <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">
              {translatedText || 'Translate the extracted text to see it here.'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onCopy(translatedText, 'translated')}
              className="gap-2 flex-1"
              disabled={!translatedText}
            >
              <Copy className="w-4 h-4" />
              Copy
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDownload(translatedText, 'translated')}
              className="gap-2 flex-1"
              disabled={!translatedText}
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
