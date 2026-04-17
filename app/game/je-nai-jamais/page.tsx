"use client";
import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { SkipForward, RotateCcw } from "lucide-react";
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

export default function JeNaiJamaisPage() {
  const router = useRouter();
  const { players, incrementDrinks } = usePlayerStore();
  const { currentPlayerIndex, nextTurn, setDeck } = useGameStore();

  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [confessors, setConfessors] = useState<Set<string>>(new Set());
  const [revealed, setRevealed] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);

  const difficultyRef = useRef<Difficulty>("soft");

  const handleDifficultySelect = (diff: Difficulty) => {
    difficultyRef.current = diff;
    setDifficulty(diff);
    const shuffled = getShuffledDeckByDifficulty("je-nai-jamais", diff);
    setDeck(shuffled);
    setShowBanner(true);
  };

  const drawNext = useCallback(() => {
    const card = useGameStore.getState().drawCard();
    if (!card) {
      const shuffled = getShuffledDeckByDifficulty("je-nai-jamais", difficultyRef.current);
      useGameStore.setState({ usedCardIds: new Set(), deck: shuffled });
      const fresh = shuffled[0];
      useGameStore.setState({ usedCardIds: new Set([fresh.id]) });
      setCurrentCard(fresh);
    } else {
      setCurrentCard(card);
    }
    setConfessors(new Set());
    setRevealed(false);
  }, []);

  const handleBannerDone = () => {
    setShowBanner(false);
    drawNext();
  };

  const toggleConfessor = (id: string) => {
    setConfessors((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleReveal = () => {
    setRevealed(true);
    confessors.forEach((id) => incrementDrinks(id, 1));
  };

  const handleNext = () => {
    setShowBanner(true);
    nextTurn(players.length);
  };

  const currentPlayer = players[currentPlayerIndex];

  return (
    <div className="flex flex-col min-h-dvh relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-violet-900/40 to-transparent" />
      </div>

      <GameHeader gradient="from-violet-400 to-rose-400" />

      <AnimatePresence>
        {showBanner && currentPlayer && (
          <TurnBanner player={currentPlayer} onDone={handleBannerDone} />
        )}
      </AnimatePresence>

      <div className="relative flex-1 px-6 flex flex-col gap-5 pb-8">

        {/* Difficulty picker — shown once at start */}
        {!difficulty && (
          <DifficultyPicker onSelect={handleDifficultySelect} title="Je n'ai jamais" />
        )}

        {/* Question card */}
        <AnimatePresence mode="wait">
          {currentCard && difficulty && (
            <QuestionCard
              key={currentCard.id}
              card={currentCard}
              gradient="from-violet-600/20 to-rose-500/20"
              onSwipeLeft={drawNext}
            />
          )}
        </AnimatePresence>

        {/* Player confession buttons */}
        {!revealed && currentCard && difficulty && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <p className="text-white/50 text-sm text-center">Qui l&apos;a fait ? Appuie sur ton prénom !</p>
            <div className="grid grid-cols-2 gap-2">
              {players.map((player) => (
                <motion.button
                  key={player.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleConfessor(player.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-2xl border transition-all ${
                    confessors.has(player.id)
                      ? "bg-violet-600/40 border-violet-400"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  <PlayerAvatar name={player.name} color={player.color} size="sm" />
                  <span className="text-white text-sm font-medium truncate">{player.name}</span>
                  {confessors.has(player.id) && <span className="ml-auto">✓</span>}
                </motion.button>
              ))}
            </div>
            <Button
              onClick={handleReveal}
              gradient="from-violet-600 to-rose-500"
              fullWidth
              size="lg"
            >
              Révéler
            </Button>
          </motion.div>
        )}

        {/* After reveal */}
        {revealed && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {confessors.size > 0 ? (
              <div className="bg-rose-500/20 rounded-2xl p-4 border border-rose-500/30 text-center">
                <p className="text-rose-300 font-semibold text-lg mb-1">
                  {confessors.size} joueur{confessors.size > 1 ? "s boivent" : " boit"} !
                </p>
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                  {[...confessors].map((id) => {
                    const p = players.find((pl) => pl.id === id)!;
                    return (
                      <div key={id} className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1">
                        <PlayerAvatar name={p.name} color={p.color} size="sm" />
                        <span className="text-white text-sm">{p.name}</span>
                        <span className="text-rose-300 text-sm font-bold">🍺</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-emerald-500/20 rounded-2xl p-4 border border-emerald-500/30 text-center">
                <p className="text-emerald-300 font-semibold text-lg">Personne ne boit !</p>
              </div>
            )}
            <div className="flex gap-3">
              <Button onClick={drawNext} variant="secondary" size="md" className="flex-1">
                <SkipForward className="w-4 h-4" /> Même joueur
              </Button>
              <Button
                onClick={handleNext}
                gradient="from-violet-600 to-rose-500"
                size="md"
                className="flex-1"
              >
                <RotateCcw className="w-4 h-4" /> Tour suivant
              </Button>
            </div>
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
