"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface Action {
  label: string;
  href: string;
}

interface Message {
  role: "user" | "bot";
  text: string;
  actions?: Action[];
}

// Suggested questions. Each topic carries the label we send and the follow-ups
// to offer once it's been answered, so the conversation always has a next step.
const TOPICS: Record<string, { label: string; next: string[] }> = {
  background:   { label: "What's her background?",   next: ["process", "prepmate", "availability"] },
  process:      { label: "How does she work?",       next: ["prepmate", "skills", "availability"] },
  prepmate:     { label: "Tell me about PrepMate",   next: ["nutriwise", "process", "skills"] },
  nutriwise:    { label: "What is NutriWise?",       next: ["sfpl", "skills", "prepmate"] },
  sfpl:         { label: "The library IA redesign?", next: ["prepmate", "nutriwise", "process"] },
  skills:       { label: "Skills & tools",           next: ["prepmate", "process", "availability"] },
  availability: { label: "Is she open to roles?",    next: ["contact", "background", "prepmate"] },
  contact:      { label: "How do I reach her?",      next: ["availability", "prepmate", "background"] },
};

const OPENING_TOPICS = ["background", "prepmate", "availability", "skills"];

// What a question is about, most specific first. Word boundaries matter here —
// a plain substring test would match "sat" inside "conversation".
const TOPIC_PATTERNS: [string, RegExp][] = [
  ["greeting",     /^\s*(hi|hey|hello|yo|howdy|good (morning|afternoon|evening))\b/i],
  ["prepmate",     /\bprep ?mate\b|\bsat\b/i],
  ["nutriwise",    /\bnutri ?wise\b|\bnutrition\b|\bmeal\b/i],
  ["sfpl",         /\bsfpl\b|\blibrar(y|ies)\b|\binformation architecture\b|\btree test|\bcard sort/i],
  ["casestudies",  /\bcase stud|\bprojects?\b|\bportfolio\b/i],
  ["availability", /\bhir(e|ing)\b|\bavailab|\bjob\b|\brole|\bopen to\b|\bopportunit|\bseeking\b/i],
  ["contact",      /\bcontact\b|\be-?mail\b|\breach\b|\blinkedin\b/i],
  // Education before location: "Where did she study?" matches both.
  ["education",    /\beducat|\bstudie[ds]\b|\bstudy\b|\bdegree\b|\bcertificat|\bstanford\b|\bberkeley\b|\bschool\b|\buniversity\b/i],
  ["location",     /\bwhere\b|\bbased\b|\blocat|\bremote\b|\brelocat|\btime ?zone\b|\bbay area\b/i],
  ["skills",       /\bskill|\btool|\bfigma\b|\bstack\b|\bsoftware\b/i],
  ["process",      /\bprocess\b|\bapproach\b|\bmethod|\bprinciple|\bhow (does|do) she work\b/i],
  ["background",   /\bbackground\b|\bexperience\b|\bcareer\b|\bresume\b|\bhistory\b|\byears\b|\bemploy/i],
];

function topicOf(text: string): string | null {
  for (const [id, re] of TOPIC_PATTERNS) if (re.test(text)) return id;
  return null;
}

// Three follow-ups that haven't been asked yet: the ones related to what was
// just answered first, then anything else still unexplored.
function nextSuggestions(text: string, asked: string[]): string[] {
  const topic = topicOf(text);
  const pool = topic && TOPICS[topic] ? TOPICS[topic].next : OPENING_TOPICS;
  const related = pool.filter((id) => !asked.includes(id));
  const rest = Object.keys(TOPICS).filter((id) => !asked.includes(id) && !related.includes(id));
  return [...related, ...rest].slice(0, 3);
}

// Offline answers, used when the server has no API key or the request fails.
// Keyed off the same classifier as the suggestions, so routing can't drift.
const FALLBACK_ANSWERS: Record<string, string> = {
  greeting:
    "Hi there! \ud83d\udc4b I can tell you about Galina's projects, background, skills, or availability. What would you like to know?",
  prepmate:
    "PrepMate is an AI-powered SAT prep platform (EdTech). Galina was UX Researcher, UX/UI Designer and Front-End dev \u2014 one of three on the team \u2014 from March\u2013May 2025. She then designed the 2026 AI layer solo, after Stanford's AI products program. Difficulty adapts to each student, driven by four AI signals. In moderated testing with 4 students, task completion rose from about half to nearly all, tasks got ~38% faster, and UI inconsistencies went from 5 to 0.",
  nutriwise:
    "NutriWise is a personalized nutrition app Galina designed solo over 20 weeks (Jan\u2013June 2025), plus an AI Strategy phase in Dec 2025. It runs on a mixed-initiative model \u2014 the AI proposes, the user decides \u2014 with an AI Meal Planning Engine and Meal Scanning in the MVP, and a Grocery Optimizer and Fast Meal Suggestions as fast-follows. It's built around 6 trust-building principles that keep users in control.",
  sfpl:
    "The SF Public Library project was an information architecture redesign \u2014 a UC Berkeley UX Certificate group project where Galina was one of three UX designers. The work covered content inventory and gap analysis, card sorting, label scoring, sitemaps, and two rounds of tree testing in Optimal Workshop. Task-success rate improved from 51% to 78%.",
  casestudies:
    "Galina has three case studies: PrepMate \u2014 an AI-powered SAT prep platform (EdTech, team project); NutriWise \u2014 a personalized nutrition app (solo); and the SF Public Library IA redesign (information architecture & tree testing, Berkeley team project). Ask me about any one of them.",
  availability:
    "Yes \u2014 Galina is open to new opportunities. She's looking for Product Designer and UX Designer roles focused on AI product experiences, including 0\u21921 product design and human\u2013AI interaction. Reach out at galinauxdesign@gmail.com to start a conversation.",
  contact:
    "You can reach Galina at galinauxdesign@gmail.com \u2014 she typically responds within 24 hours. She's also on LinkedIn at linkedin.com/in/galina-kupina-a219821a.",
  education:
    "Galina holds a Certificate of Achievement in UI/UX Design for AI Products from Stanford Continuing Studies (Sep 2025\u2013Jan 2026), a Professional Program in User Experience Design from UC Berkeley (Sep 2023\u2013May 2025), the Google UX Design Professional Certificate (2023\u2013Sep 2024), and a B.S. in Business Administration from Novosibirsk State University (2007).",
  location:
    "Galina is based in the San Francisco Bay Area, CA, and works remotely.",
  skills:
    "Galina's toolkit \u2014 Design: Figma, Adobe Illustrator, InDesign, Framer, Canva. AI: Claude, Claude Code, ChatGPT, NotebookLM, Cursor, Figma Make, v0, Claude Design. Research & collab: Miro, Optimal Workshop. Code: HTML/CSS, GitHub. Her skills span UX research, information architecture, prototyping, usability testing, and AI-assisted product design & development.",
  process:
    "Galina works by three principles: prototype fast and learn faster (AI-built clickable prototypes in front of real users in days, so decisions come from evidence); design the whole system (user, product, team and business at once); and ship, then sharpen (test rough versions early and iterate).",
  background:
    "Galina is a freelance UX/UI & Product Designer (since Nov 2025), with 10+ years across digital product work. She spent a decade as a Project Manager in digital product development at AcademProject \u2014 shipping CRM platforms, a photography marketplace, and mobile apps \u2014 with earlier roles in HR and operations. That business-and-people background shapes her pragmatic, user-centered approach. The full timeline is on her resume.",
};

// Where each answer should send the reader next. Keyed off the same classifier
// as the chips, so these follow the live API's answers as well as the offline
// ones — an answer the visitor likes always has somewhere to go.
const EMAIL = "mailto:galinauxdesign@gmail.com";

const TOPIC_ACTIONS: Record<string, Action[]> = {
  prepmate:     [{ label: "Open the PrepMate case study", href: "/sat" }],
  nutriwise:    [{ label: "Open the NutriWise case study", href: "/nutri" }],
  sfpl:         [{ label: "Open the library case study", href: "/sfpl" }],
  casestudies:  [{ label: "See all three", href: "/#work-sec" }],
  background:   [{ label: "View full resume", href: "/resume" }],
  education:    [{ label: "View full resume", href: "/resume" }],
  skills:       [{ label: "View full resume", href: "/resume" }],
  process:      [{ label: "How she works", href: "/#about-sec" }],
  availability: [{ label: "Email Galina", href: EMAIL }, { label: "View full resume", href: "/resume" }],
  contact:      [{ label: "Email Galina", href: EMAIL }, { label: "LinkedIn", href: "https://www.linkedin.com/in/galina-kupina-a219821a" }],
  location:     [{ label: "Email Galina", href: EMAIL }],
};

const GREETING: Message = { role: "bot", text: "Hi! 👋 What would you like to know about Galina?" };

const FALLBACK_DEFAULT =
  "I can only speak to Galina's work, background, skills, and availability. For anything else, reach her directly at galinauxdesign@gmail.com \u2014 she'd love to chat.";

function getFallbackReply(text: string): string {
  const topic = topicOf(text);
  return (topic && FALLBACK_ANSWERS[topic]) || FALLBACK_DEFAULT;
}

// Actions read as destinations, not questions: navy outline vs the chips' grey.
const ACTION_CLASS =
  "font-body text-[12px] font-medium px-3 py-2 rounded-full border border-[#1B2B4B] " +
  "bg-white text-[#1B2B4B] no-underline inline-flex items-center gap-1 " +
  "hover:bg-[#1B2B4B] hover:text-white transition-colors duration-150";

// The App Router won't scroll to a hash that lives on another route: the target
// isn't mounted when navigation resolves. Poll briefly until it appears.
function scrollToHash(id: string) {
  const start = Date.now();
  const tick = () => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (Date.now() - start < 3000) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// Strip emoji / symbols so speech synthesis reads cleanly.
function speakableText(text: string): string {
  return text.replace(/[^\p{L}\p{N}\p{P}\p{Z}]/gu, "").replace(/\s+/g, " ").trim();
}

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [showLabel, setShowLabel] = useState(true);
  const [labelText, setLabelText] = useState("Ask me anything");
  const everOpenedRef = useRef(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  // The API turns are just the transcript in another shape, so derive them
  // instead of keeping a second copy in state that has to be written in step.
  const messagesRef = useRef<Message[]>(messages);
  const router = useRouter();
  const pathname = usePathname();
  const [suggestions, setSuggestions] = useState<string[]>(OPENING_TOPICS);
  const askedRef = useRef<string[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const msgEndRef = useRef<HTMLDivElement>(null);

  // Start over: a visitor who has wandered off-topic shouldn't have to close
  // and reopen (which wouldn't clear anything) to get a clean slate.
  const resetChat = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    askedRef.current = [];
    setMessages([GREETING]);
    setSuggestions(OPENING_TOPICS);
    setInput("");
  };

  // Voice
  const [listening, setListening] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);
  const [sttSupported, setSttSupported] = useState(false);
  const [ttsSupported, setTtsSupported] = useState(false);
  const recognitionRef = useRef<unknown>(null);
  const sendRef = useRef<(t: string) => void>(() => {});
  const voiceOnRef = useRef(false);

  useEffect(() => {
    messagesRef.current = messages;
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // The "Ask my AI" nudge shows briefly, then fades out; hide it once chat opens.
  useEffect(() => {
    const t = setTimeout(() => setShowLabel(false), 6000);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (open) {
      everOpenedRef.current = true;
      setShowLabel(false);
    }
  }, [open]);

  // The first nudge fades after 6s, long before most people have read anything.
  // Bring it back once, deeper into the page, for anyone who never opened it —
  // by then a bare circle reads as generic support chat, not an AI assistant.
  useEffect(() => {
    const onScroll = () => {
      if (everOpenedRef.current) {
        window.removeEventListener("scroll", onScroll);
        return;
      }
      const max = document.body.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= 0.35) {
        setLabelText("Questions about her work?");
        setShowLabel(true);
        window.removeEventListener("scroll", onScroll);
        setTimeout(() => setShowLabel(false), 9000);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    setSuggestions([]);
    setInput("");
    // Everything after the greeting, plus the turn being sent.
    const newHistory = [
      ...messagesRef.current.slice(1).map((m) => ({
        role: m.role === "bot" ? "assistant" : "user",
        content: m.text,
      })),
      { role: "user", content: text },
    ];
    setMessages((m) => [...m, { role: "user", text }]);
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

    const topic = topicOf(text);
    setMessages((m) => [...m, { role: "bot", text: reply, actions: (topic && TOPIC_ACTIONS[topic]) || undefined }]);

    // Offer the next step rather than leaving an empty input.
    if (topic && !askedRef.current.includes(topic)) askedRef.current = [...askedRef.current, topic];
    setSuggestions(nextSuggestions(text, askedRef.current));

    if (voiceOnRef.current) speak(reply);
    setLoading(false);
  }

  // Keep a stable ref so speech-recognition callbacks always call the latest send.
  useEffect(() => {
    sendRef.current = send;
  });

  return (
    <div className="no-print fixed bottom-4 right-4 sm:bottom-7 sm:right-7 z-[300] flex flex-col items-end gap-3 pointer-events-none">
      {/* Chat window */}
      <div
        className={`w-[calc(100vw-2rem)] max-w-[360px] sm:w-[360px] max-h-[calc(100vh-7rem)] flex flex-col bg-[#fafaf7] rounded-2xl border border-[rgba(26,26,26,0.08)] overflow-hidden shadow-[0_24px_60px_-22px_rgba(0,0,0,0.22),0_8px_18px_-6px_rgba(0,0,0,0.08)] origin-bottom-right transition-all duration-300 ${
          open ? "scale-100 opacity-100 pointer-events-auto" : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-[#1B2B4B] px-3.5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
            <div>
              <div className="font-heading text-[13px] font-medium text-white tracking-[-0.01em]">Galina&apos;s AI assistant</div>
              <div className="font-body text-[11px] text-[#9fb0c4]">Conversational UX demo she built</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {messages.length > 1 && (
              <button
                onClick={resetChat}
                title="Start over"
                aria-label="Start over"
                className="relative w-7 h-7 rounded-full border-none flex items-center justify-center bg-transparent text-[#9fb0c4] hover:text-white transition-colors after:absolute after:-inset-2 after:content-['']"
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M3 2v6h6" />
                  <path d="M3 13a9 9 0 1 0 3-7.7L3 8" />
                </svg>
              </button>
            )}
            {ttsSupported && (
              // Labelled, not a bare icon: nothing else on the page tells a
              // visitor the assistant can speak its answers.
              <button
                onClick={() => setVoiceOn((v) => !v)}
                title={voiceOn ? "Turn off spoken replies" : "Have replies read aloud"}
                aria-label={voiceOn ? "Turn off spoken replies" : "Have replies read aloud"}
                aria-pressed={voiceOn}
                className={`relative h-7 pl-2 pr-2.5 rounded-full border-none flex items-center gap-1.5 font-body text-[11px] font-medium transition-colors after:absolute after:-inset-2 after:content-[''] ${
                  voiceOn ? "bg-[#4ade80] text-[#1B2B4B]" : "bg-[rgba(255,255,255,0.12)] text-[#cdd8e6] hover:text-white"
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
                Voice
              </button>
            )}
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="relative w-7 h-7 flex items-center justify-center bg-transparent border-none text-[#9fb0c4] hover:text-white text-xl leading-none after:absolute after:-inset-2 after:content-['']">×</button>
          </div>
        </div>

        {/* Messages */}
        <div className="p-3.5 flex-1 min-h-0 max-h-[min(50vh,340px)] overflow-y-auto flex flex-col gap-2">
          {messages.map((m, i) => (
            <div key={i} className="contents">
              <div
                className={`font-body text-[14px] leading-[1.5] px-3 py-2 rounded-[10px] max-w-[88%] ${
                  m.role === "bot"
                    ? "bg-white text-[#292524] border border-[rgba(26,26,26,0.06)] self-start rounded-bl-[3px]"
                    : "bg-[#1B2B4B] text-white self-end rounded-br-[3px]"
                }`}
              >
                {m.text}
              </div>
              {m.actions && (
                <div className="self-start flex flex-wrap gap-1.5 max-w-[88%]">
                  {m.actions.map((a) =>
                    a.href.startsWith("/") ? (
                      <Link
                        key={a.href}
                        href={a.href}
                        onClick={(e) => {
                          const [path, hash] = a.href.split("#");
                          if (!hash) return;
                          e.preventDefault();
                          const target = path || "/";
                          if (pathname !== target) router.push(a.href);
                          else window.history.replaceState(null, "", a.href);
                          scrollToHash(hash);
                        }}
                        className={ACTION_CLASS}
                      >
                        {a.label}
                        <span aria-hidden>→</span>
                      </Link>
                    ) : (
                      <a
                        key={a.href}
                        href={a.href}
                        {...(a.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className={ACTION_CLASS}
                      >
                        {a.label}
                        <span aria-hidden>↗</span>
                      </a>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="bg-white border border-[rgba(26,26,26,0.06)] self-start px-3.5 py-2.5 rounded-[10px] rounded-bl-[3px]">
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
        {suggestions.length > 0 && !loading && (
          <div className="px-3.5 pb-2.5 flex flex-wrap gap-1.5">
            {suggestions.map((id) => (
              <button
                key={id}
                onClick={() => send(TOPICS[id].label)}
                className="font-body text-[12px] px-3 py-2 rounded-full border border-[rgba(26,26,26,0.12)] bg-white text-[#57534E] whitespace-nowrap hover:bg-[#1B2B4B] hover:text-white hover:border-[#1B2B4B] transition-all duration-150"
              >
                {TOPICS[id].label}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-3.5 py-2.5 border-t border-[rgba(26,26,26,0.08)] flex gap-2 items-center">
          <input
            className="flex-1 min-w-0 border-none outline-none font-body text-[16px] text-[#292524] bg-transparent placeholder-[#a8a29e]"
            placeholder={listening ? "Listening…" : sttSupported ? "Type or speak…" : "Type your question…"}
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
              className={`relative w-9 h-9 rounded-full border-none flex items-center justify-center flex-shrink-0 transition-all after:absolute after:-inset-1 after:content-[''] ${
                listening
                  ? "bg-[#ef4444] mic-listening"
                  : "bg-[#efe7db] hover:bg-[#e6dccb]"
              }`}
            >
              <svg width="15" height="15" fill="none" stroke={listening ? "#fff" : "#1B2B4B"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </button>
          )}
          <button
            onClick={() => send(input)}
            disabled={loading || !input.trim()}
            aria-label="Send message"
            className="relative w-9 h-9 rounded-full bg-[#1B2B4B] border-none flex items-center justify-center flex-shrink-0 hover:opacity-80 disabled:opacity-30 transition-opacity after:absolute after:-inset-1 after:content-['']"
          >
            <svg width="15" height="15" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Launcher: label nudge + toggle button */}
      <div className="flex items-center gap-2.5">
        {showLabel && !open && (
          <button
            onClick={() => setOpen(true)}
            className="chat-label-pill pointer-events-auto font-body text-[12px] font-medium text-[#1B2B4B] bg-white rounded-full pl-3.5 pr-3 py-2 shadow-[0_6px_22px_-6px_rgba(0,0,0,0.28)] border border-[rgba(26,26,26,0.08)] whitespace-nowrap flex items-center gap-1.5"
          >
            {labelText}
            <svg aria-hidden width="11" height="11" viewBox="0 0 24 24" style={{ color: "#E0A82E" }}>
              <path d="M12 0C12 6.6 6.6 12 0 12c6.6 0 12 5.4 12 12 0-6.6 5.4-12 12-12-6.6 0-12-5.4-12-12z" fill="currentColor" />
            </svg>
          </button>
        )}
        <button
          onClick={() => setOpen((o) => !o)}
          title="Chat with Galina's AI assistant"
          aria-label="Chat with Galina's AI assistant"
          className={`relative h-12 rounded-full bg-[#1B2B4B] border-none flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform pointer-events-auto ${
            open ? "w-12" : "pl-4 pr-4"
          }`}
        >
          {open ? (
            <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <>
              <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" style={{ color: "#F5D06B" }}>
                <path d="M12 0C12 6.6 6.6 12 0 12c6.6 0 12 5.4 12 12 0-6.6 5.4-12 12-12-6.6 0-12-5.4-12-12z" fill="currentColor" />
              </svg>
              <span className="font-body text-[13px] font-medium text-white">Ask AI</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
