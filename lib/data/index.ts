export { JE_NAI_JAMAIS } from "./je-nai-jamais";
export { QUI_POURRAIT } from "./qui-pourrait";
export { KINGS_CUP_RULES, getRulesForVariant, generateDeck, SUITS, VALUES } from "./kings-cup";
export { PALMIER_CHALLENGES } from "./le-palmier";
export { CULTURE_GENERALE } from "./culture-generale";
export { TU_PREFERES } from "./tu-preferes";
export type { TuPreferesCard } from "./tu-preferes";
export { FUN_FACTS } from "./fun-facts";
export type { FunFactCard, FunFactType } from "./fun-facts";

import { JE_NAI_JAMAIS } from "./je-nai-jamais";
import { QUI_POURRAIT } from "./qui-pourrait";
import { PALMIER_CHALLENGES } from "./le-palmier";
import { CULTURE_GENERALE } from "./culture-generale";
import { shuffle } from "@/lib/utils";
import type { Card } from "@/types/game";
import type { GameMode } from "@/types/game";

export function getShuffledDeck(mode: GameMode): Card[] {
  switch (mode) {
    case "je-nai-jamais":
      return shuffle(JE_NAI_JAMAIS);
    case "qui-pourrait":
      return shuffle(QUI_POURRAIT);
    case "le-palmier":
      return shuffle(PALMIER_CHALLENGES);
    default:
      return [];
  }
}

export function getShuffledDeckByDifficulty(
  mode: GameMode,
  difficulty: "soft" | "spicy" | "hard"
): Card[] {
  switch (mode) {
    case "je-nai-jamais": {
      // soft→soft, spicy→medium, hard→spicy
      const intensityMap: Record<string, string> = { soft: "soft", spicy: "medium", hard: "spicy" };
      const target = intensityMap[difficulty];
      const filtered = JE_NAI_JAMAIS.filter((c) => c.intensity === target);
      return shuffle(filtered.length > 0 ? filtered : JE_NAI_JAMAIS);
    }
    case "qui-pourrait": {
      // soft→funny, spicy→embarrassing, hard→daring
      const categoryMap: Record<string, string> = {
        soft: "funny",
        spicy: "embarrassing",
        hard: "daring",
      };
      const target = categoryMap[difficulty];
      const filtered = QUI_POURRAIT.filter((c) => c.category === target);
      return shuffle(filtered.length > 0 ? filtered : QUI_POURRAIT);
    }
    default:
      return getShuffledDeck(mode);
  }
}
