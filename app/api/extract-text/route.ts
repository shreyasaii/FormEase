import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload JPG, PNG, or PDF.' },
        { status: 400 }
      );
    }

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');

    // For PDFs, you would need to extract images first
    // For now, we'll use Google Cloud Vision API if available, otherwise return client-side extraction instruction
    
    return NextResponse.json({
      success: true,
      message: 'File prepared for OCR processing',
      base64: base64,
      fileName: file.name,
      fileType: file.type,
      instruction: 'Process this on the client side using Tesseract.js'
    });
  } catch (error) {
    console.error('OCR extraction error:', error);
    return NextResponse.json(
      { error: 'Failed to process file' },
      { status: 500 }
    );
  }
}
