"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, HelpCircle, Crown, Palmtree, Triangle, RotateCcw, BookOpen, Shuffle, Lightbulb } from "lucide-react";
import Link from "next/link";
import GameCard from "@/components/game-select/GameCard";
import { usePlayerStore } from "@/lib/store/playerStore";
import { useGameStore } from "@/lib/store/gameStore";
import type { GameMode } from "@/types/game";

const GAMES = [
  {
    mode: "je-nai-jamais" as GameMode,
    icon: MessageCircle,
    description: "Avouez vos secrets, buvez si vous l'avez fait !",
    minPlayers: 3,
    path: "/game/je-nai-jamais",
  },
  {
    mode: "qui-pourrait" as GameMode,
    icon: HelpCircle,
    description: "Désignez celui qui ferait ça... il boit !",
    minPlayers: 3,
    path: "/game/qui-pourrait",
  },
  {
    mode: "kings-cup" as GameMode,
    icon: Crown,
    description: "Les cartes décident de votre sort !",
    minPlayers: 2,
    path: "/game/kings-cup",
  },
  {
    mode: "le-palmier" as GameMode,
    icon: Palmtree,
    description: "Montez les niveaux, survivez aux défis !",
    minPlayers: 3,
    path: "/game/le-palmier",
  },
  {
    mode: "la-pyramide" as GameMode,
    icon: Triangle,
    description: "Bluffez, révélez, faites boire !",
    minPlayers: 3,
    path: "/game/la-pyramide",
  },
  {
    mode: "le-triman" as GameMode,
    icon: RotateCcw,
    description: "Le triangle de la mort tourne !",
    minPlayers: 3,
    path: "/game/le-triman",
  },
  {
    mode: "culture-generale" as GameMode,
    icon: BookOpen,
    description: "Testez vos connaissances ou buvez !",
    minPlayers: 2,
    path: "/game/culture-generale",
  },
  {
    mode: "tu-preferes" as GameMode,
    icon: Shuffle,
    description: "Des dilemmes impossibles, la minorité boit !",
    minPlayers: 2,
    path: "/game/tu-preferes",
  },
  {
    mode: "fun-facts" as GameMode,
    icon: Lightbulb,
    description: "Faits insolites & débats enflammés !",
    minPlayers: 1,
    path: "/game/fun-facts",
  },
];

export default function GameSelectPage() {
  const router = useRouter();
  const { players } = usePlayerStore();
  const { startGame, resetDrinks } = { ...useGameStore(), resetDrinks: usePlayerStore((s) => s.resetDrinks) };

  const handleSelect = (game: typeof GAMES[0]) => {
    if (game.mode !== "kings-cup") {
      startGame(game.mode);
    }
    usePlayerStore.getState().resetDrinks();
    router.push(game.path);
  };

  return (
    <div className="min-h-dvh bg-[#0f0a1e] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-purple-800/15 blur-[80px]" />
      </div>

      {/* Header */}
      <div className="relative flex items-center gap-3 px-6 pt-14 pb-6">
        <Link href="/lobby" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <div>
          <h1 className="text-white font-bold text-xl">Choisis ton jeu</h1>
          <p className="text-white/40 text-sm">{players.length} joueurs • Que le chaos commence !</p>
        </div>
      </div>

      {/* Grid */}
      <div className="relative px-6 pb-10 grid grid-cols-2 gap-4">
        {GAMES.map((game, index) => (
          <GameCard
            key={game.mode}
            mode={game.mode}
            icon={game.icon}
            description={game.description}
            minPlayers={game.minPlayers}
            onClick={() => handleSelect(game)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
