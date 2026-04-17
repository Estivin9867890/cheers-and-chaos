"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ThumbsUp, ThumbsDown, RotateCcw } from "lucide-react";
import Link from "next/link";
import PlayerAvatar from "@/components/lobby/PlayerAvatar";
import Button from "@/components/ui/Button";
import { usePlayerStore } from "@/lib/store/playerStore";
import { useGameStore } from "@/lib/store/gameStore";
import { PALMIER_CHALLENGES } from "@/lib/data";
import { shuffle } from "@/lib/utils";
import type { Card } from "@/types/game";

const LEVELS = 5;

export default function LePalmierPage() {
  const { players, incrementDrinks } = usePlayerStore();
  const { currentPlayerIndex, nextTurn } = useGameStore();
  const [playerLevels, setPlayerLevels] = useState<Record<string, number>>({});
  const [deck, setDeck] = useState<Card[]>([]);
  const [usedIds, setUsedIds] = useState<Set<string>>(new Set());
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [phase, setPhase] = useState<"challenge" | "vote" | "result">("challenge");
  const [lastResult, setLastResult] = useState<"pass" | "fail" | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    const levels: Record<string, number> = {};
    players.forEach((p) => { levels[p.id] = 1; });
    setPlayerLevels(levels);
    const d = shuffle(PALMIER_CHALLENGES);
    setDeck(d);
    drawChallenge(d, new Set(), levels[players[currentPlayerIndex]?.id] || 1);
  }, []);

  const drawChallenge = (d: Card[], used: Set<string>, level: number) => {
    const levelCards = d.filter((c) => c.category === String(level) && !used.has(c.id));
    const fallback = d.filter((c) => !used.has(c.id));
    const pool = levelCards.length > 0 ? levelCards : fallback;
    if (pool.length === 0) return;
    const card = pool[0];
    setCurrentCard(card);
    setUsedIds((prev) => new Set([...prev, card.id]));
    setPhase("challenge");
    setLastResult(null);
  };

  const handleVote = (pass: boolean) => {
    const currentPlayer = players[currentPlayerIndex];
    if (!currentPlayer) return;
    const currentLevel = playerLevels[currentPlayer.id] || 1;
    if (pass) {
      const newLevel = currentLevel + 1;
      setPlayerLevels((prev) => ({ ...prev, [currentPlayer.id]: newLevel }));
      if (newLevel > LEVELS) {
        setWinner(currentPlayer.id);
        return;
      }
      setLastResult("pass");
    } else {
      incrementDrinks(currentPlayer.id, currentLevel);
      setPlayerLevels((prev) => ({ ...prev, [currentPlayer.id]: 1 }));
      setLastResult("fail");
    }
    setPhase("result");
  };

  const handleNext = () => {
    nextTurn(players.length);
    const nextIdx = (currentPlayerIndex + 1) % players.length;
    const nextPlayer = players[nextIdx];
    const level = playerLevels[nextPlayer?.id] || 1;
    drawChallenge(deck, usedIds, level);
  };

  const currentPlayer = players[currentPlayerIndex];
  const currentLevel = currentPlayer ? (playerLevels[currentPlayer.id] || 1) : 1;

  if (winner) {
    const winnerPlayer = players.find((p) => p.id === winner);
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center px-6 bg-[#0f0a1e]">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-8xl mb-6">🌴</motion.div>
        <h2 className="text-white font-bold text-3xl text-center mb-2">{winnerPlayer?.name} gagne !</h2>
        <p className="text-white/60 text-center mb-8">Il/Elle a atteint le sommet du palmier !</p>
        <Link href="/scores" className="w-full max-w-sm">
          <Button gradient="from-emerald-600 to-green-400" fullWidth size="lg">Voir les scores</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-emerald-900/30 to-transparent" />
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 px-6 pt-14 pb-4">
        <Link href="/game-select" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
            Le Palmier
          </p>
          {currentPlayer && (
            <div className="flex items-center gap-2 mt-0.5">
              <PlayerAvatar name={currentPlayer.name} color={currentPlayer.color} size="sm" />
              <span className="text-white text-sm">{currentPlayer.name} — Niveau {currentLevel}</span>
            </div>
          )}
        </div>
      </div>

      {/* Palm tree visualization */}
      <div className="px-6 flex justify-center mb-4">
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-3xl">🌴</span>
          {[5, 4, 3, 2, 1].map((lvl) => (
            <div key={lvl} className="flex items-center gap-2">
              <span className="text-white/30 text-xs w-4">{lvl}</span>
              <div className="flex gap-1.5">
                {players.map((p) => (
                  <div
                    key={p.id}
                    className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center text-xs font-bold ${
                      (playerLevels[p.id] || 1) >= lvl
                        ? "border-transparent"
                        : "border-transparent opacity-20 bg-white/10"
                    }`}
                    style={
                      (playerLevels[p.id] || 1) >= lvl
                        ? { backgroundColor: p.color }
                        : undefined
                    }
                  >
                    {(playerLevels[p.id] || 1) >= lvl ? p.name.charAt(0) : ""}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex-1 px-6 flex flex-col gap-4 pb-8">
        {/* Challenge card */}
        <AnimatePresence mode="wait">
          {currentCard && (
            <motion.div
              key={currentCard.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-gradient-to-br from-emerald-600/20 to-green-500/20 rounded-3xl p-6 border border-emerald-500/20 min-h-[160px] flex flex-col justify-center"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-emerald-500/20 rounded-full text-emerald-300 text-xs font-semibold">
                  Niveau {currentLevel}
                </span>
              </div>
              <p className="text-white text-xl font-semibold">{currentCard.text}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {phase === "challenge" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <p className="text-white/50 text-sm text-center">
              {currentPlayer?.name} relève-t-il/elle le défi ?
            </p>
            <div className="flex gap-3">
              <Button onClick={() => handleVote(false)} variant="danger" size="lg" className="flex-1">
                <ThumbsDown className="w-5 h-5" /> Échoué
              </Button>
              <Button
                onClick={() => handleVote(true)}
                gradient="from-emerald-600 to-green-400"
                size="lg"
                className="flex-1"
              >
                <ThumbsUp className="w-5 h-5" /> Réussi
              </Button>
            </div>
          </motion.div>
        )}

        {phase === "result" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {lastResult === "pass" ? (
              <div className="bg-emerald-500/20 rounded-2xl p-4 border border-emerald-500/30 text-center">
                <p className="text-emerald-300 font-bold text-xl">
                  {currentPlayer?.name} monte au niveau {currentLevel} !
                </p>
              </div>
            ) : (
              <div className="bg-rose-500/20 rounded-2xl p-4 border border-rose-500/30 text-center">
                <p className="text-rose-300 font-bold text-xl">
                  {currentPlayer?.name} retombe au niveau 1 !<br />
                  <span className="text-base font-normal">Boit {currentLevel} gorgée{currentLevel > 1 ? "s" : ""} 🍺</span>
                </p>
              </div>
            )}
            <Button onClick={handleNext} gradient="from-emerald-600 to-green-400" fullWidth size="lg">
              <RotateCcw className="w-4 h-4" /> Tour suivant
            </Button>
          </motion.div>
        )}
      </div>

      <div className="relative px-6 pb-6 flex gap-2 overflow-x-auto">
        {players.map((p) => (
          <div key={p.id} className="flex flex-col items-center gap-1 flex-shrink-0">
            <PlayerAvatar name={p.name} color={p.color} size="sm" />
            <span className="text-white/50 text-xs">{p.drinkCount}🍺</span>
          </div>
        ))}
      </div>
    </div>
  );
}
