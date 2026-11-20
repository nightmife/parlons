# Parlons — carte du projet

À lire avant toute modification.

## En bref

PWA pour iPhone (ajoutée à l'écran d'accueil depuis Safari) pour apprendre l'anglais, pensée pour plusieurs langues.
Méthode : explication en français → production tapée (jamais de QCM) → répétition espacée de tout ce qui est appris.

- Aucune dépendance, aucun build : HTML + CSS + modules ES natifs.
- Hébergement : GitHub Pages, dépôt `nightmife/parlons`, branche `main`, racine. URL : https://nightmife.github.io/parlons/
  Déployer : `git push origin main` (Pages reconstruit en 1 min environ).
- Données : `localStorage['parlons.v1']` sur l'appareil (export / import JSON dans les réglages).

## Commandes

```sh
npm test      # node --test tests/ : moteur (correction, SRS, séances, conjugaison) + cohérence de tout le contenu
npm start     # python3 -m http.server 8080
python3 tools/icons.py   # régénère les icônes (Pillow)
```

Après chaque modification d'un fichier servi : incrémenter `CACHE` dans `sw.js` (`parlons-vN`).
Ajouter tout nouveau fichier JS à la liste `CORE` de `sw.js`.

## Fichiers

| Fichier | Rôle |
|---|---|
| `js/check.js` | Correction générique : `expand` (variantes), `check(input, spec, norm, mode)`, `diffWords`, `speechScore` |
| `js/srs.js` | Répétition espacée (SM-2 à la journée) : `review(card, note, now)`, `isDue`, `stage`, `forecast` |
| `js/session.js` | File d'une séance : nouveautés (`new` → `learn`), échecs reposés, « j'avais bon » (`overrule`) |
| `js/tasks.js` | `resolve(course, id)` : identifiant de carte → exercice affichable avec sa fonction `check` |
| `js/speech.js` | Synthèse vocale, reconnaissance vocale (`webkitSpeechRecognition`), enregistrement (repli) |
| `js/courses.js` | Registre des langues |
| `js/app.js` | Interface : état, écrans, séances, parler, réglages |
| `js/en/index.js` | Le cours d'anglais (objet commun à toutes les langues, voir plus bas) |
| `js/en/norm.js` | Forme canonique d'une phrase : contractions, orthographe GB/US, chiffres |
| `js/en/verbs.js` | Irréguliers, réguliers, règles d'orthographe (-s, -ing, -ed) et `conjugate` |
| `js/en/vocab.js` | Thèmes de vocabulaire : `anglais ; français ; exemple [; remarque]` |
| `js/en/lessons_a.js`, `lessons_b.js` | Leçons A1–A2 et B1–B2 : corps en mini-format + exercices |
| `js/en/phrases.js` | Phrases de la vie courante (parler, écrire, dictée) |

## Identifiants de cartes (progression de l'élève)

`v:<thème.mot>`, `g:<leçon>:<n>`, `i:<verbe>`, `p:<groupe.n>` sont révisés (SRS).
`c:<verbe>:<temps>:<personne>:<aff|neg|int>` et `d:<p|v>:<id>` sont générés pour l'entraînement, hors révisions.

**Ne jamais renommer** un thème, le premier mot anglais d'une ligne de vocabulaire, une leçon ou un groupe de phrases,
et **n'ajouter des exercices / phrases qu'en fin de liste** : la position sert d'identifiant.

## Format des réponses

- `a|b` : deux réponses acceptées (la première est affichée) ; `[a/b]` : choix dans la phrase ; `(x)` ou `(a/b)` : facultatif.
- La casse, la ponctuation, les contractions (`doesn't` = `does not`, `it's` = `it is` ou `it has` + participe),
  les orthographes GB/US et les chiffres 0–20 sont équivalents (`norm.js`). Pas de contraction en fin de phrase (`Yes, I am`).
- Modes : `word` (vocabulaire, 1 faute tolérée dès 4 lettres, 2 dès 8, notée « difficile »), `exact` (trou, conjugaison),
  `sentence` (une faute de frappe sur un mot de 5 lettres ou plus, hors terminaison).

## Exercices de leçon

`['f', 'She ___ to work. (go)', 'goes', 'pourquoi']` trou (indice en fin entre parenthèses, la phrase complète est comparée),
`['t', 'phrase française', 'traduction', 'pourquoi']`, `['x', 'phrase fautive', 'correction', 'pourquoi']`,
`['r', 'consigne', 'phrase de départ', 'réponse', 'pourquoi']`.
Corps : `## titre`, `| tableau |` (en-tête si la 1re cellule est vide), `> piège`, `= anglais // français` (exemple avec bouton audio),
`- liste`, `**gras**`, `*anglais*`.

Le test `content.test.mjs` vérifie que chaque réponse attendue passe sa propre correction, qu'une phrase fautive (`x`)
est refusée, qu'aucune consigne française de vocabulaire n'est en double, etc.

## Ajouter une langue

Créer `js/<code>/index.js` exportant le même objet que `js/en/index.js` (`norm`, `normWord`, `themes`, `words`, `lessons`,
`phraseGroups`, `verbs` avec `conjugate`, `voices` : codes BCP 47 pour la synthèse), l'enregistrer dans `js/courses.js`,
ajouter ses fichiers à `sw.js`. L'état est déjà rangé par langue (`S.courses[code]`). Il manque seulement un sélecteur
de langue dans les réglages (`S.course`).

## État (`S`)

```js
{ v: 1, onboarded, course: 'en',
  settings: { level: 'A1'|'A2'|'B1'|'B2', newPerDay, maxReviews, rate, autoplay, accent: {en: 'en-US'}, voice: {en: uri}, method },
  courses: { en: { cards: { id: {due, ivl, ease, reps, lapses, last, n} }, lessons: { id: {done, ok, total, best} }, errors: [{id, given, t}] } },
  log: { 'AAAA-MM-JJ': { n, ok, nw (nouveaux mots), sec } } }
```

## Pièges connus

- iOS : la synthèse vocale et la reconnaissance ne démarrent que dans un geste de l'utilisateur (clic, touche Entrée).
  `focus()` aussi : on refocalise le champ de réponse dans le gestionnaire `submit`.
- La reconnaissance vocale iOS exige Siri / dictée activés ; en cas de refus l'écran « Parler » bascule sur l'enregistrement.
- Safari et l'app installée ont des stockages séparés : exporter / importer depuis l'app installée.
- Tests d'interface : Playwright Chromium (profil `devices['iPhone 14']`) dans le scratchpad, aucun navigateur sur la machine.
- `pkill -f "http.server 876[7]"` (crochets) pour ne pas tuer le shell qui lance la commande.
