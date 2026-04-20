export type FunFactType = "fact" | "debate";

export interface FunFactCard {
  id: string;
  type: FunFactType;
  content: string;
  category: string;
  emoji: string;
  /** Pour les débats : description courte de la règle */
  debateSip?: string;
}

export const FUN_FACTS: FunFactCard[] = [
  // ═══════════════════════════════════════════════════════════════
  // FUN FACTS — Faits insolites
  // ═══════════════════════════════════════════════════════════════

  // ── Animaux ──────────────────────────────────────────────────
  { id: "ff-a001", type: "fact", emoji: "🦦", category: "Animaux", content: "Les loutres se tiennent la main en dormant pour ne pas dériver. C'est ce qu'on appelle un 'radeau de loutres'." },
  { id: "ff-a002", type: "fact", emoji: "🦩", category: "Animaux", content: "Les flamants roses naissent blancs. Le rose vient des pigments caroténoïdes dans leur alimentation (crevettes, algues)." },
  { id: "ff-a003", type: "fact", emoji: "🐙", category: "Animaux", content: "Les pieuvres ont 3 cœurs, 9 cerveaux (1 central + 1 par tentacule), et un sang bleu." },
  { id: "ff-a004", type: "fact", emoji: "🐝", category: "Animaux", content: "Une abeille ouvrière visite environ 2 000 fleurs par jour et ne produira qu'1/12e de cuillère à café de miel dans toute sa vie." },
  { id: "ff-a005", type: "fact", emoji: "🐘", category: "Animaux", content: "Les éléphants sont les seuls animaux qui ne peuvent pas sauter — leurs genoux ne se plient pas vers l'arrière." },
  { id: "ff-a006", type: "fact", emoji: "🦈", category: "Animaux", content: "Les requins ont existé avant les arbres. Ils ont 450 millions d'années, les forêts seulement 385 millions." },
  { id: "ff-a007", type: "fact", emoji: "🦋", category: "Animaux", content: "Les papillons goûtent avec leurs pieds. Leurs récepteurs gustatifs se trouvent dans leurs pattes." },
  { id: "ff-a008", type: "fact", emoji: "🐌", category: "Animaux", content: "Les escargots peuvent dormir jusqu'à 3 ans. Ils hibernent (ou estivient) selon les conditions climatiques." },
  { id: "ff-a009", type: "fact", emoji: "🦟", category: "Animaux", content: "Les moustiques femelles sont attirées par le groupe sanguin O deux fois plus que les autres. Type A = moins piqué(e)." },
  { id: "ff-a010", type: "fact", emoji: "🐬", category: "Animaux", content: "Les dauphins ont des noms. Ils s'appellent mutuellement par des sifflements uniques, comme des prénoms." },
  { id: "ff-a011", type: "fact", emoji: "🦁", category: "Animaux", content: "Ce sont les lionnes qui chassent, pas les lions. Les mâles mangent en premier malgré ça." },
  { id: "ff-a012", type: "fact", emoji: "🐧", category: "Animaux", content: "Les manchots mâles font leur demande en mariage avec un caillou. S'il est accepté, ils forment un couple." },
  { id: "ff-a013", type: "fact", emoji: "🐜", category: "Animaux", content: "Les fourmis n'ont pas de poumons. Elles respirent par des petits trous sur les côtés de leur corps." },
  { id: "ff-a014", type: "fact", emoji: "🐠", category: "Animaux", content: "Tous les clowns de mer naissent mâles. Quand la femelle d'un groupe meurt, le mâle dominant change de sexe." },
  { id: "ff-a015", type: "fact", emoji: "🦒", category: "Animaux", content: "Les girafes ont la même tension artérielle que les humains souffrant d'hypertension sévère — pour que le sang atteigne leur cerveau." },

  // ── Espace ───────────────────────────────────────────────────
  { id: "ff-s001", type: "fact", emoji: "🚀", category: "Espace", content: "Une journée sur Vénus dure plus longtemps qu'une année sur Vénus. Sa rotation est plus lente que sa révolution." },
  { id: "ff-s002", type: "fact", emoji: "⭐", category: "Espace", content: "Le Soleil représente 99,86% de toute la masse du système solaire. Jupiter contient presque tout le reste." },
  { id: "ff-s003", type: "fact", emoji: "🌕", category: "Espace", content: "Les empreintes de pas laissées sur la Lune y resteront des millions d'années — il n'y a ni vent ni eau pour les effacer." },
  { id: "ff-s004", type: "fact", emoji: "🪐", category: "Espace", content: "Saturne est si peu dense qu'elle floterait sur l'eau si on trouvait un océan assez grand." },
  { id: "ff-s005", type: "fact", emoji: "🌌", category: "Espace", content: "Il y a plus d'étoiles dans l'univers observable que de grains de sable sur toutes les plages de la Terre." },
  { id: "ff-s006", type: "fact", emoji: "☀️", category: "Espace", content: "La lumière que tu vois du Soleil a quitté sa surface il y a environ 8 minutes et 20 secondes." },
  { id: "ff-s007", type: "fact", emoji: "🌀", category: "Espace", content: "Un trou noir de la taille d'une pièce de monnaie pèserait des milliards de tonnes." },
  { id: "ff-s008", type: "fact", emoji: "🛸", category: "Espace", content: "La ISS (station spatiale) voyage à 28 000 km/h et fait le tour de la Terre en 90 minutes." },
  { id: "ff-s009", type: "fact", emoji: "💫", category: "Espace", content: "Techniquement, quand tu regardes une étoile, tu vois le passé — certaines ont disparu depuis des millions d'années." },
  { id: "ff-s010", type: "fact", emoji: "🌠", category: "Espace", content: "Les étoiles filantes ne sont pas des étoiles — ce sont des grains de poussière qui brûlent en entrant dans l'atmosphère." },

  // ── Corps humain ──────────────────────────────────────────────
  { id: "ff-h001", type: "fact", emoji: "🧬", category: "Corps humain", content: "Les humains partagent 60% de leur ADN avec une banane. Et 98,7% avec les chimpanzés." },
  { id: "ff-h002", type: "fact", emoji: "🦴", category: "Corps humain", content: "Les os humains sont 5 fois plus résistants que l'acier à poids équivalent." },
  { id: "ff-h003", type: "fact", emoji: "❤️", category: "Corps humain", content: "Ton cœur bat environ 100 000 fois par jour. En une vie, c'est environ 2,5 milliards de battements." },
  { id: "ff-h004", type: "fact", emoji: "🧠", category: "Corps humain", content: "Le cerveau humain génère assez d'électricité pour alimenter une petite ampoule LED." },
  { id: "ff-h005", type: "fact", emoji: "👁️", category: "Corps humain", content: "L'œil humain peut distinguer environ 10 millions de couleurs différentes, mais le cerveau n'en traite qu'une fraction." },
  { id: "ff-h006", type: "fact", emoji: "🦠", category: "Corps humain", content: "Il y a plus de bactéries dans ta bouche qu'il n'y a d'humains sur Terre." },
  { id: "ff-h007", type: "fact", emoji: "💧", category: "Corps humain", content: "Le corps humain est composé à environ 60% d'eau. Le cerveau et les poumons en sont à 75-83%." },
  { id: "ff-h008", type: "fact", emoji: "😴", category: "Corps humain", content: "On passe en moyenne 26 ans à dormir dans une vie. Et 7 ans à essayer de s'endormir." },
  { id: "ff-h009", type: "fact", emoji: "🤣", category: "Corps humain", content: "Rire 100 fois brûle autant de calories que 10 minutes de vélo. C'est une raison de regarder des comédies." },
  { id: "ff-h010", type: "fact", emoji: "🩸", category: "Corps humain", content: "Si on déroulait tous les vaisseaux sanguins d'un humain bout à bout, ils feraient 2 fois le tour de la Terre." },

  // ── Histoire insolite ─────────────────────────────────────────
  { id: "ff-i001", type: "fact", emoji: "🏺", category: "Histoire", content: "Le miel trouvé dans les tombes égyptiennes vieilles de 3000 ans était encore comestible. Le miel ne se périme pas." },
  { id: "ff-i002", type: "fact", emoji: "⚔️", category: "Histoire", content: "La Guerre des Oreilles de Jenkins (1739) a démarré parce qu'un capitaine espagnol a coupé l'oreille d'un contrebandier britannique." },
  { id: "ff-i003", type: "fact", emoji: "🏛️", category: "Histoire", content: "Le Parthénon d'Athènes a été un temple, une église chrétienne et une mosquée avant de devenir une ruine." },
  { id: "ff-i004", type: "fact", emoji: "🃏", category: "Histoire", content: "Les cartes à jouer (roi, dame, valet) représentaient des personnages historiques : le roi de cœur est Charlemagne." },
  { id: "ff-i005", type: "fact", emoji: "🎭", category: "Histoire", content: "Dans la Rome antique, les gladiateurs étaient des célébrités et des mannequins. On vendait leur sueur comme cosmétique." },
  { id: "ff-i006", type: "fact", emoji: "🐄", category: "Histoire", content: "La Nouvelle-Zélande a été le premier pays à accorder le droit de vote aux femmes, en 1893." },
  { id: "ff-i007", type: "fact", emoji: "📰", category: "Histoire", content: "Le mot 'quiz' aurait été inventé par un Dublinois en 1791 qui paria qu'il pouvait rendre un mot connu en 24h en l'écrivant partout." },
  { id: "ff-i008", type: "fact", emoji: "🌭", category: "Histoire", content: "Les hot-dogs sont plus anciens que les États-Unis. Les saucisses de Francfort existent depuis le 13e siècle." },
  { id: "ff-i009", type: "fact", emoji: "💊", category: "Histoire", content: "L'aspirine a d'abord été vendue comme héroïne légère par Bayer en 1898 — avant qu'on comprenne les effets." },
  { id: "ff-i010", type: "fact", emoji: "🍫", category: "Histoire", content: "Le chocolat était une boisson amère et épicée pendant des millénaires avant que les Européens y ajoutent du sucre." },

  // ── Psychologie & Société ─────────────────────────────────────
  { id: "ff-p001", type: "fact", emoji: "🧠", category: "Psychologie", content: "L'effet Dunning-Kruger : les incompétents surestiment leurs capacités, et les experts sous-estiment les leurs." },
  { id: "ff-p002", type: "fact", emoji: "😊", category: "Psychologie", content: "Sourire, même forcé, envoie des signaux au cerveau qui améliorent réellement l'humeur. Le corps croit le visage." },
  { id: "ff-p003", type: "fact", emoji: "🪞", category: "Psychologie", content: "On préfère notre reflet dans le miroir à notre vraie apparence en photo — parce qu'on est habitué à l'image inversée." },
  { id: "ff-p004", type: "fact", emoji: "🎯", category: "Psychologie", content: "Le cerveau ne peut pas distinguer le vrai souvenir d'un souvenir d'un souvenir. On reconstruit chaque fois qu'on se souvient." },
  { id: "ff-p005", type: "fact", emoji: "🌙", category: "Psychologie", content: "Les décisions importantes prises la nuit semblent moins bonnes le lendemain matin. Le cortex préfrontal fonctionne mieux le jour." },
  { id: "ff-p006", type: "fact", emoji: "🎵", category: "Psychologie", content: "Une chanson 'coincée dans la tête' (ver d'oreille) arrive à cause d'une mémoire incomplète que le cerveau essaie de compléter." },
  { id: "ff-p007", type: "fact", emoji: "🤔", category: "Psychologie", content: "On prend environ 35 000 décisions par jour. La plupart sont inconscientes." },
  { id: "ff-p008", type: "fact", emoji: "💤", category: "Psychologie", content: "Manquer de sommeil 17h crée les mêmes effets qu'un taux d'alcoolémie de 0,05g/L. 24h = 0,10g/L." },
  { id: "ff-p009", type: "fact", emoji: "😂", category: "Psychologie", content: "On rit 30x plus en groupe qu'en solitaire. Le rire est fondamentalement un comportement social, pas une réaction au drôle." },
  { id: "ff-p010", type: "fact", emoji: "📱", category: "Psychologie", content: "La FOMO (Fear of Missing Out) déclenche les mêmes zones cérébrales que la douleur physique." },

  // ── Sciences & Tech ───────────────────────────────────────────
  { id: "ff-t001", type: "fact", emoji: "🖥️", category: "Tech & Science", content: "Le premier bug informatique de l'histoire était un vrai insecte : une mite coincée dans un relais d'ordinateur en 1947." },
  { id: "ff-t002", type: "fact", emoji: "🌐", category: "Tech & Science", content: "Si Internet était une ville, elle serait la plus grande bibliothèque jamais construite — mais personne n'a de plan d'ensemble." },
  { id: "ff-t003", type: "fact", emoji: "⚡", category: "Tech & Science", content: "Un éclair contient assez d'énergie pour griller 100 000 tranches de pain — mais dure trop peu pour être capturable." },
  { id: "ff-t004", type: "fact", emoji: "🔬", category: "Tech & Science", content: "Il y a plus de molécules dans un verre d'eau que de verres d'eau dans tous les océans du monde." },
  { id: "ff-t005", type: "fact", emoji: "🧊", category: "Tech & Science", content: "L'eau chaude gèle parfois plus vite que l'eau froide. Ce phénomène s'appelle l'effet Mpemba, et on ne sait pas encore tout à fait pourquoi." },
  { id: "ff-t006", type: "fact", emoji: "🔊", category: "Tech & Science", content: "Dans l'espace, personne ne peut t'entendre crier — il n'y a pas d'air pour propager les ondes sonores." },
  { id: "ff-t007", type: "fact", emoji: "🌡️", category: "Tech & Science", content: "La température la plus basse théoriquement possible est -273,15°C (zéro absolu). Aucune particule ne bouge à cette température." },
  { id: "ff-t008", type: "fact", emoji: "🔴", category: "Tech & Science", content: "Les lasers ne se croisent pas dans le vide. Deux rayons laser qui se croisent ne se 'voient' pas." },
  { id: "ff-t009", type: "fact", emoji: "🍄", category: "Tech & Science", content: "Le plus grand organisme vivant sur Terre est un champignon en Oregon (Armillaria ostoyae) — il fait 9 km²." },
  { id: "ff-t010", type: "fact", emoji: "🌊", category: "Tech & Science", content: "On a cartographié 100% de la surface de Mars, mais seulement 20% des fonds marins terrestres." },

  // ── Absurde & Insolite ───────────────────────────────────────
  { id: "ff-ab01", type: "fact", emoji: "😲", category: "Insolite", content: "La Grande Muraille de Chine ne se voit pas de l'espace à l'œil nu — c'est un mythe. Elle est trop étroite (~6m)." },
  { id: "ff-ab02", type: "fact", emoji: "🏳️", category: "Insolite", content: "Il existe une guerre qui a duré 38 minutes (guerre anglo-zanzibarienne de 1896). C'est la guerre la plus courte de l'histoire." },
  { id: "ff-ab03", type: "fact", emoji: "🐔", category: "Insolite", content: "Il y a plus de poulets que d'humains sur Terre — environ 30 milliards contre 8 milliards." },
  { id: "ff-ab04", type: "fact", emoji: "🎲", category: "Insolite", content: "La probabilité d'être tué par un distributeur automatique est plus élevée que d'être tué par un requin." },
  { id: "ff-ab05", type: "fact", emoji: "📏", category: "Insolite", content: "Une feuille A4 pliée 42 fois atteindrait théoriquement la Lune. (On ne peut physiquement plier qu'environ 8 fois.)" },
  { id: "ff-ab06", type: "fact", emoji: "🌍", category: "Insolite", content: "La France a des terres dans 11 fuseaux horaires différents — c'est le pays avec le plus de fuseaux au monde." },
  { id: "ff-ab07", type: "fact", emoji: "🍕", category: "Insolite", content: "Le ketchup était vendu comme médicament aux États-Unis dans les années 1830, pour traiter diarrhée et foie." },
  { id: "ff-ab08", type: "fact", emoji: "🦷", category: "Insolite", content: "Avant la brosse à dents, les Romains se nettoyaient les dents avec de l'urine — l'ammoniac blanchit les dents." },
  { id: "ff-ab09", type: "fact", emoji: "📺", category: "Insolite", content: "Le premier aliment cuit au micro-ondes par accident était du pop-corn. Puis un œuf — qui a explosé." },
  { id: "ff-ab10", type: "fact", emoji: "💈", category: "Insolite", content: "Les chirurgiens se lavaient les mains avant d'opérer à cause d'un docteur autrichien (Semmelweis) moqué par ses pairs — qui est mort d'une infection." },

  // ═══════════════════════════════════════════════════════════════
  // DÉBATS — Questions clivantes
  // ═══════════════════════════════════════════════════════════════

  // ── Food Debates ─────────────────────────────────────────────
  { id: "db-f001", type: "debate", emoji: "🍍", category: "Food", content: "L'ananas a-t-il sa place sur une pizza ? Défendez votre camp. Le groupe vote — la minorité boit.", debateSip: "La minorité boit 2🍺" },
  { id: "db-f002", type: "debate", emoji: "🍔", category: "Food", content: "Ketchup dans le frigo ou dans le placard ? Argumentez. Vote du groupe.", debateSip: "La minorité boit 1🍺" },
  { id: "db-f003", type: "debate", emoji: "🥚", category: "Food", content: "Les œufs brouillés : avec ou sans lait ? Le groupe vote pour le meilleur camp.", debateSip: "La minorité boit 1🍺" },
  { id: "db-f004", type: "debate", emoji: "🍝", category: "Food", content: "Mettre du beurre dans les pâtes après cuisson : génie culinaire ou hérésie italienne ?", debateSip: "La minorité boit 1🍺" },
  { id: "db-f005", type: "debate", emoji: "🥐", category: "Food", content: "Croissant beurre ou croissant ordinaire : est-ce vraiment si différent ? Débat animé.", debateSip: "La minorité boit 1🍺" },
  { id: "db-f006", type: "debate", emoji: "🍫", category: "Food", content: "Chocolat noir, au lait ou blanc : lequel mérite vraiment l'appellation 'chocolat' ?", debateSip: "La minorité boit 1🍺" },
  { id: "db-f007", type: "debate", emoji: "🍕", category: "Food", content: "Croûte de pizza : on la mange ou on la laisse ? Le groupe tranche.", debateSip: "Ceux qui la laissent boivent 1🍺" },
  { id: "db-f008", type: "debate", emoji: "🥗", category: "Food", content: "Une salade césar avec des anchois est-elle meilleure ou immangeable ? Vote collectif.", debateSip: "La minorité boit 1🍺" },
  { id: "db-f009", type: "debate", emoji: "🧀", category: "Food", content: "Fromage chaud (fondu) vs fromage froid : quel camp êtes-vous ?", debateSip: "La minorité boit 1🍺" },
  { id: "db-f010", type: "debate", emoji: "🍜", category: "Food", content: "Manger des spaghettis à la bolognaise avec une fourchette ou une cuillère en plus ? Le groupe vote.", debateSip: "La minorité boit 1🍺" },

  // ── Lifestyle ────────────────────────────────────────────────
  { id: "db-l001", type: "debate", emoji: "🐱", category: "Lifestyle", content: "Chat ou chien : lequel est le meilleur compagnon ? Défense orale, vote du groupe.", debateSip: "La minorité boit 2🍺" },
  { id: "db-l002", type: "debate", emoji: "🌊", category: "Lifestyle", content: "Vacances à la mer ou à la montagne ? Chacun défend son camp.", debateSip: "La minorité boit 1🍺" },
  { id: "db-l003", type: "debate", emoji: "🌙", category: "Lifestyle", content: "Es-tu plutôt lève-tôt (matin productif) ou noctambule (créatif la nuit) ? Débat sur qui a raison.", debateSip: "La minorité boit 1🍺" },
  { id: "db-l004", type: "debate", emoji: "🏙️", category: "Lifestyle", content: "Ville ou campagne : où vaut-il mieux vivre ? Arguments, contre-arguments, vote.", debateSip: "La minorité boit 2🍺" },
  { id: "db-l005", type: "debate", emoji: "📱", category: "Lifestyle", content: "iOS ou Android : qui est vraiment supérieur ? Débat de nerds. Vote final.", debateSip: "La minorité boit 1🍺" },
  { id: "db-l006", type: "debate", emoji: "🎬", category: "Lifestyle", content: "Film au cinéma ou série à la maison : quelle expérience préférez-vous ?", debateSip: "La minorité boit 1🍺" },
  { id: "db-l007", type: "debate", emoji: "📚", category: "Lifestyle", content: "Livre physique ou liseuse numérique : lequel est vraiment supérieur ?", debateSip: "La minorité boit 1🍺" },
  { id: "db-l008", type: "debate", emoji: "🚗", category: "Lifestyle", content: "Voiture électrique vs thermique : es-tu vraiment convaincu(e) que l'électrique est l'avenir ?", debateSip: "La minorité boit 2🍺" },
  { id: "db-l009", type: "debate", emoji: "🧹", category: "Lifestyle", content: "Qui doit faire le ménage dans une coloc/couple : à parts égales ou selon les revenus ? Tranchez.", debateSip: "Décidez en groupe qui boit 2🍺" },
  { id: "db-l010", type: "debate", emoji: "🎵", category: "Lifestyle", content: "Music en public dans les transports sans casque : tolérable ou intolérable ? Vote du groupe.", debateSip: "La minorité boit 1🍺" },

  // ── Société ──────────────────────────────────────────────────
  { id: "db-s001", type: "debate", emoji: "🪑", category: "Société", content: "Faut-il céder sa place assise dans les transports à quelqu'un de plus âgé si vous n'en avez pas envie ?", debateSip: "La minorité boit 2🍺" },
  { id: "db-s002", type: "debate", emoji: "💸", category: "Société", content: "Premier rendez-vous amoureux : qui doit payer ? Chacun défend sa position.", debateSip: "La minorité boit 2🍺" },
  { id: "db-s003", type: "debate", emoji: "📲", category: "Société", content: "Répondre à des messages au travail après 18h : est-ce normal ou une violation de la vie privée ?", debateSip: "La minorité boit 1🍺" },
  { id: "db-s004", type: "debate", emoji: "🤝", category: "Société", content: "Est-ce qu'on doit donner de l'argent aux personnes sans-abri ? Chacun développe son point de vue.", debateSip: "Vote du groupe, la minorité boit 2🍺" },
  { id: "db-s005", type: "debate", emoji: "🌡️", category: "Société", content: "La climatisation dans les bureaux : trop froide l'été ? Qui règle et à quelle température ?", debateSip: "La minorité boit 1🍺" },
  { id: "db-s006", type: "debate", emoji: "🎂", category: "Société", content: "Les gâteaux d'anniversaire du boulot : obligation sociale épuisante ou belle attention ?", debateSip: "La minorité boit 1🍺" },
  { id: "db-s007", type: "debate", emoji: "⏰", category: "Société", content: "Arriver en avance ou à l'heure pile : lequel est le plus respectueux ?", debateSip: "La minorité boit 1🍺" },
  { id: "db-s008", type: "debate", emoji: "🍾", category: "Société", content: "Déboucher le champagne avec un bruit fort ou discrètement : quelle est la vraie élégance ?", debateSip: "Vote du groupe, la minorité boit... du champagne 🍾" },
  { id: "db-s009", type: "debate", emoji: "🏃", category: "Société", content: "Courir pour prendre l'ascenseur ou les escaliers : lequel est plus respectable ?", debateSip: "La minorité boit 1🍺" },
  { id: "db-s010", type: "debate", emoji: "🤳", category: "Société", content: "Poster chaque repas sur les réseaux : liberté personnelle ou comportement agaçant ?", debateSip: "La minorité boit 1🍺" },

  // ── Pop Culture ──────────────────────────────────────────────
  { id: "db-pc01", type: "debate", emoji: "🦸", category: "Pop Culture", content: "Marvel ou DC : qui a les meilleurs personnages ? Débat de geeks.", debateSip: "La minorité boit 2🍺" },
  { id: "db-pc02", type: "debate", emoji: "🎮", category: "Pop Culture", content: "Les jeux vidéo peuvent-ils être considérés comme un art au même titre que le cinéma ? Arguments.", debateSip: "La minorité boit 1🍺" },
  { id: "db-pc03", type: "debate", emoji: "📺", category: "Pop Culture", content: "Game of Thrones : la saison 8 est-elle vraiment si nulle ou les attentes étaient trop hautes ?", debateSip: "La minorité boit 2🍺" },
  { id: "db-pc04", type: "debate", emoji: "🎵", category: "Pop Culture", content: "La musique d'aujourd'hui est-elle moins bonne qu'avant, ou c'est la nostalgie qui parle ?", debateSip: "La minorité boit 1🍺" },
  { id: "db-pc05", type: "debate", emoji: "🌟", category: "Pop Culture", content: "Les influenceurs sont-ils un vrai métier qui mérite le respect ou une illusion ?", debateSip: "La minorité boit 2🍺" },
  { id: "db-pc06", type: "debate", emoji: "🤖", category: "Pop Culture", content: "L'IA va-t-elle remplacer les artistes (musiciens, peintres, écrivains) ? Défendez votre position.", debateSip: "La minorité boit 2🍺" },
  { id: "db-pc07", type: "debate", emoji: "🎬", category: "Pop Culture", content: "Les remakes de films classiques : utiles pour une nouvelle génération ou sacrilège ?", debateSip: "La minorité boit 1🍺" },
  { id: "db-pc08", type: "debate", emoji: "📖", category: "Pop Culture", content: "Le livre est-il toujours meilleur que son adaptation cinématographique ? Exemples à l'appui.", debateSip: "La minorité boit 1🍺" },
  { id: "db-pc09", type: "debate", emoji: "🎤", category: "Pop Culture", content: "Le rap est-il aussi artistiquement valide que la chanson française traditionnelle ?", debateSip: "La minorité boit 1🍺" },
  { id: "db-pc10", type: "debate", emoji: "🏆", category: "Pop Culture", content: "GOAT du foot : Messi ou Ronaldo ? Discussion de 2 minutes, vote final.", debateSip: "La minorité boit 3🍺" },

  // ═══════════════════════════════════════════════════════════════
  // FUN FACTS SUPPLÉMENTAIRES
  // ═══════════════════════════════════════════════════════════════

  // ── Animaux (suite) ────────────────────────────────────────────
  { id: "ff-a016", type: "fact", emoji: "🦅", category: "Animaux", content: "Les aigles ont une vision 4 à 8 fois plus précise que les humains et peuvent repérer un lapin à 3 km de distance." },
  { id: "ff-a017", type: "fact", emoji: "🐊", category: "Animaux", content: "Les crocodiles ne peuvent pas tirer leur langue. Elle est attachée à leur mâchoire inférieure." },
  { id: "ff-a018", type: "fact", emoji: "🦓", category: "Animaux", content: "Les zèbres sont en réalité des animaux à fourrure noire avec des rayures blanches — pas l'inverse." },
  { id: "ff-a019", type: "fact", emoji: "🐳", category: "Animaux", content: "La baleine bleue est l'animal le plus grand jamais connu. Son cœur est si gros qu'un humain pourrait y ramper." },
  { id: "ff-a020", type: "fact", emoji: "🦥", category: "Animaux", content: "Les paresseux mettent jusqu'à 30 jours pour digérer un seul repas. Ils descendent de leur arbre une fois par semaine pour déféquer." },
  { id: "ff-a021", type: "fact", emoji: "🐦", category: "Animaux", content: "Les perroquets gris d'Afrique peuvent résoudre des puzzles aussi bien que des enfants de 5 ans. Ils comprennent le concept 'zéro'." },
  { id: "ff-a022", type: "fact", emoji: "🐬", category: "Animaux", content: "Les dauphins dorment en laissant un demi-cerveau éveillé pour respirer et surveiller les prédateurs." },
  { id: "ff-a023", type: "fact", emoji: "🦠", category: "Animaux", content: "Les poulpes peuvent faire passer leur corps à travers n'importe quelle ouverture plus grande que leur bec — le seul os qu'ils possèdent." },
  { id: "ff-a024", type: "fact", emoji: "🐻", category: "Animaux", content: "Les ours polaires ont la peau noire (pour absorber la chaleur) et les poils transparents. La fourrure blanche est une illusion optique." },
  { id: "ff-a025", type: "fact", emoji: "🦋", category: "Animaux", content: "Pendant sa chrysalide, la chenille se liquéfie presque complètement — ses tissus se dissolvent avant de se réorganiser en papillon." },
  { id: "ff-a026", type: "fact", emoji: "🐭", category: "Animaux", content: "Les rats rient quand on les chatouille — leurs chatouilles sont ultrasoniques, inaudibles pour les humains." },
  { id: "ff-a027", type: "fact", emoji: "🦑", category: "Animaux", content: "Les calmars géants ont les plus grands yeux du règne animal — jusqu'à 30 cm de diamètre, soit la taille d'une assiette." },
  { id: "ff-a028", type: "fact", emoji: "🐢", category: "Animaux", content: "Les tortues peuvent vivre sans manger pendant un an. Certaines espèces vivent plus de 150 ans." },

  // ── Espace (suite) ────────────────────────────────────────────
  { id: "ff-s011", type: "fact", emoji: "🌍", category: "Espace", content: "La Terre tourne à environ 1 670 km/h sur elle-même. Tu voyages à cette vitesse en ce moment même sans le sentir." },
  { id: "ff-s012", type: "fact", emoji: "🪨", category: "Espace", content: "Chaque jour, environ 40 à 100 tonnes de matière extraterrestre (météorites, poussière) tombent sur la Terre." },
  { id: "ff-s013", type: "fact", emoji: "🌑", category: "Espace", content: "La Lune s'éloigne de la Terre d'environ 3,8 cm par an. Dans des milliards d'années, les éclipses totales ne seront plus possibles." },
  { id: "ff-s014", type: "fact", emoji: "🔭", category: "Espace", content: "Si tu pleurais dans l'espace, tes larmes ne tomberaient pas — elles formeraient une bulle de liquide autour de ton œil." },
  { id: "ff-s015", type: "fact", emoji: "🌞", category: "Espace", content: "Il faudrait 1,3 million de Terres pour remplir le volume du Soleil. Et le Soleil est une étoile de taille moyenne." },
  { id: "ff-s016", type: "fact", emoji: "💥", category: "Espace", content: "Quand deux galaxies entrent en collision, presque aucune étoile ne se heurte car l'espace entre elles est immense." },
  { id: "ff-s017", type: "fact", emoji: "🌏", category: "Espace", content: "La ISS orbite à 400 km de hauteur mais voyage si vite (28 000 km/h) que ses astronautes voient 16 levers de soleil par jour." },
  { id: "ff-s018", type: "fact", emoji: "⚫", category: "Espace", content: "Au bord d'un trou noir, le temps ralentit. Quelqu'un qui y reste quelques heures peut voir des années s'écouler dehors." },
  { id: "ff-s019", type: "fact", emoji: "🧊", category: "Espace", content: "Il neige en métal sur Vénus. À haute altitude, des nuages de plomb et bismuth se condensent et 'précipitent' sur les montagnes." },
  { id: "ff-s020", type: "fact", emoji: "🎵", category: "Espace", content: "La NASA a détecté des 'sons' dans l'espace via des ondes de pression dans des nuages de gaz. Le trou noir de Perseus 'émet' la note Si bémol, 57 octaves sous le Do central." },

  // ── Corps humain (suite) ───────────────────────────────────────
  { id: "ff-h011", type: "fact", emoji: "🫁", category: "Corps humain", content: "Dépliés, tes poumons auraient une surface d'environ 70 m² — soit la taille d'un appartement." },
  { id: "ff-h012", type: "fact", emoji: "🧠", category: "Corps humain", content: "Le cerveau est actif toute la nuit pendant le sommeil. Il en profite pour 'nettoyer' ses déchets métaboliques, dont des protéines liées à Alzheimer." },
  { id: "ff-h013", type: "fact", emoji: "🫀", category: "Corps humain", content: "Un cœur humain peut continuer à battre même séparé du corps s'il est correctement alimenté en oxygène — c'est ce que les chirurgiens font lors des transplantations." },
  { id: "ff-h014", type: "fact", emoji: "👃", category: "Corps humain", content: "L'humain peut distinguer environ 1 billion d'odeurs différentes — bien plus que les 10 millions de couleurs." },
  { id: "ff-h015", type: "fact", emoji: "💅", category: "Corps humain", content: "Les ongles de la main dominante poussent plus vite. Et les ongles poussent plus vite en été qu'en hiver." },
  { id: "ff-h016", type: "fact", emoji: "🦷", category: "Corps humain", content: "L'émail des dents est la substance la plus dure produite par le corps humain — plus dure que l'acier à poids équivalent." },
  { id: "ff-h017", type: "fact", emoji: "😱", category: "Corps humain", content: "La chair de poule est un réflexe hérité de nos ancêtres poilus — les poils dressés les faisaient paraître plus grands face aux prédateurs." },
  { id: "ff-h018", type: "fact", emoji: "🫦", category: "Corps humain", content: "Le sarcasme est traité par une zone différente du cerveau que l'humour normal — et les personnes qui ont des lésions dans cette zone ne comprennent plus le sarcasme." },
  { id: "ff-h019", type: "fact", emoji: "🤧", category: "Corps humain", content: "L'éternuement projette des gouttelettes à environ 160 km/h. Fermer les yeux pendant un éternuement est un réflexe involontaire." },
  { id: "ff-h020", type: "fact", emoji: "🌡️", category: "Corps humain", content: "La température normale du corps n'est pas exactement 37°C : elle varie selon l'heure (plus basse le matin), l'âge, et l'activité." },

  // ── Histoire insolite (suite) ──────────────────────────────────
  { id: "ff-i011", type: "fact", emoji: "🏰", category: "Histoire", content: "Le Château de Windsor est la plus ancienne et la plus grande résidence royale habitée du monde — les rois y vivent depuis 900 ans." },
  { id: "ff-i012", type: "fact", emoji: "⚡", category: "Histoire", content: "Benjamin Franklin n'a jamais breveté son paratonnerre, souhaitant en faire bénéficier le monde entier gratuitement." },
  { id: "ff-i013", type: "fact", emoji: "🗽", category: "Histoire", content: "La Statue de la Liberté est un cadeau de la France aux États-Unis en 1886, conçu par le sculpteur Bartholdi et dont la structure intérieure est de Gustave Eiffel." },
  { id: "ff-i014", type: "fact", emoji: "🎯", category: "Histoire", content: "Napoléon Bonaparte mesurait environ 1m69 — dans la moyenne de l'époque. La légende de sa petite taille vient d'une confusion entre les mesures françaises et anglaises." },
  { id: "ff-i015", type: "fact", emoji: "🎸", category: "Histoire", content: "Le rock'n'roll a été interdit dans plusieurs pays dans les années 50, considéré comme 'immoral' et 'dangereux' pour la jeunesse." },
  { id: "ff-i016", type: "fact", emoji: "🍺", category: "Histoire", content: "Les ouvriers qui ont construit les pyramides égyptiennes recevaient de la bière comme salaire — environ 4 à 5 litres par jour." },
  { id: "ff-i017", type: "fact", emoji: "🚀", category: "Histoire", content: "La NASA a envoyé un disque d'or dans l'espace (Voyager 1) avec des sons et images de la Terre — au cas où des extraterrestres le trouveraient." },
  { id: "ff-i018", type: "fact", emoji: "🎭", category: "Histoire", content: "Shakespeare a inventé plus de 1 700 mots encore utilisés aujourd'hui : bedroom, lonely, generous, obscene, swagger..." },
  { id: "ff-i019", type: "fact", emoji: "🏊", category: "Histoire", content: "Les anciens Romains utilisaient du garum (sauce de poisson fermenté) comme condiment universel, équivalent du ketchup moderne — mais à base d'intestins de poisson." },
  { id: "ff-i020", type: "fact", emoji: "📜", category: "Histoire", content: "La Bible est le livre le plus vendu de tous les temps avec environ 5 milliards d'exemplaires — suivie de 'Don Quichotte' et du 'Petit Prince'." },

  // ── Psychologie (suite) ───────────────────────────────────────
  { id: "ff-p011", type: "fact", emoji: "👁️", category: "Psychologie", content: "L'effet Mandela : des milliers de personnes partagent le même faux souvenir collectif. Exemple : beaucoup jurent que Nelson Mandela est mort en prison dans les années 80." },
  { id: "ff-p012", type: "fact", emoji: "🪄", category: "Psychologie", content: "Le biais de confirmation : le cerveau cherche activement des preuves qui confirment ce qu'il croit déjà, et ignore les informations contraires." },
  { id: "ff-p013", type: "fact", emoji: "💭", category: "Psychologie", content: "On pense en 'images' et en 'concepts' bien plus qu'en mots. Le langage intérieur n'est qu'une traduction de la pensée, pas la pensée elle-même." },
  { id: "ff-p014", type: "fact", emoji: "😰", category: "Psychologie", content: "La peur du clown (coulrophobie) est l'une des phobies les plus répandues. Elle vient du fait que le visage peint masque les émotions réelles." },
  { id: "ff-p015", type: "fact", emoji: "🤝", category: "Psychologie", content: "Les gens qui partagent des expériences intenses (peur, danger, sport extrême) ensemble développent des liens émotionnels beaucoup plus forts qu'en conditions normales." },
  { id: "ff-p016", type: "fact", emoji: "🎭", category: "Psychologie", content: "L'effet spotlight : on pense être bien plus remarqué par les autres qu'on ne l'est vraiment. Les gens sont trop centrés sur eux-mêmes pour vraiment t'observer." },
  { id: "ff-p017", type: "fact", emoji: "💸", category: "Psychologie", content: "La douleur de perdre 10€ est psychologiquement plus intense que le plaisir d'en gagner 10. C'est l'aversion à la perte (Kahneman, prix Nobel)." },
  { id: "ff-p018", type: "fact", emoji: "🧩", category: "Psychologie", content: "Résoudre un problème difficile juste avant de dormir peut mener à une solution le lendemain matin. Le cerveau continue de travailler pendant le sommeil." },
  { id: "ff-p019", type: "fact", emoji: "😍", category: "Psychologie", content: "Tomber amoureux libère les mêmes substances chimiques (dopamine, noradrénaline) que consommer de la cocaïne. Littéralement une addiction chimique." },
  { id: "ff-p020", type: "fact", emoji: "🎯", category: "Psychologie", content: "Le cerveau ne peut pas distinguer une expérience imaginée avec intensité d'un vrai souvenir. Les athlètes utilisent la visualisation mentale comme entraînement réel." },

  // ── Tech & Science (suite) ────────────────────────────────────
  { id: "ff-t011", type: "fact", emoji: "📡", category: "Tech & Science", content: "L'internet mondial pèse physiquement environ 50 grammes — c'est le poids des électrons en mouvement à l'intérieur de tous les câbles et serveurs." },
  { id: "ff-t012", type: "fact", emoji: "⚗️", category: "Tech & Science", content: "L'or est si malléable qu'on peut en faire une feuille si fine qu'elle est transparente. 30 grammes d'or peuvent être étirés en un fil de 80 km." },
  { id: "ff-t013", type: "fact", emoji: "🔥", category: "Tech & Science", content: "Le feu n'existe pas dans l'espace en apesanteur. Sans gravité, il forme une sphère parfaite et brûle différemment — sans flamme en forme de larme." },
  { id: "ff-t014", type: "fact", emoji: "💎", category: "Tech & Science", content: "Les diamants ne sont pas si rares. Ce sont les gemmes les plus communes — leur prix élevé est une construction marketing de DeBeers dans les années 1930." },
  { id: "ff-t015", type: "fact", emoji: "🌀", category: "Tech & Science", content: "L'eau dans un vortex tourne dans le sens des aiguilles d'une montre dans l'hémisphère sud et inversement dans le nord — à cause de la force de Coriolis." },
  { id: "ff-t016", type: "fact", emoji: "🧲", category: "Tech & Science", content: "Le Wi-Fi utilise les mêmes ondes électromagnétiques que ton four à micro-ondes — mais à une puissance 100 000 fois plus faible." },
  { id: "ff-t017", type: "fact", emoji: "🌊", category: "Tech & Science", content: "Les tsunamis peuvent traverser l'océan Pacifique (17 000 km) en moins de 24 heures, en voyageant à 800 km/h dans les eaux profondes." },
  { id: "ff-t018", type: "fact", emoji: "🦠", category: "Tech & Science", content: "Un seul gramme de sol fertile contient environ 1 milliard de bactéries, 1 million de champignons et 10 000 protistes." },
  { id: "ff-t019", type: "fact", emoji: "🌡️", category: "Tech & Science", content: "En laboratoire, on a créé la matière la plus froide de l'univers : un condensat de Bose-Einstein à -273,14999°C — plus froid que le fond de l'espace." },
  { id: "ff-t020", type: "fact", emoji: "🖨️", category: "Tech & Science", content: "Les imprimantes 3D peuvent aujourd'hui imprimer de la peau humaine pour des greffes, de la nourriture, des pièces d'avion, et même des organes fonctionnels." },

  // ── Insolite (suite) ─────────────────────────────────────────
  { id: "ff-ab11", type: "fact", emoji: "🎰", category: "Insolite", content: "Les casinos n'ont pas de fenêtres ni d'horloges — délibérément conçus pour que tu perdes la notion du temps." },
  { id: "ff-ab12", type: "fact", emoji: "🦷", category: "Insolite", content: "Le Tooth Fairy (fée des dents) americaine rapporterait en moyenne 5$ par dent aux enfants américains selon des statistiques annuelles." },
  { id: "ff-ab13", type: "fact", emoji: "🛒", category: "Insolite", content: "Le chariot de supermarché a été inventé en 1937. Le premier client à l'utiliser a refusé — il trouvait ça humiliant de pousser un chariot." },
  { id: "ff-ab14", type: "fact", emoji: "🐠", category: "Insolite", content: "Les Nemo (poissons clowns) sont tous nés mâles. Ce fait rend 'Le Monde de Nemo' beaucoup plus biologiquement compliqué." },
  { id: "ff-ab15", type: "fact", emoji: "🧤", category: "Insolite", content: "Le Velcro a été inventé par un Suisse en 1941 après avoir observé des graines de bardane accrochées à sa veste et à son chien." },
  { id: "ff-ab16", type: "fact", emoji: "🍌", category: "Insolite", content: "La banane que tu manges aujourd'hui n'est pas la même qu'il y a 60 ans. La Gros Michel, plus savoureuse, a disparu à cause d'un champignon." },
  { id: "ff-ab17", type: "fact", emoji: "📞", category: "Insolite", content: "Le premier message SMS envoyé était 'Merry Christmas' en décembre 1992. Son inventeur Neil Papworth n'avait pas de téléphone — il l'a envoyé depuis un ordinateur." },
  { id: "ff-ab18", type: "fact", emoji: "🎈", category: "Insolite", content: "Si tu cries dans l'espace depuis la surface d'une planète sans atmosphère, personne n'entend rien. Mais si tu cries dans une station spatiale, ça résonne dans les murs." },
  { id: "ff-ab19", type: "fact", emoji: "🦆", category: "Insolite", content: "Le canard de caoutchouc jaune est apparu en 1970 mais les canards en caoutchouc existent depuis 1800 comme jouet de bain victorien." },
  { id: "ff-ab20", type: "fact", emoji: "🍦", category: "Insolite", content: "La crème glacée a été inventée en Chine il y a 2000 ans — à base de lait de chèvre et de neige fraîche conservée dans des caves." },

  // ─────────────────────────────────────────────────────────────
  // DÉBATS SUPPLÉMENTAIRES
  // ─────────────────────────────────────────────────────────────

  // ── Food Débats (suite) ────────────────────────────────────────
  { id: "db-f011", type: "debate", emoji: "🌮", category: "Food", content: "Tacos : viande ou poisson ? Classique contre fusion. Chacun défend son camp.", debateSip: "La minorité boit 1🍺" },
  { id: "db-f012", type: "debate", emoji: "🫙", category: "Food", content: "Moutarde forte ou moutarde douce : laquelle est vraiment supérieure dans un hot-dog ? Vote collectif.", debateSip: "La minorité boit 1🍺" },
  { id: "db-f013", type: "debate", emoji: "🫗", category: "Food", content: "Le vin rosé : vrai vin adulte ou compromis pour ceux qui n'assument pas ? Débat.", debateSip: "Les défenseurs du rosé boivent 1🍺 (ou les opposants)" },
  { id: "db-f014", type: "debate", emoji: "🧇", category: "Food", content: "Pancakes vs gaufres : lequel mérite vraiment sa place dans le brunch ?", debateSip: "La minorité boit 1🍺" },
  { id: "db-f015", type: "debate", emoji: "🌶️", category: "Food", content: "La nourriture épicée : plaisir ou torture volontaire ? Défendez votre position.", debateSip: "Ceux qui disent torture boivent 1🍺 de honte" },
  { id: "db-f016", type: "debate", emoji: "🥩", category: "Food", content: "Steak bien cuit ou saignant : qui a le meilleur goût ? Débat de carnivores.", debateSip: "La minorité boit 2🍺" },
  { id: "db-f017", type: "debate", emoji: "🫐", category: "Food", content: "Les smoothies aux fruits : alimentation saine ou bombe à sucre déguisée ? Vote du groupe.", debateSip: "La minorité boit 1🍺" },
  { id: "db-f018", type: "debate", emoji: "☕", category: "Food", content: "Café noir ou café avec lait : qui est le vrai amateur de café ?", debateSip: "Ceux qui prennent du lait boivent 1🍺 selon les puristes" },
  { id: "db-f019", type: "debate", emoji: "🥓", category: "Food", content: "Bacon dans une salade : crime culinaire ou génie absolu ? Défendez-vous.", debateSip: "La minorité boit 1🍺" },
  { id: "db-f020", type: "debate", emoji: "🧊", category: "Food", content: "Glace pilée ou glaçons classiques dans un verre : lequel est vraiment meilleur ?", debateSip: "La minorité boit 1🍺" },

  // ── Lifestyle Débats (suite) ──────────────────────────────────
  { id: "db-l011", type: "debate", emoji: "💤", category: "Lifestyle", content: "Sieste de l'après-midi : signe de paresse ou habitude des gens intelligents ? Débat.", debateSip: "La minorité boit 1🍺" },
  { id: "db-l012", type: "debate", emoji: "🎒", category: "Lifestyle", content: "Vacances organisées ou voyages improvisés : quelle approche donne les meilleurs souvenirs ?", debateSip: "La minorité boit 2🍺" },
  { id: "db-l013", type: "debate", emoji: "👟", category: "Lifestyle", content: "Porter des chaussures de sport avec une tenue habillée : look tendance ou faute de goût ?", debateSip: "La minorité boit 1🍺" },
  { id: "db-l014", type: "debate", emoji: "🎧", category: "Lifestyle", content: "Musique en fond quand tu travailles : aide à la concentration ou distraction déguisée ?", debateSip: "La minorité boit 1🍺" },
  { id: "db-l015", type: "debate", emoji: "📷", category: "Lifestyle", content: "Prendre des photos de partout en vacances : garder des souvenirs ou rater le présent ?", debateSip: "La minorité boit 2🍺" },
  { id: "db-l016", type: "debate", emoji: "🛁", category: "Lifestyle", content: "Bain ou douche : lequel est vraiment plus propre et agréable ? Arguments des deux camps.", debateSip: "La minorité boit 1🍺" },
  { id: "db-l017", type: "debate", emoji: "🌱", category: "Lifestyle", content: "Végétarisme ou non : est-ce vraiment indispensable pour être écolo ? Débat sans tabou.", debateSip: "La minorité boit 2🍺" },
  { id: "db-l018", type: "debate", emoji: "🏃", category: "Lifestyle", content: "Sport en salle vs sport en plein air : lequel est vraiment plus efficace ?", debateSip: "La minorité boit 1🍺" },
  { id: "db-l019", type: "debate", emoji: "🛏️", category: "Lifestyle", content: "Faire son lit tous les matins : discipline personnelle utile ou perte de temps totale ?", debateSip: "La minorité boit 1🍺" },
  { id: "db-l020", type: "debate", emoji: "🌍", category: "Lifestyle", content: "Billet d'avion low-cost vs train : lequel est vraiment meilleur (confort + écologie) ?", debateSip: "La minorité boit 2🍺" },

  // ── Société Débats (suite) ────────────────────────────────────
  { id: "db-s011", type: "debate", emoji: "📱", category: "Société", content: "Les téléphones dans les écoles : interdits totalement ou liberté encadrée ? Débat.", debateSip: "La minorité boit 2🍺" },
  { id: "db-s012", type: "debate", emoji: "💰", category: "Société", content: "Donner des étrennes ou pas : tradition utile ou pression sociale inutile ?", debateSip: "La minorité boit 1🍺" },
  { id: "db-s013", type: "debate", emoji: "🎓", category: "Société", content: "Les études supérieures sont-elles indispensables pour réussir aujourd'hui ? Arguments.", debateSip: "La minorité boit 2🍺" },
  { id: "db-s014", type: "debate", emoji: "🤖", category: "Société", content: "Serait-on plus heureux sans réseaux sociaux ? Débat sur la dépendance numérique.", debateSip: "La minorité boit 2🍺" },
  { id: "db-s015", type: "debate", emoji: "🏠", category: "Société", content: "Acheter ou louer son logement : lequel est vraiment le choix le plus malin financièrement ?", debateSip: "La minorité boit 2🍺" },
  { id: "db-s016", type: "debate", emoji: "🎂", category: "Société", content: "Fêter son anniversaire : plaisir sincère ou obligation sociale stressante ?", debateSip: "La minorité boit 1🍺" },
  { id: "db-s017", type: "debate", emoji: "🧑‍💻", category: "Société", content: "Télétravail vs bureau : lequel rend vraiment les gens plus productifs et heureux ?", debateSip: "La minorité boit 2🍺" },
  { id: "db-s018", type: "debate", emoji: "🌿", category: "Société", content: "La croissance économique peut-elle être compatible avec la transition écologique ? Débat.", debateSip: "La minorité boit 2🍺" },
  { id: "db-s019", type: "debate", emoji: "🎪", category: "Société", content: "Les festivals de musique : expérience culturelle authentique ou événement commercial déguisé ?", debateSip: "La minorité boit 1🍺" },
  { id: "db-s020", type: "debate", emoji: "💬", category: "Société", content: "Est-ce qu'on parle trop d'argent ou pas assez entre amis ? La transparence financière est-elle saine ?", debateSip: "Vote du groupe, la minorité boit 1🍺" },

  // ── Pop Culture Débats (suite) ────────────────────────────────
  { id: "db-pc11", type: "debate", emoji: "🎬", category: "Pop Culture", content: "Scorsese vs Tarantino : qui est le plus grand réalisateur vivant ? Défendez votre position.", debateSip: "La minorité boit 2🍺" },
  { id: "db-pc12", type: "debate", emoji: "🎵", category: "Pop Culture", content: "Spotify vs Apple Music : lequel est vraiment supérieur pour l'expérience musicale ?", debateSip: "La minorité boit 1🍺" },
  { id: "db-pc13", type: "debate", emoji: "🏋️", category: "Pop Culture", content: "Les influenceurs fitness donnent-ils de bons conseils ou propagent-ils des dommages corporels ?", debateSip: "La minorité boit 2🍺" },
  { id: "db-pc14", type: "debate", emoji: "🦸", category: "Pop Culture", content: "Les super-héros au cinéma : le genre le plus inventif du moment ou surexploité jusqu'à l'écœurement ?", debateSip: "La minorité boit 2🍺" },
  { id: "db-pc15", type: "debate", emoji: "📺", category: "Pop Culture", content: "Les émissions de téléréalité : miroir de la société ou abrutissement télévisé programmé ?", debateSip: "La minorité boit 1🍺" },
  { id: "db-pc16", type: "debate", emoji: "🎮", category: "Pop Culture", content: "FIFA vs PES/eFootball : lequel mérite réellement l'argent de ses joueurs ?", debateSip: "La minorité boit 1🍺" },
  { id: "db-pc17", type: "debate", emoji: "🎤", category: "Pop Culture", content: "Beyoncé ou Rihanna : qui a eu la meilleure carrière artistique globale ? Débat.", debateSip: "La minorité boit 2🍺" },
  { id: "db-pc18", type: "debate", emoji: "🧟", category: "Pop Culture", content: "Walking Dead vs The Last of Us : lequel a la meilleure narration de fin du monde ?", debateSip: "La minorité boit 1🍺" },
  { id: "db-pc19", type: "debate", emoji: "🎵", category: "Pop Culture", content: "Le festival Coachella est-il devenu trop commercial et a perdu son âme musicale ?", debateSip: "La minorité boit 1🍺" },
  { id: "db-pc20", type: "debate", emoji: "📱", category: "Pop Culture", content: "TikTok a-t-il rendu la musique pop meilleure (plus accessible) ou l'a-t-il appauvrie ?", debateSip: "La minorité boit 2🍺" },
];
