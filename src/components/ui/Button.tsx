import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

const variantMap: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-slate-950 hover:bg-sky-300 shadow-soft focus-visible:ring-primary",
  secondary:
    "bg-surface text-white hover:bg-slate-800 border border-border focus-visible:ring-border",
  ghost: "text-white hover:bg-slate-800/70 focus-visible:ring-border",
  danger:
    "bg-red-500 text-white hover:bg-red-400 focus-visible:ring-red-500 shadow-soft",
};

export function Button({
  className,
  variant = "primary",
  isLoading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60",
        variantMap[variant],
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Please wait..." : children}
    </button>
  );
}

