"use client";
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "bot";
  text: string;
}

const CHIPS = ["What's your process?", "See case studies", "Available for hire?", "Skills & tools"];

function getFallbackReply(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("process") || t.includes("approach"))
    return "Galina follows a research-first process — she starts with user interviews, builds personas and journey maps, then moves through wireframes, prototyping, and usability testing before finalising hi-fi designs.";
  if (t.includes("case") || t.includes("project") || t.includes("work"))
    return "Galina has three case studies: PrepMate — an AI-powered SAT prep platform (EdTech, team project); NutriWise — a personalized nutrition app (solo); and the SF Public Library IA redesign (information architecture & tree testing, Berkeley team project). They're all on this page!";
  if (t.includes("hire") || t.includes("available") || t.includes("job") || t.includes("position") || t.includes("role") || t.includes("looking") || t.includes("seeking") || t.includes("opportunit") || t.includes("open to"))
    return "Yes — Galina is open to new opportunities. She's looking for Product Designer and UX Designer roles focused on AI product experiences — including 0→1 product design and human–AI interaction. Reach out at galinauxdesign@gmail.com to start a conversation.";
  if (t.includes("skill") || t.includes("tool") || t.includes("figma") || t.includes("stack"))
    return "Galina's toolkit — Design: Figma, Adobe Illustrator, InDesign, Framer, Canva. AI: Claude, Claude Code, ChatGPT, NotebookLM, Cursor, Figma Make, v0. Research & collab: Miro, Optimal Workshop. Code: HTML/CSS, GitHub. Her skills span UX research, information architecture, prototyping, usability testing, and AI-assisted product design & development.";
  if (t.includes("experience") || t.includes("background") || t.includes("career") || t.includes("years") || t.includes("history") || t.includes("employ"))
    return "Galina is a freelance UX/UI & Product Designer (since Nov 2025), with 10+ years across digital product work. She spent a decade as a Project Manager in digital product development at AcademProject — shipping CRM platforms, a photography marketplace, and mobile apps — with earlier roles in HR and operations. That business-and-people background shapes her pragmatic, user-centered approach. The full timeline is on her resume.";
  if (t.includes("contact") || t.includes("email") || t.includes("reach"))
    return "You can reach Galina at galinauxdesign@gmail.com — she typically responds within 24 hours.";
  if (t.includes("hello") || t.includes("hi") || t.includes("hey"))
    return "Hi there! 👋 I can tell you about Galina's work, skills, process, or availability. What would you like to know?";
  return "Great question! For a detailed answer, reach out to Galina directly at galinauxdesign@gmail.com — she'd love to chat.";
}

// Strip emoji / symbols so speech synthesis reads cleanly.
function speakableText(text: string): string {
  return text.replace(/[^\p{L}\p{N}\p{P}\p{Z}]/gu, "").replace(/\s+/g, " ").trim();
}

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! 👋 I'm Galina's AI assistant. Ask me about her work, skills, or availability. You can type or use the mic to talk." },
  ]);
  const [showChips, setShowChips] = useState(true);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<{ role: string; content: string }[]>([]);
  const msgEndRef = useRef<HTMLDivElement>(null);

  // Voice
  const [listening, setListening] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);
  const [sttSupported, setSttSupported] = useState(false);
  const [ttsSupported, setTtsSupported] = useState(false);
  const recognitionRef = useRef<unknown>(null);
  const sendRef = useRef<(t: string) => void>(() => {});
  const voiceOnRef = useRef(false);

  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    voiceOnRef.current = voiceOn;
    if (!voiceOn && typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, [voiceOn]);

  // Text-to-speech support
  useEffect(() => {
    setTtsSupported(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);

  const speak = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const clean = speakableText(text);
    if (!clean) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = "en-US";
    u.rate = 1.03;
    u.pitch = 1;
    window.speechSynthesis.speak(u);
  };

  // Speech-to-text setup (Web Speech API)
  useEffect(() => {
    const SR =
      (window as unknown as { SpeechRecognition?: new () => SpeechRecognition; webkitSpeechRecognition?: new () => SpeechRecognition }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognition }).webkitSpeechRecognition;
    if (!SR) return;
    setSttSupported(true);
    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = true;
    rec.continuous = false;
    rec.onresult = (e: SpeechRecognitionEvent) => {
      let transcript = "";
      for (let i = 0; i < e.results.length; i++) {
        transcript += e.results[i][0].transcript;
      }
      setInput(transcript);
      const last = e.results[e.results.length - 1];
      if (last && last.isFinal) {
        const finalText = transcript.trim();
        setListening(false);
        if (finalText) sendRef.current(finalText);
      }
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recognitionRef.current = rec;
    return () => {
      try {
        rec.abort();
      } catch {}
    };
  }, []);

  const toggleMic = () => {
    const rec = recognitionRef.current as SpeechRecognition | null;
    if (!rec) return;
    if (listening) {
      try { rec.stop(); } catch {}
      setListening(false);
    } else {
      setInput("");
      try {
        rec.start();
        setListening(true);
      } catch {}
    }
  };

  async function send(text: string) {
    if (!text.trim() || loading) return;
    setShowChips(false);
    setInput("");
    const newHistory = [...history, { role: "user", content: text }];
    setMessages((m) => [...m, { role: "user", text }]);
    setHistory(newHistory);
    setLoading(true);

    let reply = "";
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newHistory }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.reply) reply = data.reply;
      }
    } catch {
      // network error — fall through to the offline answer
    }
    // No live answer (no server key, error, or empty) → use the built-in knowledge.
    if (!reply) reply = getFallbackReply(text);

    setMessages((m) => [...m, { role: "bot", text: reply }]);
    setHistory((h) => [...h, { role: "assistant", content: reply }]);
    if (voiceOnRef.current) speak(reply);
    setLoading(false);
  }

  // Keep a stable ref so speech-recognition callbacks always call the latest send.
  useEffect(() => {
    sendRef.current = send;
  });

  return (
    <div className="no-print fixed bottom-7 right-7 z-[300] flex flex-col items-end gap-3 pointer-events-none">
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
          <div className="flex items-center gap-1.5">
            {ttsSupported && (
              <button
                onClick={() => setVoiceOn((v) => !v)}
                title={voiceOn ? "Turn off voice replies" : "Read replies aloud"}
                aria-label={voiceOn ? "Turn off voice replies" : "Read replies aloud"}
                aria-pressed={voiceOn}
                className={`w-6 h-6 rounded-full border-none flex items-center justify-center transition-colors ${
                  voiceOn ? "bg-[#4ade80] text-[#1a1a1a]" : "bg-transparent text-[#888] hover:text-white"
                }`}
              >
                {voiceOn ? (
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                ) : (
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                )}
              </button>
            )}
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="bg-transparent border-none text-[#666] hover:text-white text-lg leading-none">×</button>
          </div>
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
            placeholder={listening ? "Listening…" : "Type or speak…"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
          />
          {sttSupported && (
            <button
              onClick={toggleMic}
              title={listening ? "Stop listening" : "Speak your question"}
              aria-label={listening ? "Stop listening" : "Speak your question"}
              aria-pressed={listening}
              className={`w-7 h-7 rounded-full border-none flex items-center justify-center flex-shrink-0 transition-all ${
                listening
                  ? "bg-[#ef4444] mic-listening"
                  : "bg-[#f0f0f0] hover:bg-[#e5e5e5]"
              }`}
            >
              <svg width="12" height="12" fill="none" stroke={listening ? "#fff" : "#1a1a1a"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </button>
          )}
          <button
            onClick={() => send(input)}
            disabled={loading}
            aria-label="Send message"
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
        aria-label="Chat with Galina's AI"
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
