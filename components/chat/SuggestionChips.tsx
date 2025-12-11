"use client";

interface Props {
  suggestions: string[];
  disabled?: boolean;
  onClick: (value: string) => void;
}

export default function SuggestionChips({
  suggestions,
  disabled,
  onClick,
}: Props) {
  if (!suggestions?.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((text) => (
        <button
          key={text}
          disabled={disabled}
          className="rounded-full border px-3 py-1 text-xs text-black disabled:opacity-40"

          onClick={() => onClick(text)}
        >
          {text}
        </button>
      ))}
    </div>
  );
}
