"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const magneticButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:shadow-xl hover:shadow-primary/25",
        secondary:
          "border border-primary/20 text-foreground hover:border-primary/50 hover:bg-primary/5",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-8 py-3",
        sm: "px-6 py-2",
        lg: "px-10 py-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  asChild?: boolean;
  variant?: VariantProps<typeof magneticButtonVariants>["variant"];
  size?: VariantProps<typeof magneticButtonVariants>["size"];
  icon?: React.ReactNode;
}

function MagneticButton({
  children,
  className = "",
  strength = 0.2,
  onClick,
  variant = "primary",
  size = "default",
  asChild = false,
  icon,
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { damping: 20, stiffness: 300 });
  const springY = useSpring(y, { damping: 20, stiffness: 300 });

  const rotateX = useTransform(springY, [-50, 50], [10, -10]);
  const rotateY = useTransform(springX, [-50, 50], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const element = e.currentTarget as HTMLElement;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const motionProps = {
    style: {
      x: springX,
      y: springY,
      rotateX,
      rotateY,
      transformStyle: "preserve-3d" as const,
    },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    whileHover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    whileTap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  const baseClassName = cn(
    magneticButtonVariants({ variant, size, className })
  );

  if (asChild) {
    return (
      <Slot className={baseClassName} onClick={onClick} {...motionProps}>
        {children} {icon}
      </Slot>
    );
  }

  return (
    <motion.button className={baseClassName} onClick={onClick} {...motionProps}>
      <motion.span
        style={{
          transform: "translateZ(20px)",
        }}
        className="flex items-center  gap-2"
      >
        {children} {icon}
      </motion.span>
    </motion.button>
  );
}

export { MagneticButton, magneticButtonVariants };
export default MagneticButton;
