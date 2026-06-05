import { ReactNode } from "react";

export function Card({
  children,
  className = "",
  interactive = false,
  tone = "foam",
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  tone?: "foam" | "sand" | "ocean";
}) {
  const toneClasses =
    tone === "sand"
      ? "bg-sand border-sand-dark/50"
      : tone === "ocean"
      ? "bg-ocean-deep text-foam border-ocean-deep"
      : "bg-foam border-ink/10";
  const interactiveClasses = interactive
    ? "transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    : "";
  return (
    <div
      className={`rounded-2xl border p-6 sm:p-7 shadow-sm ${toneClasses} ${interactiveClasses} ${className}`}
    >
      {children}
    </div>
  );
}
