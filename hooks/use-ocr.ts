'use client';

import { useState, useCallback } from 'react';

interface OCRResult {
  text: string;
  confidence: number;
}

export function useOCR() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractText = useCallback(
    async (file: File): Promise<OCRResult | null> => {
      setIsLoading(true);
      setError(null);

      try {
        // Dynamically import Tesseract.js
        const Tesseract = (await import('tesseract.js')).default;

        return new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = async (e) => {
            let worker: any = null;
            try {
              const imageData = e.target?.result;
              console.log('[v0] OCR file loaded, size:', (imageData as string).length);

              // Use the simple recognize API (v4 compatible)
              // This handles language loading automatically
              const result = await Tesseract.recognize(imageData, 'eng', {
                logger: (info: any) => {
                  console.log('[v0] Tesseract progress:', info.status, Math.round(info.progress * 100) + '%');
                },
              });

              console.log('[v0] OCR result received:', result);

              if (result && result.data) {
                const text = result.data.text || '';
                const confidence = result.data.confidence || 0;

                console.log('[v0] Extracted text length:', text.length, 'confidence:', confidence);
                setIsLoading(false);
                resolve({ text, confidence });
              } else {
                throw new Error('Invalid OCR result format');
              }
            } catch (err) {
              const errorMessage = err instanceof Error ? err.message : 'OCR failed';
              console.log('[v0] OCR error details:', err);
              setError(errorMessage);
              setIsLoading(false);
              reject(new Error(errorMessage));
            }
          };

          reader.onerror = () => {
            const errorMessage = 'Failed to read file';
            setError(errorMessage);
            setIsLoading(false);
            reject(new Error(errorMessage));
          };

          reader.readAsArrayBuffer(file);
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'OCR initialization failed';
        console.log('[v0] OCR init error:', err);
        setError(errorMessage);
        setIsLoading(false);
        throw new Error(errorMessage);
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    extractText,
    isLoading,
    error,
    clearError,
  };
}
