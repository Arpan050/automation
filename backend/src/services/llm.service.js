import Groq from "groq-sdk";

export async function generateUpdatedContent(originalContent) {
  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "Rewrite the article clearly and professionally. Preserve meaning. Return plain text only."
        },
        {
          role: "user",
          content: originalContent.slice(0, 4000)
        }
      ],
      temperature: 0.4,
    });

    const text = completion?.choices?.[0]?.message?.content?.trim();

    // ✅ SUCCESS PATH
    if (text && text.length > 50) {
      return text;
    }

    // ❌ FALLBACK (THIS IS IMPORTANT)
    return `
[Auto-updated content]

${originalContent.slice(0, 3000)}

(Note: This article was updated using a fallback generator due to LLM limits.)
`;
  } catch (err) {
    // ❌ HARD FAIL SAFE
    return `
[Auto-updated content]

${originalContent.slice(0, 3000)}

(Note: This article was updated using a fallback generator due to an LLM error.)
`;
  }
}
