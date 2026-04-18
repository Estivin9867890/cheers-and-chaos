"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronRight, Shuffle } from "lucide-react";
import Link from "next/link";
import DifficultyPicker, { type Difficulty } from "@/components/games/DifficultyPicker";
import PlayerAvatar from "@/components/lobby/PlayerAvatar";
import { usePlayerStore } from "@/lib/store/playerStore";
import { TU_PREFERES, type TuPreferesCard } from "@/lib/data";
import { shuffle } from "@/lib/utils";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildDeck(diff: Difficulty): TuPreferesCard[] {
  const filtered = TU_PREFERES.filter((c) => c.category === diff);
  return shuffle(filtered.length >= 3 ? filtered : TU_PREFERES);
}

const randomSips = () => Math.floor(Math.random() * 3) + 1; // 1–3

// ─── Component ────────────────────────────────────────────────────────────────

export default function TuPreferesPage() {
  const { players } = usePlayerStore();

  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [deck, setDeck]             = useState<TuPreferesCard[]>([]);
  const [usedIds, setUsedIds]       = useState<Set<string>>(new Set());
  const [current, setCurrent]       = useState<TuPreferesCard | null>(null);
  const [sips, setSips]             = useState(0);
  const [phase, setPhase]           = useState<"difficulty" | "question" | "result">("difficulty");
  const [playerIdx, setPlayerIdx]   = useState(0);

  const drawNext = (d: TuPreferesCard[], used: Set<string>): TuPreferesCard => {
    const available = d.filter((c) => !used.has(c.id));
    if (available.length === 0) {
      const fresh = shuffle([...d]);
      setDeck(fresh);
      setUsedIds(new Set([fresh[0].id]));
      return fresh[0];
    }
    const card = available[0];
    setUsedIds((prev) => new Set([...prev, card.id]));
    return card;
  };

  const handleDifficulty = (diff: Difficulty) => {
    const d = buildDeck(diff);
    const card = d[0];
    setDifficulty(diff);
    setDeck(d);
    setUsedIds(new Set([card.id]));
    setCurrent(card);
    setSips(randomSips());
    setPhase("question");
  };

  const handleNext = () => {
    const nextIdx = (playerIdx + 1) % players.length;
    setPlayerIdx(nextIdx);
    const card = drawNext(deck, usedIds);
    setCurrent(card);
    setSips(randomSips());
    setPhase("question");
  };

  const currentPlayer = players[playerIdx];

  return (
    <div className="flex flex-col min-h-dvh bg-[#0f0a1e] relative overflow-hidden">
      {/* Blobs néon */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-violet-700/20 blur-[80px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-rose-600/20 blur-[80px]" />
      </div>

      {/* Header */}
      <div className="relative flex items-center gap-3 px-6 pt-14 pb-4 z-10">
        <Link href="/game-select"
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest bg-gradient-to-r from-violet-400 to-rose-400 bg-clip-text text-transparent">
            Tu préfères ?
          </p>
          <p className="text-white/40 text-sm">
            {difficulty ? `Mode ${difficulty}` : "Choisis la difficulté"}
          </p>
        </div>
      </div>

      <div className="relative flex-1 px-6 flex flex-col gap-5 pb-8 z-10">
        <AnimatePresence mode="wait">

          {/* ── DIFFICULTY ───────────────────────────────── */}
          {phase === "difficulty" && (
            <motion.div key="diff" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex-1 flex flex-col"
            >
              <DifficultyPicker onSelect={handleDifficulty} title="Tu préfères ?" />
            </motion.div>
          )}

          {/* ── QUESTION ─────────────────────────────────── */}
          {phase === "question" && current && (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="flex flex-col gap-5"
            >
              {/* Lanceur actuel */}
              {currentPlayer && (
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                  <PlayerAvatar name={currentPlayer.name} color={currentPlayer.color} size="sm" />
                  <span className="text-white/70 text-sm">C&apos;est au tour de <strong className="text-white">{currentPlayer.name}</strong></span>
                </div>
              )}

              {/* Carte dilemme */}
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden">
                {/* Titre */}
                <div className="px-5 pt-5 pb-3 text-center">
                  <p className="text-white/40 text-xs uppercase tracking-widest">Tu préfères…</p>
                </div>

                {/* Option A */}
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  className="mx-4 mb-3 rounded-2xl border border-violet-500/50 bg-violet-500/15 px-5 py-4 text-center"
                >
                  <span className="text-violet-300 font-black text-sm uppercase tracking-widest">A</span>
                  <p className="text-white font-semibold text-base mt-1.5 leading-snug">{current.optionA}</p>
                </motion.div>

                {/* VS */}
                <div className="flex items-center gap-3 px-4 mb-3">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-white/30 text-xs font-bold uppercase tracking-widest">ou</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Option B */}
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  className="mx-4 mb-5 rounded-2xl border border-rose-500/50 bg-rose-500/15 px-5 py-4 text-center"
                >
                  <span className="text-rose-300 font-black text-sm uppercase tracking-widest">B</span>
                  <p className="text-white font-semibold text-base mt-1.5 leading-snug">{current.optionB}</p>
                </motion.div>
              </div>

              {/* Gorgées neon */}
              <div className="flex flex-col items-center gap-1 px-6 py-4 rounded-2xl border border-white/10 bg-white/5 text-center">
                <p className="text-white/40 text-sm">La minorité boit</p>
                <p
                  className="font-extrabold text-5xl tabular-nums"
                  style={{
                    color: "#c084fc",
                    textShadow: "0 0 20px rgba(192,132,252,0.7), 0 0 8px rgba(192,132,252,0.4)",
                  }}
                >
                  {sips} 🍺
                </p>
                <p className="text-white/30 text-xs mt-0.5">Votez à voix haute !</p>
              </div>

              {/* Bouton suivant */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="w-full py-5 bg-gradient-to-r from-violet-600 to-rose-500 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-violet-500/20"
              >
                Question suivante <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scoreboard */}
      <div className="relative px-6 pb-6 flex gap-2 overflow-x-auto z-10">
        {players.map((p, i) => (
          <div
            key={p.id}
            className={`flex flex-col items-center gap-1 flex-shrink-0 px-2 py-1 rounded-xl transition-all
              ${i === playerIdx && phase !== "difficulty" ? "bg-violet-400/10 ring-1 ring-violet-400/40" : ""}`}
          >
            <PlayerAvatar name={p.name} color={p.color} size="sm" />
            <span className="text-white/50 text-xs">{p.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
