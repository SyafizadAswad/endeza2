"use client";
import { useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [quiz, setQuiz] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const handleSummarize = async () => {
    const res = await fetch("/api/summarize", {
      method: "POST",
      body: JSON.stringify({ text: notes }),
    });
    const data = await res.json();
    setSummary(data.summary);
  };

  const handleQuiz = async () => {
    const res = await fetch("/api/quiz", {
      method: "POST",
      body: JSON.stringify({ notes }),
    });
    const data = await res.json();
    setQuiz(data.quiz);
  };

  const handleTTS = async () => {
    const res = await fetch("/api/tts", {
      method: "POST",
      body: JSON.stringify({ text: summary }),
    });
    const data = await res.json();
    setAudioUrl(data.audioUrl);
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Study Manager</h1>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        rows={6}
        placeholder="Paste your study notes here..."
      />
      <div className="flex gap-2 mb-4">
        <button onClick={handleSummarize}>Summarize</button>
        <button onClick={handleQuiz}>Generate Quiz</button>
        <button onClick={handleTTS}>Create Audio</button>
      </div>

      {summary && (
        <>
          <h2 className="font-semibold">Summary:</h2>
          <p>{summary}</p>
        </>
      )}

      {quiz && (
        <>
          <h2 className="font-semibold mt-4">Quiz:</h2>
          <pre className="bg-gray-100 p-2 rounded">{quiz}</pre>
        </>
      )}

      {audioUrl && (
        <div className="mt-4">
          <h2 className="font-semibold">Listen:</h2>
          <audio controls src={audioUrl}></audio>
        </div>
      )}
    </main>
  );
}
