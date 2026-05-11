import express from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { existsSync, mkdirSync, writeFileSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const STATIC_ROOT = join(__dirname, "../../funderpro_clone/funderpro.com");
const GROQ_API_KEY = process.env.GROQ_API_KEY;

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.static(STATIC_ROOT, { index: false }));

// ── Groq AI Chat endpoint ──────────────────────────────────────────────────
app.post("/mx-chat", async (req, res) => {
  if (!GROQ_API_KEY) {
    return res.status(503).json({ error: "AI assistant not configured." });
  }

  const { messages } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array required." });
  }

  const systemPrompt = {
    role: "system",
    content: `You are MX, the AI financial assistant for Multixpro.ai — a cutting-edge decentralized multi-asset investment platform. You are knowledgeable, professional, and concise.

Platform context:
- Multixpro.ai supports crypto (BTC, ETH, SOL, XRP, BNB, DOGE, ADA, AVAX, DOT, LINK, POL, USDC), stocks, forex, commodities, and real estate
- Users can trade, manage portfolios, transfer funds, and learn about markets
- The platform is decentralized, non-custodial, with bank-grade security
- CEO: Stephanie Alvina Diomin

Your role:
- Answer questions about crypto markets, trading strategies, portfolio allocation, DeFi, NFTs
- Help users navigate the platform (dashboard, assets, trade, advanced-trade, portfolio, prices, learn)
- Provide market insights and educational content
- Never give specific financial advice or guarantee returns
- Keep replies concise (2-4 sentences max unless explaining something complex)
- Use $ for prices, % for percentages
- Always end with a helpful follow-up question or suggestion when appropriate

Current simulated market data (May 2026):
BTC $94,512 (+2.34%), ETH $3,421 (+1.82%), SOL $198 (+4.21%), XRP $2.41 (+3.12%), BNB $412 (-0.84%), DOGE $0.185 (+1.24%)`
  };

  try {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Access-Control-Allow-Origin", "*");

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [systemPrompt, ...messages],
        max_tokens: 512,
        temperature: 0.7,
        stream: true,
      }),
    });

    if (!groqRes.ok) {
      const err = await groqRes.text();
      console.error("Groq error:", err);
      res.write(`data: ${JSON.stringify({ error: "AI service error" })}\n\n`);
      return res.end();
    }

    const reader = groqRes.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const data = line.slice(6).trim();
        if (data === "[DONE]") {
          res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
          continue;
        }
        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            res.write(`data: ${JSON.stringify({ content })}\n\n`);
          }
        } catch (_) {}
      }
    }

    res.end();
  } catch (err) {
    console.error("Chat error:", err.message);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal error" });
    } else {
      res.write(`data: ${JSON.stringify({ error: "Stream error" })}\n\n`);
      res.end();
    }
  }
});

// CORS preflight for /mx-chat
app.options("/mx-chat", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(204);
});

// ── Webpack chunk stub ─────────────────────────────────────────────────────
function webpackChunkStub(chunkId) {
  return `(self["webpackChunkfunderpro"]=self["webpackChunkfunderpro"]||[]).push([[${chunkId}],{}]);`;
}

// ── Proxy fallback for missing assets ─────────────────────────────────────
async function proxyFromOrigin(req, res) {
  const originUrl = `https://funderpro.com${req.path}`;
  try {
    const upstream = await fetch(originUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      redirect: "follow",
    });
    if (!upstream.ok) return res.status(upstream.status).send("Not found");
    const contentType = upstream.headers.get("content-type") || "application/octet-stream";
    const buffer = Buffer.from(await upstream.arrayBuffer());
    try {
      const localPath = join(STATIC_ROOT, req.path);
      mkdirSync(dirname(localPath), { recursive: true });
      writeFileSync(localPath, buffer);
    } catch (_) {}
    res.setHeader("Content-Type", contentType);
    return res.send(buffer);
  } catch (err) {
    console.error("Proxy error for", req.path, err.message);
    return res.status(502).send("Proxy error");
  }
}

// ── Route all GET requests ─────────────────────────────────────────────────
app.get("*", async (req, res) => {
  const reqPath = req.path;

  if (reqPath.startsWith('/build2') && !reqPath.match(/\.(js|css|png|jpg|jpeg|svg|webp|woff2?|ttf|ico|json)$/i)) {
    const spaIndex = join(STATIC_ROOT, 'build2', 'index.html');
    if (existsSync(spaIndex)) return res.sendFile(spaIndex);
  }

  const chunkMatch = reqPath.match(/\/build\/js\/(\d+)-[a-f0-9]+\.js$/);
  if (chunkMatch) {
    res.setHeader("Content-Type", "application/javascript");
    return res.send(webpackChunkStub(chunkMatch[1]));
  }

  let urlPath = reqPath;
  if (!urlPath.endsWith("/")) urlPath += "/";
  const candidates = [
    join(STATIC_ROOT, urlPath, "index.html"),
    join(STATIC_ROOT, urlPath.replace(/\/$/, ".html")),
    join(STATIC_ROOT, urlPath.replace(/\/$/, "")),
  ];
  for (const c of candidates) {
    if (existsSync(c)) return res.sendFile(c);
  }

  const isAsset = /\.(js|css|woff2?|ttf|eot|svg|png|jpg|jpeg|webp|gif|ico|json|map)$/i.test(reqPath);
  if (isAsset) return proxyFromOrigin(req, res);

  res.sendFile(join(STATIC_ROOT, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`MultiFunderPro server → http://0.0.0.0:${PORT}`);
});
