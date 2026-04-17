"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Flame, Crown, Zap } from "lucide-react";
import { useGameStore } from "@/lib/store/gameStore";

const VARIANTS = [
  {
    id: "standard",
    label: "Standard",
    description: "Les règles classiques pour une soirée sympa",
    icon: Crown,
    gradient: "from-red-700 to-orange-500",
    emoji: "👑",
  },
  {
    id: "spicy",
    label: "Épicé 🌶️",
    description: "Plus de défis, vérités gênantes et confessions",
    icon: Flame,
    gradient: "from-rose-700 to-red-500",
    emoji: "🌶️",
  },
  {
    id: "extreme",
    label: "Extrême 💀",
    description: "Shots, défis osés, règles sans pitié",
    icon: Zap,
    gradient: "from-red-900 to-rose-800",
    emoji: "💀",
  },
];

export default function KingsCupVariantPage() {
  const { startGame } = useGameStore();

  return (
    <div className="min-h-dvh flex flex-col bg-[#0f0a1e] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-red-900/30 to-transparent" />
      </div>

      <div className="flex items-center gap-3 px-6 pt-14 pb-6">
        <Link href="/game-select" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <div>
          <h1 className="text-white font-bold text-xl">King&apos;s Cup</h1>
          <p className="text-white/40 text-sm">Choisis ta difficulté</p>
        </div>
      </div>

      <div className="flex-1 px-6 flex flex-col gap-4 pb-10">
        {VARIANTS.map((v, index) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={`/game/kings-cup/${v.id}`}
              onClick={() => startGame("kings-cup", v.id as "standard" | "spicy" | "extreme")}
              className={`block relative bg-gradient-to-r ${v.gradient} rounded-3xl p-6 shadow-xl overflow-hidden`}
            >
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">
                  {v.emoji}
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">{v.label}</h3>
                  <p className="text-white/70 text-sm mt-1 max-w-[220px]">{v.description}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
