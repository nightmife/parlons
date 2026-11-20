// Cours d'anglais : tout ce dont l'interface a besoin, sous une forme commune à toutes les langues (voir CLAUDE.md).
import { norm, normWord } from './norm.js';
import { THEMES, WORDS, WORD_BY_ID } from './vocab.js';
import { LESSONS_A } from './lessons_a.js';
import { LESSONS_B } from './lessons_b.js';
import { PHRASE_GROUPS, PHRASES, PHRASE_BY_ID } from './phrases.js';
import * as V from './verbs.js';

const LESSONS = [...LESSONS_A, ...LESSONS_B];
const LEVEL_ORDER = { A1: 0, A2: 1, B1: 2, B2: 3 };
LESSONS.sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]);

export default {
  id: 'en',
  name: 'Anglais',
  endonym: 'English',
  voices: [['en-US', 'Américain'], ['en-GB', 'Britannique']],
  norm,
  normWord,
  themes: THEMES,
  words: WORDS,
  wordById: WORD_BY_ID,
  lessons: LESSONS,
  lessonById: Object.fromEntries(LESSONS.map((l) => [l.id, l])),
  phraseGroups: PHRASE_GROUPS,
  phrases: PHRASES,
  phraseById: PHRASE_BY_ID,
  verbs: {
    irregular: V.IRREGULAR,
    irregularById: V.IRREGULAR_BY_ID,
    regular: V.REGULAR,
    all: V.ALL_VERBS,
    byId: V.VERB_BY_ID,
    tenses: V.TENSES,
    tenseById: V.TENSE_BY_ID,
    persons: V.PERSONS,
    tablePersons: V.TABLE_PERSONS,
    conjugate: V.conjugate,
    tableRow: V.tableRow,
    // Un verbe tapé librement : irrégulier connu, ou conjugué avec les règles des réguliers.
    lookup(word) {
      const b = String(word).trim().toLowerCase().replace(/^to /, '');
      if (!/^[a-z]+(-[a-z]+)?$/.test(b)) return null;
      return V.VERB_BY_ID[b] || { id: b, base: b, fr: '', guessed: true };
    },
  },
};
