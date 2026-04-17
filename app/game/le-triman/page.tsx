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
  type: string;
  label: string;
  sublabel: string;
  neon: string;
  reflexIcon?: string;
  /** true = action déclenchée → le lanceur rejoue immédiatement
   *  false = lancer vide → passe le téléphone */
  isAction: boolean;
}

// ─── Dé 2D ───────────────────────────────────────────────────────────────────

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

// ─── Tableau des règles (phase de jeu uniquement) ─────────────────────────────
//
// Priorités :
//   1. Un dé affiche 3         → Triman boit (1 gorgée par dé-3)
//   2. Somme = 3 (1+2)         → Triman boit 1
//   3. Double                  → le lanceur distribue (valeur d'un dé)
//   4. 5+1 spécifiquement      → SOCIAL (tout le monde boit 1)
//   5. 4+1 spécifiquement      → le lanceur boit 1
//   6. Somme 9 / 10 / 11       → réflexe physique
//   7. Tout le reste           → lancer vide (passe le téléphone)

function evaluate(d1: number, d2: number): RuleResult {
  const sum = d1 + d2;
  const threeCount = (d1 === 3 ? 1 : 0) + (d2 === 3 ? 1 : 0);

  // ── 1. Dé(s) affichant 3 ───────────────────────────────────────────────────
  if (threeCount > 0) {
    return {
      type: "has-three",
      label: threeCount === 2 ? "DOUBLE 3 ! 💀" : "LE CHIFFRE 3 ! 👑",
      sublabel: `Le Triman boit ${threeCount} gorgée${threeCount > 1 ? "s" : ""}`,
      neon: "border-yellow-400",
      isAction: true,
    };
  }

  // ── 2. Somme 3 (1+2 / 2+1) ────────────────────────────────────────────────
  if (sum === 3) {
    return {
      type: "sum3",
      label: "SOMME 3 !",
      sublabel: "Le Triman boit 1 gorgée",
      neon: "border-yellow-400",
      isAction: true,
    };
  }

  // ── 3. Double ──────────────────────────────────────────────────────────────
  if (d1 === d2) {
    return {
      type: "double",
      label: `DOUBLE ${d1} !`,
      sublabel: `Distribue ${d1} gorgée${d1 > 1 ? "s" : ""} à qui tu veux`,
      neon: "border-purple-400",
      isAction: true,
    };
  }

  // ── 4. 5+1 → SOCIAL ────────────────────────────────────────────────────────
  if ((d1 === 5 && d2 === 1) || (d1 === 1 && d2 === 5)) {
    return {
      type: "social",
      label: "SOCIAL ! 🥂",
      sublabel: "Tout le monde boit 1 gorgée",
      neon: "border-cyan-400",
      isAction: true,
    };
  }

  // ── 5. 4+1 → lanceur boit ─────────────────────────────────────────────────
  if ((d1 === 4 && d2 === 1) || (d1 === 1 && d2 === 4)) {
    return {
      type: "sum5",
      label: "SOMME 5 !",
      sublabel: "Le lanceur boit 1 gorgée",
      neon: "border-rose-400",
      isAction: true,
    };
  }

  // ── 6. Réflexes physiques ─────────────────────────────────────────────────
  if (sum === 9)
    return { type: "sum9",  label: "SOMME 9 — Pouce en bas",   sublabel: "Le dernier à baisser le pouce boit", reflexIcon: "👎", neon: "border-blue-400",    isAction: true };
  if (sum === 10)
    return { type: "sum10", label: "SOMME 10 — Poing fermé",   sublabel: "Le dernier à faire le poing boit",   reflexIcon: "✊", neon: "border-orange-400",  isAction: true };
  if (sum === 11)
    return { type: "sum11", label: "SOMME 11 — Pouce en haut", sublabel: "Le dernier à lever le pouce boit",   reflexIcon: "👍", neon: "border-emerald-400", isAction: true };

  // ── 7. Lancer vide ────────────────────────────────────────────────────────
  return {
    type: "empty",
    label: `Somme ${sum}`,
    sublabel: "Lancer vide — passe le téléphone",
    neon: "border-white/15",
    isAction: false,
  };
}

// Détecte si le lancer désigne un Triman (phase élection)
function isTrimanRoll(d1: number, d2: number): boolean {
  return d1 === 3 || d2 === 3 || d1 + d2 === 3;
}

// ─── Couleurs de fond néon ────────────────────────────────────────────────────

const NEON_BG: Record<string, string> = {
  "has-three": "from-yellow-800/40 to-transparent",
  sum3:        "from-yellow-800/30 to-transparent",
  double:      "from-purple-900/40 to-transparent",
  social:      "from-cyan-900/40 to-transparent",
  sum5:        "from-rose-900/35 to-transparent",
  sum9:        "from-blue-900/35 to-transparent",
  sum10:       "from-orange-900/35 to-transparent",
  sum11:       "from-emerald-900/35 to-transparent",
  empty:       "from-slate-900/10 to-transparent",
  triman:      "from-yellow-800/50 to-transparent",
};

const LABEL_COLOR: Record<string, string> = {
  "has-three": "text-yellow-300",
  sum3:        "text-yellow-300",
  double:      "text-purple-300",
  social:      "text-cyan-300",
  sum5:        "text-rose-300",
  sum9:        "text-blue-300",
  sum10:       "text-orange-300",
  sum11:       "text-emerald-300",
  empty:       "text-white/40",
  triman:      "text-yellow-300",
};

// ─── Composant principal ──────────────────────────────────────────────────────

export default function LeTrimanPage() {
  const { players } = usePlayerStore();

  // ── État de phase ────────────────────────────────────────────────────────
  const [phase, setPhase]         = useState<Phase>("find-triman");
  const [findIdx, setFindIdx]     = useState(0);                     // lanceur actuel (élection)
  const [trimanIdx, setTrimanIdx] = useState<number | null>(null);   // index du Triman désigné
  const [activeIdx, setActiveIdx] = useState(0);                     // lanceur actuel (jeu)
  const [donePlayers, setDonePlayers] = useState<Set<number>>(new Set()); // joueurs ayant fait vide

  // ── État des dés ─────────────────────────────────────────────────────────
  const [d1, setD1]           = useState(1);
  const [d2, setD2]           = useState(2);
  const [rolling, setRolling] = useState(false);
  const [rolled, setRolled]   = useState(false);

  // Résultat : en phase jeu → evaluate() ; en phase élection → minimal
  const [result, setResult]   = useState<RuleResult | null>(null);

  // ── Lancer les dés ───────────────────────────────────────────────────────

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
        setRolled(true);
        setRolling(false);

        // ══ PHASE ÉLECTION ══════════════════════════════════════════════════
        if (phase === "find-triman") {
          if (isTrimanRoll(fd1, fd2)) {
            // Triman trouvé → transition automatique vers le jeu
            setResult({
              type: "triman",
              label: "TRIMAN TROUVÉ ! 👑",
              sublabel: `${players[findIdx]?.name} est le Triman !`,
              neon: "border-yellow-400",
              isAction: false,
            });
            const first = (findIdx + 1) % players.length; // joueur à gauche du Triman
            setTimeout(() => {
              setTrimanIdx(findIdx);
              setActiveIdx(first);
              setDonePlayers(new Set());
              setPhase("playing");
              setResult(null);
              setRolled(false);
            }, 1400);
          } else {
            // Pas de Triman → affiche le résultat, attend "Joueur suivant"
            setResult({
              type: "empty",
              label: `Somme ${fd1 + fd2}`,
              sublabel: "Pas de Triman — passe le téléphone",
              neon: "border-white/15",
              isAction: false,
            });
          }
          return;
        }

        // ══ PHASE JEU ═══════════════════════════════════════════════════════
        if (phase === "playing") {
          setResult(evaluate(fd1, fd2));
        }
      }
    }, 75);
  }, [rolling, phase, findIdx, players]);

  // ── Avancer en phase élection ─────────────────────────────────────────────

  const advanceFind = () => {
    setFindIdx((prev) => (prev + 1) % players.length);
    setResult(null);
    setRolled(false);
  };

  // ── Passer au joueur suivant (phase jeu) ──────────────────────────────────

  const advancePlay = () => {
    if (trimanIdx === null) return;

    const nonTriman = players.map((_, i) => i).filter((i) => i !== trimanIdx);
    const newDone = new Set(donePlayers).add(activeIdx);

    // Tous les non-Triman ont fait vide → nouveau cycle
    if (nonTriman.every((i) => newDone.has(i))) {
      setPhase("find-triman");
      setTrimanIdx(null);
      setFindIdx(0);
      setDonePlayers(new Set());
      setResult(null);
      setRolled(false);
      return;
    }

    // Prochain joueur en sautant le Triman
    let next = (activeIdx + 1) % players.length;
    while (next === trimanIdx) next = (next + 1) % players.length;
    setActiveIdx(next);
    setDonePlayers(newDone);
    setResult(null);
    setRolled(false);
  };

  // ── Logique d'affichage des boutons ───────────────────────────────────────
  //
  //  Phase élection :
  //    • Pas encore lancé                → "Trouver le Triman"
  //    • Résultat non-Triman             → "Joueur suivant →"
  //    • Résultat Triman                 → (transition auto, aucun bouton)
  //
  //  Phase jeu :
  //    • Pas encore lancé OU action      → "Lancer les dés" / "Relancer"
  //    • Lancer vide                     → "Passer au suivant →"

  const isTrimanTransitioning = rolled && result?.type === "triman";
  const showRoll =
    !rolling &&
    !isTrimanTransitioning &&
    (
      (phase === "find-triman" && !rolled) ||
      (phase === "playing" && (!rolled || result?.isAction === true))
    );
  const showPassPhone = phase === "playing" && rolled && result?.isAction === false;
  const showNextFind  = phase === "find-triman" && rolled && result?.type !== "triman";

  // ── Dérivés visuels ───────────────────────────────────────────────────────
  const triman      = trimanIdx !== null ? players[trimanIdx] : null;
  const roller      = phase === "find-triman" ? players[findIdx] : players[activeIdx];
  const borderClass = result?.neon ?? "border-white/10";
  const bgType      = result?.type ?? "empty";
  const bgGradient  = NEON_BG[bgType] ?? NEON_BG.empty;
  const labelColor  = LABEL_COLOR[bgType] ?? "text-white/40";

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

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="relative flex items-center gap-3 px-6 pt-14 pb-3 z-10">
        <Link href="/game-select"
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Le Triman
          </p>
          {triman ? (
            <div className="flex items-center gap-1.5 mt-0.5">
              <Crown className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
              <p className="text-yellow-300 text-xs font-bold truncate">
                Triman : {triman.name}
              </p>
            </div>
          ) : (
            <p className="text-white/40 text-xs mt-0.5">Recherche du Triman…</p>
          )}
        </div>
      </div>

      {/* ── Bandeau de phase ───────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">

        {/* Élection */}
        {phase === "find-triman" && (
          <motion.div
            key="find-banner"
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="relative mx-6 mb-2 z-10"
          >
            <div className="rounded-2xl border border-yellow-500/40 bg-yellow-500/10 px-4 py-3 flex items-center justify-between">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="text-yellow-400 font-bold text-xs uppercase tracking-widest"
              >
                QUI EST LE TRIMAN ?
              </motion.span>
              {roller && (
                <div className="flex items-center gap-2">
                  <PlayerAvatar name={roller.name} color={roller.color} size="sm" />
                  <span className="text-yellow-300 text-sm font-semibold">{roller.name}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Jeu */}
        {phase === "playing" && triman && roller && (
          <motion.div
            key="play-banner"
            initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="relative mx-6 mb-2 z-10"
          >
            <div className="rounded-2xl border border-purple-400/40 bg-purple-400/10 px-4 py-3 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-white/50 text-xs">Lance les dés :</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <PlayerAvatar name={roller.name} color={roller.color} size="sm" />
                  <p className="text-white font-bold text-base truncate">{roller.name}</p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-white/40 text-xs">Triman 👑</p>
                <p className="text-yellow-300 font-bold text-sm">{triman.name}</p>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* ── Zone principale ────────────────────────────────────────────────── */}
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

        {/* ── Boutons ──────────────────────────────────────────────────────── */}
        <div className="w-full max-w-sm flex flex-col gap-3">

          {/* Lancer / Relancer */}
          {showRoll && (
            <motion.button
              initial={{ opacity: 0, y: 6 }}
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
              {rolling
                ? "Lancé…"
                : phase === "find-triman" && !rolled
                ? "Trouver le Triman"
                : rolled
                ? "Relancer"
                : "Lancer les dés"}
            </motion.button>
          )}

          {/* Passer au suivant — lancer vide en phase jeu */}
          {showPassPhone && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.94 }}
              onClick={advancePlay}
              className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20"
            >
              Passer au suivant →
            </motion.button>
          )}

          {/* Joueur suivant — élection, résultat non-Triman */}
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

      {/* ── Scoreboard (joueurs, sans compteur de verres) ──────────────────── */}
      <div className="relative z-10 px-4 pb-8 flex gap-3 justify-center flex-wrap">
        {players.map((p, i) => {
          const isTriman  = i === trimanIdx;
          const isRoller  = phase === "find-triman" ? i === findIdx : i === activeIdx;
          const hasDone   = donePlayers.has(i);
          return (
            <div
              key={p.id}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl border transition-all ${
                isTriman
                  ? "border-yellow-400/60 bg-yellow-400/10"
                  : isRoller
                  ? "border-purple-400/60 bg-purple-400/10"
                  : hasDone && phase === "playing"
                  ? "border-white/5 bg-white/3 opacity-50"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div className="relative">
                <PlayerAvatar name={p.name} color={p.color} size="sm" />
                {isTriman && (
                  <Crown className="absolute -top-2 -right-2 w-3.5 h-3.5 text-yellow-400" />
                )}
              </div>
              <span className={`text-xs font-medium ${isRoller || isTriman ? "text-white" : "text-white/50"}`}>
                {p.name}
              </span>
              {isTriman && <span className="text-yellow-400/70 text-xs">👑</span>}
              {hasDone && phase === "playing" && !isTriman && (
                <span className="text-white/30 text-xs">✓</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
