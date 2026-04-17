"use client";
import { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import CardFlip from "@/components/games/CardFlip";
import Button from "@/components/ui/Button";
import DrinkCounter from "@/components/games/DrinkCounter";
import PlayerAvatar from "@/components/lobby/PlayerAvatar";
import { usePlayerStore } from "@/lib/store/playerStore";
import { useGameStore } from "@/lib/store/gameStore";
import { generateDeck, getRulesForVariant } from "@/lib/data/kings-cup";
import { shuffle } from "@/lib/utils";
import type { KingsCupRule } from "@/types/game";

const SUIT_COLORS: Record<string, string> = {
  hearts: "text-rose-400",
  diamonds: "text-rose-400",
  clubs: "text-white",
  spades: "text-white",
};

const SUIT_SYMBOLS: Record<string, string> = {
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
  spades: "♠",
};

type PageParams = { params: Promise<{ variant: string }> };

export default function KingsCupGame({ params }: PageParams) {
  const { variant } = use(params);
  const { players, incrementDrinks } = usePlayerStore();
  const { currentPlayerIndex, nextTurn, kingsDrawn, incrementKings } = useGameStore();

  const [deck, setDeck] = useState<ReturnType<typeof generateDeck>>([]);
  const [usedIds, setUsedIds] = useState<Set<string>>(new Set());
  const [currentCard, setCurrentCard] = useState<typeof deck[0] | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [currentRule, setCurrentRule] = useState<KingsCupRule | null>(null);
  const [kingsCount, setKingsCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const rules = getRulesForVariant(variant as "standard" | "spicy" | "extreme");

  useEffect(() => {
    const d = shuffle(generateDeck());
    setDeck(d);
    setCurrentCard(d[0]);
    setUsedIds(new Set([d[0].id]));
  }, []);

  const drawCard = () => {
    const available = deck.filter((c) => !usedIds.has(c.id));
    if (available.length === 0) {
      // Reshuffled
      const d = shuffle(generateDeck());
      setDeck(d);
      setUsedIds(new Set([d[0].id]));
      setCurrentCard(d[0]);
      setFlipped(false);
      setCurrentRule(null);
      return;
    }
    const card = available[0];
    setCurrentCard(card);
    setUsedIds((prev) => new Set([...prev, card.id]));
    setFlipped(false);
    setCurrentRule(null);
  };

  const handleFlip = () => {
    if (flipped || !currentCard) return;
    setFlipped(true);
    const rule = rules[currentCard.value!];
    setCurrentRule(rule);
    if (currentCard.value === "K") {
      const newCount = kingsCount + 1;
      setKingsCount(newCount);
      if (newCount >= 4) setGameOver(true);
    }
  };

  const handleNext = () => {
    nextTurn(players.length);
    drawCard();
  };

  const cardsLeft = deck.length - usedIds.size;
  const currentPlayer = players[currentPlayerIndex];

  const gradients: Record<string, string> = {
    standard: "from-red-700 to-orange-500",
    spicy: "from-rose-700 to-red-500",
    extreme: "from-red-900 to-rose-800",
  };
  const gradient = gradients[variant] || gradients.standard;

  if (gameOver) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center px-6 bg-[#0f0a1e]">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-8xl mb-6"
        >
          💀
        </motion.div>
        <h2 className="text-white font-bold text-3xl text-center mb-2">Game Over!</h2>
        <p className="text-white/60 text-center mb-8">
          Le 4ème Roi a été tiré !<br />
          {currentPlayer?.name} doit finir le calice du Roi !
        </p>
        <Link href="/scores" className="w-full max-w-sm">
          <Button gradient={gradient} fullWidth size="lg">Voir les scores</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-red-900/30 to-transparent" />
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 px-6 pt-14 pb-4">
        <Link href="/game/kings-cup" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <div className="flex-1">
          <p className={`text-xs font-semibold uppercase tracking-widest bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
            King&apos;s Cup — {variant}
          </p>
          {currentPlayer && (
            <div className="flex items-center gap-2 mt-0.5">
              <PlayerAvatar name={currentPlayer.name} color={currentPlayer.color} size="sm" />
              <span className="text-white text-sm">{currentPlayer.name}</span>
            </div>
          )}
        </div>
        <div className="text-right">
          <p className="text-white/40 text-xs">{cardsLeft} cartes</p>
          <div className="flex gap-1 mt-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${i <= kingsCount ? "bg-red-500" : "bg-white/20"}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative flex-1 px-6 flex flex-col gap-5 pb-8">
        {/* Card */}
        <div className="flex justify-center">
          <CardFlip
            flipped={flipped}
            onFlip={handleFlip}
            className="w-48 h-72"
            front={
              currentCard ? (
                <div className={`w-full h-full bg-gradient-to-br ${gradient} p-4 flex flex-col justify-between`}>
                  <div className={`text-4xl font-bold ${currentCard.suit ? SUIT_COLORS[currentCard.suit] : "text-white"}`}>
                    {currentCard.value}
                    <span className="ml-1">{currentCard.suit ? SUIT_SYMBOLS[currentCard.suit] : ""}</span>
                  </div>
                  {currentRule && (
                    <div>
                      <p className="text-white font-bold text-lg">{currentRule.name}</p>
                      <p className="text-white/80 text-sm mt-1">{currentRule.description}</p>
                    </div>
                  )}
                </div>
              ) : <div />
            }
            back={<div />}
          />
        </div>

        {!flipped && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/40 text-sm text-center"
          >
            Appuie sur la carte pour la retourner
          </motion.p>
        )}

        {/* Rule display */}
        <AnimatePresence>
          {flipped && currentRule && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-gradient-to-br ${gradient} opacity-90 rounded-3xl p-5 border border-white/20 shadow-xl`}
            >
              <h3 className="text-white font-bold text-xl mb-2">{currentRule.name}</h3>
              <p className="text-white/90 text-base">{currentRule.description}</p>
              {currentRule.sips && currentRule.sips > 0 && (
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-white/70 text-sm">Gorgées :</span>
                  <span className="text-white font-bold">{currentRule.sips} 🍺</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {flipped && (
          <div className="flex gap-3 mt-auto">
            <Button
              onClick={handleNext}
              gradient={gradient}
              fullWidth
              size="lg"
            >
              <RefreshCw className="w-5 h-5" /> Prochaine carte
            </Button>
          </div>
        )}
      </div>

      {/* Players */}
      <div className="relative px-6 pb-6 flex gap-3 overflow-x-auto">
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
