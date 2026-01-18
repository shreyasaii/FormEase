'use client';

import { useState, useCallback } from 'react';

interface OCRResult {
  text: string;
  confidence: number;
}

export function useOCR() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractText = useCallback(async (file: File): Promise<OCRResult | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const Tesseract = (await import('tesseract.js')).default;

      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = async () => {
          let worker: any = null;
          try {
            const imageData = reader.result;

            //  Type guard: ensures it's a valid ImageLike input
            if (typeof imageData !== 'string') {
              throw new Error('Invalid file format for OCR (expected base64 DataURL)');
            }

            const result = await Tesseract.recognize(imageData, 'eng', {
              logger: (info: any) => {
                console.log(
                  '[v0] Tesseract progress:',
                  info.status,
                  Math.round((info.progress || 0) * 100) + '%'
                );
              },
            });

            if (result?.data) {
              const text = result.data.text || '';
              const confidence = result.data.confidence || 0;

              setIsLoading(false);
              resolve({ text, confidence });
            } else {
              throw new Error('Invalid OCR result format');
            }
          } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'OCR failed';
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

        // ✅ Use DataURL instead of ArrayBuffer (most compatible with Tesseract ImageLike)
        reader.readAsDataURL(file);
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'OCR initialization failed';
      setError(errorMessage);
      setIsLoading(false);
      throw new Error(errorMessage);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { extractText, isLoading, error, clearError };
}
