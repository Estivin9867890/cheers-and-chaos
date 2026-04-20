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
];
