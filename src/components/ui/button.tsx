import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-poppins font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-terracotta text-white rounded-full hover:bg-terracotta-dark active:scale-[0.98] shadow-sm hover:shadow-md hover:shadow-terracotta/20",
        secondary:
          "bg-encre text-white rounded-full hover:bg-encre-light active:scale-[0.98] shadow-sm",
        outline:
          "border border-terracotta text-terracotta bg-transparent rounded-full hover:bg-terracotta hover:text-white active:scale-[0.98]",
        ghost:
          "text-encre bg-transparent hover:bg-ivoire-warm rounded-full",
        soft:
          "bg-champagne/40 text-encre rounded-full hover:bg-champagne/60 active:scale-[0.98]",
        link:
          "text-terracotta underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-8 px-4 text-xs",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
        xl: "h-15 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
