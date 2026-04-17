"use client";
import { create } from "zustand";
import type { GameMode, GameVariant, GamePhase, Card } from "@/types/game";

interface GameStore {
  mode: GameMode | null;
  variant: GameVariant;
  phase: GamePhase;
  currentRound: number;
  currentPlayerIndex: number;
  deck: Card[];
  usedCardIds: Set<string>;
  kingsDrawn: number;

  startGame: (mode: GameMode, variant?: GameVariant) => void;
  nextTurn: (totalPlayers: number) => void;
  drawCard: () => Card | null;
  endGame: () => void;
  resetGame: () => void;
  setPhase: (phase: GamePhase) => void;
  setDeck: (deck: Card[]) => void;
  incrementKings: () => void;
}

export const useGameStore = create<GameStore>()((set, get) => ({
  mode: null,
  variant: "standard",
  phase: "idle",
  currentRound: 0,
  currentPlayerIndex: 0,
  deck: [],
  usedCardIds: new Set(),
  kingsDrawn: 0,

  startGame: (mode, variant = "standard") => {
    set({
      mode,
      variant,
      phase: "playing",
      currentRound: 1,
      currentPlayerIndex: 0,
      deck: [],
      usedCardIds: new Set(),
      kingsDrawn: 0,
    });
  },

  nextTurn: (totalPlayers) => {
    set((state) => ({
      currentPlayerIndex: (state.currentPlayerIndex + 1) % totalPlayers,
      currentRound: state.currentRound + 1,
      phase: "turn-banner",
    }));
  },

  drawCard: () => {
    const { deck, usedCardIds } = get();
    const available = deck.filter((c) => !usedCardIds.has(c.id));
    if (available.length === 0) return null;
    const card = available[0];
    set((state) => ({
      usedCardIds: new Set([...state.usedCardIds, card.id]),
    }));
    return card;
  },

  endGame: () => set({ phase: "finished" }),
  resetGame: () =>
    set({
      mode: null,
      variant: "standard",
      phase: "idle",
      currentRound: 0,
      currentPlayerIndex: 0,
      deck: [],
      usedCardIds: new Set(),
      kingsDrawn: 0,
    }),
  setPhase: (phase) => set({ phase }),
  setDeck: (deck) => set({ deck }),
  incrementKings: () => set((state) => ({ kingsDrawn: state.kingsDrawn + 1 })),
}));
