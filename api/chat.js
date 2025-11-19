// api/chat.js
export default async function handler(req, res) {
  try {
    const { prompt } = req.query;
    if (!prompt) {
      return res.status(400).json({ error: "No prompt" });
    }

    const apiUrl = `https://gpt-3-5.apis-bj-devs.workers.dev/?prompt=${encodeURIComponent(prompt)}`;
    const apiResp = await fetch(apiUrl);
    const apiJson = await apiResp.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "*");

    return res.status(200).json(apiJson);

  } catch (err) {
    return res.status(500).json({ error: err.toString() });
  }
}
