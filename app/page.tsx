"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Beer, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-between relative overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-20%] w-[70vw] h-[70vw] rounded-full bg-violet-700/30 blur-[80px]" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60vw] h-[60vw] rounded-full bg-rose-600/25 blur-[80px]" />
        <div className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-purple-800/20 blur-[60px]" />
      </div>

      {/* Header */}
      <div className="relative pt-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <span className="text-3xl">🍻</span>
          <span className="text-white/50 text-sm uppercase tracking-widest">Jeux de soirée</span>
          <span className="text-3xl">🎉</span>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
          className="mb-8"
        >
          <div className="w-28 h-28 rounded-[32px] bg-gradient-to-br from-violet-600 to-rose-500 shadow-2xl flex items-center justify-center mb-6 mx-auto">
            <Beer className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-5xl font-extrabold text-white mb-2 leading-tight">
            <span className="bg-gradient-to-r from-violet-400 to-rose-400 bg-clip-text text-transparent">
              Bringuasse
            </span>
          </h1>
          <p className="text-white/50 text-lg mt-3 max-w-xs mx-auto">
            Le jeu d&apos;alcool ultime pour vos soirées inoubliables
          </p>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {["7 jeux", "Un seul appareil", "Illimité"].map((label) => (
            <span
              key={label}
              className="px-3 py-1.5 bg-white/10 rounded-full text-white/60 text-sm border border-white/10"
            >
              {label}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="w-full max-w-sm"
        >
          <Link href="/lobby" className="block">
            <motion.div
              whileTap={{ scale: 0.96 }}
              className="w-full py-5 bg-gradient-to-r from-violet-600 to-rose-500 rounded-2xl text-white text-xl font-bold text-center shadow-2xl flex items-center justify-center gap-3"
            >
              <Sparkles className="w-5 h-5" />
              Commencer la soirée
              <Sparkles className="w-5 h-5" />
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="relative pb-10 text-white/20 text-xs text-center"
      >
        À consommer avec modération 🍺
      </motion.div>
    </div>
  );
}
