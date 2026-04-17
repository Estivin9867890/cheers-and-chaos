"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { usePlayerStore } from "@/lib/store/playerStore";

export default function PlayerForm() {
  const [name, setName] = useState("");
  const { addPlayer, players } = usePlayerStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || players.length >= 10) return;
    addPlayer(name.trim());
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Prénom du joueur..."
        maxLength={20}
        className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-4 py-3.5 text-white placeholder-white/40 outline-none focus:border-violet-400 transition-colors text-base"
      />
      <button
        type="submit"
        disabled={!name.trim() || players.length >= 10}
        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-rose-500 flex items-center justify-center shadow-lg disabled:opacity-40 active:scale-95 transition-transform flex-shrink-0"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>
    </form>
  );
}
