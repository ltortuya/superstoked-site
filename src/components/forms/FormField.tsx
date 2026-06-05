import { ReactNode } from "react";

const inputClass =
  "w-full rounded-xl bg-foam border border-ink/15 px-4 py-3 text-ink placeholder:text-muted focus:outline-none focus:border-ocean-mid focus:ring-2 focus:ring-ocean-mid/20 transition-colors";

export function FormField({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  hint,
  textarea = false,
  rows = 5,
  options,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  textarea?: boolean;
  rows?: number;
  options?: string[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-semibold text-ocean-deep">
        {label}
        {required && <span className="text-sunset ml-0.5">*</span>}
      </label>
      {options ? (
        <select id={name} name={name} required={required} className={inputClass} defaultValue="">
          <option value="" disabled>
            Choose one…
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : textarea ? (
        <textarea
          id={name}
          name={name}
          required={required}
          placeholder={placeholder}
          rows={rows}
          className={inputClass}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={inputClass}
        />
      )}
      {hint && <p className="text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function FormMessage({
  status,
  children,
}: {
  status: "ok" | "err" | "idle" | "loading";
  children?: ReactNode;
}) {
  if (status === "idle" || status === "loading") return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className={`rounded-xl px-4 py-3 text-sm ${
        status === "ok"
          ? "bg-ocean-mid/10 text-ocean-deep border border-ocean-mid/30"
          : "bg-sunset/10 text-sunset-dark border border-sunset/30"
      }`}
    >
      {children}
    </div>
  );
}
