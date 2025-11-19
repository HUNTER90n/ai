// api/qwen.js
export default async function handler(req, res) {
  try {
    const { text } = req.query;
    if (!text) return res.status(400).json({ error: "No text provided" });

    // Free Qwen API URL (reverse API)
    const qwenURL = `https://qwen-api.ai4chat.co/chat?text=${encodeURIComponent(text)}`;

    const response = await fetch(qwenURL, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    if (!response.ok) throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    const data = await response.json();

    // data.reply contains the AI response
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    return res.status(200).json({ reply: data.reply || "No response" });
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
}
