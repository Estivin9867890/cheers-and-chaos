"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  gradient?: string;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit";
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  gradient,
  className,
  disabled = false,
  fullWidth = false,
  size = "md",
  type = "button",
}: ButtonProps) {
  const base =
    "relative rounded-2xl font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 select-none";

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3.5 text-base",
    lg: "px-8 py-5 text-lg",
  };

  const variants = {
    primary: gradient
      ? `bg-gradient-to-r ${gradient} text-white shadow-lg`
      : "bg-gradient-to-r from-violet-600 to-rose-500 text-white shadow-lg",
    secondary: "bg-white/10 backdrop-blur-sm text-white border border-white/20",
    ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/10",
    danger: "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      className={cn(
        base,
        sizes[size],
        variants[variant],
        fullWidth ? "w-full" : "",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className
      )}
    >
      {children}
    </motion.button>
  );
}
