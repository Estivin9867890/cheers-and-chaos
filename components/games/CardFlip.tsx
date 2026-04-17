"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardFlipProps {
  front: React.ReactNode;
  back: React.ReactNode;
  flipped: boolean;
  onFlip?: () => void;
  className?: string;
}

export default function CardFlip({ front, back, flipped, onFlip, className }: CardFlipProps) {
  return (
    <div
      className={cn("relative cursor-pointer", className)}
      style={{ perspective: "1000px" }}
      onClick={onFlip}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="w-full h-full relative"
      >
        {/* Back face (face-down) */}
        <div
          className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-violet-800 to-purple-900 border border-violet-500/40 flex items-center justify-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="text-4xl opacity-40">🃏</div>
        </div>
        {/* Front face (revealed) */}
        <div
          className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {front}
        </div>
      </motion.div>
    </div>
  );
}
