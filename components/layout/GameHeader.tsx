"use client";
import { useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import PlayerAvatar from "@/components/lobby/PlayerAvatar";
import { usePlayerStore } from "@/lib/store/playerStore";
import { useGameStore } from "@/lib/store/gameStore";
import { GAME_NAMES } from "@/lib/utils";

interface GameHeaderProps {
  gradient: string;
}

export default function GameHeader({ gradient }: GameHeaderProps) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const { players } = usePlayerStore();
  const { mode, currentPlayerIndex, resetGame } = useGameStore();

  const currentPlayer = players[currentPlayerIndex];
  const modeName = mode ? GAME_NAMES[mode] : "";

  const handleBack = () => {
    resetGame();
    router.push("/game-select");
  };

  return (
    <>
      <div className={`flex items-center gap-3 px-6 pt-14 pb-4 relative`}>
        <button
          onClick={() => setShowConfirm(true)}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex-1">
          <p className={`text-xs font-semibold uppercase tracking-widest bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
            {modeName}
          </p>
          {currentPlayer && (
            <div className="flex items-center gap-2 mt-0.5">
              <PlayerAvatar name={currentPlayer.name} color={currentPlayer.color} size="sm" />
              <span className="text-white text-sm font-medium">{currentPlayer.name}</span>
            </div>
          )}
        </div>
        {/* Player drink counts */}
        <div className="flex -space-x-2">
          {players.slice(0, 4).map((p) => (
            <PlayerAvatar key={p.id} name={p.name} color={p.color} size="sm" />
          ))}
        </div>
      </div>

      {/* Confirm exit modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm px-6 pb-8"
            onClick={() => setShowConfirm(false)}
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-[#1a1035] rounded-3xl p-6 border border-white/10 shadow-2xl"
            >
              <h3 className="text-white font-bold text-lg text-center mb-2">Quitter la partie ?</h3>
              <p className="text-white/50 text-sm text-center mb-6">Les scores seront perdus.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-3 rounded-2xl bg-white/10 text-white font-semibold"
                >
                  Continuer
                </button>
                <button
                  onClick={handleBack}
                  className="flex-1 py-3 rounded-2xl bg-rose-600 text-white font-semibold"
                >
                  Quitter
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
