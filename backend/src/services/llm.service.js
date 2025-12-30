import OpenAI from "openai";
import "dotenv/config";


const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const improveArticleContent = async ({
  originalContent,
  referenceSnippets,
}) => {
  const referenceBlock = referenceSnippets
    .map((s, i) => `Reference ${i + 1}: ${s}`)
    .join("\n\n");

  const prompt = `
You are a technical content editor.

Task:
Improve the clarity, structure, and completeness of the article below.

Rules:
- Do NOT copy text from reference snippets
- Do NOT change the topic
- Do NOT remove important ideas
- Do NOT mention sources explicitly
- Do NOT add promotional language
- Write in clear, structured paragraphs
- Keep a professional, neutral tone
- Output ONLY the improved article text

Original Article:
"""
${originalContent}
"""

Reference Context (for understanding only):
"""
${referenceBlock}
"""
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.3,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0].message.content.trim();
};
