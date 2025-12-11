"use client";

export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-none bg-slate-100 px-3 py-2">
        <span className="text-[10px] text-slate-500">Assistant is typing</span>
        <span className="flex gap-1">
          <span className="h-1 w-1 animate-bounce rounded-full bg-slate-400" />
          <span className="h-1 w-1 animate-bounce rounded-full bg-slate-400 delay-75" />
          <span className="h-1 w-1 animate-bounce rounded-full bg-slate-400 delay-150" />
        </span>
      </div>
    </div>
  );
}
