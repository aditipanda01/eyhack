import { useEffect, useRef } from "react";
import { StageIndicator } from "./StageIndicator";
import { MessageBubble } from "./MessageBubble";

interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: string;
  isError?: boolean;
}

interface ChatShellProps {
  messages: ChatMessage[];
  input: string;
  setInput: (value: string) => void;
  sendMessage: () => void;
  isLoading: boolean;
  suggestions: string[];
  onSuggestionClick: (text: string) => void;
  currentStage: "chat" | "verification" | "underwriting";
  lowLevelError?: string | null;
}

export function ChatShell({
  messages,
  input,
  setInput,
  sendMessage,
  isLoading,
  suggestions,
  onSuggestionClick,
  currentStage,
  lowLevelError,
}: ChatShellProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && input.trim()) sendMessage();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8">
      <div className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-slate-900/80 p-4 shadow-2xl backdrop-blur">
        {/* Glow */}
        <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-transparent to-sky-500/20 blur-3xl" />

        {/* Content */}
        <div className="relative flex flex-col gap-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-50">
                Loan Assistant
              </p>
              <p className="text-[11px] text-slate-400">
                Chat your way from eligibility to approval.
              </p>
            </div>
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] text-emerald-200">
              Connected to backend
            </span>
          </div>

          {/* Stage Indicator */}
          <StageIndicator currentStage={currentStage} />

          {/* Chat area */}
          <div
            ref={scrollRef}
            className="mt-2 flex max-h-[420px] flex-col gap-2 overflow-y-auto rounded-2xl bg-slate-950/60 p-3"
          >
            {messages.map((m) => (
              <MessageBubble
                key={m.id}
                role={m.role}
                text={m.content}
                timestamp={m.timestamp}
                isError={m.isError}
              />
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl bg-slate-800/90 px-3 py-2 text-[11px] text-slate-300">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  Thinking…
                </div>
              </div>
            )}

            {lowLevelError && (
              <div className="mt-2 text-center text-[11px] text-red-300">
                {lowLevelError}
              </div>
            )}
          </div>

          {/* Suggestion chips */}
          {suggestions.length > 0 && (
            <div className="flex flex-wrap gap-2 text-[11px]">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onSuggestionClick(s)}
                  className="rounded-full border border-slate-600 bg-slate-900 px-3 py-1 text-slate-300 hover:border-emerald-400 hover:text-emerald-200"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Composer */}
          <div className="flex items-end gap-2 rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about your loan eligibility, documents, or approval…"
              className="h-10 flex-1 resize-none bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="inline-flex h-9 items-center rounded-full bg-emerald-400 px-4 text-xs font-semibold text-slate-950 disabled:cursor-not-allowed disabled:bg-slate-600"
            >
              {isLoading ? "Sending…" : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
