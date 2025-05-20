// app/api/tts/route.js
export async function POST(req) {
  const { text } = await req.json();

  const params = new URLSearchParams({
    key: process.env.VOICERSS_API_KEY, // Get free key from voicerss.org
    hl: "en-us",
    src: text,
    c: "MP3",
    f: "44khz_16bit_stereo",
  });

  const ttsUrl = `https://api.voicerss.org/?${params.toString()}`;

  return new Response(JSON.stringify({ audioUrl: ttsUrl }), {
    headers: { "Content-Type": "application/json" },
  });
}
