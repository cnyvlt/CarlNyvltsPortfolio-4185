import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowUp, MessageSquare, X } from "lucide-react";
import { site } from "../data/site";

/**
 * Suggestions are always on show — in the empty state and under every answer —
 * so there is never a dead panel with nothing to click. Kept short so a few
 * fit at once at the panel's width.
 */
const starters = [
  "What services does Carl offer?",
  "Walk me through Aviso Wealth",
  "Has he designed mobile apps?",
  "Which clients has he worked with?",
];

/**
 * One agent, one conversation, reachable from anywhere on the site. Sections
 * open the same docked panel and hand it a question seeded from their own
 * context — so "Ask about this project" arrives already knowing which project.
 */
interface AgentChatValue {
  open: boolean;
  seed: { prompt: string; nonce: number } | null;
  openWith: (prompt: string) => void;
  toggle: () => void;
  close: () => void;
}

const AgentChatContext = createContext<AgentChatValue | null>(null);

export function useAgentChat() {
  const ctx = useContext(AgentChatContext);
  if (!ctx) throw new Error("useAgentChat must be used inside <AgentChatProvider>");
  return ctx;
}

export function AgentChatProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [seed, setSeed] = useState<{ prompt: string; nonce: number } | null>(null);

  const openWith = useCallback((prompt: string) => {
    setSeed({ prompt, nonce: Date.now() });
    setOpen(true);
  }, []);

  const value = useMemo<AgentChatValue>(
    () => ({
      open,
      seed,
      openWith,
      toggle: () => setOpen((v) => !v),
      close: () => setOpen(false),
    }),
    [open, seed, openWith],
  );

  return <AgentChatContext.Provider value={value}>{children}</AgentChatContext.Provider>;
}

/**
 * Small inline link a section can drop in to hand its context to the agent.
 */
export function AskAbout({
  prompt,
  label = "Ask about this",
  className = "",
}: {
  prompt: string;
  label?: string;
  className?: string;
}) {
  const { openWith } = useAgentChat();
  return (
    <button
      type="button"
      onClick={() => openWith(prompt)}
      className={`note group inline-flex items-center gap-2 text-left ${className}`}
      style={{ transform: "rotate(-1.2deg)" }}
    >
      <MessageSquare size={14} strokeWidth={1.75} className="shrink-0" />
      <span
        className="transition-colors"
        style={{ borderBottom: "1px solid transparent" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderBottomColor = "var(--note)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderBottomColor = "transparent";
        }}
      >
        {label}
      </span>
    </button>
  );
}

export function AgentChat() {
  const { open, seed, toggle, close } = useAgentChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/agent/messages" }),
  });

  const busy = status === "submitted" || status === "streaming";

  // Drop suggestions already asked so the strip stays useful, and fall back to
  // the full set once they have all been used.
  const asked = new Set(
    messages
      .filter((m) => m.role === "user")
      .map((m) =>
        m.parts
          .map((p) => (p.type === "text" ? p.text : ""))
          .join(" ")
          .trim()
          .toLowerCase(),
      ),
  );
  const remaining = starters.filter((s) => !asked.has(s.toLowerCase()));
  const suggestions = remaining.length > 0 ? remaining : starters;

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, busy]);

  // A section seeded a question: put it in the field, ready to send.
  useEffect(() => {
    if (!seed) return;
    setInput(seed.prompt);
    inputRef.current?.focus();
  }, [seed]);

  function submit(text: string) {
    const value = text.trim();
    if (!value || busy) return;
    sendMessage({ text: value });
    setInput("");
  }

  return (
    <>
      {/* launcher — the site's only way into the assistant, so it reads as a
          button rather than as another hairline annotation. It sits clear of
          the footer's bottom band, which carries only text on the left. */}
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? "Close the assistant" : "Ask about Carl's work"}
        data-open={open}
        className="agent-launcher fixed right-5 bottom-24 z-40 inline-flex items-center gap-3 px-5 py-3.5 sm:right-[var(--gutter)]"
      >
        {open ? (
          <X size={15} strokeWidth={1.9} className="shrink-0" />
        ) : (
          <span className="agent-pip" aria-hidden />
        )}
        <span className="label" style={{ color: "inherit" }}>
          {open ? "Close" : "Ask about my work"}
        </span>
      </button>

      {open && (
        <section
          aria-label="Assistant"
          className="fixed inset-x-0 bottom-16 z-[45] flex h-[80vh] flex-col sm:inset-x-auto sm:right-[var(--gutter)] sm:bottom-40 sm:h-[40rem] sm:w-[26rem]"
          style={{ background: "var(--surface)", border: "1px solid var(--hairline-strong)" }}
        >
          <header
            className="flex items-center justify-between gap-4 px-5 py-4"
            style={{ borderBottom: "1px solid var(--hairline)" }}
          >
            <span className="label label-ink label-row">Ask about my work</span>
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="transition-opacity hover:opacity-60"
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          </header>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5">
            {messages.length === 0 && (
              <div>
                <p className="note mb-3">ask me anything about the work</p>
                <p className="measure text-sm" style={{ color: "var(--ink-soft)" }}>
                  Questions about the services, process or case studies — answered from what&apos;s on
                  this site. For anything project-specific, {site.email} reaches Carl directly.
                </p>
              </div>
            )}

            <div className="grid gap-5">
              {messages.map((message) => (
                <div key={message.id}>
                  <p className="label mb-2">{message.role === "user" ? "You" : "Assistant"}</p>
                  {message.role === "user" ? (
                    <p
                      className="px-3 py-2 text-sm"
                      style={{ background: "var(--paper-deep)", color: "var(--ink)" }}
                    >
                      {message.parts.map((part, i) =>
                        part.type === "text" ? <span key={i}>{part.text}</span> : null,
                      )}
                    </p>
                  ) : (
                    <div className="grid gap-2 text-sm">
                      {message.parts.map((part, i) => {
                        if (part.type === "text") {
                          return (
                            <p key={i} style={{ color: "var(--ink)" }}>
                              {part.text}
                            </p>
                          );
                        }
                        if (part.type === "tool-getProjectDetail") {
                          const title =
                            part.state === "output-available" && part.output && "title" in part.output
                              ? String(part.output.title)
                              : null;
                          return (
                            <p key={i} className="meta">
                              {title ? `Looked up — ${title}` : "Looking up the case study…"}
                            </p>
                          );
                        }
                        return null;
                      })}
                    </div>
                  )}
                </div>
              ))}

              {busy && (
                <p className="meta" aria-live="polite">
                  Thinking…
                </p>
              )}

              {error && (
                <p className="text-sm" style={{ color: "var(--note)" }}>
                  Something went wrong on the way to the assistant. Try again, or email {site.email}.
                </p>
              )}
            </div>
          </div>

          {/* suggested questions — always on show, empty state or mid-thread */}
          <div className="px-5 pt-4 pb-4" style={{ borderTop: "1px solid var(--hairline)" }}>
            <p className="label label-ink label-row mb-3">Suggested questions</p>
            <div className="grid grid-cols-2 gap-1.5">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => submit(s)}
                  disabled={busy}
                  className="q-chip h-full disabled:opacity-40"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(input);
            }}
            className="flex items-center gap-3 px-5 py-4"
            style={{ borderTop: "1px solid var(--hairline)" }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              aria-label="Your question"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--ink-faint)]"
            />
            <button
              type="submit"
              disabled={busy || input.trim().length === 0}
              aria-label="Send"
              className="inline-flex items-center gap-2 px-3 py-2 transition-opacity disabled:opacity-30"
              style={{ background: "var(--ink)", color: "var(--paper)" }}
            >
              <ArrowUp size={14} strokeWidth={1.75} />
            </button>
          </form>
        </section>
      )}
    </>
  );
}
