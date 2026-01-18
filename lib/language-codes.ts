'use client';

// Mapping of language display names to language codes
export const LANGUAGE_CODES: Record<string, { code: string; name: string }> = {
  en: { code: 'en', name: 'English' },
  hi: { code: 'hi', name: 'Hindi' },
  mr: { code: 'mr', name: 'Marathi' },
  ta: { code: 'ta', name: 'Tamil' },
  te: { code: 'te', name: 'Telugu' },
  bn: { code: 'bn', name: 'Bengali' },
  gu: { code: 'gu', name: 'Gujarati' },
  kn: { code: 'kn', name: 'Kannada' },
  ml: { code: 'ml', name: 'Malayalam' },
  pa: { code: 'pa', name: 'Punjabi' },
};

// Language names for display
export const LANGUAGE_NAMES = [
  'English',
  'Hindi',
  'Marathi',
  'Tamil',
  'Telugu',
  'Bengali',
  'Gujarati',
  'Kannada',
  'Malayalam',
  'Punjabi',
];

// Get language code from display name
export const getLanguageCode = (name: string): string => {
  for (const [key, value] of Object.entries(LANGUAGE_CODES)) {
    if (value.name === name) return key;
  }
  return 'en';
};
