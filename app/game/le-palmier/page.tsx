"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ThumbsUp, ThumbsDown, RotateCcw, Flame, Snowflake, Zap, Skull } from "lucide-react";
import Link from "next/link";
import PlayerAvatar from "@/components/lobby/PlayerAvatar";
import Button from "@/components/ui/Button";
import { usePlayerStore } from "@/lib/store/playerStore";
import { useGameStore } from "@/lib/store/gameStore";
import { PALMIER_CHALLENGES } from "@/lib/data";
import { shuffle } from "@/lib/utils";
import type { Card } from "@/types/game";

const LEVELS = 7;

const LEVEL_META: Record<number, { label: string; color: string; bg: string; border: string; sips: number }> = {
  1: { label: "Échauffement",      color: "text-emerald-300",  bg: "bg-emerald-500/20",  border: "border-emerald-500/30", sips: 1 },
  2: { label: "Ça commence",       color: "text-green-300",    bg: "bg-green-500/20",    border: "border-green-500/30",   sips: 2 },
  3: { label: "Gêne assurée",      color: "text-yellow-300",   bg: "bg-yellow-500/20",   border: "border-yellow-500/30",  sips: 2 },
  4: { label: "Ça chauffe",        color: "text-orange-300",   bg: "bg-orange-500/20",   border: "border-orange-500/30",  sips: 3 },
  5: { label: "Hard",              color: "text-rose-300",     bg: "bg-rose-500/20",     border: "border-rose-500/30",    sips: 4 },
  6: { label: "Extrême",           color: "text-red-300",      bg: "bg-red-500/20",      border: "border-red-500/30",     sips: 5 },
  7: { label: "Palmier de la Mort",color: "text-purple-300",   bg: "bg-purple-500/20",   border: "border-purple-500/30",  sips: 7 },
};

function LevelBadge({ level }: { level: number }) {
  const meta = LEVEL_META[level];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${meta.bg} ${meta.color}`}>
      {level === 7 && <Skull className="w-3 h-3" />}
      {level === 6 && <Flame className="w-3 h-3" />}
      {level <= 2 && <Snowflake className="w-3 h-3" />}
      {level >= 3 && level <= 5 && <Zap className="w-3 h-3" />}
      Niv. {level} — {meta.label}
    </span>
  );
}

export default function LePalmierPage() {
  const { players, incrementDrinks } = usePlayerStore();
  const { currentPlayerIndex, nextTurn } = useGameStore();
  const [playerLevels, setPlayerLevels] = useState<Record<string, number>>({});
  const [deck, setDeck] = useState<Card[]>([]);
  const [usedIds, setUsedIds] = useState<Set<string>>(new Set());
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [phase, setPhase] = useState<"challenge" | "result">("challenge");
  const [lastResult, setLastResult] = useState<"pass" | "fail" | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    const levels: Record<string, number> = {};
    players.forEach((p) => { levels[p.id] = 1; });
    setPlayerLevels(levels);
    const d = shuffle(PALMIER_CHALLENGES);
    setDeck(d);
    drawChallenge(d, new Set(), 1);
  }, []);

  const drawChallenge = (d: Card[], used: Set<string>, level: number) => {
    const levelCards = d.filter((c) => c.category === String(level) && !used.has(c.id));
    const fallback = d.filter((c) => !used.has(c.id));
    const pool = levelCards.length > 0 ? levelCards : fallback;
    if (pool.length === 0) {
      // deck épuisé — on réinitialise
      const fresh = shuffle([...PALMIER_CHALLENGES]);
      setDeck(fresh);
      setUsedIds(new Set());
      const card = fresh.find((c) => c.category === String(level)) || fresh[0];
      if (card) {
        setCurrentCard(card);
        setUsedIds(new Set([card.id]));
      }
      return;
    }
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
      const sips = LEVEL_META[currentLevel]?.sips ?? currentLevel;
      incrementDrinks(currentPlayer.id, sips);
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
  const meta = LEVEL_META[currentLevel];

  if (winner) {
    const winnerPlayer = players.find((p) => p.id === winner);
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center px-6 bg-[#0f0a1e]">
        <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ type: "spring" }} className="text-8xl mb-6">
          🌴
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-white font-bold text-3xl text-center mb-2">
          {winnerPlayer?.name} gagne !
        </motion.h2>
        <p className="text-white/60 text-center mb-8">Il/Elle a gravi les 7 niveaux du palmier de la mort !</p>
        <Link href="/scores" className="w-full max-w-sm">
          <Button gradient="from-emerald-600 to-green-400" fullWidth size="lg">Voir les scores</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh relative overflow-hidden bg-[#0f0a1e]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-emerald-900/25 to-transparent" />
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
              <span className="text-white text-sm font-semibold">{currentPlayer.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Palm tree — 7 niveaux */}
      <div className="px-6 flex justify-center mb-3">
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl">🌴</span>
          {[7, 6, 5, 4, 3, 2, 1].map((lvl) => {
            const m = LEVEL_META[lvl];
            return (
              <div key={lvl} className="flex items-center gap-2">
                <span className={`text-[10px] font-bold w-4 text-right ${m.color} opacity-80`}>{lvl}</span>
                <div className="flex gap-1">
                  {players.map((p) => {
                    const playerLvl = playerLevels[p.id] || 1;
                    const active = playerLvl >= lvl;
                    return (
                      <div
                        key={p.id}
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[9px] font-bold transition-all ${
                          active ? "border-transparent" : "border-white/10 bg-white/5 opacity-30"
                        }`}
                        style={active ? { backgroundColor: p.color } : undefined}
                      >
                        {active ? p.name.charAt(0) : ""}
                      </div>
                    );
                  })}
                </div>
                <span className={`text-[9px] ${m.color} opacity-50 hidden sm:block`}>{m.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative flex-1 px-6 flex flex-col gap-4 pb-8">
        {/* Challenge card */}
        <AnimatePresence mode="wait">
          {currentCard && (
            <motion.div
              key={currentCard.id}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`rounded-3xl p-6 border min-h-[160px] flex flex-col justify-between ${meta.bg} ${meta.border}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <LevelBadge level={currentLevel} />
                <span className={`text-xs ${meta.color} opacity-60`}>
                  {meta.sips} gorgée{meta.sips > 1 ? "s" : ""} si raté
                </span>
              </div>
              <p className="text-white text-lg font-semibold leading-snug">{currentCard.text}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {phase === "challenge" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <p className="text-white/40 text-sm text-center">
              {currentPlayer?.name} a-t-il/elle relevé le défi ?
            </p>
            <div className="flex gap-3">
              <Button onClick={() => handleVote(false)} variant="danger" size="lg" className="flex-1">
                <ThumbsDown className="w-5 h-5" /> Raté
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
                  🌴 {currentPlayer?.name} monte au niveau {currentLevel} !
                </p>
                {currentLevel >= 6 && (
                  <p className="text-emerald-400/70 text-sm mt-1">Encore {LEVELS - currentLevel + 1} niveaux pour la victoire…</p>
                )}
              </div>
            ) : (
              <div className="bg-rose-500/20 rounded-2xl p-4 border border-rose-500/30 text-center">
                <p className="text-rose-300 font-bold text-xl">
                  💀 {currentPlayer?.name} retombe au niveau 1 !
                </p>
                <p className="text-rose-400/70 text-base mt-1">
                  Boit {meta.sips} gorgée{meta.sips > 1 ? "s" : ""} 🍺
                </p>
              </div>
            )}
            <Button onClick={handleNext} gradient="from-emerald-600 to-green-400" fullWidth size="lg">
              <RotateCcw className="w-4 h-4" /> Tour suivant
            </Button>
          </motion.div>
        )}
      </div>

      {/* Score bar */}
      <div className="relative px-6 pb-6 flex gap-3 overflow-x-auto">
        {players.map((p) => {
          const lvl = playerLevels[p.id] || 1;
          const m = LEVEL_META[lvl];
          return (
            <div key={p.id} className="flex flex-col items-center gap-1 flex-shrink-0">
              <PlayerAvatar name={p.name} color={p.color} size="sm" />
              <span className={`text-[10px] font-bold ${m.color}`}>Niv.{lvl}</span>
              <span className="text-white/40 text-xs">{p.drinkCount}🍺</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
