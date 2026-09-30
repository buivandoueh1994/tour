import knowledgeData from '@/data/knowledge-base.json';
import { TOURS_DATA } from '@/data/tours';

export interface KnowledgeChunk {
  id: string;
  category: string;
  content: string;
  keywords: string[];
  score?: number;
}

const ALL_CHUNKS: KnowledgeChunk[] = knowledgeData as KnowledgeChunk[];

// Common Vietnamese stop words to filter out from query
const STOP_WORDS = new Set([
  'là', 'và', 'của', 'cho', 'ở', 'có', 'thì', 'được', 'với', 'như', 'nào', 
  'gì', 'thế', 'sao', 'các', 'những', 'một', 'cái', 'con', 'đi', 'đến', 'tại', 
  'cho', 'mình', 'em', 'anh', 'chị', 'bạn', 'ơi', 'hỏi', 'về', 'giúp', 'tôi', 'biết'
]);

function removeVietnameseTones(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

/**
 * Clean raw chunk text from PDF artifacts, Q&A prefixes, and numbering
 */
function cleanChunkContent(raw: string): string {
  let cleaned = raw
    .replace(/^Q:\s*.*?\s*A:\s*/i, '') // Remove "Q: ... A: "
    .replace(/^\d+\.\s*/, '') // Remove "12. "
    .replace(/^\[HG-[A-Z0-9-]+\]\s*/i, '') // Remove "[HG-LOC-012] "
    .replace(/^[A-Z0-9\s—–-]{3,30}:\s*/, '') // Remove all-caps prefixes like "MEO VAC: "
    .replace(/\d+\.\s+[A-Z\s—–-]{3,}.*$/, '') // Remove trailing section headers like "8. SAMPLE TOUR PRODUCTS..."
    .replace(/Chatbot nên\s+[^.]*(\.|$)/gi, '') // Remove internal chatbot training notes
    .replace(/Khi trả lời,\s+[^.]*(\.|$)/gi, '')
    .trim();

  // Capitalize first letter if needed
  if (cleaned.length > 0) {
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }
  return cleaned;
}

/**
 * Retrieve the most relevant chunks from the Ha Giang RAG Knowledge Base.
 */
export function retrieveRelevantChunks(query: string, topK = 5): KnowledgeChunk[] {
  if (!query || !query.trim()) return [];

  const rawQuery = query.toLowerCase().trim();
  const queryNoTone = removeVietnameseTones(rawQuery);

  // Extract query terms (filter out stop words)
  const queryTerms = rawQuery
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 2 && !STOP_WORDS.has(w));

  const scoredChunks = ALL_CHUNKS.map((chunk) => {
    let score = 0;
    const contentLower = chunk.content.toLowerCase();
    const contentNoTone = removeVietnameseTones(chunk.content);
    const categoryLower = chunk.category.toLowerCase();

    // 1. Exact query match bonus
    if (contentLower.includes(rawQuery) || contentNoTone.includes(queryNoTone)) {
      score += 25;
    }

    // 2. Multi-word phrase matches (bigrams / trigrams)
    for (let i = 0; i < queryTerms.length - 1; i++) {
      const bigram = `${queryTerms[i]} ${queryTerms[i + 1]}`;
      if (contentLower.includes(bigram)) {
        score += 8;
      }
    }

    // 3. Individual term matches with TF (term frequency)
    for (const term of queryTerms) {
      if (chunk.keywords.includes(term)) {
        score += 3;
      }

      // Check occurrences in content
      const matches = contentLower.split(term).length - 1;
      if (matches > 0) {
        score += Math.min(matches, 3) * 1.5;
      }

      // Category match bonus
      if (categoryLower.includes(term)) {
        score += 4;
      }
    }

    // 4. Important entities boost
    const SPECIAL_ENTITIES = [
      'mã pí lèng', 'nho quế', 'lũng cú', 'đồng văn', 'mèo vạc', 'quản bạ', 
      'yên minh', 'du già', 'hoàng su phì', 'tam giác mạch', 'lúa chín', 
      'easy rider', 'tự lái', 'bằng lái', 'giấy phép', 'lô lô chải', 'pả vi', 
      'hẻm tu sản', 'thắng cố', 'bánh cuốn', 'lẩu gà đen', 'thời tiết', 'chi phí'
    ];

    for (const entity of SPECIAL_ENTITIES) {
      if (rawQuery.includes(entity) && contentLower.includes(entity)) {
        score += 10;
      }
    }

    return {
      ...chunk,
      score,
    };
  });

  // Sort descending by score
  const ranked = scoredChunks
    .filter((chunk) => chunk.score && chunk.score > 0)
    .sort((a, b) => (b.score || 0) - (a.score || 0));

  if (ranked.length === 0) {
    return ALL_CHUNKS.slice(0, 3);
  }

  return ranked.slice(0, topK);
}

/**
 * Generate answer using LLM (Gemini or OpenAI) with RAG context,
 * or fallback to our smart built-in natural language synthesizer.
 */
export async function generateRAGAnswer(
  query: string,
  chunks: KnowledgeChunk[]
): Promise<{ answer: string; relatedTourSlug?: string }> {
  const geminiKey = process.env.GEMINI_API_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;

  // Build grounded context text from retrieved chunks
  const contextText = chunks
    .map((c, i) => `[Tài liệu ${i + 1} - ${c.category}]\n${c.content}`)
    .join('\n\n');

  // Check if any tour on our site matches the query
  const matchedTour = TOURS_DATA.find((t) => {
    const q = query.toLowerCase();
    return (
      (q.includes('easy rider') && t.transportType === 'easy-rider') ||
      (q.includes('tự lái') && t.transportType === 'motorbike') ||
      ((q.includes('ô tô') || q.includes('limousine') || q.includes('gia đình')) && t.transportType === 'limousine') ||
      ((q.includes('trekking') || q.includes('kayak')) && t.transportType === 'trekking') ||
      (q.includes('thuê xe') && t.transportType === 'rental')
    );
  });

  // ================= 1. GEMINI API INTEGRATION =================
  if (geminiKey && geminiKey.trim() !== '') {
    try {
      const prompt = `
Bạn là "Hà Giang AI" - Trợ lý du lịch thân thiện, am hiểu văn hóa của website "Hà Giang Loop Expedition".
Hãy giải đáp thắc mắc của du khách bằng tiếng Việt chuẩn mực, ấm áp và chuyên nghiệp dựa trên tài liệu cẩm nang du lịch Hà Giang dưới đây.

=== TÀI LIỆU CẨM NANG HÀ GIANG ===
${contextText}

=== CÁC TOUR HIỆN CÓ CỦA CÔNG TY ===
1. Tour Hà Giang Loop - Xe máy Tự Lái (3N2Đ) - 2.890.000đ (Dốc Thẩm Mã, Mã Pí Lèng, Cột cờ Lũng Cú, Sông Nho Quế)
2. Tour Hà Giang Easy Rider - Có Xế Bản Địa Kèm (3N2Đ) - 3.990.000đ (An toàn cho người không vững tay lái, xế kiêm chụp ảnh)
3. Tour Khám Phá Cao Nguyên Đá - Xe Limousine / Ô tô (4N3Đ) - 4.850.000đ (Dành cho gia đình, người lớn tuổi, resort 4 sao)
4. Tour Trekking Đệ Nhất Hùng Quan & Chèo Kayak Hẻm Tu Sản (2N1Đ) - 2.150.000đ (Cắm trại Glamping bờ sông, chèo Kayak)
5. Cho Thuê Xe Côn Tay & Xe Số Phượt - 250.000đ/ngày (Wave, Blade, XR 150 kèm full giáp)

=== QUY TẮC TRẢ LỜI ===
1. Trả lời trực tiếp, rõ ràng, gãy gọn và thân thiện.
2. Dùng gạch đầu dòng (•) cho các ý chính để du khách dễ đọc. In đậm các tên địa danh và thông tin quan trọng.
3. TUYỆT ĐỐI KHÔNG ghi mã tài liệu (như HG-RAG-XXXX) và KHÔNG ghi dòng nguồn tham khảo ở cuối câu trả lời.
4. Nếu du khách hỏi về phương tiện hay cách đi, hãy gợi ý gói tour phù hợp nhất của công ty và hướng dẫn đặt ngay trên web.
5. Giữ câu trả lời súc tích, độ dài vừa phải (khoảng 3-5 ý chính).

Câu hỏi của du khách: "${query}"
`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.4,
              maxOutputTokens: 800,
            },
          }),
        }
      );

      const data = await res.json();
      const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (generatedText) {
        return {
          answer: generatedText.trim(),
          relatedTourSlug: matchedTour?.slug,
        };
      }
    } catch (geminiError) {
      console.warn('Gemini API call failed, falling back to built-in generator:', geminiError);
    }
  }

  // ================= 2. OPENAI API INTEGRATION =================
  if (openAiKey && openAiKey.trim() !== '') {
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `Bạn là trợ lý du lịch Hà Giang AI. Trả lời súc tích, ấm áp bằng tiếng Việt dựa trên tài liệu cẩm nang. Tuyệt đối không in mã tài liệu hay nguồn tham khảo. Trình bày rõ ràng bằng các gạch đầu dòng.\n${contextText}`,
            },
            { role: 'user', content: query },
          ],
          temperature: 0.4,
        }),
      });
      const data = await res.json();
      const answer = data?.choices?.[0]?.message?.content;
      if (answer) {
        return {
          answer: answer.trim(),
          relatedTourSlug: matchedTour?.slug,
        };
      }
    } catch (openAiError) {
      console.warn('OpenAI API call failed, falling back to built-in generator:', openAiError);
    }
  }

  // ================= 3. BUILT-IN SMART RAG SYNTHESIZER (ZERO-KEY FALLBACK) =================
  // Clean and filter chunks for natural speech
  const cleanedPoints: string[] = [];
  const seenTexts = new Set<string>();

  for (const c of chunks) {
    const cleaned = cleanChunkContent(c.content);
    // Ignore duplicate or too short fragments
    if (cleaned.length < 25 || seenTexts.has(cleaned)) continue;
    seenTexts.add(cleaned);
    cleanedPoints.push(cleaned);
    if (cleanedPoints.length >= 4) break;
  }

  let synthesizedAnswer = '';

  if (cleanedPoints.length > 0) {
    // Lead-in statement
    synthesizedAnswer += `${cleanedPoints[0]}\n\n`;

    // Supporting details as bullet points
    if (cleanedPoints.length > 1) {
      synthesizedAnswer += `**Một số thông tin hữu ích cần biết:**\n`;
      for (let i = 1; i < cleanedPoints.length; i++) {
        synthesizedAnswer += `• ${cleanedPoints[i]}\n`;
      }
      synthesizedAnswer += `\n`;
    }
  } else {
    synthesizedAnswer += `Hà Giang là vùng đất kỳ vĩ với cao nguyên đá vôi, đèo Mã Pí Lèng và dòng sông Nho Quế. Bạn có thể chọn tự lái xe máy nếu có kinh nghiệm, hoặc chọn tour có xế bản địa (Easy Rider) để an tâm ngắm cảnh.\n\n`;
  }

  // Tour recommendation if relevant
  if (matchedTour) {
    synthesizedAnswer += `🎒 **Gợi ý lịch trình phù hợp:**\n`;
    synthesizedAnswer += `Bạn có thể tham khảo gói **[${matchedTour.title}]** với chi phí chỉ **${new Intl.NumberFormat('vi-VN').format(matchedTour.price)}đ/người**. Chuyến đi đã bao gồm bảo hiểm, chỗ nghỉ homestay và hỗ trợ toàn diện.\n`;
  }

  return {
    answer: synthesizedAnswer.trim(),
    relatedTourSlug: matchedTour?.slug,
  };
}
