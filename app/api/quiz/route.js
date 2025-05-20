// app/api/quiz/route.js
import { GoogleGenerativeAI } from "@google/genai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  const { notes } = await req.json();
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent([
    `Generate 3 quiz questions (MCQ format) based on the following notes:\n\n${notes}`,
  ]);

  const response = await result.response;
  const quiz = response.text();

  return new Response(JSON.stringify({ quiz }), {
    headers: { "Content-Type": "application/json" },
  });
}
