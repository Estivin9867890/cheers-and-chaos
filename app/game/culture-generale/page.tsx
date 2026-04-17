"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Eye, ChevronRight, Check, X } from "lucide-react";
import Link from "next/link";
import PlayerAvatar from "@/components/lobby/PlayerAvatar";
import DifficultyPicker, { type Difficulty } from "@/components/games/DifficultyPicker";
import { usePlayerStore } from "@/lib/store/playerStore";
import { CULTURE_GENERALE } from "@/lib/data";
import { shuffle } from "@/lib/utils";
import type { TriviaQuestion } from "@/types/game";

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = {
  geo: "Géographie 🌍",
  science: "Science 🔬",
  cinema: "Cinéma 🎬",
  sport: "Sport ⚽",
  histoire: "Histoire 📚",
  pop: "Pop Culture 🎵",
};

const CATEGORY_COLORS: Record<string, string> = {
  geo: "from-emerald-600/20 to-green-500/20 border-emerald-500/30",
  science: "from-blue-600/20 to-cyan-500/20 border-blue-500/30",
  cinema: "from-violet-600/20 to-purple-500/20 border-violet-500/30",
  sport: "from-orange-600/20 to-yellow-500/20 border-orange-500/30",
  histoire: "from-amber-600/20 to-yellow-600/20 border-amber-500/30",
  pop: "from-pink-600/20 to-rose-500/20 border-pink-500/30",
};

type Phase = "difficulty" | "pass-phone" | "question" | "revealed" | "result";
type ResultType = "correct" | "wrong";

const randomSips = () => Math.floor(Math.random() * 5) + 2; // 2–6

// ─── Filtered deck by difficulty ─────────────────────────────────────────────

function buildDeck(diff: Difficulty): TriviaQuestion[] {
  const map: Record<Difficulty, TriviaQuestion["difficulty"]> = {
    soft: "easy",
    spicy: "medium",
    hard: "hard",
  };
  const filtered = CULTURE_GENERALE.filter((q) => q.difficulty === map[diff]);
  return shuffle(filtered.length >= 4 ? filtered : [...CULTURE_GENERALE]);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CultureGeneralePage() {
  const { players, incrementDrinks } = usePlayerStore();

  const [phase, setPhase]               = useState<Phase>("difficulty");
  const [difficulty, setDifficulty]     = useState<Difficulty | null>(null);
  const [deck, setDeck]                 = useState<TriviaQuestion[]>([]);
  const [usedIds, setUsedIds]           = useState<Set<string>>(new Set());
  const [current, setCurrent]           = useState<TriviaQuestion | null>(null);
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
  const [resultType, setResultType]     = useState<ResultType | null>(null);
  const [sipsAmount, setSipsAmount]     = useState(0);
  const [score, setScore]               = useState(0);

  // ── Draw next question ─────────────────────────────────────────────────────

  const drawNext = (d: TriviaQuestion[], used: Set<string>): TriviaQuestion => {
    const available = d.filter((q) => !used.has(q.id));
    if (available.length === 0) {
      // Reshuffle same difficulty
      const fresh = shuffle([...d]);
      setDeck(fresh);
      setUsedIds(new Set([fresh[0].id]));
      return fresh[0];
    }
    const q = available[0];
    setUsedIds((prev) => new Set([...prev, q.id]));
    return q;
  };

  // ── Difficulty selected ────────────────────────────────────────────────────

  const handleDifficultySelect = (diff: Difficulty) => {
    const d = buildDeck(diff);
    const q = d[0];
    setDifficulty(diff);
    setDeck(d);
    setUsedIds(new Set([q.id]));
    setCurrent(q);
    setPhase("pass-phone");
  };

  // ── Pass phone → question ──────────────────────────────────────────────────

  const handleReady = () => {
    setPhase("question");
  };

  // ── Reveal answer ──────────────────────────────────────────────────────────

  const handleReveal = () => {
    setPhase("revealed");
  };

  // ── Correct / Wrong ────────────────────────────────────────────────────────

  const handleCorrect = () => {
    const sips = randomSips();
    setSipsAmount(sips);
    setResultType("correct");
    setScore((s) => s + 1);
    setPhase("result");
  };

  const handleWrong = () => {
    const sips = randomSips();
    setSipsAmount(sips);
    incrementDrinks(players[currentPlayerIdx].id, sips);
    setResultType("wrong");
    setPhase("result");
  };

  // ── Next question ──────────────────────────────────────────────────────────

  const handleNextQuestion = () => {
    const nextIdx = (currentPlayerIdx + 1) % players.length;
    setCurrentPlayerIdx(nextIdx);
    const q = drawNext(deck, usedIds);
    setCurrent(q);
    setResultType(null);
    setSipsAmount(0);
    setPhase("pass-phone");
  };

  // ── Derived ────────────────────────────────────────────────────────────────

  const currentPlayer = players[currentPlayerIdx];

  return (
    <div className="flex flex-col min-h-dvh relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-amber-900/30 to-transparent" />
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 px-6 pt-14 pb-4 relative z-10">
        <Link href="/game-select" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
            Culture Générale
          </p>
          <p className="text-white/40 text-sm">
            {difficulty ? `Mode ${difficulty} · ` : ""}{score} bonne{score > 1 ? "s" : ""} réponse{score > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="relative flex-1 px-6 flex flex-col gap-5 pb-8 z-10">
        <AnimatePresence mode="wait">

          {/* ── DIFFICULTY PICKER ───────────────────── */}
          {phase === "difficulty" && (
            <motion.div key="diff" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col">
              <DifficultyPicker onSelect={handleDifficultySelect} title="Culture Générale" />
            </motion.div>
          )}

          {/* ── PASS PHONE ──────────────────────────── */}
          {phase === "pass-phone" && currentPlayer && (
            <motion.div
              key={`pass-${currentPlayerIdx}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center flex-1 gap-7"
            >
              <div className="text-center space-y-3">
                <p className="text-white/50 text-sm uppercase tracking-widest">C&apos;est au tour de</p>
                <div className="flex flex-col items-center gap-3">
                  <PlayerAvatar name={currentPlayer.name} color={currentPlayer.color} size="lg" />
                  <h2 className="text-white font-extrabold text-4xl">{currentPlayer.name}</h2>
                </div>
                <p className="text-white/30 text-xs">Passe le téléphone à {currentPlayer.name}</p>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleReady}
                className="px-8 py-5 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-2xl text-white font-bold text-lg shadow-xl shadow-amber-500/30 flex items-center gap-3"
              >
                <Eye className="w-5 h-5" /> Voir la question
              </motion.button>
            </motion.div>
          )}

          {/* ── QUESTION ────────────────────────────── */}
          {(phase === "question" || phase === "revealed") && current && (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-4"
            >
              {/* Who's playing */}
              {currentPlayer && (
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                  <PlayerAvatar name={currentPlayer.name} color={currentPlayer.color} size="sm" />
                  <span className="text-white/70 text-sm font-medium">{currentPlayer.name} répond</span>
                </div>
              )}

              {/* Question card */}
              <div className={`bg-gradient-to-br ${CATEGORY_COLORS[current.category]} rounded-3xl p-6 border min-h-[160px] flex flex-col justify-center gap-3`}>
                <span className="text-xs font-semibold text-white/50 uppercase tracking-widest">
                  {CATEGORY_LABELS[current.category]}
                </span>
                <p className="text-white text-xl font-semibold leading-relaxed">{current.question}</p>

                {/* Answer revealed */}
                <AnimatePresence>
                  {phase === "revealed" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-2 bg-white/10 rounded-xl px-4 py-3 border border-white/15"
                    >
                      <span className="text-white/50 text-xs block mb-0.5">Réponse :</span>
                      <span className="text-white font-bold text-base">{current.answer}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Reveal button */}
              {phase === "question" && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReveal}
                  className="py-4 bg-white/10 border border-white/20 rounded-2xl text-white font-semibold flex items-center justify-center gap-2"
                >
                  <Eye className="w-5 h-5" /> Révéler la réponse
                </motion.button>
              )}

              {/* Correct / Wrong buttons after reveal */}
              {phase === "revealed" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleWrong}
                    className="flex-1 py-4 bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20"
                  >
                    <X className="w-5 h-5" /> Faux
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCorrect}
                    className="flex-1 py-4 bg-gradient-to-r from-emerald-600 to-green-500 rounded-2xl text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                  >
                    <Check className="w-5 h-5" /> Correct
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ── RESULT ──────────────────────────────── */}
          {phase === "result" && resultType && currentPlayer && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center flex-1 gap-6"
            >
              {resultType === "correct" ? (
                <div className="w-full flex flex-col items-center gap-5">
                  {/* Success banner */}
                  <div className="w-full bg-emerald-500/15 border border-emerald-400/40 rounded-3xl p-6 text-center">
                    <p className="text-5xl mb-3">🎉</p>
                    <p className="text-emerald-300 font-extrabold text-2xl">Bien joué, {currentPlayer.name} !</p>
                    <p className="text-white/50 text-sm mt-1">Bonne réponse</p>
                  </div>

                  {/* Sips to distribute */}
                  <div className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-center">
                    <p className="text-white/50 text-sm mb-1">Distribue</p>
                    <p
                      className="text-amber-300 font-extrabold text-6xl tabular-nums"
                      style={{ textShadow: "0 0 24px rgba(252,211,77,0.7), 0 0 8px rgba(252,211,77,0.4)" }}
                    >
                      {sipsAmount} 🍺
                    </p>
                    <p className="text-white/40 text-xs mt-1.5">à qui tu veux</p>
                  </div>
                </div>
              ) : (
                <div className="w-full flex flex-col items-center gap-5">
                  {/* Failure banner */}
                  <div className="w-full bg-rose-500/15 border border-rose-400/40 rounded-3xl p-6 text-center">
                    <p className="text-5xl mb-3">😬</p>
                    <p className="text-rose-300 font-extrabold text-2xl">Dommage, {currentPlayer.name}...</p>
                    <p className="text-white/50 text-sm mt-1">Mauvaise réponse</p>
                  </div>

                  {/* Sips to drink */}
                  <div className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-center">
                    <p className="text-white/50 text-sm mb-1">Bois</p>
                    <p
                      className="text-rose-300 font-extrabold text-6xl tabular-nums"
                      style={{ textShadow: "0 0 24px rgba(251,113,133,0.7), 0 0 8px rgba(251,113,133,0.4)" }}
                    >
                      {sipsAmount} 🍺
                    </p>
                  </div>
                </div>
              )}

              {/* Next */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleNextQuestion}
                className="w-full py-5 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25"
              >
                Question suivante <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Players score bar */}
      <div className="relative px-6 pb-6 flex gap-2 overflow-x-auto z-10">
        {players.map((p, i) => (
          <div
            key={p.id}
            className={`flex flex-col items-center gap-1 flex-shrink-0 px-2 py-1 rounded-xl transition-all
              ${i === currentPlayerIdx && phase !== "difficulty" ? "bg-amber-400/10 ring-1 ring-amber-400/40" : ""}`}
          >
            <PlayerAvatar name={p.name} color={p.color} size="sm" />
            <span className="text-white/50 text-xs">{p.drinkCount}🍺</span>
          </div>
        ))}
      </div>
    </div>
  );
}
