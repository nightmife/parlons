import test from 'node:test';
import assert from 'node:assert/strict';
import en from '../js/en/index.js';
import { resolve, fill } from '../js/tasks.js';
import { expand } from '../js/check.js';

const C = en;

test('fill', () => {
  assert.equal(fill('She ___ home. (just / arrive)', "'s just arrived"), "She's just arrived home.");
  assert.equal(fill('___ you tired?', 'Are'), 'Are you tired?');
});

test('vocabulaire : identifiants uniques, champs complets, réponse correcte acceptée', () => {
  const ids = new Set();
  const pairs = new Set();
  for (const w of C.words) {
    assert.ok(!ids.has(w.id), `id en double : ${w.id}`);
    ids.add(w.id);
    assert.ok(w.en && w.fr && w.ex, `incomplet : ${w.id}`);
    const key = `${w.en}|${w.fr}`;
    assert.ok(!pairs.has(key), `doublon : ${key}`);
    pairs.add(key);
    const t = resolve(C, `v:${w.id}`);
    for (const f of expand(w.en)) assert.equal(t.check(f).ok, true, `${w.id} : ${f}`);
    assert.equal(t.check(f0(w.en)).typo, false);
  }
  assert.ok(C.words.length >= 500, `${C.words.length} mots`);
  // Un même sens français ne doit pas mener à deux mots anglais différents.
  const byFr = {};
  for (const w of C.words) (byFr[w.fr] ||= []).push(w.id);
  for (const [fr, list] of Object.entries(byFr)) assert.equal(list.length, 1, `même consigne « ${fr} » : ${list}`);
});
const f0 = (s) => expand(s)[0];

test('leçons : structure et auto-correction', () => {
  const ids = new Set();
  for (const L of C.lessons) {
    assert.ok(!ids.has(L.id), L.id); ids.add(L.id);
    assert.ok(['A1', 'A2', 'B1', 'B2'].includes(L.level));
    assert.ok(L.title && L.goal && L.body.length > 200, L.id);
    assert.ok(L.ex.length >= 10, `${L.id} : ${L.ex.length} exercices`);
    L.ex.forEach((e, n) => {
      const id = `g:${L.id}:${n}`;
      assert.ok(['f', 't', 'x', 'r'].includes(e[0]), id);
      assert.ok(e.at(-1) && e.at(-1).length > 3, `${id} : explication manquante`);
      if (e[0] === 'f') assert.equal((e[1].match(/___/g) || []).length, 1, `${id} : un seul trou`);
      const t = resolve(C, id);
      assert.ok(t, id);
      for (const a of expand(t.spec)) assert.equal(t.check(a).ok, true, `${id} : « ${a} » refusé`);
      if (e[0] === 'x') assert.equal(t.check(e[1]).ok, false, `${id} : la phrase fautive est acceptée`);
      assert.equal(t.check('zzz').ok, false);
    });
  }
  assert.ok(C.lessons.length >= 30);
});

test('phrases : identifiants et auto-correction', () => {
  const ids = new Set();
  for (const p of C.phrases) {
    assert.ok(!ids.has(p.id)); ids.add(p.id);
    assert.ok(p.en && p.fr, p.id);
    const t = resolve(C, `p:${p.id}`);
    for (const a of p.en.split('|')) assert.equal(t.check(a).ok, true, `${p.id} : ${a}`);
    assert.equal(resolve(C, `d:p:${p.id}`).check(p.en.split('|')[0]).ok, true);
  }
});

test('verbes irréguliers et conjugaison', () => {
  const t = resolve(C, 'i:go');
  assert.equal(t.check('went', 'gone').ok, true);
  assert.equal(t.check('went', 'went').ok, false);
  assert.equal(resolve(C, 'i:learn').check('learnt', 'learned').ok, true);
  assert.equal(resolve(C, 'i:be').check('was/were', 'been').ok, true);
  const c = resolve(C, 'c:go:present_perfect:3:neg');
  assert.equal(c.check("she hasn't gone").ok, true);
  assert.equal(c.check('has not gone').ok, true);
  assert.equal(c.check("she hasn't went").ok, false);
  assert.equal(resolve(C, 'c:work:present:2:int').check('Does he work?').ok, true);
  assert.equal(resolve(C, 'c:work:present:2:int').check('work').ok, false);
  for (const v of C.verbs.all) for (const tn of C.verbs.tenses) for (const p of [0, 3, 7]) for (const pol of ['aff', 'neg', 'int']) {
    const r = resolve(C, `c:${v.id}:${tn.id}:${p}:${pol}`);
    assert.equal(r.check(r.spec).ok, true, r.id);
  }
  assert.equal(C.verbs.lookup('to google').base, 'google');
  assert.equal(C.verbs.lookup('2 words'), null);
});

test('dictée d\'exemples de vocabulaire', () => {
  for (const w of C.words.slice(0, 50)) assert.equal(resolve(C, `d:v:${w.id}`).check(w.ex).ok, true, w.id);
});
