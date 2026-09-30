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

  // If no term matched, return top 3 general introduction chunks
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
): Promise<{ answer: string; sources: KnowledgeChunk[]; relatedTourSlug?: string }> {
  const geminiKey = process.env.GEMINI_API_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;

  // Build grounded context text from retrieved chunks
  const contextText = chunks
    .map((c, i) => `[Tài liệu ${i + 1} - ${c.id} - ${c.category}]\n${c.content}`)
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
Bạn là "Hà Giang AI" - Trợ lý du lịch thông minh, thân thiện và am hiểu văn hóa của website "Hà Giang Loop Expedition".
Nhiệm vụ của bạn là giải đáp thắc mắc của du khách dựa trên các tài liệu trích xuất từ cẩm nang du lịch Hà Giang (RAG Knowledge Base) dưới đây.

=== TÀI LIỆU RAG TRÍCH XUẤT TỪ FILE TRAINING ===
${contextText}

=== CÁC TOUR HIỆN CÓ CỦA CÔNG TY ===
1. Tour Hà Giang Loop - Xe máy Tự Lái (3N2Đ) - 2.890.000đ (Dốc Thẩm Mã, Mã Pí Lèng, Cột cờ Lũng Cú, Sông Nho Quế)
2. Tour Hà Giang Easy Rider - Có Xế Bản Địa Kèm (3N2Đ) - 3.990.000đ (An toàn cho người không vững tay lái, xế kiêm chụp ảnh)
3. Tour Khám Phá Cao Nguyên Đá - Xe Limousine / Ô tô (4N3Đ) - 4.850.000đ (Dành cho gia đình, người lớn tuổi, resort 4 sao)
4. Tour Trekking Đệ Nhất Hùng Quan & Chèo Kayak Hẻm Tu Sản (2N1Đ) - 2.150.000đ (Cắm trại Glamping bờ sông, chèo Kayak)
5. Cho Thuê Xe Côn Tay & Xe Số Phượt - 250.000đ/ngày (Wave, Blade, XR 150 kèm full giáp)

=== QUY TẮC TRẢ LỜI ===
1. Ưu tiên thông tin chính xác từ tài liệu RAG. Trả lời bằng tiếng Việt tự nhiên, ấm áp, nhiệt tình và chuyên nghiệp.
2. Định dạng câu trả lời rõ ràng, dùng bullet point, in đậm các địa danh và lưu ý quan trọng.
3. Cuối câu trả lời, dẫn chiếu mã tài liệu tham khảo (ví dụ: *Tham khảo: [HG-RAG-XXXX]*).
4. Nếu du khách hỏi về dịch vụ hay đặt tour, hãy giới thiệu gói tour phù hợp nhất và khuyến khích họ đặt tour ngay trên website.
5. Giữ câu trả lời súc tích, đi thẳng vào trọng tâm, tránh lan man.

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
          answer: generatedText,
          sources: chunks,
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
              content: `Bạn là trợ lý du lịch Hà Giang AI. Trả lời súc tích, ấm áp bằng tiếng Việt dựa trên tài liệu sau:\n${contextText}`,
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
          answer,
          sources: chunks,
          relatedTourSlug: matchedTour?.slug,
        };
      }
    } catch (openAiError) {
      console.warn('OpenAI API call failed, falling back to built-in generator:', openAiError);
    }
  }

  // ================= 3. BUILT-IN SMART RAG SYNTHESIZER (ZERO-KEY FALLBACK) =================
  // If no LLM key is configured, synthesize a coherent, high-quality answer directly from the retrieved knowledge chunks!
  const topChunk = chunks[0];
  const otherChunks = chunks.slice(1, 4);

  let synthesizedAnswer = `Dựa trên cẩm nang du lịch Hà Giang **(Knowledge Base v1.0)**, tôi xin chia sẻ với bạn những thông tin quan trọng nhất:\n\n`;

  // Main insight
  synthesizedAnswer += `📍 **Thông tin cốt lõi:**\n${topChunk.content}\n\n`;

  // Additional points
  if (otherChunks.length > 0) {
    synthesizedAnswer += `💡 **Những điểm cần lưu ý thêm:**\n`;
    otherChunks.forEach((c) => {
      synthesizedAnswer += `• ${c.content}\n`;
    });
    synthesizedAnswer += `\n`;
  }

  // Tour recommendation if relevant
  if (matchedTour) {
    synthesizedAnswer += `🎒 **Gợi ý tour phù hợp tại Hà Giang Loop Expedition:**\n`;
    synthesizedAnswer += `Bạn có thể tham khảo gói **[${matchedTour.title}]** với giá chỉ **${new Intl.NumberFormat('vi-VN').format(matchedTour.price)}đ**. Bạn có thể bấm nút **Đặt Tour Ngay** trên trang chủ để xem chi tiết lịch trình và thanh toán qua VietQR!\n\n`;
  }

  // Sources citation
  synthesizedAnswer += `📌 *Nguồn tra cứu: ${chunks.map((c) => `[${c.id}]`).join(', ')} từ file đào tạo Ha_Giang_RAG_Training_Knowledge_Base.pdf.*`;

  return {
    answer: synthesizedAnswer,
    sources: chunks,
    relatedTourSlug: matchedTour?.slug,
  };
}
