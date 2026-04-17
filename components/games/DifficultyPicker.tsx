"use client";
import { motion } from "framer-motion";
import { Snowflake, Zap, Flame } from "lucide-react";

export type Difficulty = "soft" | "spicy" | "hard";

interface DifficultyPickerProps {
  onSelect: (difficulty: Difficulty) => void;
  title?: string;
}

const DIFFICULTIES = [
  {
    id: "soft" as Difficulty,
    label: "Soft",
    desc: "Questions fun et légères",
    icon: Snowflake,
    gradient: "from-blue-600 to-cyan-400",
    glow: "shadow-blue-500/40",
    border: "border-blue-500/40",
    bg: "bg-blue-500/10",
    textColor: "text-blue-300",
  },
  {
    id: "spicy" as Difficulty,
    label: "Spicy",
    desc: "Un peu gênant, ça chauffe",
    icon: Zap,
    gradient: "from-orange-500 to-amber-400",
    glow: "shadow-orange-500/40",
    border: "border-orange-500/40",
    bg: "bg-orange-500/10",
    textColor: "text-orange-300",
  },
  {
    id: "hard" as Difficulty,
    label: "Hard 🔞",
    desc: "Très osé, sans filtre",
    icon: Flame,
    gradient: "from-red-600 to-rose-500",
    glow: "shadow-red-500/40",
    border: "border-red-500/40",
    bg: "bg-red-500/10",
    textColor: "text-red-300",
  },
];

export default function DifficultyPicker({ onSelect, title = "Choisis la difficulté" }: DifficultyPickerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center flex-1 gap-7"
    >
      <div className="text-center">
        <h2 className="text-white font-extrabold text-2xl mb-1">{title}</h2>
        <p className="text-white/40 text-sm">Choisissez l&apos;intensité des questions</p>
      </div>

      <div className="w-full space-y-3">
        {DIFFICULTIES.map((d, i) => {
          const Icon = d.icon;
          return (
            <motion.button
              key={d.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(d.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border ${d.border} ${d.bg} transition-all active:scale-95`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${d.gradient} shadow-lg ${d.glow} flex-shrink-0`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-left flex-1">
                <p className={`font-bold text-lg leading-none ${d.textColor}`}>{d.label}</p>
                <p className="text-white/50 text-sm mt-0.5">{d.desc}</p>
              </div>
              <span className="text-white/30 text-2xl font-light">›</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
