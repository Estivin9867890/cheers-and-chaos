"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import GameHeader from "@/components/layout/GameHeader";
import TurnBanner from "@/components/games/TurnBanner";
import QuestionCard from "@/components/games/QuestionCard";
import Button from "@/components/ui/Button";
import DifficultyPicker, { type Difficulty } from "@/components/games/DifficultyPicker";
import PlayerAvatar from "@/components/lobby/PlayerAvatar";
import { usePlayerStore } from "@/lib/store/playerStore";
import { useGameStore } from "@/lib/store/gameStore";
import { getShuffledDeckByDifficulty } from "@/lib/data";
import type { Card } from "@/types/game";

const SIPS = 2;

export default function QuiPourrait() {
  const { players } = usePlayerStore();
  const { currentPlayerIndex, nextTurn, setDeck } = useGameStore();

  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [phase, setPhase] = useState<"difficulty" | "banner" | "question">("difficulty");

  // Ref keeps difficulty stable across re-renders for the reshuffle case
  const difficultyRef = useRef<Difficulty>("soft");

  const handleDifficultySelect = (diff: Difficulty) => {
    difficultyRef.current = diff;
    const shuffled = getShuffledDeckByDifficulty("qui-pourrait", diff);
    setDeck(shuffled);
    setPhase("banner");
  };

  const drawNext = () => {
    const card = useGameStore.getState().drawCard();
    if (card) {
      setCurrentCard(card);
    } else {
      const shuffled = getShuffledDeckByDifficulty("qui-pourrait", difficultyRef.current);
      useGameStore.setState({ usedCardIds: new Set(), deck: shuffled });
      setCurrentCard(shuffled[0]);
    }
    setPhase("question");
  };

  const handleBannerDone = () => {
    drawNext();
  };

  const handleNextQuestion = () => {
    nextTurn(players.length);
    setPhase("banner");
  };

  const currentPlayer = players[currentPlayerIndex];

  return (
    <div className="flex flex-col min-h-dvh relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-orange-900/30 to-transparent" />
      </div>

      <GameHeader gradient="from-orange-400 to-yellow-400" />

      <AnimatePresence>
        {phase === "banner" && currentPlayer && (
          <TurnBanner player={currentPlayer} onDone={handleBannerDone} />
        )}
      </AnimatePresence>

      <div className="relative flex-1 px-6 flex flex-col gap-5 pb-8">

        {/* Difficulty picker — shown once at start */}
        {phase === "difficulty" && (
          <DifficultyPicker onSelect={handleDifficultySelect} title="Qui pourrait ?" />
        )}

        {/* Question card */}
        <AnimatePresence mode="wait">
          {currentCard && phase === "question" && (
            <QuestionCard
              key={currentCard.id}
              card={currentCard}
              gradient="from-orange-600/20 to-yellow-500/20"
            />
          )}
        </AnimatePresence>

        {/* Sips display + next button */}
        {phase === "question" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4"
          >
            {/* Neon sip counter */}
            <div className="w-full rounded-2xl border border-orange-400/40 bg-orange-400/10 px-6 py-5 text-center">
              <p className="text-white/50 text-sm mb-1">Le &quot;gagnant&quot; désigné boit</p>
              <p
                className="text-orange-300 font-extrabold text-6xl tabular-nums"
                style={{ textShadow: "0 0 24px rgba(251,146,60,0.75), 0 0 8px rgba(251,146,60,0.5)" }}
              >
                {SIPS} 🍺
              </p>
              <p className="text-white/35 text-xs mt-1.5">Désigné à l&apos;oral par le groupe</p>
            </div>

            <Button
              onClick={handleNextQuestion}
              gradient="from-orange-500 to-yellow-400"
              fullWidth
              size="lg"
            >
              Prochaine question <ChevronRight className="w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </div>

      {/* Player score bar */}
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
