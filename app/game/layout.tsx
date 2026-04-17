"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function GameLayout({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-dvh flex flex-col bg-[#0f0a1e]"
    >
      {children}
    </motion.div>
  );
}
