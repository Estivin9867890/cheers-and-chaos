"use client";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  gradient?: string;
  glass?: boolean;
}

export default function Card({ children, className, gradient, glass = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl overflow-hidden",
        glass && "backdrop-blur-md border border-white/10",
        gradient ? `bg-gradient-to-br ${gradient}` : "bg-white/10",
        className
      )}
    >
      {children}
    </div>
  );
}
