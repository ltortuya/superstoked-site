import { CountUp } from "./CountUp";

export function Stat({
  value,
  label,
  suffix,
  tone = "dark",
}: {
  value: number;
  label: string;
  suffix?: string;
  tone?: "dark" | "light";
}) {
  const valueColor = tone === "light" ? "text-foam" : "text-ocean-deep";
  const labelColor = tone === "light" ? "text-foam/80" : "text-ink-soft";
  return (
    <div className="text-center">
      <div className={`font-display text-5xl sm:text-6xl tracking-tight ${valueColor}`}>
        <CountUp to={value} suffix={suffix} />
      </div>
      <div
        className={`mt-2 text-sm font-semibold uppercase tracking-[0.1em] ${labelColor}`}
      >
        {label}
      </div>
    </div>
  );
}
