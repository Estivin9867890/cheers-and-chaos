"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Wine } from "lucide-react";

interface DrinkCounterProps {
  sips: number;
  playerName?: string;
}

export default function DrinkCounter({ sips, playerName }: DrinkCounterProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center gap-2"
    >
      {playerName && <p className="text-white/60 text-sm">{playerName} boit</p>}
      <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-6 py-4 border border-white/20">
        <Wine className="w-6 h-6 text-rose-400" />
        <AnimatePresence mode="wait">
          <motion.span
            key={sips}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            className="text-white font-bold text-2xl min-w-[2ch] text-center"
          >
            {sips}
          </motion.span>
        </AnimatePresence>
        <span className="text-white/60">{sips === 1 ? "gorgée" : "gorgées"}</span>
      </div>
    </motion.div>
  );
}
