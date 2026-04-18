export interface TuPreferesCard {
  id: string;
  optionA: string;
  optionB: string;
  category: "soft" | "spicy" | "hard";
}

export const TU_PREFERES: TuPreferesCard[] = [
  // ── SOFT ─────────────────────────────────────────────────────────────────────
  { id: "tp-1",  optionA: "Toujours arriver 30 min en avance",          optionB: "Toujours arriver 30 min en retard",            category: "soft" },
  { id: "tp-2",  optionA: "Ne plus jamais manger de pizza",              optionB: "Ne plus jamais manger de sushi",               category: "soft" },
  { id: "tp-3",  optionA: "Vivre sans musique",                          optionB: "Vivre sans télévision ni films",               category: "soft" },
  { id: "tp-4",  optionA: "Avoir la mémoire d'un poisson rouge",         optionB: "Ne jamais pouvoir dormir plus de 4h",          category: "soft" },
  { id: "tp-5",  optionA: "Savoir voler",                                optionB: "Savoir lire dans les pensées",                 category: "soft" },
  { id: "tp-6",  optionA: "Ne jamais avoir froid",                       optionB: "Ne jamais avoir chaud",                       category: "soft" },
  { id: "tp-7",  optionA: "Perdre ton téléphone",                        optionB: "Perdre ton portefeuille",                     category: "soft" },
  { id: "tp-8",  optionA: "Parler 10 langues mais ne pas savoir cuisiner",optionB: "Cuisiner comme un chef mais parler 1 langue", category: "soft" },
  { id: "tp-9",  optionA: "Voyager dans le futur",                       optionB: "Voyager dans le passé",                       category: "soft" },
  { id: "tp-10", optionA: "Ne jamais pleurer quoi qu'il arrive",         optionB: "Pleurer pour tout et n'importe quoi",         category: "soft" },
  { id: "tp-11", optionA: "Avoir une très mauvaise vue",                 optionB: "Avoir une très mauvaise ouïe",                category: "soft" },
  { id: "tp-12", optionA: "Manger la même chose tous les jours (ton plat préféré)", optionB: "Manger varié mais jamais exactement ce que tu veux", category: "soft" },
  { id: "tp-13", optionA: "Pouvoir arrêter le temps",                    optionB: "Pouvoir changer d'apparence à volonté",       category: "soft" },
  { id: "tp-14", optionA: "Ne jamais avoir à travailler mais être fauché(e)", optionB: "Être riche mais travailler 70h par semaine", category: "soft" },
  { id: "tp-15", optionA: "Vivre 200 ans mais vieillir normalement",     optionB: "Vivre 80 ans mais rester jeune toute ta vie", category: "soft" },

  // ── SPICY ─────────────────────────────────────────────────────────────────────
  { id: "tp-16", optionA: "Savoir que tout le monde ment dans ton dos",  optionB: "Ne jamais le savoir mais toujours douter",    category: "spicy" },
  { id: "tp-17", optionA: "Être l'ex dont tout le monde parle en mal",   optionB: "Être l'ex que tout le monde a complètement oublié", category: "spicy" },
  { id: "tp-18", optionA: "Voir l'historique de recherche de tes parents", optionB: "Tes parents voient ton historique de recherche", category: "spicy" },
  { id: "tp-19", optionA: "Connaître l'avis honnête de tous tes amis sur toi", optionB: "Ne jamais le savoir",                  category: "spicy" },
  { id: "tp-20", optionA: "Avoir une aventure secrète et ne jamais te faire prendre", optionB: "Que tout le monde sache ce que tu fais", category: "spicy" },
  { id: "tp-21", optionA: "Savoir exactement quand tu vas mourir",        optionB: "Ne jamais le savoir mais que ça peut être demain", category: "spicy" },
  { id: "tp-22", optionA: "Avoir tous les yeux sur toi toute ta vie",    optionB: "Passer complètement inaperçu(e) pour toujours", category: "spicy" },
  { id: "tp-23", optionA: "Qu'on lise tous tes textos en temps réel",    optionB: "Qu'on te voie en vidéo à tout moment",        category: "spicy" },
  { id: "tp-24", optionA: "Ne plus jamais boire d'alcool",               optionB: "Ne plus jamais manger de sucreries",          category: "spicy" },
  { id: "tp-25", optionA: "Tomber amoureux/se de quelqu'un qui ne t'aimera jamais", optionB: "Être aimé(e) de quelqu'un que tu n'aimeras jamais", category: "spicy" },
  { id: "tp-26", optionA: "Perdre tous tes amis actuels mais en trouver de meilleurs", optionB: "Garder tes amis actuels mais ne jamais en trouver de nouveaux", category: "spicy" },
  { id: "tp-27", optionA: "Revivre ta pire rupture",                     optionB: "Oublier complètement ta meilleure relation",  category: "spicy" },
  { id: "tp-28", optionA: "Que tes parents lisent tes messages",         optionB: "Que ton/ta boss lise tes messages",           category: "spicy" },
  { id: "tp-29", optionA: "Avoir une très belle vie mais dont personne ne se souvient", optionB: "Avoir une vie difficile mais être légendaire", category: "spicy" },
  { id: "tp-30", optionA: "Avoir une relation intense de 6 mois",        optionB: "Une relation correcte qui dure 20 ans",       category: "spicy" },

  // ── HARD ──────────────────────────────────────────────────────────────────────
  { id: "tp-31", optionA: "Ne plus jamais boire d'alcool à vie",         optionB: "Ne plus jamais avoir de relations sexuelles à vie", category: "hard" },
  { id: "tp-32", optionA: "Coucher avec quelqu'un dans cette pièce au hasard", optionB: "Ne plus coucher avec personne pendant 1 an", category: "hard" },
  { id: "tp-33", optionA: "Tout le monde sait combien de partenaires tu as eu", optionB: "Tout le monde connaît ta vie amoureuse en détail", category: "hard" },
  { id: "tp-34", optionA: "Être trompé(e) une fois et le savoir",        optionB: "Être trompé(e) plusieurs fois sans jamais l'apprendre", category: "hard" },
  { id: "tp-35", optionA: "Ne plus jamais embrasser personne",           optionB: "Ne plus jamais faire de câlins",               category: "hard" },
  { id: "tp-36", optionA: "Perdre tous tes souvenirs romantiques",       optionB: "Que tout le groupe voit tes 3 pires moments intimes", category: "hard" },
  { id: "tp-37", optionA: "Coucher avec quelqu'un que tu trouves très beau mais que tu détestes", optionB: "Coucher avec quelqu'un que tu adores mais pas attirant(e)", category: "hard" },
  { id: "tp-38", optionA: "Ton ex avec qui ça s'est le plus mal passé voit tous tes nouveaux messages", optionB: "Tu dois appeler ton ex une fois par semaine", category: "hard" },
  { id: "tp-39", optionA: "Avoir des sentiments mais que l'autre ne veuille que du sexe", optionB: "Vouloir que du sexe mais que l'autre soit amoureux/se", category: "hard" },
  { id: "tp-40", optionA: "Que tout le groupe sache qui tu trouves le plus attirant(e) ici", optionB: "Faire un bisou de 10 secondes à la personne que tu veux dans cette pièce", category: "hard" },
];
