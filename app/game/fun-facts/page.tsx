"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RefreshCw, Flame, Lightbulb } from "lucide-react";
import Link from "next/link";
import { FUN_FACTS, type FunFactCard } from "@/lib/data";
import { shuffle } from "@/lib/utils";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildShuffledDeck(): FunFactCard[] {
  // Extra entropy: advance RNG state with Date.now()
  const skip = (Date.now() % 11) + 3;
  for (let i = 0; i < skip; i++) Math.random();
  return shuffle([...FUN_FACTS]);
}

// ─── Category colors ──────────────────────────────────────────────────────────

const FACT_CATEGORY_STYLES: Record<string, { border: string; bg: string; label: string }> = {
  "Animaux":       { border: "border-emerald-500/50", bg: "bg-emerald-500/10", label: "text-emerald-300" },
  "Espace":        { border: "border-indigo-500/50",  bg: "bg-indigo-500/10",  label: "text-indigo-300"  },
  "Corps humain":  { border: "border-blue-500/50",    bg: "bg-blue-500/10",    label: "text-blue-300"    },
  "Histoire":      { border: "border-amber-500/50",   bg: "bg-amber-500/10",   label: "text-amber-300"   },
  "Psychologie":   { border: "border-violet-500/50",  bg: "bg-violet-500/10",  label: "text-violet-300"  },
  "Tech & Science":{ border: "border-cyan-500/50",    bg: "bg-cyan-500/10",    label: "text-cyan-300"    },
  "Insolite":      { border: "border-rose-500/50",    bg: "bg-rose-500/10",    label: "text-rose-300"    },
  "Food":          { border: "border-orange-500/50",  bg: "bg-orange-500/10",  label: "text-orange-300"  },
  "Lifestyle":     { border: "border-teal-500/50",    bg: "bg-teal-500/10",    label: "text-teal-300"    },
  "Société":       { border: "border-yellow-500/50",  bg: "bg-yellow-500/10",  label: "text-yellow-300"  },
  "Pop Culture":   { border: "border-pink-500/50",    bg: "bg-pink-500/10",    label: "text-pink-300"    },
};

function getStyle(category: string) {
  return FACT_CATEGORY_STYLES[category] ?? {
    border: "border-white/15",
    bg: "bg-white/5",
    label: "text-white/50",
  };
}

// ─── Card component ────────────────────────────────────────────────────────────

function FactCard({ card }: { card: FunFactCard }) {
  const style = getStyle(card.category);
  const isDebate = card.type === "debate";

  return (
    <motion.div
      key={card.id}
      initial={{ opacity: 0, y: 28, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.97 }}
      transition={{ type: "spring", bounce: 0.28, duration: 0.45 }}
      className={`w-full rounded-3xl border-2 ${style.border} ${style.bg} backdrop-blur p-6 flex flex-col gap-4`}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${
          isDebate ? "bg-orange-500/20 border border-orange-500/30" : "bg-white/8 border border-white/10"
        }`}>
          {card.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-bold uppercase tracking-widest ${style.label}`}>
            {card.category}
          </p>
          <p className={`text-xs mt-0.5 font-medium ${isDebate ? "text-orange-400" : "text-white/40"}`}>
            {isDebate ? "🔥 Débat — Votez !" : "💡 Fun Fact"}
          </p>
        </div>
        {isDebate ? (
          <Flame className="w-5 h-5 text-orange-400 flex-shrink-0" />
        ) : (
          <Lightbulb className="w-5 h-5 text-yellow-400/60 flex-shrink-0" />
        )}
      </div>

      {/* Content */}
      <p className="text-white font-semibold text-[1.05rem] leading-relaxed">
        {card.content}
      </p>

      {/* Debate sip rule */}
      {isDebate && card.debateSip && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-orange-500/15 border border-orange-500/30">
          <span className="text-orange-300 text-sm font-bold">{card.debateSip}</span>
        </div>
      )}
    </motion.div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function FunFactsPage() {
  const [deck, setDeck] = useState<FunFactCard[]>(() => buildShuffledDeck());
  const [index, setIndex] = useState(0);
  const [filter, setFilter] = useState<"all" | "fact" | "debate">("all");

  const filtered = filter === "all" ? deck : deck.filter((c) => c.type === filter);
  const safeIndex = Math.min(index, filtered.length - 1);
  const current = filtered[safeIndex] ?? null;

  const next = useCallback(() => {
    setIndex((i) => {
      const nextI = i + 1;
      if (nextI >= filtered.length) {
        // Reshuffle deck and restart
        setDeck(buildShuffledDeck());
        return 0;
      }
      return nextI;
    });
  }, [filtered.length]);

  const progress = filtered.length > 0 ? ((safeIndex + 1) / filtered.length) * 100 : 0;

  return (
    <div className="flex flex-col min-h-dvh bg-[#080614] relative overflow-hidden">
      {/* Animated background */}
      <AnimatePresence mode="wait">
        {current && (
          <motion.div
            key={current.id + "-bg"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 pointer-events-none bg-gradient-to-b ${
              current.type === "debate"
                ? "from-orange-900/30 to-transparent"
                : "from-indigo-900/20 to-transparent"
            }`}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="relative flex items-center gap-3 px-6 pt-14 pb-4 z-10">
        <Link href="/game-select"
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            Fun Facts & Débats
          </p>
          <p className="text-white/40 text-xs mt-0.5">
            {safeIndex + 1} / {filtered.length} — {filter === "all" ? "Tout" : filter === "fact" ? "Fun Facts" : "Débats"}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative mx-6 h-1 bg-white/8 rounded-full overflow-hidden z-10 mb-4">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Filter tabs */}
      <div className="relative z-10 mx-6 mb-4 flex gap-2">
        {(["all", "fact", "debate"] as const).map((f) => (
          <motion.button
            key={f}
            whileTap={{ scale: 0.96 }}
            onClick={() => { setFilter(f); setIndex(0); }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-all ${
              filter === f
                ? f === "debate"
                  ? "bg-orange-500/30 border border-orange-500/50 text-orange-300"
                  : "bg-amber-500/25 border border-amber-500/40 text-amber-300"
                : "bg-white/5 border border-white/10 text-white/40"
            }`}
          >
            {f === "all" ? "✨ Tout" : f === "fact" ? "💡 Facts" : "🔥 Débats"}
          </motion.button>
        ))}
      </div>

      {/* Card area */}
      <div className="relative flex-1 px-6 flex flex-col justify-center gap-5 z-10 pb-4">
        <AnimatePresence mode="wait">
          {current ? (
            <FactCard key={current.id} card={current} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center gap-4 py-20 text-center"
            >
              <p className="text-6xl">🎉</p>
              <p className="text-white font-bold text-xl">Toutes les cartes vues !</p>
              <p className="text-white/40 text-sm">Appuie sur Relancer pour recommencer.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom action */}
      <div className="relative z-10 px-6 pb-8">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={next}
          className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl transition-all ${
            current?.type === "debate"
              ? "bg-gradient-to-r from-orange-600 to-rose-500 shadow-orange-500/25"
              : "bg-gradient-to-r from-amber-500 to-orange-400 shadow-amber-500/25"
          } text-white`}
        >
          <motion.div
            key={index}
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <RefreshCw className="w-5 h-5" />
          </motion.div>
          {current?.type === "debate" ? "Prochain débat" : "Relancer"}
        </motion.button>
      </div>
    </div>
  );
}
