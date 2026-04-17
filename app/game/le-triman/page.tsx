"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Crown, Dices } from "lucide-react";
import Link from "next/link";
import PlayerAvatar from "@/components/lobby/PlayerAvatar";
import { usePlayerStore } from "@/lib/store/playerStore";

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase = "find-triman" | "playing";

interface RuleResult {
  type: "triman" | "double-triman" | "sum9" | "sum10" | "sum11" | "double" | "empty";
  label: string;
  sublabel: string;
  neon: string;
  reflexIcon?: string;
}

// ─── Dice face ────────────────────────────────────────────────────────────────

const DOT_POSITIONS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [[28, 28], [72, 72]],
  3: [[28, 28], [50, 50], [72, 72]],
  4: [[28, 28], [72, 28], [28, 72], [72, 72]],
  5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]],
  6: [[28, 22], [72, 22], [28, 50], [72, 50], [28, 78], [72, 78]],
};

function DiceFace({ value, borderClass }: { value: number; borderClass: string }) {
  return (
    <div className={`w-[4.5rem] h-[4.5rem] rounded-2xl bg-[#100c28] border-2 ${borderClass} shadow-lg overflow-hidden`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {(DOT_POSITIONS[value] ?? []).map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={8.5} className="fill-white" />
        ))}
      </svg>
    </div>
  );
}

// ─── Rule evaluation ──────────────────────────────────────────────────────────

function evaluate(d1: number, d2: number): RuleResult {
  const sum = d1 + d2;

  if (d1 === 3 && d2 === 3)
    return { type: "double-triman", label: "DOUBLE TRIMAN 💀", sublabel: "Ce joueur est Double Triman", neon: "border-red-500" };

  if (d1 === 3 || d2 === 3 || sum === 3)
    return { type: "triman", label: "TRIMAN ! 👑", sublabel: "Ce joueur devient le Triman", neon: "border-yellow-400" };

  if (sum === 9)
    return { type: "sum9", label: "SOMME 9 — Pouce en bas 👎", sublabel: "Le dernier à baisser le pouce boit", reflexIcon: "👎", neon: "border-blue-400" };

  if (sum === 10)
    return { type: "sum10", label: "SOMME 10 — Poing fermé ✊", sublabel: "Le dernier à faire le poing boit", reflexIcon: "✊", neon: "border-orange-400" };

  if (sum === 11)
    return { type: "sum11", label: "SOMME 11 — Pouce en haut 👍", sublabel: "Le dernier à lever le pouce boit", reflexIcon: "👍", neon: "border-emerald-400" };

  if (d1 === d2)
    return { type: "double", label: `DOUBLE ${d1} !`, sublabel: "Le Triman distribue des gorgées", neon: "border-purple-400" };

  return { type: "empty", label: `Somme ${sum}`, sublabel: "Lancer vide — passe le téléphone", neon: "border-white/15" };
}

// ─── Neon styles ──────────────────────────────────────────────────────────────

const NEON_BG: Record<string, string> = {
  "double-triman": "from-red-900/40 to-transparent",
  triman:          "from-yellow-800/35 to-transparent",
  sum9:            "from-blue-900/35 to-transparent",
  sum10:           "from-orange-900/35 to-transparent",
  sum11:           "from-emerald-900/35 to-transparent",
  double:          "from-purple-900/35 to-transparent",
  empty:           "from-slate-900/10 to-transparent",
};

const LABEL_COLOR: Record<string, string> = {
  "double-triman": "text-red-400",
  triman:          "text-yellow-400",
  sum9:            "text-blue-400",
  sum10:           "text-orange-400",
  sum11:           "text-emerald-400",
  double:          "text-purple-400",
  empty:           "text-white/40",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function LeTrimanPage() {
  const { players } = usePlayerStore();

  // Phase & turn tracking
  const [phase, setPhase]         = useState<Phase>("find-triman");
  const [findIdx, setFindIdx]     = useState(0);           // élection : qui lance
  const [trimanIdx, setTrimanIdx] = useState<number | null>(null);
  const [isDouble, setIsDouble]   = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);           // jeu : lanceur actuel
  const [emptySet, setEmptySet]   = useState<Set<number>>(new Set()); // non-Triman ayant fait vide

  // Dés
  const [d1, setD1]           = useState(1);
  const [d2, setD2]           = useState(2);
  const [rolling, setRolling] = useState(false);
  const [result, setResult]   = useState<RuleResult | null>(null);
  const [rolled, setRolled]   = useState(false);

  // ── Lancer les dés ────────────────────────────────────────────────────────

  const roll = useCallback(() => {
    if (rolling) return;
    setRolling(true);
    setResult(null);
    setRolled(false);

    let count = 0;
    const interval = setInterval(() => {
      setD1(Math.ceil(Math.random() * 6));
      setD2(Math.ceil(Math.random() * 6));
      count++;
      if (count >= 14) {
        clearInterval(interval);
        const fd1 = Math.ceil(Math.random() * 6);
        const fd2 = Math.ceil(Math.random() * 6);
        setD1(fd1);
        setD2(fd2);
        const res = evaluate(fd1, fd2);
        setResult(res);
        setRolled(true);
        setRolling(false);

        // Phase élection : triman trouvé → transition automatique
        if (phase === "find-triman") {
          if (res.type === "triman" || res.type === "double-triman") {
            const idx = findIdx;
            setTrimanIdx(idx);
            setIsDouble(res.type === "double-triman");
            const firstRoller = (idx + 1) % players.length;
            setActiveIdx(firstRoller);
            setEmptySet(new Set());
            setTimeout(() => {
              setPhase("playing");
              setResult(null);
              setRolled(false);
            }, 1300);
          }
          // Sinon : bouton "Joueur suivant" apparaît
        }
        // Phase jeu : le résultat s'affiche, les boutons gèrent la suite
      }
    }, 75);
  }, [rolling, phase, findIdx, players.length]);

  // ── Avancer joueur (phase élection) ──────────────────────────────────────

  const advanceFind = () => {
    setFindIdx((prev) => (prev + 1) % players.length);
    setResult(null);
    setRolled(false);
  };

  // ── Passer au joueur suivant (phase jeu) ──────────────────────────────────

  const advancePlay = () => {
    if (trimanIdx === null) return;

    const nonTriman = players.map((_, i) => i).filter((i) => i !== trimanIdx);
    const newEmpty = new Set(emptySet).add(activeIdx);

    // Tous les non-Triman ont fait vide → retour élection
    if (nonTriman.every((i) => newEmpty.has(i))) {
      setPhase("find-triman");
      setTrimanIdx(null);
      setIsDouble(false);
      setFindIdx(0);
      setEmptySet(new Set());
      setResult(null);
      setRolled(false);
      return;
    }

    // Prochain non-Triman (on saute le Triman)
    let next = (activeIdx + 1) % players.length;
    while (next === trimanIdx) next = (next + 1) % players.length;
    setActiveIdx(next);
    setEmptySet(newEmpty);
    setResult(null);
    setRolled(false);
  };

  // ── Logique des boutons ───────────────────────────────────────────────────
  //
  // Règle simple :
  //   • Pas encore lancé → "Lancer les dés"
  //   • Phase jeu, résultat non-vide → "Relancer" (même joueur)
  //   • Phase jeu, résultat vide → "Passe le téléphone →"
  //   • Phase élection, résultat non-triman → "Joueur suivant →"
  //   • Phase élection, résultat triman → boutons masqués (transition auto)

  const isTrimanResult   = result?.type === "triman" || result?.type === "double-triman";
  const showRollButton   = !rolling && (!rolled || (phase === "playing" && rolled && result?.type !== "empty"));
  const showPassPhone    = phase === "playing"    && rolled && result?.type === "empty";
  const showNextFind     = phase === "find-triman" && rolled && !isTrimanResult;

  // ── Derived ───────────────────────────────────────────────────────────────

  const triman      = trimanIdx !== null ? players[trimanIdx] : null;
  const roller      = phase === "find-triman" ? players[findIdx] : players[activeIdx];
  const borderClass = result?.neon ?? "border-white/10";
  const bgGradient  = result ? NEON_BG[result.type] : NEON_BG.empty;
  const labelColor  = result ? LABEL_COLOR[result.type] : "text-white/20";

  return (
    <div className="flex flex-col min-h-dvh bg-[#080614] relative overflow-hidden">

      {/* Fond néon animé */}
      <AnimatePresence mode="wait">
        <motion.div
          key={result?.type ?? "idle"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className={`absolute inset-0 pointer-events-none bg-gradient-to-b ${bgGradient}`}
        />
      </AnimatePresence>

      {/* Header */}
      <div className="relative flex items-center gap-3 px-6 pt-14 pb-3 z-10">
        <Link href="/game-select" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Le Triman
          </p>
          <p className="text-white/40 text-xs mt-0.5">
            {phase === "find-triman" ? "Recherche du Triman" : `Triman : ${triman?.name ?? "—"}`}
          </p>
        </div>
      </div>

      {/* Bandeau de phase */}
      <AnimatePresence mode="wait">
        {phase === "find-triman" && (
          <motion.div key="find-banner"
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="relative mx-6 mb-1 z-10"
          >
            <div className="rounded-2xl border border-yellow-500/40 bg-yellow-500/10 px-4 py-3 flex items-center justify-between">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-yellow-400 font-bold text-xs uppercase tracking-widest"
              >
                QUI EST LE TRIMAN ?
              </motion.span>
              {players[findIdx] && (
                <span className="text-yellow-300 text-sm">
                  Tour de <strong>{players[findIdx].name}</strong>
                </span>
              )}
            </div>
          </motion.div>
        )}

        {phase === "playing" && triman && roller && (
          <motion.div key="play-banner"
            initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="relative mx-6 mb-1 z-10"
          >
            <div className="rounded-2xl border border-yellow-400/40 bg-yellow-400/10 px-4 py-3 flex items-center gap-3">
              <Crown className="w-4 h-4 text-yellow-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-yellow-300 font-bold text-sm truncate">
                  {triman.name}{isDouble ? " — DOUBLE TRIMAN 💀" : " — Triman 👑"}
                </p>
                <p className="text-white/50 text-xs">
                  Lance : <span className="text-white font-semibold">{roller.name}</span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── ZONE PRINCIPALE ── */}
      <div className="relative flex-1 flex flex-col items-center justify-center gap-6 px-6 pb-4 z-10">

        {/* Dés */}
        <div className="flex gap-5 items-center">
          <motion.div
            animate={rolling ? { rotate: [-14, 14, -9, 9, 0], scale: [1, 1.12, 0.96, 1.06, 1] } : {}}
            transition={{ duration: 0.09, repeat: rolling ? Infinity : 0 }}
          >
            <DiceFace value={d1} borderClass={borderClass} />
          </motion.div>
          <span className="text-white/30 text-xl font-light">+</span>
          <motion.div
            animate={rolling ? { rotate: [14, -14, 9, -9, 0], scale: [1, 0.96, 1.12, 1, 1.07] } : {}}
            transition={{ duration: 0.09, repeat: rolling ? Infinity : 0 }}
          >
            <DiceFace value={d2} borderClass={borderClass} />
          </motion.div>
        </div>

        {/* Carte résultat */}
        <AnimatePresence mode="wait">
          {result && rolled && (
            <motion.div
              key={`${d1}-${d2}-${result.type}`}
              initial={{ opacity: 0, y: 20, scale: 0.93 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", bounce: 0.35 }}
              className={`w-full max-w-sm rounded-3xl border ${borderClass} bg-white/5 backdrop-blur px-6 py-5 text-center`}
            >
              {result.reflexIcon && (
                <div className="text-5xl mb-2">{result.reflexIcon}</div>
              )}
              <p className={`font-extrabold text-xl ${labelColor}`}>{result.label}</p>
              <p className="text-white/55 text-sm mt-1">{result.sublabel}</p>
              <p className="text-white/25 text-xs mt-2 tabular-nums">{d1} + {d2} = {d1 + d2}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── BOUTONS ── */}
        <div className="w-full max-w-sm flex flex-col gap-3">

          {/* Lancer / Relancer — jamais bloqué après une règle */}
          {showRollButton && (
            <motion.button
              key="roll-btn"
              initial={rolled ? { opacity: 0, y: 8 } : { opacity: 1 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.94 }}
              onClick={roll}
              disabled={rolling}
              className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all
                ${rolling
                  ? "bg-white/10 text-white/40"
                  : "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-xl shadow-purple-500/30"}`}
            >
              <motion.div
                animate={rolling ? { rotate: 360 } : {}}
                transition={{ duration: 0.4, repeat: rolling ? Infinity : 0, ease: "linear" }}
              >
                <Dices className="w-6 h-6" />
              </motion.div>
              {rolling ? "Lancé…" : rolled ? "Relancer" : "Lancer les dés"}
            </motion.button>
          )}

          {/* Passe le téléphone — seulement sur lancer vide en phase jeu */}
          {showPassPhone && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.94 }}
              onClick={advancePlay}
              className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20"
            >
              Passe le téléphone →
            </motion.button>
          )}

          {/* Joueur suivant — seulement en phase élection (résultat non-triman) */}
          {showNextFind && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.94 }}
              onClick={advanceFind}
              className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20"
            >
              Joueur suivant →
            </motion.button>
          )}
        </div>
      </div>

      {/* Scoreboard — joueurs uniquement, sans compteur de verres */}
      <div className="relative z-10 px-4 pb-8 flex gap-3 justify-center flex-wrap">
        {players.map((p, i) => {
          const isTriman  = i === trimanIdx;
          const isRoller  = phase === "find-triman" ? i === findIdx : i === activeIdx;
          return (
            <div
              key={p.id}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl border transition-all ${
                isTriman
                  ? "border-yellow-400/50 bg-yellow-400/10"
                  : isRoller
                  ? "border-purple-400/50 bg-purple-400/10"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div className="relative">
                <PlayerAvatar name={p.name} color={p.color} size="sm" />
                {isTriman && <Crown className="absolute -top-2 -right-2 w-3.5 h-3.5 text-yellow-400" />}
              </div>
              <span className={`text-xs font-medium ${isRoller || isTriman ? "text-white" : "text-white/50"}`}>
                {p.name}
              </span>
              {isTriman && (
                <span className="text-yellow-400/70 text-xs">👑 Triman</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
