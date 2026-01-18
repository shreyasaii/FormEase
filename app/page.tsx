'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import UploadSection from '@/components/upload-section';
import LanguageSelector from '@/components/language-selector';
import ExtractionViewer from '@/components/extraction-viewer';
import FormExplanation from '@/components/form-explanation';
import Checklist from '@/components/checklist';
import Footer from '@/components/footer';
import { ToastProvider, useToast } from '@/components/toast-provider';
import { useOCR } from '@/hooks/use-ocr';

interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  category: string;
}

function MainContent() {
  const { addToast } = useToast();
  const { extractText, isLoading: isOCRLoading, error: ocrError } = useOCR();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // State management
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('hi');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isExplaining, setIsExplaining] = useState(false);
  const [isGeneratingChecklist, setIsGeneratingChecklist] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [simpleModeEnabled, setSimpleModeEnabled] = useState(false);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);

  // Demo data
  const DEMO_FORM_TEXT = `FORM 12-B: COLLEGE ADMISSION APPLICATION

Section 1: Personal Information
Full Name: [Required]
Date of Birth: [DD/MM/YYYY]
Email Address: [Required]
Phone Number: [Mobile/Landline]

Section 2: Educational Background
High School Name:
Board/Curriculum (CBSE/ICSE/State):
Percentage/Grade:

Section 3: Documents to Submit
1. Birth Certificate (Original + Photocopy)
2. High School Mark Sheet (Certified Copy)
3. Migration Certificate
4. Character Certificate
5. Address Proof (Utility Bill/Ration Card)
6. Photo (4x6, Colored)
7. Parent/Guardian ID Proof

Important Notes:
- All documents must be submitted within 30 days of receiving admission offer
- Applications received after deadline will not be considered
- Incomplete applications will be rejected`;

  const DEMO_EXPLANATION = `What this form is for:
This is a college admission form used by educational institutions to collect basic information about students applying for admission.

Who should fill it:
High school students applying for undergraduate programs or parents/guardians if the student is a minor.

What documents are needed:
1. Birth Certificate - Proof of date of birth
2. High School Mark Sheets - Academic record from Class 10 and 12
3. Migration Certificate - If changing schools in final years
4. Character Certificate - From previous school
5. Address Proof - Any government-issued utility bill or ration card
6. Passport size photo - Recent colored photograph
7. Parent/Guardian ID - For verification purposes

Where to submit:
Submit to the college admission office during office hours (9 AM - 5 PM) or by post with registered AD.

Common mistakes to avoid:
1. Writing in pencil - Always use blue/black pen
2. Leaving fields blank - Fill all required (*) fields
3. Providing incomplete documents - Ensure certified copies
4. Missing deadline - Submit before the last date
5. Wrong personal details - Double-check spelling of name and DOB`;

  const DEMO_CHECKLIST: ChecklistItem[] = [
    {
      id: '1',
      label: 'Birth Certificate (Original + Photocopy)',
      completed: false,
      category: 'Documents Required',
    },
    {
      id: '2',
      label: 'High School Mark Sheets',
      completed: false,
      category: 'Documents Required',
    },
    {
      id: '3',
      label: 'Migration Certificate',
      completed: false,
      category: 'Documents Required',
    },
    {
      id: '4',
      label: 'Character Certificate',
      completed: false,
      category: 'Documents Required',
    },
    {
      id: '5',
      label: 'Address Proof (Bill/Ration Card)',
      completed: false,
      category: 'Documents Required',
    },
    {
      id: '6',
      label: 'Photo ID of Parent/Guardian',
      completed: false,
      category: 'ID/Signature Required',
    },
    {
      id: '7',
      label: 'Passport Size Photo (Colored)',
      completed: false,
      category: 'ID/Signature Required',
    },
    {
      id: '8',
      label: 'Student Signature on Form',
      completed: false,
      category: 'ID/Signature Required',
    },
    {
      id: '9',
      label: 'Parent/Guardian Signature',
      completed: false,
      category: 'ID/Signature Required',
    },
    {
      id: '10',
      label: 'Form Submission Before Deadline',
      completed: false,
      category: 'Submission',
    },
  ];

  // Real file upload and OCR extraction using Tesseract.js
  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setIsLoading(true);
    setIsSuccess(false);

    try {
      // Check if file is PDF
      if (file.type === 'application/pdf') {
        addToast('PDF support coming soon. Please use JPG or PNG images for now.', 'info');
        setIsLoading(false);
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        addToast('File is too large. Please use an image under 5MB.', 'error');
        setIsLoading(false);
        return;
      }

      // Use Tesseract.js for OCR
      console.log('[v0] Starting OCR extraction for file:', file.name, 'size:', file.size);
      const result = await extractText(file);
      
      if (result && result.text) {
        console.log('[v0] OCR completed with confidence:', result.confidence);
        const extractedText = result.text.trim();
        
        if (extractedText.length > 10) {
          setOriginalText(extractedText);
          setIsSuccess(true);
          const confPercent = typeof result.confidence === 'number' ? Math.round(result.confidence) : 0;
          addToast(`Text extracted successfully! Confidence: ${confPercent}%`, 'success');
          
          // Reset translation when new file is uploaded
          setTranslatedText('');
          setExplanation('');
          setChecklist([]);
        } else {
          addToast('No text found in image. Try using a clearer form image with better lighting.', 'error');
        }
      } else {
        addToast('OCR returned no results. Please try another image.', 'error');
      }
    } catch (error) {
      console.log('[v0] OCR error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Failed to extract text';
      
      // Suggest demo if OCR fails
      addToast(`OCR failed: ${errorMsg}. Try the "Try Demo" button instead.`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Real translation using backend API
  const handleTranslate = async () => {
    if (!originalText) {
      addToast('Please upload a form first.', 'error');
      return;
    }

    setIsTranslating(true);
    try {
      console.log('[v0] Starting translation to:', selectedLanguage);
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: originalText,
          targetLanguage: selectedLanguage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Translation failed');
      }

      console.log('[v0] Translation completed');
      setTranslatedText(data.translatedText);
      addToast(`Form translated to ${selectedLanguage.toUpperCase()} successfully!`, 'success');
    } catch (error) {
      console.log('[v0] Translation error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Translation failed';
      addToast(`Translation Error: ${errorMsg}`, 'error');
    } finally {
      setIsTranslating(false);
    }
  };

  // Real explanation generation using Gemini AI
  const handleExplain = async () => {
    if (!originalText) {
      addToast('Please upload a form first.', 'error');
      return;
    }

    setIsExplaining(true);
    try {
      console.log('[v0] Starting explanation generation, simple mode:', simpleModeEnabled);
      const response = await fetch('/api/explain-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: originalText,
          simpleMode: simpleModeEnabled,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Explanation generation failed');
      }

      console.log('[v0] Explanation generated successfully');
      setExplanation(data.explanation);
      addToast('Form explanation generated successfully!', 'success');
    } catch (error) {
      console.log('[v0] Explanation error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Explanation generation failed';
      addToast(`Error: ${errorMsg}. Make sure GEMINI_API_KEY is set.`, 'error');
    } finally {
      setIsExplaining(false);
    }
  };

  // Simulate checklist generation
  const handleGenerateChecklist = async () => {
    if (!originalText) {
      addToast('Please upload a form first.', 'error');
      return;
    }

    setIsGeneratingChecklist(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setChecklist(DEMO_CHECKLIST);
      addToast('Checklist generated successfully!', 'success');
    } catch (error) {
      addToast('Failed to generate checklist. Please try again.', 'error');
    } finally {
      setIsGeneratingChecklist(false);
    }
  };

  // Demo button handler - loads demo text without OCR
  const handleDemoClick = () => {
    try {
      console.log('[Demo] Loading demo form...');
      setOriginalText(DEMO_FORM_TEXT);
      setIsSuccess(true);
      setIsLoading(false);
      setTranslatedText('');
      setExplanation('');
      setChecklist([]);
      setUploadedFile(null);
      addToast('Demo form loaded! Start exploring.', 'info');
      console.log('[Demo] Demo form loaded successfully');
    } catch (error) {
      console.error('[Demo] Error loading demo:', error);
      addToast('Failed to load demo. Please try again.', 'error');
    }
  };

  // Handle upload button click - triggers file input
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  // Copy to clipboard
  const handleCopy = (text: string, type: 'original' | 'translated') => {
    navigator.clipboard.writeText(text);
    addToast(`${type === 'original' ? 'Original' : 'Translated'} text copied!`, 'success');
  };

  // Download as text file
  const handleDownload = (text: string, type: 'original' | 'translated') => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `form-${type}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    addToast(`${type === 'original' ? 'Original' : 'Translated'} text downloaded!`, 'success');
  };

  // Summarize explanation using Gemini
  const handleSummarize = async () => {
    if (!originalText) {
      addToast('Please upload a form first.', 'error');
      return;
    }

    setIsExplaining(true);
    try {
      console.log('[v0] Starting summary generation');
      const response = await fetch('/api/explain-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `${originalText}\n\nPlease provide a 5-line summary of this form including: what it's for, who fills it, required documents, where to submit, and key deadlines.`,
          simpleMode: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Summary generation failed');
      }

      console.log('[v0] Summary generated');
      setExplanation(data.explanation);
      addToast('Summary generated!', 'success');
    } catch (error) {
      console.log('[v0] Summary error:', error);
      addToast('Failed to generate summary. Check if GEMINI_API_KEY is set.', 'error');
    } finally {
      setIsExplaining(false);
    }
  };

  // Copy explanation
  const handleCopyExplanation = () => {
    navigator.clipboard.writeText(explanation);
    addToast('Explanation copied!', 'success');
  };

  // Toggle checklist item
  const handleToggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Download checklist
  const handleDownloadChecklist = () => {
    const checklistText = checklist
      .map((item) => `[${item.completed ? 'X' : ' '}] ${item.label}`)
      .join('\n');
    const element = document.createElement('a');
    const file = new Blob([checklistText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'form-checklist.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    addToast('Checklist downloaded!', 'success');
  };

  // Copy checklist
  const handleCopyChecklist = () => {
    const checklistText = checklist
      .map((item) => `[${item.completed ? 'X' : ' '}] ${item.label}`)
      .join('\n');
    navigator.clipboard.writeText(checklistText);
    addToast('Checklist copied!', 'success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <Header onUploadClick={handleUploadClick} onDemoClick={handleDemoClick} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
        {/* Hidden file input for header button */}
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileInputChange}
          accept=".jpg,.jpeg,.png,.pdf"
          className="hidden"
          aria-label="Upload form file"
        />

        {/* Upload Section */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Upload a Form
          </h2>
          <UploadSection
            onFileUpload={handleFileUpload}
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        </section>

        {/* Language & Controls Section */}
        {(originalText || isSuccess) && (
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Translate & Explain
            </h2>
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
              onTranslate={handleTranslate}
              onExplain={handleExplain}
              onGenerateChecklist={handleGenerateChecklist}
              isTranslating={isTranslating}
              isExplaining={isExplaining}
              isGeneratingChecklist={isGeneratingChecklist}
              simpleModeEnabled={simpleModeEnabled}
              onSimpleModeToggle={() => setSimpleModeEnabled(!simpleModeEnabled)}
            />
          </section>
        )}

        {/* Extraction Viewer */}
        {(originalText || translatedText) && (
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Extracted & Translated Content
            </h2>
            <ExtractionViewer
              originalText={originalText}
              translatedText={translatedText}
              onCopy={handleCopy}
              onDownload={handleDownload}
            />
          </section>
        )}

        {/* Form Explanation */}
        {explanation && (
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Understanding Your Form
            </h2>
            <FormExplanation
              explanation={explanation}
              isLoading={isExplaining}
              onSummarize={handleSummarize}
              onCopy={handleCopyExplanation}
              simpleModeEnabled={simpleModeEnabled}
            />
          </section>
        )}

        {/* Checklist */}
        {checklist.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Document & Preparation Checklist
            </h2>
            <Checklist
              items={checklist}
              onToggleItem={handleToggleChecklistItem}
              onDownload={handleDownloadChecklist}
              onCopy={handleCopyChecklist}
            />
          </section>
        )}

        {/* Empty State */}
        {!originalText && !isLoading && (
          <div className="text-center py-12">
            <div className="inline-block p-6 rounded-2xl bg-secondary/50 border border-border">
              <p className="text-muted-foreground text-lg">
                Start by uploading a form or try the demo to see how FormEase works
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function Page() {
  return (
    <ToastProvider>
      <MainContent />
    </ToastProvider>
  );
}
