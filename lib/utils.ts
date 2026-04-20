export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.flat().filter(Boolean).join(" ");
}

/**
 * Knuth-Fisher-Yates shuffle.
 * Avance le PRNG de quelques steps basés sur Date.now() avant de mélanger,
 * pour éviter deux mélanges identiques consécutifs même en rapide succession.
 */
export function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  // Extra entropy: discard N random values based on current milliseconds
  const skip = (Date.now() % 13) + 2;
  for (let k = 0; k < skip; k++) Math.random();
  // Fisher-Yates
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const PLAYER_COLORS = [
  "#8B5CF6", // violet
  "#EC4899", // pink
  "#F97316", // orange
  "#10B981", // emerald
  "#3B82F6", // blue
  "#F59E0B", // amber
  "#EF4444", // red
  "#06B6D4", // cyan
  "#84CC16", // lime
  "#A855F7", // purple
];

export function getPlayerColor(index: number): string {
  return PLAYER_COLORS[index % PLAYER_COLORS.length];
}

export function formatSips(sips: number): string {
  if (sips === 0) return "0 gorgée";
  if (sips === 1) return "1 gorgée";
  return `${sips} gorgées`;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export const GAME_GRADIENTS: Record<string, string> = {
  "je-nai-jamais": "from-violet-600 to-rose-500",
  "qui-pourrait": "from-orange-500 to-yellow-400",
  "kings-cup": "from-red-700 to-orange-500",
  "le-palmier": "from-emerald-600 to-green-400",
  "la-pyramide": "from-blue-600 to-cyan-400",
  "le-triman": "from-purple-600 to-pink-500",
  "culture-generale": "from-amber-500 to-yellow-300",
};

export const GAME_NAMES: Record<string, string> = {
  "je-nai-jamais": "Je n'ai jamais",
  "qui-pourrait": "Qui pourrait ?",
  "kings-cup": "King's Cup",
  "le-palmier": "Le Palmier",
  "la-pyramide": "La Pyramide",
  "le-triman": "Le Triman",
  "culture-generale": "Culture Générale",
};
