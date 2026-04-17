"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import PlayerAvatar from "@/components/lobby/PlayerAvatar";
import type { Player } from "@/types/player";

interface TurnBannerProps {
  player: Player;
  onDone: () => void;
  autoDelay?: number;
}

export default function TurnBanner({ player, onDone, autoDelay = 2000 }: TurnBannerProps) {
  useEffect(() => {
    const t = setTimeout(onDone, autoDelay);
    return () => clearTimeout(t);
  }, [onDone, autoDelay]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm px-6"
      onClick={onDone}
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="flex flex-col items-center gap-4"
      >
        <PlayerAvatar name={player.name} color={player.color} size="lg" />
        <div className="text-center">
          <p className="text-white/60 text-sm uppercase tracking-widest mb-1">C&apos;est le tour de</p>
          <h2 className="text-white text-4xl font-bold">{player.name}</h2>
        </div>
        <p className="text-white/40 text-sm mt-4">Appuie pour continuer</p>
      </motion.div>
    </motion.div>
  );
}
