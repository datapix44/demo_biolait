import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-xl border border-champagne bg-white px-4 py-2",
        "font-poppins text-sm text-encre placeholder:text-muted-foreground placeholder:italic",
        "focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "transition-all duration-200",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
