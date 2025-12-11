interface MessageBubbleProps {
  role: "user" | "assistant" | "system";
  text: string;
  timestamp?: string;
  isError?: boolean;
}

export function MessageBubble({
  role,
  text,
  timestamp,
  isError,
}: MessageBubbleProps) {
  const isUser = role === "user";
  const isSystem = role === "system";

  const baseClasses =
    "max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm";

  const styleClasses = isError
    ? "bg-red-500/10 border border-red-500/40 text-red-100"
    : isUser
    ? "bg-emerald-500 text-slate-950 ml-auto rounded-br-sm"
    : isSystem
    ? "bg-slate-800/60 text-slate-300 border border-dashed border-slate-600"
    : "bg-slate-800 text-slate-100 rounded-bl-sm";

  const wrapperClasses = isUser
    ? "flex justify-end"
    : "flex justify-start";

  return (
    <div className={wrapperClasses}>
      <div className={`${baseClasses} ${styleClasses}`}>
        <p className="whitespace-pre-wrap">{text}</p>
        {timestamp && (
          <p className="mt-1 text-[10px] text-slate-400">
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
}
