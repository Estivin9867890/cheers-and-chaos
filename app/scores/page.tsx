"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Trophy, RotateCcw, Home } from "lucide-react";
import PlayerAvatar from "@/components/lobby/PlayerAvatar";
import { usePlayerStore } from "@/lib/store/playerStore";
import { useGameStore } from "@/lib/store/gameStore";

const MEDALS = ["🥇", "🥈", "🥉"];

export default function ScoresPage() {
  const { players, resetDrinks } = usePlayerStore();
  const { resetGame } = useGameStore();

  const sorted = [...players].sort((a, b) => b.drinkCount - a.drinkCount);

  const handlePlayAgain = () => {
    resetDrinks();
    resetGame();
  };

  return (
    <div className="min-h-dvh flex flex-col bg-[#0f0a1e] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-violet-800/20 blur-[80px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-rose-800/15 blur-[60px]" />
      </div>

      {/* Header */}
      <div className="relative pt-16 px-6 text-center pb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="text-6xl mb-4"
        >
          🏆
        </motion.div>
        <h1 className="text-white font-extrabold text-3xl">Tableau des scores</h1>
        <p className="text-white/40 text-sm mt-1">Qui a le plus bu ce soir ?</p>
      </div>

      {/* Podium top 3 */}
      {sorted.length >= 3 && (
        <div className="relative px-6 flex justify-center items-end gap-3 mb-6" style={{ height: 140 }}>
          {[sorted[1], sorted[0], sorted[2]].map((player, pIdx) => {
            const heights = [90, 130, 70];
            const rank = pIdx === 0 ? 2 : pIdx === 1 ? 1 : 3;
            return (
              <motion.div
                key={player.id}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: heights[pIdx], opacity: 1 }}
                transition={{ delay: pIdx * 0.15, duration: 0.5 }}
                className="flex flex-col items-center justify-end gap-1 flex-1 max-w-[90px]"
              >
                <PlayerAvatar name={player.name} color={player.color} size="sm" />
                <span className="text-white text-xs font-semibold truncate max-w-full px-1">{player.name}</span>
                <div
                  className={`w-full rounded-t-xl flex items-center justify-center text-2xl`}
                  style={{
                    height: heights[pIdx],
                    background: pIdx === 1 ? "linear-gradient(135deg,#7c3aed,#db2777)" : "rgba(255,255,255,0.08)",
                  }}
                >
                  {MEDALS[rank - 1]}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Full ranking */}
      <div className="relative flex-1 px-6 space-y-2 pb-4">
        {sorted.map((player, index) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.07 }}
            className={`flex items-center gap-3 rounded-2xl px-4 py-3 border ${
              index === 0
                ? "bg-violet-600/20 border-violet-500/40"
                : "bg-white/5 border-white/10"
            }`}
          >
            <span className="text-2xl w-8">{MEDALS[index] || `#${index + 1}`}</span>
            <PlayerAvatar name={player.name} color={player.color} size="sm" />
            <span className="text-white font-semibold flex-1">{player.name}</span>
            <div className="text-right">
              <span className="text-white font-bold text-lg">{player.drinkCount}</span>
              <span className="text-white/50 text-sm ml-1">🍺</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Actions */}
      <div className="relative px-6 pb-10 space-y-3">
        <Link href="/game-select" onClick={handlePlayAgain}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="w-full py-4 bg-gradient-to-r from-violet-600 to-rose-500 rounded-2xl text-white font-bold text-lg text-center flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Rejouer
          </motion.div>
        </Link>
        <Link href="/" onClick={handlePlayAgain}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="w-full py-4 bg-white/10 rounded-2xl text-white/70 font-semibold text-center flex items-center justify-center gap-2 border border-white/10"
          >
            <Home className="w-5 h-5" />
            Accueil
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
