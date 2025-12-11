type Stage = "chat" | "verification" | "underwriting";

interface StageIndicatorProps {
  currentStage: Stage;
}

const stages: { id: Stage; label: string }[] = [
  { id: "chat", label: "Eligibility chat" },
  { id: "verification", label: "Verification" },
  { id: "underwriting", label: "Underwriting" },
];

export function StageIndicator({ currentStage }: StageIndicatorProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-slate-900/90 px-4 py-3 text-xs">
      {stages.map((stage, index) => {
        const isActive = stage.id === currentStage;
        const isCompleted =
          stages.findIndex((s) => s.id === currentStage) > index;

        return (
          <div key={stage.id} className="flex flex-1 items-center gap-2">
            <div
              className={[
                "flex h-6 w-6 items-center justify-center rounded-full border text-[11px]",
                isCompleted
                  ? "border-emerald-400 bg-emerald-500/20 text-emerald-200"
                  : isActive
                  ? "border-sky-400 bg-sky-500/20 text-sky-100"
                  : "border-slate-600 bg-slate-800 text-slate-400",
              ].join(" ")}
            >
              {index + 1}
            </div>
            <span
              className={[
                "text-[11px]",
                isCompleted
                  ? "text-emerald-200"
                  : isActive
                  ? "text-sky-100"
                  : "text-slate-500",
              ].join(" ")}
            >
              {stage.label}
            </span>
            {index < stages.length - 1 && (
              <div className="mx-1 h-px flex-1 bg-gradient-to-r from-slate-700 via-slate-700 to-transparent" />
            )}
          </div>
        );
      })}
    </div>
  );
}
