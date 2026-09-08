"use client";
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "bot";
  text: string;
}

const SYSTEM_PROMPT = `You are an AI assistant embedded in Galina Kupina's UX design portfolio. Your role is to help hiring managers and recruiters learn about Galina quickly and naturally.

About Galina:
- UX Designer specializing in UX Research, UX/UI Design, and Front-End development (HTML/CSS)
- Case studies: AI-Powered SAT Prep Platform (PrepMate) — EdTech, team project, 10 weeks, Sept–Nov 2024. Personalized Nutrition App (NutriWise) — solo project, 20 weeks, Jan–Jun 2025
- Tools: Figma, Miro, Canva, Vision Studio, GitHub, FigJam, Optimal Workshop
- Skills: user interviews, usability testing, wireframing, prototyping, journey mapping, persona development
- Email: galinauxdesign@gmail.com
- Available for hire

Keep answers short, friendly, and conversational — 2-4 sentences max. Never make up facts. If unsure, suggest they email Galina directly.`;

const CHIPS = ["What's your process?", "See case studies", "Available for hire?", "Skills & tools"];

function getFallbackReply(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("process") || t.includes("approach"))
    return "Galina follows a research-first process — she starts with user interviews, builds personas and journey maps, then moves through wireframes, prototyping, and usability testing before finalising hi-fi designs.";
  if (t.includes("case") || t.includes("project") || t.includes("work"))
    return "Galina has two case studies: PrepMate — an AI-powered SAT prep platform (EdTech, team project, 10 weeks), and a Personalized Nutrition App (solo, 20 weeks). Both are on this page!";
  if (t.includes("hire") || t.includes("available") || t.includes("job"))
    return "Yes, Galina is currently open to new opportunities! Reach out directly at galinauxdesign@gmail.com to start a conversation.";
  if (t.includes("skill") || t.includes("tool") || t.includes("figma"))
    return "Galina works with Figma, Miro, Canva, Vision Studio, and GitHub. Her skills span UX research, UX/UI design, usability testing, and front-end development (HTML/CSS).";
  if (t.includes("contact") || t.includes("email") || t.includes("reach"))
    return "You can reach Galina at galinauxdesign@gmail.com — she typically responds within 24 hours.";
  if (t.includes("hello") || t.includes("hi") || t.includes("hey"))
    return "Hi there! 👋 I can tell you about Galina's work, skills, process, or availability. What would you like to know?";
  return "Great question! For a detailed answer, reach out to Galina directly at galinauxdesign@gmail.com — she'd love to chat.";
}

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! 👋 I'm Galina's AI assistant. Ask me about her work, skills, or availability." },
  ]);
  const [showChips, setShowChips] = useState(true);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<{ role: string; content: string }[]>([]);
  const msgEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    setShowChips(false);
    setInput("");
    const newHistory = [...history, { role: "user", content: text }];
    setMessages((m) => [...m, { role: "user", text }]);
    setHistory(newHistory);
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": (window as any).ANTHROPIC_API_KEY || "",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 300,
          system: SYSTEM_PROMPT,
          messages: newHistory,
        }),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Happy to help — try emailing Galina directly at galinauxdesign@gmail.com!";
      setMessages((m) => [...m, { role: "bot", text: reply }]);
      setHistory((h) => [...h, { role: "assistant", content: reply }]);
    } catch {
      const reply = getFallbackReply(text);
      setMessages((m) => [...m, { role: "bot", text: reply }]);
      setHistory((h) => [...h, { role: "assistant", content: reply }]);
    }
    setLoading(false);
  }

  return (
    <div className="fixed bottom-7 right-7 z-[300] flex flex-col items-end gap-3 pointer-events-none">
      {/* Chat window */}
      <div
        className={`w-[300px] bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)] origin-bottom-right transition-all duration-300 ${
          open ? "scale-100 opacity-100 pointer-events-auto" : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-[#1a1a1a] px-3.5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
            <div>
              <div className="font-body text-[12px] font-medium text-white">Ask me anything</div>
              <div className="font-body text-[10px] text-[#888]">Galina&apos;s AI assistant</div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="bg-transparent border-none text-[#666] hover:text-white text-lg leading-none">×</button>
        </div>

        {/* Messages */}
        <div className="p-3.5 max-h-[280px] overflow-y-auto flex flex-col gap-2">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`font-body text-[12px] leading-[1.55] px-3 py-2 rounded-[10px] max-w-[88%] ${
                m.role === "bot"
                  ? "bg-[#f3f3f3] text-[#333] self-start rounded-bl-[3px]"
                  : "bg-[#1a1a1a] text-white self-end rounded-br-[3px]"
              }`}
            >
              {m.text}
            </div>
          ))}
          {loading && (
            <div className="bg-[#f3f3f3] self-start px-3.5 py-2.5 rounded-[10px] rounded-bl-[3px]">
              <div className="flex gap-1 items-center">
                {[0,1,2].map(i => (
                  <span key={i} className={`w-[5px] h-[5px] rounded-full bg-[#aaa] typing-dot`} style={{ animationDelay: `${i*0.2}s` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={msgEndRef} />
        </div>

        {/* Chips */}
        {showChips && (
          <div className="px-3.5 pb-2.5 flex flex-wrap gap-1.5">
            {CHIPS.map((c) => (
              <button
                key={c}
                onClick={() => send(c)}
                className="font-body text-[11px] px-2.5 py-1.5 rounded-full border border-[#e5e5e5] bg-white text-[#555] whitespace-nowrap hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] transition-all duration-150"
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-3.5 py-2.5 border-t border-[#f0f0f0] flex gap-2 items-center">
          <input
            className="flex-1 border-none outline-none font-body text-[12px] text-[#333] bg-transparent placeholder-[#bbb]"
            placeholder="Type a message…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
          />
          <button
            onClick={() => send(input)}
            disabled={loading}
            className="w-7 h-7 rounded-full bg-[#1a1a1a] border-none flex items-center justify-center flex-shrink-0 hover:opacity-80 disabled:opacity-30 transition-opacity"
          >
            <svg width="12" height="12" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        title="Chat with Galina's AI"
        className="w-12 h-12 rounded-full bg-[#1a1a1a] border-none flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform pointer-events-auto"
      >
        {open ? (
          <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
