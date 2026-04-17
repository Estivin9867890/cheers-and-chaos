"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Player } from "@/types/player";
import { generateId, getPlayerColor } from "@/lib/utils";

interface PlayerStore {
  players: Player[];
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  incrementDrinks: (id: string, sips: number) => void;
  resetDrinks: () => void;
  clearPlayers: () => void;
}

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => ({
      players: [],
      addPlayer: (name: string) => {
        const trimmed = name.trim();
        if (!trimmed) return;
        const { players } = get();
        if (players.find((p) => p.name.toLowerCase() === trimmed.toLowerCase())) return;
        const newPlayer: Player = {
          id: generateId(),
          name: trimmed,
          color: getPlayerColor(players.length),
          drinkCount: 0,
        };
        set({ players: [...players, newPlayer] });
      },
      removePlayer: (id: string) => {
        set((state) => ({ players: state.players.filter((p) => p.id !== id) }));
      },
      incrementDrinks: (id: string, sips: number) => {
        set((state) => ({
          players: state.players.map((p) =>
            p.id === id ? { ...p, drinkCount: p.drinkCount + sips } : p
          ),
        }));
      },
      resetDrinks: () => {
        set((state) => ({
          players: state.players.map((p) => ({ ...p, drinkCount: 0 })),
        }));
      },
      clearPlayers: () => set({ players: [] }),
    }),
    { name: "cheers-players" }
  )
);
