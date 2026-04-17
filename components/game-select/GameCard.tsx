"use client";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { GAME_GRADIENTS, GAME_NAMES } from "@/lib/utils";
import type { GameMode } from "@/types/game";

interface GameCardProps {
  mode: GameMode;
  icon: LucideIcon;
  description: string;
  minPlayers: number;
  onClick: () => void;
  index: number;
}

export default function GameCard({ mode, icon: Icon, description, minPlayers, onClick, index }: GameCardProps) {
  const gradient = GAME_GRADIENTS[mode];
  const name = GAME_NAMES[mode];

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative bg-gradient-to-br ${gradient} rounded-3xl p-5 text-left shadow-xl overflow-hidden w-full aspect-[4/3] flex flex-col justify-between`}
    >
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative">
        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-3">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-white font-bold text-lg leading-tight">{name}</h3>
      </div>
      <div className="relative">
        <p className="text-white/70 text-xs">{description}</p>
        <span className="text-white/50 text-xs mt-1 block">{minPlayers}+ joueurs</span>
      </div>
    </motion.button>
  );
}
