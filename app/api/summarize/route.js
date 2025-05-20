// app/api/summarize/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  const { text } = await req.json();
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent([
    `Summarize and clean up the following study notes: "${text}"`,
  ]);

  const response = await result.response;
  const summary = response.text();

  return new Response(JSON.stringify({ summary }), {
    headers: { "Content-Type": "application/json" },
  });
}
