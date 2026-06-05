import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "sunset";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 ease-out whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-mid disabled:opacity-50 disabled:pointer-events-none will-change-transform";

const variants: Record<Variant, string> = {
  primary:
    "bg-ocean-deep text-foam hover:bg-ocean-mid hover:scale-[1.02] active:scale-[0.99] shadow-sm hover:shadow-md",
  secondary:
    "bg-foam text-ocean-deep border border-ocean-deep/20 hover:border-ocean-deep hover:scale-[1.02] active:scale-[0.99]",
  ghost:
    "bg-transparent text-ocean-deep hover:bg-ocean-deep/5 active:scale-[0.99]",
  sunset:
    "bg-sunset text-foam hover:bg-sunset-dark hover:scale-[1.02] active:scale-[0.99] shadow-sm hover:shadow-md",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-[0.95rem] px-6 py-3",
  lg: "text-base px-8 py-4",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type LinkProps = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: never;
  type?: never;
  disabled?: never;
};

type ButtonProps = CommonProps & {
  href?: undefined;
  external?: undefined;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export function Button(props: LinkProps | ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className = "",
  } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
