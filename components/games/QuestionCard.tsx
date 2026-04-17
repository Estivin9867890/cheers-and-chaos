"use client";
import { motion, PanInfo } from "framer-motion";
import type { Card } from "@/types/game";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  card: Card;
  gradient?: string;
  onSwipeLeft?: () => void;
  extra?: React.ReactNode;
}

const INTENSITY_COLORS: Record<string, string> = {
  soft: "bg-emerald-500/20 text-emerald-300",
  medium: "bg-amber-500/20 text-amber-300",
  spicy: "bg-rose-500/20 text-rose-300",
};

const INTENSITY_LABELS: Record<string, string> = {
  soft: "Soft",
  medium: "Mix",
  spicy: "Hot 🌶️",
};

export default function QuestionCard({ card, gradient = "from-violet-600/30 to-rose-500/30", onSwipeLeft, extra }: QuestionCardProps) {
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -80 && onSwipeLeft) {
      onSwipeLeft();
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -200 }}
      className={cn(
        "relative rounded-3xl p-8 bg-gradient-to-br border border-white/10 shadow-2xl min-h-[260px] flex flex-col justify-between cursor-grab active:cursor-grabbing",
        gradient
      )}
    >
      {card.intensity && (
        <span className={cn("self-start px-3 py-1 rounded-full text-xs font-semibold mb-4", INTENSITY_COLORS[card.intensity])}>
          {INTENSITY_LABELS[card.intensity]}
        </span>
      )}
      <p className="text-white text-2xl font-semibold leading-relaxed flex-1 flex items-center">
        {card.text}
      </p>
      {extra && <div className="mt-4">{extra}</div>}
      {onSwipeLeft && (
        <p className="text-white/30 text-xs text-center mt-4">Glisse à gauche pour passer</p>
      )}
    </motion.div>
  );
}
