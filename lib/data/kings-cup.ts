import { KingsCupRule } from "@/types/game";

export const KINGS_CUP_RULES: KingsCupRule[] = [
  // Standard rules (apply to all variants unless overridden)
  { cardValue: "A", name: "Waterfall", description: "Tout le monde boit ! Le joueur actif commence, personne ne peut arrêter avant que le joueur à sa gauche arrête.", variant: "all" },
  { cardValue: "2", name: "À toi", description: "Donne 2 gorgées à qui tu veux.", sips: 2, variant: "all" },
  { cardValue: "3", name: "À moi", description: "Bois 3 gorgées.", sips: 3, variant: "all" },
  { cardValue: "4", name: "Sol !", description: "Dernier à poser les mains par terre boit.", sips: 2, variant: "all" },
  { cardValue: "5", name: "Messieurs", description: "Tous les garçons boivent.", sips: 2, variant: "standard" },
  { cardValue: "6", name: "Mesdames", description: "Toutes les filles boivent.", sips: 2, variant: "standard" },
  { cardValue: "7", name: "Ciel !", description: "Dernier à lever les bras boit.", sips: 2, variant: "all" },
  { cardValue: "8", name: "Mate", description: "Choisis un binôme : il boit chaque fois que tu bois (jusqu'au prochain 8).", variant: "all" },
  { cardValue: "9", name: "Rime", description: "Dis un mot, les joueurs suivants doivent trouver une rime. Celui qui rate boit.", sips: 2, variant: "standard" },
  { cardValue: "10", name: "Catégories", description: "Annonce une catégorie (marques de voiture, pays...), les joueurs citent des éléments à tour de rôle. Celui qui rate boit.", sips: 2, variant: "standard" },
  { cardValue: "J", name: "Crée une règle", description: "Invente une règle qui s'applique jusqu'à la fin de la partie (ex: interdiction de prononcer un prénom).", variant: "standard" },
  { cardValue: "Q", name: "Questionnaire", description: "Pose une question à quelqu'un. Cette personne répond par une question à quelqu'un d'autre. Celui qui répond normalement boit.", sips: 2, variant: "all" },
  { cardValue: "K", name: "King's Cup", description: "Verse une partie de ta boisson dans le calice central. Celui qui tire le 4ème Roi doit finir le calice !", sips: 0, variant: "standard" },
  // Spicy overrides
  { cardValue: "5", name: "Tous boivent", description: "Tout le monde boit 2 gorgées.", sips: 2, variant: "spicy" },
  { cardValue: "6", name: "Tous boivent", description: "Tout le monde boit 2 gorgées.", sips: 2, variant: "spicy" },
  { cardValue: "9", name: "Vérité ou Défi", description: "Choisis un joueur : Vérité (répond à une question embarrassante) ou Défi (effectue un gage).", variant: "spicy" },
  { cardValue: "10", name: "Qui parmi vous ?", description: "Pose une question 'Qui parmi vous...' et tous les joueurs qui se reconnaissent boivent.", sips: 2, variant: "spicy" },
  { cardValue: "J", name: "Confession", description: "Fais une confession. Chaque joueur qui a fait la même chose boit avec toi.", variant: "spicy" },
  { cardValue: "K", name: "Défi en chaîne", description: "Lance un défi en chaîne : chaque joueur suivant doit enchaîner un défi plus hard. Celui qui refuse boit 4 gorgées.", sips: 4, variant: "spicy" },
  // Extreme overrides
  { cardValue: "A", name: "Shot !", description: "Tout le monde fait un shot !", variant: "extreme" },
  { cardValue: "5", name: "Tous les garçons - Shot", description: "Tous les garçons font un shot.", variant: "extreme" },
  { cardValue: "6", name: "Toutes les filles - Shot", description: "Toutes les filles font un shot.", variant: "extreme" },
  { cardValue: "9", name: "Vérité HOT ou Défi", description: "Vérité très personnelle ou défi osé. Le refus = 5 gorgées.", sips: 5, variant: "extreme" },
  { cardValue: "10", name: "Qui parmi vous ? (Hot)", description: "Question osée. Les joueurs qui se reconnaissent boivent double.", sips: 4, variant: "extreme" },
  { cardValue: "J", name: "Règle osée", description: "Invente une règle ousée qui s'applique jusqu'à la fin.", variant: "extreme" },
  { cardValue: "K", name: "Calice & Défi ultime", description: "Verse dans le calice ET impose un défi. Le 4ème Roi : le joueur finit le calice en faisant un défi.", sips: 0, variant: "extreme" },
];

export function getRulesForVariant(variant: "standard" | "spicy" | "extreme"): Record<string, KingsCupRule> {
  const baseRules = KINGS_CUP_RULES.filter((r) => r.variant === "all");
  const variantRules = KINGS_CUP_RULES.filter((r) => r.variant === variant);
  const standardRules = KINGS_CUP_RULES.filter((r) => r.variant === "standard");

  const rules: Record<string, KingsCupRule> = {};

  // Start with standard rules
  for (const rule of [...baseRules, ...standardRules]) {
    rules[rule.cardValue] = rule;
  }

  // Override with variant-specific rules
  if (variant !== "standard") {
    for (const rule of variantRules) {
      rules[rule.cardValue] = rule;
    }
  }

  return rules;
}

export const SUITS = ["hearts", "diamonds", "clubs", "spades"] as const;
export const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"] as const;

export function generateDeck() {
  const deck = [];
  for (const suit of SUITS) {
    for (const value of VALUES) {
      deck.push({ id: `${value}-${suit}`, suit, value });
    }
  }
  return deck;
}
