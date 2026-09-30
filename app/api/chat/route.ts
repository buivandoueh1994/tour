import { NextRequest, NextResponse } from 'next/server';
import { retrieveRelevantChunks, generateRAGAnswer } from '@/lib/rag';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { success: false, message: 'Nội dung tin nhắn không được để trống' },
        { status: 400 }
      );
    }

    const query = message.trim();

    // 1. Retrieve the top relevant chunks from the RAG knowledge base
    const retrievedChunks = retrieveRelevantChunks(query, 5);

    // 2. Generate grounded answer
    const result = await generateRAGAnswer(query, retrievedChunks);

    return NextResponse.json({
      success: true,
      answer: result.answer,
      relatedTourSlug: result.relatedTourSlug,
    });
  } catch (error: unknown) {
    console.error('Lỗi API Chat RAG:', error);
    const msg = error instanceof Error ? error.message : 'Lỗi hệ thống khi xử lý câu hỏi';
    return NextResponse.json(
      { success: false, message: msg },
      { status: 500 }
    );
  }
}
