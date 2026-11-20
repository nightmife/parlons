// Transforme un identifiant de carte en exercice affichable et corrigeable. Pur (sans DOM).
//   v:<mot>            vocabulaire, du français vers l'anglais
//   g:<leçon>:<n>      exercice n de la leçon
//   i:<verbe>          verbe irrégulier : prétérit et participe passé
//   p:<phrase>         phrase à traduire
//   c:<verbe>:<temps>:<personne>:<aff|neg|int>   conjugaison (entraînement, hors révisions)
//   d:<p|v>:<id>       dictée d'une phrase ou d'un exemple (entraînement, hors révisions)
import { check, expand, display } from './check.js';

export const isSrs = (id) => /^[vgip]:/.test(id);

const stripHint = (s) => s.replace(/\s*\(([^)]*)\)\s*$/, '');
export const hintOf = (s) => (s.match(/\(([^)]*)\)\s*$/) || [])[1] || '';

// Remplace le trou par la réponse : « She ___ home. » + « 's gone » → « She's gone home. »
export function fill(sentence, ans) {
  const a = String(ans).trim();
  return stripHint(sentence).replace(/(\s?)___/, (m, sp) => (a.startsWith("'") ? '' : sp) + a);
}

const POL = { aff: 'affirmatif', neg: 'négatif', int: 'question' };

export function resolve(course, id) {
  const [kind, ...rest] = id.split(':');
  const C = course;
  if (kind === 'v') {
    const w = C.wordById[rest.join(':')];
    if (!w) return null;
    return {
      id, kind: 'word', title: 'En anglais ?', prompt: w.fr, spec: w.en, say: display(w.en),
      word: w, ex: w.ex, note: w.note, srs: true,
      check: (input) => check(input, w.en, C.normWord, 'word'),
    };
  }
  if (kind === 'g') {
    const [lid, n] = rest;
    const L = C.lessonById[lid];
    const e = L && L.ex[Number(n)];
    if (!e) return null;
    const base = { id, lesson: L, srs: true };
    if (e[0] === 'f') {
      const [, sentence, spec, why] = e;
      const forms = expand(spec);
      const full = forms.map((a) => fill(sentence, a));
      return {
        ...base, kind: 'fill', title: 'Complète la phrase', prompt: stripHint(sentence), hint: hintOf(sentence),
        spec, why, say: full[0],
        check: (input) => {
          const r = check(fill(sentence, input), full, C.norm, 'exact');
          const i = full.indexOf(r.expected);
          return { ...r, answer: forms[i >= 0 ? i : 0] };
        },
      };
    }
    if (e[0] === 't') {
      const [, fr, spec, why] = e;
      return { ...base, kind: 'translate', title: 'Traduis en anglais', prompt: fr, spec, why, say: display(spec), check: (input) => check(input, spec, C.norm) };
    }
    if (e[0] === 'x') {
      const [, wrong, spec, why] = e;
      return {
        ...base, kind: 'fix', title: 'Corrige l’erreur', prompt: wrong, prefill: wrong, spec, why, say: display(spec),
        check: (input) => check(input, spec, C.norm),
      };
    }
    if (e[0] === 'r') {
      const [, instr, src, spec, why] = e;
      return { ...base, kind: 'rewrite', title: instr, prompt: src, spec, why, say: display(spec), check: (input) => check(input, spec, C.norm) };
    }
    return null;
  }
  if (kind === 'i') {
    const v = C.verbs.irregularById[rest[0]];
    if (!v) return null;
    const past = v.past.split('/'), pp = v.pp.split('/');
    const one = (input, forms) => {
      const got = String(input).toLowerCase().split(/[\s,/;]+/).filter(Boolean);
      return got.length > 0 && got.every((g) => forms.includes(g));
    };
    return {
      id, kind: 'irregular', title: 'Prétérit et participe passé', prompt: `to ${v.base}`, sub: v.fr, verb: v, srs: true,
      say: `${v.base}, ${past[0]}, ${pp[0]}`,
      check: (a, b) => {
        const okA = one(a, past), okB = one(b, pp);
        return { ok: okA && okB, okA, okB, typo: false, expected: `${v.past} — ${v.pp}`, given: `${a} — ${b}` };
      },
    };
  }
  if (kind === 'p') {
    const p = C.phraseById[rest.join(':')];
    if (!p) return null;
    return {
      id, kind: 'translate', title: 'Traduis en anglais', prompt: p.fr, spec: p.en, say: p.en.split('|')[0], srs: true, phrase: p,
      check: (input) => check(input, p.en.split('|'), C.norm),
    };
  }
  if (kind === 'c') {
    const [vid, tense, person, pol] = rest;
    const v = C.verbs.lookup(vid);
    const t = C.verbs.tenseById[tense];
    const P = C.verbs.persons[Number(person)];
    if (!v || !t || !P || !POL[pol]) return null;
    const forms = C.verbs.conjugate(v.base, tense, Number(person), pol);
    // Sans le sujet aussi, pour l'affirmatif et le négatif : « has gone » pour « she has gone ».
    const bare = pol === 'int' ? [] : forms.map((f) => f.slice(P[0].length + 1));
    return {
      id, kind: 'conj', title: `${t.name} · ${POL[pol]}`, prompt: `${P[0]} + ${v.base}`, sub: v.fr ? `${P[1]} · ${v.fr}` : P[1],
      spec: forms[0], say: forms[0], srs: false,
      check: (input) => {
        const r = check(input, [...forms, ...bare], C.norm, 'exact');
        return { ...r, expected: forms[0] };
      },
    };
  }
  if (kind === 'd') {
    const [src, ...sid] = rest;
    const key = sid.join(':');
    const text = src === 'p' ? C.phraseById[key]?.en.split('|')[0] : C.wordById[key]?.ex;
    if (!text) return null;
    return {
      id, kind: 'dictation', title: 'Écris ce que tu entends', prompt: '', audio: text, spec: text, say: text, srs: false,
      check: (input) => check(input, [text], C.norm),
    };
  }
  return null;
}
