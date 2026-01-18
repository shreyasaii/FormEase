'use client';

import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, Loader2, CheckCircle2 } from 'lucide-react';

interface UploadSectionProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
  isSuccess: boolean;
}

export default function UploadSection({
  onFileUpload,
  isLoading,
  isSuccess,
}: UploadSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (isValidFile(file)) {
        onFileUpload(file);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (isValidFile(file)) {
        onFileUpload(file);
      }
    }
  };

  const isValidFile = (file: File): boolean => {
    const validTypes = [
      'image/jpeg',
      'image/png',
      'application/pdf',
    ];
    const validSize = file.size <= 10 * 1024 * 1024; // 10MB
    return validTypes.includes(file.type) && validSize;
  };

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="w-full backdrop-blur-sm bg-card/50 border-border shadow-xl">
      <div className="p-8 md:p-12">
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-8 md:p-12 text-center transition-all duration-200 ${
            isDragActive
              ? 'border-primary bg-primary/5'
              : 'border-border bg-muted/20 hover:border-primary/50'
          }`}
        >
          {isLoading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="text-foreground font-medium">Extracting text...</p>
              <p className="text-sm text-muted-foreground">
                This may take a moment
              </p>
            </div>
          ) : isSuccess ? (
            <div className="flex flex-col items-center gap-3">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
              <p className="text-foreground font-medium">
                Text extracted successfully
              </p>
              <p className="text-sm text-muted-foreground">
                Ready to translate and explain
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <Upload className="w-12 h-12 text-primary/60" />
              <div>
                <p className="text-lg font-semibold text-foreground mb-1">
                  Drag & drop your form here
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  or click to browse (JPG, PNG, PDF - up to 10MB)
                </p>
              </div>
              <Button
                onClick={handleBrowse}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Browse Files
              </Button>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          onChange={handleChange}
          accept=".jpg,.jpeg,.png,.pdf"
          className="hidden"
          aria-label="Upload form file"
        />

        <div className="mt-6 p-4 bg-secondary/30 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold">Supported formats:</span> JPG, PNG, PDF (up to 10MB)
          </p>
        </div>
      </div>
    </Card>
  );
}
