// Verbes : liste des irréguliers, verbes réguliers pour l'entraînement, et moteur de conjugaison.
// Une forme « a/b » signifie deux formes correctes (la première est affichée).

// [base, prétérit, participe passé, sens, rang] — rang 1 : indispensable, 2 : courant, 3 : moins fréquent
const IRR = `be|was/were|been|être|1
beat|beat|beaten|battre|2
become|became|become|devenir|1
begin|began|begun|commencer|1
bend|bent|bent|plier, se pencher|3
bet|bet|bet|parier|2
bite|bit|bitten|mordre|2
bleed|bled|bled|saigner|3
blow|blew|blown|souffler|2
break|broke|broken|casser|1
bring|brought|brought|apporter|1
build|built|built|construire|1
burn|burned/burnt|burned/burnt|brûler|2
buy|bought|bought|acheter|1
catch|caught|caught|attraper|1
choose|chose|chosen|choisir|1
come|came|come|venir|1
cost|cost|cost|coûter|1
cut|cut|cut|couper|1
deal|dealt|dealt|s'occuper de, distribuer|2
dig|dug|dug|creuser|3
do|did|done|faire|1
draw|drew|drawn|dessiner|1
dream|dreamed/dreamt|dreamed/dreamt|rêver|2
drink|drank|drunk|boire|1
drive|drove|driven|conduire|1
eat|ate|eaten|manger|1
fall|fell|fallen|tomber|1
feed|fed|fed|nourrir|2
feel|felt|felt|ressentir, se sentir|1
fight|fought|fought|se battre|2
find|found|found|trouver|1
fly|flew|flown|voler (dans les airs), prendre l'avion|1
forbid|forbade|forbidden|interdire|3
forget|forgot|forgotten|oublier|1
forgive|forgave|forgiven|pardonner|2
freeze|froze|frozen|geler|2
get|got|got/gotten|obtenir, recevoir, devenir|1
give|gave|given|donner|1
go|went|gone|aller|1
grow|grew|grown|grandir, cultiver|1
hang|hung|hung|accrocher, suspendre|2
have|had|had|avoir|1
hear|heard|heard|entendre|1
hide|hid|hidden|cacher|2
hit|hit|hit|frapper, heurter|1
hold|held|held|tenir|1
hurt|hurt|hurt|blesser, faire mal|1
keep|kept|kept|garder|1
know|knew|known|savoir, connaître|1
lay|laid|laid|poser à plat, mettre (la table)|3
lead|led|led|mener, diriger|2
learn|learned/learnt|learned/learnt|apprendre|1
leave|left|left|partir, quitter, laisser|1
lend|lent|lent|prêter|2
let|let|let|laisser, permettre|1
lie|lay|lain|être allongé|3
light|lit/lighted|lit/lighted|allumer|3
lose|lost|lost|perdre|1
make|made|made|fabriquer, faire|1
mean|meant|meant|signifier, vouloir dire|1
meet|met|met|rencontrer|1
pay|paid|paid|payer|1
put|put|put|mettre, poser|1
quit|quit|quit|arrêter, démissionner|2
read|read|read|lire|1
ride|rode|ridden|faire du vélo, monter à cheval|2
ring|rang|rung|sonner|2
rise|rose|risen|s'élever, augmenter|2
run|ran|run|courir|1
say|said|said|dire|1
see|saw|seen|voir|1
seek|sought|sought|chercher|3
sell|sold|sold|vendre|1
send|sent|sent|envoyer|1
set|set|set|régler, fixer|2
shake|shook|shaken|secouer|2
shine|shone|shone|briller|3
shoot|shot|shot|tirer (avec une arme), tourner (un film)|2
show|showed|shown/showed|montrer|1
shut|shut|shut|fermer|2
sing|sang|sung|chanter|1
sink|sank|sunk|couler, sombrer|3
sit|sat|sat|s'asseoir, être assis|1
sleep|slept|slept|dormir|1
slide|slid|slid|glisser|3
speak|spoke|spoken|parler|1
spell|spelled/spelt|spelled/spelt|épeler|2
spend|spent|spent|dépenser, passer (du temps)|1
split|split|split|diviser, partager|3
spread|spread|spread|répandre, étaler|3
stand|stood|stood|être debout, supporter|1
steal|stole|stolen|voler (dérober)|2
stick|stuck|stuck|coller, rester coincé|2
sting|stung|stung|piquer|3
strike|struck|struck|frapper, faire grève|3
swear|swore|sworn|jurer|3
sweep|swept|swept|balayer|3
swim|swam|swum|nager|1
swing|swung|swung|se balancer|3
take|took|taken|prendre|1
teach|taught|taught|enseigner|1
tear|tore|torn|déchirer|3
tell|told|told|dire, raconter|1
think|thought|thought|penser|1
throw|threw|thrown|lancer, jeter|1
understand|understood|understood|comprendre|1
wake|woke|woken|se réveiller|1
wear|wore|worn|porter (un vêtement)|1
win|won|won|gagner|1
write|wrote|written|écrire|1
arise|arose|arisen|survenir|3
bear|bore|born/borne|supporter, porter|3
bind|bound|bound|lier, relier|3
breed|bred|bred|élever (des animaux)|3
broadcast|broadcast|broadcast|diffuser|3
cling|clung|clung|s'accrocher|3
creep|crept|crept|ramper, avancer sans bruit|3
flee|fled|fled|fuir|3
forecast|forecast|forecast|prévoir (météo)|3
grind|ground|ground|moudre|3
kneel|knelt/kneeled|knelt/kneeled|s'agenouiller|3
leap|leapt/leaped|leapt/leaped|bondir|3
mistake|mistook|mistaken|confondre, se méprendre sur|3
overcome|overcame|overcome|surmonter|3
prove|proved|proven/proved|prouver|2
sew|sewed|sewn/sewed|coudre|3
shrink|shrank|shrunk|rétrécir|3
smell|smelled/smelt|smelled/smelt|sentir (une odeur)|2
spill|spilled/spilt|spilled/spilt|renverser (un liquide)|3
spin|spun|spun|tourner sur soi-même|3
undertake|undertook|undertaken|entreprendre|3
upset|upset|upset|contrarier|3
weep|wept|wept|pleurer|3
wind|wound|wound|remonter, enrouler|3
withdraw|withdrew|withdrawn|retirer|3`;

export const IRREGULAR = IRR.split('\n').map((l) => {
  const [base, past, pp, fr, rank] = l.split('|');
  return { id: base, base, past, pp, fr, rank: Number(rank) };
});
export const IRREGULAR_BY_ID = Object.fromEntries(IRREGULAR.map((v) => [v.id, v]));

// Verbes réguliers courants pour l'entraînement à la conjugaison.
const REG = `work|travailler
play|jouer
watch|regarder
listen|écouter
want|vouloir
like|aimer bien
love|adorer
live|habiter, vivre
study|étudier
try|essayer
stop|arrêter
plan|prévoir, planifier
visit|rendre visite, visiter
help|aider
call|appeler
ask|demander
answer|répondre
open|ouvrir
close|fermer
cook|cuisiner
clean|nettoyer
wash|laver
walk|marcher
talk|parler, discuter
start|commencer
finish|finir
need|avoir besoin de
use|utiliser
arrive|arriver
move|déménager, bouger
decide|décider
hope|espérer
change|changer
carry|porter (transporter)
cry|pleurer
enjoy|apprécier
stay|rester
wait|attendre
travel|voyager
prefer|préférer
admit|admettre
happen|se passer, arriver
remember|se souvenir
explain|expliquer
believe|croire
agree|être d'accord
die|mourir
worry|s'inquiéter
fix|réparer
push|pousser
pull|tirer
dance|danser
smile|sourire
look|regarder
shop|faire les courses
rob|cambrioler
reply|répondre (à un message)
obey|obéir
offer|offrir, proposer
invite|inviter
order|commander
share|partager
borrow|emprunter
miss|rater, manquer
kiss|embrasser
relax|se détendre`;

export const REGULAR = REG.split('\n').map((l) => {
  const [base, fr] = l.split('|');
  return { id: base, base, fr };
});

export const ALL_VERBS = [...IRREGULAR, ...REGULAR];
export const VERB_BY_ID = Object.fromEntries(ALL_VERBS.map((v) => [v.id, v]));

// Tous les participes passés irréguliers (pour reconnaître « she's gone » = « she has gone »).
export const PARTICIPLES = new Set(['been', 'got', 'gotten', ...IRREGULAR.flatMap((v) => v.pp.split('/'))]);

// ---------- Règles d'orthographe ----------

const VOW = 'aeiou';
// Verbes de plusieurs syllabes accentués sur la dernière : la consonne finale double.
const DOUBLE = new Set(['admit', 'begin', 'forget', 'prefer', 'refer', 'occur', 'permit', 'regret', 'control', 'commit',
  'submit', 'transfer', 'upset', 'forbid', 'equip', 'omit', 'patrol', 'compel', 'expel', 'propel', 'deter', 'incur']);
// Doublement britannique seulement (US : traveling, traveled).
const UK_DOUBLE = new Set(['travel', 'cancel', 'label', 'model', 'quarrel', 'signal', 'level', 'marvel', 'fuel', 'dial']);

function syllables(w) {
  return (w.replace(/qu/g, 'q').replace(/e$/, '').match(/[aeiouy]+/g) || []).length;
}
// Consonne + voyelle unique + consonne (hors w, x, y), sur une syllabe : stop, run, plan, quit.
function cvc(w) {
  const x = w.replace(/^qu/, 'q');
  const n = x.length;
  if (n < 3) return false;
  const [a, b, c] = [x[n - 3], x[n - 2], x[n - 1]];
  return !VOW.includes(a) && VOW.includes(b) && !VOW.includes(c) && !'wxy'.includes(c);
}
const doubles = (w) => DOUBLE.has(w) || (syllables(w) === 1 && cvc(w));

export function thirdPerson(b) {
  if (b === 'be') return 'is';
  if (b === 'have') return 'has';
  if (/(s|sh|ch|x|z|o)$/.test(b)) return b + 'es';
  if (/[^aeiou]y$/.test(b)) return b.slice(0, -1) + 'ies';
  return b + 's';
}

export function ingForm(b) {
  if (b === 'be') return ['being'];
  if (/ie$/.test(b)) return [b.slice(0, -2) + 'ying'];
  if (/(ee|ye|oe)$/.test(b)) return [b + 'ing'];
  if (/e$/.test(b) && b.length > 2) return [b.slice(0, -1) + 'ing'];
  if (UK_DOUBLE.has(b)) return [b + b.at(-1) + 'ing', b + 'ing'];
  if (doubles(b)) return [b + b.at(-1) + 'ing'];
  return [b + 'ing'];
}

function edForm(b) {
  if (/e$/.test(b)) return [b + 'd'];
  if (/[^aeiou]y$/.test(b)) return [b.slice(0, -1) + 'ied'];
  if (UK_DOUBLE.has(b)) return [b + b.at(-1) + 'ed', b + 'ed'];
  if (doubles(b)) return [b + b.at(-1) + 'ed'];
  return [b + 'ed'];
}

export function pastForms(b) {
  const v = IRREGULAR_BY_ID[b];
  return v ? v.past.split('/') : edForm(b);
}
export function participleForms(b) {
  const v = IRREGULAR_BY_ID[b];
  return v ? v.pp.split('/') : edForm(b);
}

// ---------- Conjugaison ----------

// Personnes : [sujet anglais, sujet français, index de forme : 0 I, 1 you/we/they, 2 he/she/it]
export const PERSONS = [
  ['I', 'je', 0], ['you', 'tu', 1], ['he', 'il', 2], ['she', 'elle', 2], ['it', 'il / elle (chose)', 2],
  ['we', 'nous', 1], ['you', 'vous', 1], ['they', 'ils / elles', 1],
];
// Pour un tableau de conjugaison : I, you, he/she/it, we, you, they
export const TABLE_PERSONS = [0, 1, 2, 5, 6, 7];

export const TENSES = [
  { id: 'present', name: 'Présent simple', fr: 'présent (habitude, vérité)' },
  { id: 'present_cont', name: 'Présent continu (be + -ing)', fr: 'présent (en ce moment)' },
  { id: 'past', name: 'Prétérit', fr: 'passé (action terminée, date précise)' },
  { id: 'past_cont', name: 'Prétérit continu', fr: 'passé en cours (imparfait)' },
  { id: 'present_perfect', name: 'Present perfect', fr: 'passé lié au présent' },
  { id: 'present_perfect_cont', name: 'Present perfect continu', fr: 'depuis… (durée jusqu\'à maintenant)' },
  { id: 'past_perfect', name: 'Past perfect (plus-que-parfait)', fr: 'plus-que-parfait' },
  { id: 'future', name: 'Futur avec will', fr: 'futur, décision, prédiction' },
  { id: 'going_to', name: 'Futur avec be going to', fr: 'futur, intention, projet' },
  { id: 'conditional', name: 'Conditionnel (would)', fr: 'conditionnel présent' },
  { id: 'conditional_perfect', name: 'Conditionnel passé (would have)', fr: 'conditionnel passé' },
];
export const TENSE_BY_ID = Object.fromEntries(TENSES.map((t) => [t.id, t]));

const BE_PRES = ['am', 'are', 'is'];
const BE_PAST = ['was', 'were', 'was'];
const NEG = { am: "'m not", are: "aren't", is: "isn't", was: "wasn't", were: "weren't", do: "don't", does: "doesn't",
  did: "didn't", have: "haven't", has: "hasn't", had: "hadn't", will: "won't", would: "wouldn't" };
const cap = (s) => s[0].toUpperCase() + s.slice(1);

// Forme conjuguée : aux = auxiliaire conjugué (ou null), rest = reste du groupe verbal (variantes).
function parts(base, tense, k) {
  const ing = ingForm(base), pp = participleForms(base);
  const be = base === 'be';
  switch (tense) {
    case 'present':
      if (be) return { aux: BE_PRES[k], rest: [''] };
      return { simple: [k === 2 ? thirdPerson(base) : base], aux: k === 2 ? 'does' : 'do', rest: [base] };
    case 'past':
      if (be) return { aux: BE_PAST[k], rest: [''] };
      return { simple: pastForms(base), aux: 'did', rest: [base] };
    case 'present_cont': return { aux: BE_PRES[k], rest: ing };
    case 'past_cont': return { aux: BE_PAST[k], rest: ing };
    case 'present_perfect': return { aux: k === 2 ? 'has' : 'have', rest: pp };
    case 'present_perfect_cont': return { aux: k === 2 ? 'has' : 'have', rest: ing.map((x) => 'been ' + x) };
    case 'past_perfect': return { aux: 'had', rest: pp };
    case 'future': return { aux: 'will', rest: [base] };
    case 'going_to': return { aux: BE_PRES[k], rest: ['going to ' + base] };
    case 'conditional': return { aux: 'would', rest: [base] };
    case 'conditional_perfect': return { aux: 'would', rest: pp.map((x) => 'have ' + x) };
    default: throw new Error('temps inconnu : ' + tense);
  }
}

// conjugate('go', 'present_perfect', 3, 'neg') → ["she hasn't gone"]
// polarity : 'aff' | 'neg' | 'int'. Renvoie toutes les formes correctes, la première étant la forme affichée.
export function conjugate(base, tense, person, polarity = 'aff', subject) {
  const [subj0, , k] = PERSONS[person];
  const subj = subject || subj0;
  const p = parts(base, tense, k);
  const join = (...xs) => xs.filter(Boolean).join(' ');
  if (polarity === 'aff') {
    if (p.simple) return p.simple.map((v) => join(subj, v));
    return p.rest.map((r) => join(subj, p.aux, r));
  }
  if (polarity === 'neg') {
    if (p.aux === 'am') return p.rest.map((r) => join(`${subj}'m not`, r));
    return p.rest.map((r) => join(subj, NEG[p.aux], r));
  }
  return p.rest.map((r) => cap(join(p.aux, subj === 'I' ? 'I' : subj, r)) + '?');
}

// Une ligne de tableau : « he/she/it » regroupés.
export function tableRow(base, tense, polarity, idx) {
  const subj = idx === 2 ? 'he/she/it' : undefined;
  return conjugate(base, tense, idx, polarity, subj)[0];
}
