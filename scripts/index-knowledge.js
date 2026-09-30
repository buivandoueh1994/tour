const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

async function extractAndIndexKnowledge() {
  const pdfPath = path.join(__dirname, '..', 'resources', 'Ha_Giang_RAG_Training_Knowledge_Base.pdf');
  const outputPath = path.join(__dirname, '..', 'data', 'knowledge-base.json');

  if (!fs.existsSync(pdfPath)) {
    console.error('File not found:', pdfPath);
    process.exit(1);
  }

  console.log('Reading PDF:', pdfPath);
  const dataBuffer = fs.readFileSync(pdfPath);
  const pdfData = await pdf(dataBuffer);

  const rawText = pdfData.text;

  // Pattern matching HG-RAG-XXXX
  const parts = rawText.split(/(HG-RAG-\d{4}\s*\|\s*)/g);
  const chunks = [];

  // Track current section header
  let currentSection = 'Tổng Quan & Giới Thiệu';

  for (let i = 1; i < parts.length; i += 2) {
    const idMatch = parts[i].match(/HG-RAG-\d{4}/);
    const id = idMatch ? idMatch[0] : `HG-RAG-${String(Math.floor(i / 2)).padStart(4, '0')}`;
    let body = (parts[i + 1] || '').trim();

    // Clean page header/footer artifacts and trailing appendix notes
    body = body.replace(/Ha Giang Tourism AI — RAG Knowledge Base v\d\.\d\s*Trang \d+/gi, '').trim();
    if (body.includes('31. INTENT TAXONOMY FOR CHATBOT')) {
      body = body.split('31. INTENT TAXONOMY FOR CHATBOT')[0].trim();
    }

    const lines = body.split('\n').map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) continue;

    // Check if first line is a section title (e.g. "3. CORE DESTINATIONS...")
    let category = currentSection;
    let contentLines = lines;

    if (lines[0].match(/^\d+\.\s+/)) {
      currentSection = lines[0];
      category = currentSection;
      contentLines = lines.slice(1);
    }

    const content = contentLines.join(' ').replace(/\s+/g, ' ').trim();

    // Extract search keywords (lowercase words >= 3 chars, specific names)
    const keywords = [
      ...new Set(
        content
          .toLowerCase()
          .replace(/[^\p{L}\p{N}\s]/gu, ' ')
          .split(/\s+/)
          .filter((w) => w.length >= 2)
      ),
    ];

    chunks.push({
      id,
      category,
      content,
      keywords,
    });
  }

  console.log(`Extracted ${chunks.length} chunks from knowledge base.`);

  // Write to data/knowledge-base.json
  fs.writeFileSync(outputPath, JSON.stringify(chunks, null, 2), 'utf-8');
  console.log('Successfully saved to:', outputPath);

  return chunks;
}

extractAndIndexKnowledge().catch(console.error);
