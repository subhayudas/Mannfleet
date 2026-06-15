"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

type Role = "user" | "assistant";
type Message = { role: Role; content: string };

const SUGGESTIONS = [
  "Show me the fleet",
  "Book a chauffeur",
  "Wedding services",
  "Contact the team",
];

export default function ChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("mannfleet_intro_seen") === "1") {
      setMounted(true);
      return;
    }
    const onDone = () => setMounted(true);
    window.addEventListener("intro:done", onDone);
    const timeout = window.setTimeout(() => setMounted(true), 6000);
    return () => {
      window.removeEventListener("intro:done", onDone);
      window.clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streaming]);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
  }, [input, open]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  async function send(text: string) {
    const content = text.trim();
    if (!content || streaming) return;
    setError(null);
    const next: Message[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const errText = (await res.text().catch(() => "")) || "Something went wrong.";
        setMessages((m) => [...m, { role: "assistant", content: errText }]);
        setStreaming(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistant = "";
      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistant += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = m.slice();
          copy[copy.length - 1] = { role: "assistant", content: assistant };
          return copy;
        });
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setError("Connection interrupted. Please try again.");
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  if (!mounted) return null;

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open MANN Concierge chat"
          className="chat-fab"
        >
          <span className="chat-fab-dot" aria-hidden />
          <ChatIcon />
          <span className="chat-fab-label">Concierge</span>
        </button>
      )}

      {open && (
        <div className="chat-panel glass-panel" role="dialog" aria-label="MANN Concierge">
          <header className="chat-header">
            <div className="chat-header-left">
              <div className="chat-avatar" aria-hidden>
                <span>M</span>
              </div>
              <div className="chat-titles">
                <p className="chat-title">MANN Concierge</p>
                <p className="chat-subtitle">
                  <span className="chat-live-dot" /> Online
                </p>
              </div>
            </div>
            <button
              type="button"
              className="btn-disc chat-close"
              aria-label="Close chat"
              onClick={() => {
                abortRef.current?.abort();
                setOpen(false);
              }}
            >
              <CloseIcon />
            </button>
          </header>

          <div ref={scrollRef} className="chat-scroll">
            {messages.length === 0 && (
              <div className="chat-intro">
                <h3 className="chat-intro-title">Welcome to MANN.</h3>
                <p className="chat-intro-body">
                  Ask about our fleet, services, or bookings — I&apos;ll point you to the right place.
                </p>
                <div className="chat-suggestions">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className="glass-badge chat-chip"
                      onClick={() => send(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? "chat-row chat-row-user" : "chat-row chat-row-bot"}
              >
                <div className={m.role === "user" ? "chat-bubble chat-bubble-user" : "chat-bubble chat-bubble-bot glass-panel"}>
                  {m.role === "assistant" ? (
                    m.content ? (
                      <ReactMarkdown
                        components={{
                          a: ({ href, children }) => {
                            const url = String(href ?? "");
                            const internal = url.startsWith("/");
                            return internal ? (
                              <Link href={url} className="chat-link" onClick={() => setOpen(false)}>
                                {children}
                              </Link>
                            ) : (
                              <a href={url} className="chat-link" target="_blank" rel="noopener noreferrer">
                                {children}
                              </a>
                            );
                          },
                          h1: ({ children }) => <h3 className="chat-md-h">{children}</h3>,
                          h2: ({ children }) => <h3 className="chat-md-h">{children}</h3>,
                          h3: ({ children }) => <h3 className="chat-md-h">{children}</h3>,
                          ul: ({ children }) => <ul className="chat-md-ul">{children}</ul>,
                          ol: ({ children }) => <ol className="chat-md-ol">{children}</ol>,
                          li: ({ children }) => <li className="chat-md-li">{children}</li>,
                          p: ({ children }) => <p className="chat-md-p">{children}</p>,
                          strong: ({ children }) => <strong className="chat-md-strong">{children}</strong>,
                          code: ({ children }) => <code className="chat-md-code">{children}</code>,
                        }}
                      >
                        {m.content}
                      </ReactMarkdown>
                    ) : (
                      <TypingDots />
                    )
                  ) : (
                    <span>{m.content}</span>
                  )}
                </div>
              </div>
            ))}

            {error && <p className="chat-error">{error}</p>}
          </div>

          <form onSubmit={onSubmit} className="chat-composer">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask about the fleet, a service, or booking…"
              rows={1}
              className="chat-input"
              disabled={streaming}
            />
            <button
              type="submit"
              className="btn-primary chat-send"
              disabled={streaming || !input.trim()}
              aria-label="Send message"
            >
              <SendIcon />
            </button>
          </form>
        </div>
      )}

      <style jsx>{`
        .chat-fab {
          position: fixed;
          right: max(1.25rem, env(safe-area-inset-right));
          bottom: max(1.25rem, env(safe-area-inset-bottom));
          z-index: 90;
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.7rem 1.1rem 0.7rem 0.85rem;
          border-radius: 9999px;
          background: var(--accent, hsl(0 70% 52%));
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 18px 40px -18px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.35);
          font-family: var(--font-geist, system-ui), sans-serif;
          font-size: 0.92rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .chat-fab:hover {
          transform: translateY(-1px);
          box-shadow: 0 22px 48px -18px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }
        .chat-fab-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.2);
        }
        .chat-fab-label { line-height: 1; }
        @media (max-width: 480px) {
          .chat-fab-label { display: none; }
          .chat-fab { padding: 0.75rem; }
        }

        .chat-panel {
          position: fixed;
          right: max(1rem, env(safe-area-inset-right));
          bottom: max(1rem, env(safe-area-inset-bottom));
          z-index: 95;
          width: min(400px, calc(100vw - 2rem));
          height: min(620px, calc(100vh - 2rem));
          display: flex;
          flex-direction: column;
          border-radius: 22px;
          overflow: hidden;
          animation: chat-in 0.28s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        @media (max-width: 480px) {
          .chat-panel {
            right: 0.5rem;
            left: 0.5rem;
            bottom: 0.5rem;
            width: auto;
            height: 80vh;
          }
        }
        @keyframes chat-in {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 0.9rem 0.85rem 1rem;
          border-bottom: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
        }
        .chat-header-left { display: flex; align-items: center; gap: 0.7rem; }
        .chat-avatar {
          width: 36px; height: 36px; border-radius: 12px;
          display: grid; place-items: center;
          background: var(--accent, hsl(0 70% 52%));
          color: #fff; font-weight: 600; font-family: var(--font-serif, serif);
          font-size: 1.05rem;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35);
        }
        .chat-titles p { margin: 0; line-height: 1.15; }
        .chat-title {
          font-family: var(--font-serif, serif);
          font-size: 1.02rem;
          color: var(--text-primary, #2C2416);
        }
        .chat-subtitle {
          font-size: 0.72rem;
          color: var(--text-60, rgba(0, 0, 0, 0.6));
          display: inline-flex; align-items: center; gap: 0.4rem;
        }
        .chat-live-dot {
          width: 6px; height: 6px; border-radius: 999px;
          background: #29c46f;
          box-shadow: 0 0 0 3px rgba(41, 196, 111, 0.18);
        }
        .chat-close { width: 32px; height: 32px; }

        .chat-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          scrollbar-width: thin;
        }

        .chat-intro {
          padding: 0.25rem 0.15rem 0.25rem;
          display: flex; flex-direction: column; gap: 0.6rem;
        }
        .chat-intro-title {
          font-family: var(--font-serif, serif);
          font-size: 1.35rem;
          color: var(--text-primary, #2C2416);
          margin: 0;
        }
        .chat-intro-body {
          font-size: 0.92rem;
          color: var(--text-80, rgba(0, 0, 0, 0.78));
          margin: 0;
          line-height: 1.45;
        }
        .chat-suggestions {
          display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: 0.4rem;
        }
        .chat-chip {
          padding: 0.45rem 0.8rem;
          font-size: 0.82rem;
          cursor: pointer;
          border: 1px solid var(--border-mid, rgba(0,0,0,0.12));
          background: transparent;
          color: var(--text-primary, #2C2416);
          border-radius: 9999px;
          transition: background 0.15s ease, transform 0.15s ease;
        }
        .chat-chip:hover { background: var(--glass-light, rgba(255,255,255,0.4)); transform: translateY(-1px); }

        .chat-row { display: flex; }
        .chat-row-user { justify-content: flex-end; }
        .chat-row-bot { justify-content: flex-start; }
        .chat-bubble {
          max-width: 88%;
          padding: 0.7rem 0.9rem;
          border-radius: 16px;
          font-size: 0.92rem;
          line-height: 1.5;
          word-wrap: break-word;
        }
        .chat-bubble-user {
          background: var(--accent, hsl(0 70% 52%));
          color: #fff;
          border-radius: 16px 16px 4px 16px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.25);
        }
        .chat-bubble-bot {
          color: var(--text-primary, #2C2416);
          border-radius: 16px 16px 16px 4px;
        }

        .chat-md-h {
          font-family: var(--font-serif, serif);
          font-size: 1rem;
          margin: 0.4rem 0 0.35rem;
          color: var(--text-primary, #2C2416);
        }
        .chat-md-p { margin: 0.25rem 0; }
        .chat-md-ul, .chat-md-ol { margin: 0.3rem 0 0.3rem 1.05rem; padding: 0; }
        .chat-md-li { margin: 0.2rem 0; }
        .chat-md-strong { font-weight: 600; }
        .chat-md-code {
          background: var(--glass-light, rgba(0,0,0,0.06));
          padding: 0.05rem 0.35rem;
          border-radius: 6px;
          font-size: 0.86em;
        }
        .chat-link {
          color: var(--accent, hsl(0 70% 52%));
          text-decoration: underline;
          text-underline-offset: 2px;
          font-weight: 500;
        }
        .chat-link:hover { opacity: 0.85; }

        .chat-error {
          font-size: 0.82rem;
          color: var(--accent, hsl(0 70% 52%));
          margin: 0;
        }

        .chat-composer {
          display: flex;
          align-items: flex-end;
          gap: 0.5rem;
          padding: 0.7rem;
          border-top: 1px solid var(--border-subtle, rgba(255,255,255,0.08));
        }
        .chat-input {
          flex: 1;
          resize: none;
          min-height: 40px;
          max-height: 120px;
          padding: 0.6rem 0.85rem;
          border-radius: 14px;
          border: 1px solid var(--border-mid, rgba(0,0,0,0.12));
          background: var(--glass-light, rgba(255,255,255,0.5));
          color: var(--text-primary, #2C2416);
          font-family: inherit;
          font-size: 0.92rem;
          line-height: 1.4;
          outline: none;
        }
        .chat-input:focus { border-color: var(--accent, hsl(0 70% 52%)); }
        .chat-input::placeholder { color: var(--text-60, rgba(0,0,0,0.55)); }
        .chat-send {
          width: 40px; height: 40px;
          border-radius: 12px;
          display: grid; place-items: center;
          padding: 0;
          flex-shrink: 0;
        }
        .chat-send:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>
    </>
  );
}

function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function TypingDots() {
  return (
    <span aria-label="Assistant is typing" style={{ display: "inline-flex", gap: 4, alignItems: "center", padding: "4px 0" }}>
      <Dot delay="0s" />
      <Dot delay="0.15s" />
      <Dot delay="0.3s" />
      <style jsx>{`
        @keyframes chat-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-3px); opacity: 1; }
        }
      `}</style>
    </span>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      style={{
        width: 6,
        height: 6,
        borderRadius: 999,
        background: "currentColor",
        display: "inline-block",
        animation: `chat-bounce 1.1s ${delay} infinite ease-in-out`,
      }}
    />
  );
}
