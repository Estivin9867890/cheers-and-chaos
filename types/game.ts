export type GameMode =
  | "je-nai-jamais"
  | "qui-pourrait"
  | "kings-cup"
  | "le-palmier"
  | "la-pyramide"
  | "le-triman"
  | "culture-generale"
  | "tu-preferes"
  | "fun-facts";

export type GameVariant = "standard" | "spicy" | "extreme";

export type GamePhase = "idle" | "turn-banner" | "playing" | "result" | "finished";

export interface Card {
  id: string;
  suit?: "hearts" | "diamonds" | "clubs" | "spades";
  value?: string;
  text?: string;
  category?: string;
  intensity?: "soft" | "medium" | "spicy";
}

export interface DrinkAssignment {
  fromPlayerId?: string;
  toPlayerId: string;
  sips: number;
  reason: string;
}

export interface Round {
  roundNumber: number;
  card: Card;
  assignments: DrinkAssignment[];
}

export interface GameSession {
  id: string;
  mode: GameMode;
  variant?: GameVariant;
  startedAt: Date;
  endedAt?: Date;
  players: string[];
}

export interface TriviaQuestion {
  id: string;
  question: string;
  answer: string;
  category: "geo" | "science" | "cinema" | "sport" | "histoire" | "pop";
  difficulty: "easy" | "medium" | "hard";
  sipsOnFail: number;
}

export interface KingsCupRule {
  cardValue: string;
  name: string;
  description: string;
  sips?: number;
  variant: "all" | "standard" | "spicy" | "extreme";
}

export interface PyramidCard extends Card {
  row: number;
  col: number;
  revealed: boolean;
}
