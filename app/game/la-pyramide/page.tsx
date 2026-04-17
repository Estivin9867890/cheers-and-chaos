"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, AlertTriangle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import PlayerAvatar from "@/components/lobby/PlayerAvatar";
import { usePlayerStore } from "@/lib/store/playerStore";
import { generateDeck } from "@/lib/data/kings-cup";
import { shuffle } from "@/lib/utils";
import type { Player } from "@/types/player";

// ─── Types ────────────────────────────────────────────────────────────────────

interface HandCard { id: string; suit: string; value: string }
interface PyramidCard { id: string; suit: string; value: string; row: number; revealed: boolean }

type Phase =
  | "pass-phone"
  | "memorize"
  | "game"
  | "accuse"
  | "bluff-check"
  | "prove"
  | "done";

interface Accusation {
  accuserId: string;
  accusedId: string;
  sips: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SC: Record<string, string> = { hearts: "text-rose-400", diamonds: "text-rose-400", clubs: "text-white", spades: "text-white" };
const SS: Record<string, string> = { hearts: "♥", diamonds: "♦", clubs: "♣", spades: "♠" };
const ROW_SIPS = [0, 1, 2, 3, 4, 5];

// ─── Flip Card ────────────────────────────────────────────────────────────────

function FlipCard({
  card,
  isFlipped,
  isCorrect,
  onClick,
  disabled,
}: {
  card: HandCard;
  isFlipped: boolean;
  isCorrect: boolean;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <div
      className="relative"
      style={{ width: "5rem", height: "7rem", perspective: "800px" }}
      onClick={!disabled && !isFlipped ? onClick : undefined}
    >
      <motion.div
        className="w-full h-full relative"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* ── Back face (face cachée) */}
        <div
          className={`absolute rounded-2xl w-full h-full flex flex-col items-center justify-center border-2 shadow-lg select-none
            ${!disabled && !isFlipped ? "border-blue-500/40 bg-[#1a1035] active:scale-95 cursor-pointer" : "border-white/10 bg-[#1a1035]"}`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-white/20 text-3xl">?</span>
          {!disabled && !isFlipped && (
            <span className="text-blue-400/50 text-xs mt-1">Tap</span>
          )}
        </div>

        {/* ── Front face (carte révélée) */}
        <div
          className={`absolute rounded-2xl w-full h-full flex flex-col items-center justify-center border-2 shadow-xl select-none
            ${isCorrect
              ? "bg-emerald-900/70 border-emerald-400 shadow-emerald-500/30"
              : "bg-rose-900/70 border-rose-500 shadow-rose-500/30"
            }`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            top: 0, left: 0, right: 0, bottom: 0,
          }}
        >
          <span className={`text-2xl font-extrabold ${SC[card.suit]}`}>{card.value}</span>
          <span className={`text-xl ${SC[card.suit]}`}>{SS[card.suit]}</span>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Card chip (mémorisation) ─────────────────────────────────────────────────

function CardChip({ card, hidden = false }: { card: HandCard; hidden?: boolean }) {
  return (
    <motion.div
      layout
      className={`w-11 h-16 rounded-xl flex flex-col items-center justify-center border text-sm font-bold shadow-md
        ${hidden ? "bg-[#1a1035] border-white/10" : "bg-[#1e1550] border-blue-500/40"}`}
    >
      {hidden ? (
        <span className="text-white/15 text-lg">?</span>
      ) : (
        <>
          <span className={SC[card.suit]}>{card.value}</span>
          <span className={`${SC[card.suit]} text-base`}>{SS[card.suit]}</span>
        </>
      )}
    </motion.div>
  );
}

// ─── Pyramid visual ──────────────────────────────────────────────────────────

function PyramidVisual({ pyramid, activeCard }: { pyramid: PyramidCard[]; activeCard: PyramidCard | null }) {
  return (
    <div className="flex flex-col items-center gap-1.5 py-2">
      {[5, 4, 3, 2, 1].map((row) => {
        const rowCards = pyramid.filter((c) => c.row === row);
        return (
          <div key={row} className="flex items-center gap-1.5">
            <span className="text-white/25 text-xs w-8 text-right tabular-nums">{ROW_SIPS[row]}🍺</span>
            <div className="flex gap-1.5">
              {rowCards.map((c) => (
                <motion.div
                  key={c.id}
                  animate={c.id === activeCard?.id ? { scale: [1, 1.12, 1] } : {}}
                  transition={{ duration: 0.4 }}
                  className={`w-9 rounded-lg flex items-center justify-center text-xs font-bold border
                    ${c.revealed ? "bg-blue-800/50 border-blue-400/50" : "bg-[#1a1035] border-white/10"}
                    ${c.id === activeCard?.id ? "ring-2 ring-cyan-400 shadow-lg shadow-cyan-500/30" : ""}`}
                  style={{ height: "3.25rem" }}
                >
                  {c.revealed ? (
                    <span className={SC[c.suit]}>{c.value}{SS[c.suit]}</span>
                  ) : (
                    <span className="text-white/15">?</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LaPyramidePage() {
  const { players, incrementDrinks } = usePlayerStore();

  const [pyramid, setPyramid]   = useState<PyramidCard[]>([]);
  const [hands, setHands]       = useState<Record<string, HandCard[]>>({});
  const [phase, setPhase]       = useState<Phase>("pass-phone");

  // Memorize phase
  const [memoIdx, setMemoIdx]         = useState(0);
  const [memoVisible, setMemoVisible] = useState(false);
  const [memoTimer, setMemoTimer]     = useState(10);

  // Game phase
  const [activeCard, setActiveCard]   = useState<PyramidCard | null>(null);
  const [accusation, setAccusation]   = useState<Accusation | null>(null);
  const [toast, setToast]             = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Prove phase — interactive card flip
  const [provedIdx, setProvedIdx]     = useState<number | null>(null);

  // Init deck
  useEffect(() => {
    const deck = shuffle(generateDeck());
    let idx = 0;
    const pyramidCards: PyramidCard[] = [];
    for (let row = 1; row <= 5; row++) {
      const cols = 6 - row;
      for (let col = 0; col < cols; col++) {
        pyramidCards.push({ ...deck[idx++], row, revealed: false });
      }
    }
    setPyramid(pyramidCards);
    const h: Record<string, HandCard[]> = {};
    players.forEach((p) => { h[p.id] = [deck[idx++], deck[idx++], deck[idx++], deck[idx++]]; });
    setHands(h);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Memorize countdown
  useEffect(() => {
    if (phase !== "memorize" || !memoVisible) return;
    if (memoTimer <= 0) { setMemoVisible(false); return; }
    const t = setTimeout(() => setMemoTimer((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, memoVisible, memoTimer]);

  const showToast = (msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  };

  // ── Memorize helpers ───────────────────────────────────────────────────────

  const startMemorize = () => {
    setMemoVisible(true);
    setMemoTimer(10);
    setPhase("memorize");
  };

  const finishMemorize = () => {
    setMemoVisible(false);
    const next = memoIdx + 1;
    if (next >= players.length) {
      setPhase("game");
    } else {
      setMemoIdx(next);
      setPhase("pass-phone");
    }
  };

  // ── Game helpers ───────────────────────────────────────────────────────────

  const revealNextCard = () => {
    for (let row = 1; row <= 5; row++) {
      const unrevealed = pyramid.filter((c) => c.row === row && !c.revealed);
      if (unrevealed.length > 0) {
        const card = unrevealed[0];
        setPyramid((prev) => prev.map((c) => c.id === card.id ? { ...c, revealed: true } : c));
        setActiveCard(card);
        setAccusation(null);
        return;
      }
    }
    setPhase("done");
  };

  const accuse = (accuserId: string, accusedId: string) => {
    if (!activeCard) return;
    setAccusation({ accuserId, accusedId, sips: ROW_SIPS[activeCard.row] });
    setPhase("accuse");
  };

  const acceptDrink = () => {
    if (!accusation) return;
    incrementDrinks(accusation.accusedId, accusation.sips);
    showToast(`${players.find((p) => p.id === accusation.accusedId)?.name} boit ${accusation.sips} gorgée${accusation.sips > 1 ? "s" : ""} !`);
    setAccusation(null);
    setPhase("game");
  };

  const startProve = () => {
    setProvedIdx(null);
    setPhase("prove");
  };

  // ── Prove helpers ──────────────────────────────────────────────────────────

  const handleProveClick = (cardIndex: number) => {
    if (provedIdx !== null) return;
    setProvedIdx(cardIndex);
  };

  // Called after card flip is shown — accuser had the right card
  const proveSuccess = () => {
    if (!accusation) return;
    const double = accusation.sips * 2;
    incrementDrinks(accusation.accusedId, double);
    showToast(`${players.find((p) => p.id === accusation.accusedId)?.name} avait tort ! Boit ${double} gorgées !`);
    setAccusation(null);
    setProvedIdx(null);
    setPhase("game");
  };

  // Called after card flip is shown — accuser was bluffing (wrong card)
  const proveFailure = () => {
    if (!accusation) return;
    const double = accusation.sips * 2;
    incrementDrinks(accusation.accuserId, double);
    showToast(`${players.find((p) => p.id === accusation.accuserId)?.name} bluffait ! Boit ${double} gorgées !`);
    setAccusation(null);
    setProvedIdx(null);
    setPhase("game");
  };

  // ── Derived ────────────────────────────────────────────────────────────────

  const memoPlayer = players[memoIdx];
  const accuser    = players.find((p) => p.id === accusation?.accuserId);
  const accused    = players.find((p) => p.id === accusation?.accusedId);

  // In prove phase: is the clicked card matching the pyramid card?
  const accuserHand = accusation ? (hands[accusation.accuserId] ?? []) : [];
  const provedCard  = provedIdx !== null ? accuserHand[provedIdx] : null;
  const provedCorrect = provedCard !== null && provedCard !== undefined
    && activeCard !== null && provedCard.value === activeCard.value;

  return (
    <div className="flex flex-col min-h-dvh bg-[#080614] relative overflow-hidden">

      {/* Neon BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-72 bg-gradient-to-b from-blue-900/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-cyan-900/10 to-transparent" />
      </div>

      {/* Header */}
      <div className="relative flex items-center gap-3 px-6 pt-14 pb-3 z-10">
        <Link href="/game-select" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">La Pyramide</p>
          <p className="text-white/40 text-xs mt-0.5">
            {phase === "game" ? `Carte active : Rang ${activeCard?.row ?? "?"} → ${activeCard ? ROW_SIPS[activeCard.row] : "?"}🍺` : "Mémorisation des cartes"}
          </p>
        </div>
      </div>

      {/* Pyramid always visible */}
      <div className="relative z-10 px-6">
        <PyramidVisual pyramid={pyramid} activeCard={activeCard} />
      </div>

      {/* ═══════════════════════════════════════════ PHASE CONTENT */}
      <div className="relative flex-1 px-6 pb-6 flex flex-col gap-4 z-10">
        <AnimatePresence mode="wait">

          {/* ── PASS PHONE ──────────────────────────── */}
          {phase === "pass-phone" && memoPlayer && (
            <motion.div key="pass" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center gap-6 pt-4"
            >
              <div className="text-center space-y-2">
                <p className="text-white/50 text-sm uppercase tracking-widest">Passe le téléphone à</p>
                <div className="flex flex-col items-center gap-2">
                  <PlayerAvatar name={memoPlayer.name} color={memoPlayer.color} size="lg" />
                  <h2 className="text-white font-extrabold text-3xl">{memoPlayer.name}</h2>
                </div>
                <p className="text-white/30 text-xs">Les autres joueurs ne regardent pas</p>
              </div>
              <motion.button whileTap={{ scale: 0.95 }} onClick={startMemorize}
                className="px-8 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl text-white font-bold text-lg shadow-xl shadow-blue-500/30 flex items-center gap-3"
              >
                <Eye className="w-5 h-5" /> Je suis prêt(e)
              </motion.button>
            </motion.div>
          )}

          {/* ── MEMORIZE ────────────────────────────── */}
          {phase === "memorize" && memoPlayer && (
            <motion.div key="memo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-white/60 text-sm font-semibold">Tes 4 cartes — mémorise leur position !</p>
                <div className="relative w-12 h-12">
                  <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="18" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                    <circle cx="24" cy="24" r="18" fill="none" strokeWidth="4" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 18}`}
                      strokeDashoffset={`${2 * Math.PI * 18 * (1 - memoTimer / 10)}`}
                      className={`transition-all duration-1000 ${memoTimer > 5 ? "stroke-cyan-400" : memoTimer > 2 ? "stroke-amber-400" : "stroke-rose-500"}`}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">{memoTimer}</span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {memoVisible ? (
                  <motion.div key="visible" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    className="flex gap-3 justify-center"
                  >
                    {(hands[memoPlayer.id] ?? []).map((c, i) => (
                      <div key={c.id} className="flex flex-col items-center gap-1">
                        <CardChip card={c} />
                        <span className="text-white/30 text-xs">#{i + 1}</span>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div key="hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 justify-center">
                    {(hands[memoPlayer.id] ?? []).map((c) => (
                      <CardChip key={c.id} card={c} hidden />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {!memoVisible && (
                <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} whileTap={{ scale: 0.95 }}
                  onClick={finishMemorize}
                  className="py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl text-white font-bold shadow-xl flex items-center justify-center gap-2"
                >
                  <EyeOff className="w-5 h-5" />
                  {memoIdx < players.length - 1 ? `Passer le téléphone à ${players[memoIdx + 1]?.name}` : "Lancer la partie !"}
                </motion.button>
              )}
            </motion.div>
          )}

          {/* ── GAME ────────────────────────────────── */}
          {phase === "game" && (
            <motion.div key="game" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-4">
              {!activeCard ? (
                <motion.button whileTap={{ scale: 0.95 }} onClick={revealNextCard}
                  className="py-5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl text-white font-bold text-lg shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2"
                >
                  <Eye className="w-6 h-6" /> Révéler la prochaine carte
                </motion.button>
              ) : (
                <>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl px-4 py-3 flex items-center gap-4">
                    <div className={`text-3xl font-extrabold ${SC[activeCard.suit]}`}>
                      {activeCard.value}{SS[activeCard.suit]}
                    </div>
                    <div>
                      <p className="text-white font-semibold">Rang {activeCard.row}</p>
                      <p className="text-white/50 text-sm">{ROW_SIPS[activeCard.row]} gorgée{ROW_SIPS[activeCard.row] > 1 ? "s" : ""} à distribuer</p>
                    </div>
                  </div>

                  <p className="text-white/50 text-sm text-center">Qui a un {activeCard.value} ? Accuse quelqu&apos;un !</p>
                  <div className="space-y-2">
                    {players.map((acc) => (
                      <div key={acc.id} className="bg-white/5 rounded-2xl p-3 border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                          <PlayerAvatar name={acc.name} color={acc.color} size="sm" />
                          <span className="text-white/80 text-sm font-medium">{acc.name} accuse...</span>
                        </div>
                        <div className="flex flex-wrap gap-2 pl-1">
                          {players.filter((t) => t.id !== acc.id).map((target) => (
                            <motion.button key={target.id} whileTap={{ scale: 0.93 }}
                              onClick={() => accuse(acc.id, target.id)}
                              className="flex items-center gap-1.5 px-3 py-2 bg-blue-600/20 border border-blue-500/30 rounded-xl text-white text-sm"
                            >
                              <PlayerAvatar name={target.name} color={target.color} size="sm" />
                              {target.name}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <motion.button whileTap={{ scale: 0.95 }} onClick={revealNextCard}
                    className="py-4 bg-white/10 border border-white/20 rounded-2xl text-white/70 font-semibold text-center"
                  >
                    Personne n&apos;a cette carte → Prochaine
                  </motion.button>
                </>
              )}
            </motion.div>
          )}

          {/* ── ACCUSE ──────────────────────────────── */}
          {phase === "accuse" && accusation && accuser && accused && (
            <motion.div key="accuse" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-5">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-3xl p-5 text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <PlayerAvatar name={accuser.name} color={accuser.color} size="sm" />
                  <span className="text-white/60 text-sm">accuse</span>
                  <PlayerAvatar name={accused.name} color={accused.color} size="sm" />
                </div>
                <p className="text-white font-bold text-xl">
                  {accuser.name} dit que {accused.name} a un {activeCard?.value}
                </p>
                <p className="text-white/50 text-sm mt-1">
                  → {ROW_SIPS[activeCard?.row ?? 1]} gorgée{ROW_SIPS[activeCard?.row ?? 1] > 1 ? "s" : ""} en jeu
                </p>
              </div>

              <p className="text-white/40 text-sm text-center">
                Passe le téléphone à <strong className="text-white">{accused.name}</strong>
              </p>

              <div className="flex flex-col gap-3">
                <motion.button whileTap={{ scale: 0.95 }} onClick={acceptDrink}
                  className="py-4 bg-white/10 border border-white/20 rounded-2xl text-white font-semibold flex items-center justify-center gap-2"
                >
                  Je bois 🍺 ({accusation.sips} gorgée{accusation.sips > 1 ? "s" : ""})
                </motion.button>
                <motion.button whileTap={{ scale: 0.95 }} onClick={startProve}
                  className="py-4 bg-gradient-to-r from-rose-600 to-red-500 rounded-2xl text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-rose-500/30"
                >
                  <AlertTriangle className="w-5 h-5" /> Menteur ! Je prouve mon innocence
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ── PROVE — Sélection interactive ─────────── */}
          {phase === "prove" && accusation && accuser && accused && (
            <motion.div key="prove" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex flex-col gap-5"
            >
              {/* Instruction */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-3xl p-5 text-center">
                <ShieldCheck className="w-7 h-7 text-blue-400 mx-auto mb-2" />
                <p className="text-white font-bold text-lg">
                  {accuser.name}, retrouve ta carte !
                </p>
                <p className="text-white/50 text-sm mt-1">
                  Tu prétends avoir un{" "}
                  <span className={`font-bold ${activeCard ? SC[activeCard.suit] : ""}`}>
                    {activeCard?.value}{activeCard ? SS[activeCard.suit] : ""}
                  </span>.
                  Clique sur la bonne position.
                </p>
              </div>

              {/* 4 cartes face cachée en grille 2×2 */}
              <div className="grid grid-cols-2 gap-4 place-items-center">
                {accuserHand.map((card, i) => (
                  <div key={card.id} className="flex flex-col items-center gap-1.5">
                    <span className="text-white/30 text-xs font-medium">Position {i + 1}</span>
                    <FlipCard
                      card={card}
                      isFlipped={provedIdx === i}
                      isCorrect={card.value === activeCard?.value}
                      onClick={() => handleProveClick(i)}
                      disabled={provedIdx !== null}
                    />
                  </div>
                ))}
              </div>

              {/* Résultat après flip */}
              <AnimatePresence>
                {provedIdx !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col gap-3"
                  >
                    {provedCorrect ? (
                      <>
                        <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-2xl p-4 text-center">
                          <p className="text-emerald-300 font-bold text-xl">✅ Bonne position !</p>
                          <p className="text-white/60 text-sm mt-1">
                            {accuser.name} avait bien le {activeCard?.value} — {accused.name} boit le double !
                          </p>
                        </div>
                        <motion.button whileTap={{ scale: 0.95 }} onClick={proveSuccess}
                          className="py-4 bg-gradient-to-r from-emerald-600 to-green-500 rounded-2xl text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30"
                        >
                          {accused.name} boit {accusation.sips * 2} 🍺
                        </motion.button>
                      </>
                    ) : (
                      <>
                        <div className="bg-rose-500/20 border border-rose-500/40 rounded-2xl p-4 text-center">
                          <p className="text-rose-300 font-bold text-xl">❌ Mauvaise carte !</p>
                          <p className="text-white/60 text-sm mt-1">
                            {accuser.name} bluffait — il/elle boit le double !
                          </p>
                        </div>
                        <motion.button whileTap={{ scale: 0.95 }} onClick={proveFailure}
                          className="py-4 bg-gradient-to-r from-rose-600 to-red-500 rounded-2xl text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-rose-500/30"
                        >
                          {accuser.name} boit {accusation.sips * 2} 🍺
                        </motion.button>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Capitulation rapide (avant flip) */}
              {provedIdx === null && (
                <motion.button whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const double = accusation.sips * 2;
                    incrementDrinks(accusation.accuserId, double);
                    showToast(`${accuser.name} capitule ! Boit ${double} gorgées.`);
                    setAccusation(null);
                    setProvedIdx(null);
                    setPhase("game");
                  }}
                  className="py-3 bg-white/5 border border-white/15 rounded-2xl text-white/50 text-sm font-medium text-center"
                >
                  Je capitule — je bois {accusation.sips * 2} 🍺
                </motion.button>
              )}
            </motion.div>
          )}

          {/* ── DONE ──────────────────────────────── */}
          {phase === "done" && (
            <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center flex-1 gap-6 py-8"
            >
              <div className="text-7xl">🏆</div>
              <h2 className="text-white font-bold text-2xl">Pyramide terminée !</h2>
              <Link href="/scores" className="w-full max-w-sm">
                <div className="py-5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl text-white font-bold text-lg text-center shadow-xl">
                  Voir les scores
                </div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scoreboard */}
      <div className="relative z-10 px-4 pb-8 flex gap-3 justify-center flex-wrap">
        {players.map((p) => (
          <div key={p.id} className="flex flex-col items-center gap-1 px-3 py-2 rounded-2xl border border-white/10 bg-white/5">
            <PlayerAvatar name={p.name} color={p.color} size="sm" />
            <span className="text-white text-xs font-medium">{p.name}</span>
            <span className="text-white/40 text-xs">{p.drinkCount}🍺</span>
          </div>
        ))}
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-6 right-6 z-50 bg-blue-600 rounded-2xl p-4 text-center text-white font-bold shadow-2xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
