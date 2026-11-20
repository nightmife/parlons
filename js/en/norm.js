// Forme canonique d'une phrase anglaise, pour comparer une réponse à la correction.
// Les deux côtés passent par la même fonction : « doesn't » = « does not », « it's » = « it is » = « it has (+ participe) »,
// « colour » = « color », « 3 » = « three ». La ponctuation et la casse ne comptent pas.
import { PARTICIPLES } from './verbs.js';

const UK_US = {
  colour: 'color', colours: 'colors', favourite: 'favorite', favourites: 'favorites', neighbour: 'neighbor',
  neighbours: 'neighbors', honour: 'honor', humour: 'humor', behaviour: 'behavior', labour: 'labor',
  flavour: 'flavor', harbour: 'harbor', rumour: 'rumor', centre: 'center', centres: 'centers', theatre: 'theater',
  theatres: 'theaters', metre: 'meter', metres: 'meters', litre: 'liter', litres: 'liters', fibre: 'fiber',
  realise: 'realize', realised: 'realized', realising: 'realizing', organise: 'organize', organised: 'organized',
  organising: 'organizing', recognise: 'recognize', recognised: 'recognized', apologise: 'apologize',
  apologised: 'apologized', apologising: 'apologizing', criticise: 'criticize', criticised: 'criticized',
  travelling: 'traveling', travelled: 'traveled', traveller: 'traveler', travellers: 'travelers',
  cancelled: 'canceled', cancelling: 'canceling', grey: 'gray', programme: 'program', programmes: 'programs',
  licence: 'license', defence: 'defense', offence: 'offense', cheque: 'check', tyre: 'tire', tyres: 'tires',
  jewellery: 'jewelry', mum: 'mom', mummy: 'mommy', practise: 'practice', practised: 'practiced',
  analyse: 'analyze', analysed: 'analyzed', catalogue: 'catalog', dialogue: 'dialog', pyjamas: 'pajamas',
  aeroplane: 'airplane', plough: 'plow', ageing: 'aging', fulfil: 'fulfill', enrol: 'enroll', skilful: 'skillful',
  learnt: 'learned', dreamt: 'dreamed', burnt: 'burned', spelt: 'spelled', smelt: 'smelled', spilt: 'spilled',
  leapt: 'leaped', knelt: 'kneeled', okay: 'ok',
};

const NUM = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven',
  'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];

const NEG = [
  [/\bwon't\b/g, 'will not'], [/\bcan't\b/g, 'cannot'], [/\bshan't\b/g, 'shall not'], [/\bain't\b/g, 'is not'],
  [/\b(\w+)n't\b/g, '$1 not'], [/\bcan not\b/g, 'cannot'],
];

const PRON = '(i|you|he|she|it|we|they|that|there|here|what|who|where|how|when)';
const isPart = (w) => w && (PARTICIPLES.has(w) || /ed$/.test(w));

export function norm(s) {
  let t = String(s).normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/[‘’ʼ`´]/g, "'")
    .replace(/[–—-]/g, ' ')
    .replace(/[^a-z0-9' ]+/g, ' ')
    .replace(/(^| )'+|'+( |$)/g, ' ')
    .replace(/\s+/g, ' ').trim();
  for (const [re, by] of NEG) t = t.replace(re, by);
  let w = t.split(' ').filter(Boolean).map((x) => UK_US[x] || (/^\d+$/.test(x) && NUM[+x]) || x);
  // Contractions sujet + auxiliaire : on contracte les deux côtés pour lever l'ambiguïté de 's (is / has) et 'd (would / had).
  const out = [];
  for (let i = 0; i < w.length; i++) {
    const a = w[i], b = w[i + 1], c = w[i + 2] === 'not' ? w[i + 3] : w[i + 2];
    // Pas de contraction en fin de phrase : « Yes, I am » (jamais « Yes, I'm »), « where he is ».
    if (b && w[i + 2] !== undefined && new RegExp(`^${PRON}$`).test(a)) {
      let k = null;
      if (a === 'i' && b === 'am') k = "i'm";
      else if (b === 'are' && /^(you|we|they|who|what)$/.test(a)) k = `${a}'re`;
      else if (b === 'is' && a !== 'i' && !/^(you|we|they)$/.test(a)) k = `${a}'s`;
      else if (b === 'has' && isPart(c) && !/^(i|you|we|they)$/.test(a)) k = `${a}'s`;
      else if (b === 'have' && isPart(c) && /^(i|you|we|they|who)$/.test(a)) k = `${a}'ve`;
      else if (b === 'will') k = `${a}'ll`;
      else if (b === 'would' || (b === 'had' && (isPart(c) || w[i + 2] === 'better'))) k = `${a}'d`;
      if (k) { out.push(k); i++; continue; }
    }
    if (a === 'let' && b === 'us') { out.push("let's"); i++; continue; }
    out.push(a);
  }
  w = out;
  return w.join(' ');
}

// Pour un mot de vocabulaire : l'article ou le « to » de l'infinitif ne comptent pas.
export function normWord(s) {
  return norm(s).replace(/^(a|an|the|to|some) /, '');
}
