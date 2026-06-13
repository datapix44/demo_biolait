import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium font-poppins transition-all",
  {
    variants: {
      variant: {
        default: "bg-terracotta/10 text-terracotta",
        secondary: "bg-encre/10 text-encre",
        sauge: "bg-sauge/20 text-encre",
        champagne: "bg-champagne/40 text-encre-dark",
        outline: "border border-champagne text-encre bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
