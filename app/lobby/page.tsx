"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import PlayerForm from "@/components/lobby/PlayerForm";
import PlayerList from "@/components/lobby/PlayerList";
import { usePlayerStore } from "@/lib/store/playerStore";

export default function LobbyPage() {
  const { players } = usePlayerStore();
  const canStart = players.length >= 2;

  return (
    <div className="min-h-dvh flex flex-col bg-[#0f0a1e] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-violet-800/20 blur-[70px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-rose-800/15 blur-[60px]" />
      </div>

      {/* Header */}
      <div className="relative flex items-center gap-3 px-6 pt-14 pb-4">
        <Link href="/" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <div>
          <h1 className="text-white font-bold text-xl">Les joueurs</h1>
          <p className="text-white/40 text-sm">Qui est là ce soir ?</p>
        </div>
      </div>

      {/* Content */}
      <div className="relative flex-1 px-6 flex flex-col gap-6">
        {/* Player count badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 bg-white/5 rounded-2xl px-4 py-3 border border-white/10"
        >
          <div className="w-10 h-10 rounded-xl bg-violet-600/30 flex items-center justify-center">
            <Users className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <p className="text-white font-semibold">{players.length} joueur{players.length !== 1 ? "s" : ""}</p>
            <p className="text-white/40 text-xs">
              {players.length < 2 ? "Minimum 2 joueurs requis" : "Prêts à jouer !"}
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <PlayerForm />
        </motion.div>

        {/* List */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <PlayerList />
        </motion.div>
      </div>

      {/* CTA */}
      <div className="relative px-6 pb-10 pt-4">
        <Link href={canStart ? "/game-select" : "#"} className={!canStart ? "pointer-events-none" : ""}>
          <motion.div
            whileTap={canStart ? { scale: 0.96 } : {}}
            className={`w-full py-5 rounded-2xl text-white text-lg font-bold text-center shadow-xl flex items-center justify-center gap-2 transition-all ${
              canStart
                ? "bg-gradient-to-r from-violet-600 to-rose-500"
                : "bg-white/10 opacity-50"
            }`}
          >
            Choisir un jeu
            <span className="text-xl">🎮</span>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
