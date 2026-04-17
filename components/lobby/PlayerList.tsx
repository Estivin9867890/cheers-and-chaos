"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { usePlayerStore } from "@/lib/store/playerStore";
import PlayerAvatar from "./PlayerAvatar";

export default function PlayerList() {
  const { players, removePlayer } = usePlayerStore();

  return (
    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
      <AnimatePresence>
        {players.map((player, index) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 bg-white/10 rounded-2xl px-4 py-3 border border-white/10"
          >
            <PlayerAvatar name={player.name} color={player.color} size="sm" />
            <span className="flex-1 text-white font-medium">{player.name}</span>
            <span className="text-white/40 text-sm">#{index + 1}</span>
            <button
              onClick={() => removePlayer(player.id)}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-500/30 transition-colors active:scale-90"
            >
              <X className="w-4 h-4 text-white/60" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
      {players.length === 0 && (
        <p className="text-white/30 text-center py-6 text-sm">Ajoute des joueurs pour commencer</p>
      )}
    </div>
  );
}
