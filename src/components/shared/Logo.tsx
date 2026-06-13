import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "icon" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({ variant = "full", size = "md", className }: LogoProps) {
  const sizes = {
    sm: { icon: 28, text: "text-xl" },
    md: { icon: 36, text: "text-2xl" },
    lg: { icon: 48, text: "text-3xl" },
  };

  const s = sizes[size];

  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5", className)}>
      {/* Monogramme M ligne continue */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M6 40 L6 14 Q6 8 12 8 Q18 8 18 14 Q18 20 24 24 Q30 28 30 34 Q30 40 24 40 Q18 40 18 34 L18 14 Q18 8 24 8 Q30 8 30 14 L30 40 Q30 34 36 34 Q42 34 42 40"
          stroke={variant === "dark" ? "#F8F5F0" : "#C98572"}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      {variant !== "icon" && (
        <span className={cn("font-cormorant font-semibold tracking-tight", s.text)}>
          <span className={variant === "dark" ? "text-ivoire" : "text-encre"}>Maker</span>
          <span className="text-terracotta">Belle</span>
        </span>
      )}
    </Link>
  );
}
