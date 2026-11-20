import test from 'node:test';
import assert from 'node:assert/strict';
import { expand, check, dist, isTypo, speechScore } from '../js/check.js';
import { norm, normWord } from '../js/en/norm.js';
import { conjugate, thirdPerson, ingForm, pastForms, participleForms, IRREGULAR, REGULAR } from '../js/en/verbs.js';
import { review, newCard, isDue, DAY, stage, forecast } from '../js/srs.js';
import { buildQueue, createSession, answer, current, finished, overrule } from '../js/session.js';

test('expand : alternatives, options, crochets', () => {
  assert.deepEqual(expand('a|b'), ['a', 'b']);
  assert.deepEqual(expand('I go to (the) school'), ['I go to the school', 'I go to school']);
  assert.deepEqual(expand('I [go/walk] home.'), ['I go home.', 'I walk home.']);
});

test('norm : contractions équivalentes', () => {
  const same = (a, b) => assert.equal(norm(a), norm(b), `${a} / ${b}`);
  same("She doesn't like coffee.", 'she does not like coffee');
  same("It's raining", 'It is raining');
  same("He's gone", 'He has gone');
  same("He hasn't finished", "He's not finished");
  same("It isn't easy", "It's not easy");
  same("I'm not tired", 'I am not tired');
  same("I'd like a tea", 'I would like a tea');
  same("We'll see", 'We will see');
  same("They've been here", 'They have been here');
  same("You can't", 'you cannot');
  same("You can not", 'you cannot');
  same("I won't go", 'I will not go');
  same('My favourite colour is grey', 'my favorite color is gray');
  same('I have 3 cats', 'I have three cats');
  same('Let us go', "Let's go");
  same('Well-known', 'well known');
  same('It’s fine', "It's fine");
  assert.notEqual(norm('She has a car'), norm("She's a car"));
  assert.notEqual(norm('He play'), norm('He plays'));
  assert.equal(normWord('to go'), 'go');
  assert.equal(normWord('an apple'), 'apple');
});

test('check : modes', () => {
  assert.equal(check('goes', 'goes', norm, 'exact').ok, true);
  assert.equal(check('go', 'goes', norm, 'exact').ok, false);
  const r = check('bicicle', 'bicycle', normWord, 'word');
  assert.equal(r.ok, true); assert.equal(r.typo, true);
  assert.equal(check('car', 'car', normWord, 'word').typo, false);
  assert.equal(check('cat', 'car', normWord, 'word').ok, false); // mots courts : aucune tolérance
  const s = check("I didn't go becuase I was tired", "I didn't go because I was tired", norm);
  assert.equal(s.ok, true); assert.equal(s.typo, true);
  assert.equal(check('He play tennis', 'He plays tennis', norm).ok, false);
  assert.equal(check('I goed', 'I went', norm).ok, false);
  const w = check('He go to school', 'He goes to school|He walks to school', norm);
  assert.equal(w.expected, 'He goes to school');
  assert.deepEqual(w.diff.given.map((x) => x.ok), [true, false, true, true]);
  assert.equal(check('', 'x', norm).ok, false);
});

test('isTypo / dist', () => {
  assert.equal(dist('abc', 'acb'), 1);
  assert.equal(isTypo('becuase', 'because'), true);
  assert.equal(isTypo('quiet', 'quite'), false);
  assert.equal(isTypo('plays', 'plaid'), false);
});

test('speechScore', () => {
  const r = speechScore('I would like a coffee', "I'd like a coffee please", norm);
  assert.ok(r.score > 0.5 && r.score < 1);
});

test('orthographe des formes verbales', () => {
  const eq = (a, b) => assert.deepEqual(a, b);
  eq(['goes', 'watches', 'studies', 'plays', 'has', 'fixes', 'does'], ['go', 'watch', 'study', 'play', 'have', 'fix', 'do'].map(thirdPerson));
  const ing = (b) => ingForm(b)[0];
  eq(['running', 'stopping', 'making', 'lying', 'seeing', 'visiting', 'opening', 'beginning', 'quitting', 'fixing', 'playing', 'agreeing', 'being', 'preferring', 'cooking', 'waiting', 'happening', 'forgetting', 'swimming'],
    ['run', 'stop', 'make', 'lie', 'see', 'visit', 'open', 'begin', 'quit', 'fix', 'play', 'agree', 'be', 'prefer', 'cook', 'wait', 'happen', 'forget', 'swim'].map(ing));
  eq(ingForm('travel'), ['travelling', 'traveling']);
  eq(['stopped', 'studied', 'played', 'agreed', 'planned', 'visited', 'preferred', 'died', 'admitted', 'obeyed', 'robbed', 'worked'],
    ['stop', 'study', 'play', 'agree', 'plan', 'visit', 'prefer', 'die', 'admit', 'obey', 'rob', 'work'].map((b) => pastForms(b)[0]));
  eq(pastForms('go'), ['went']);
  eq(participleForms('get'), ['got', 'gotten']);
});

test('conjugaison', () => {
  const c = (...a) => conjugate(...a)[0];
  assert.equal(c('go', 'present', 3), 'she goes');
  assert.equal(c('go', 'present', 3, 'neg'), "she doesn't go");
  assert.equal(c('go', 'present', 3, 'int'), 'Does she go?');
  assert.equal(c('be', 'present', 0), 'I am');
  assert.equal(c('be', 'present', 0, 'neg'), "I'm not");
  assert.equal(c('be', 'present', 7, 'int'), 'Are they?');
  assert.equal(c('be', 'past', 5), 'we were');
  assert.equal(c('be', 'past', 2, 'neg'), "he wasn't");
  assert.equal(c('work', 'present_cont', 0, 'neg'), "I'm not working");
  assert.equal(c('work', 'present_cont', 0, 'int'), 'Am I working?');
  assert.equal(c('see', 'past', 1, 'int'), 'Did you see?');
  assert.equal(c('see', 'present_perfect', 2), 'he has seen');
  assert.equal(c('wait', 'present_perfect_cont', 7), 'they have been waiting');
  assert.equal(c('leave', 'past_perfect', 3, 'neg'), "she hadn't left");
  assert.equal(c('rain', 'future', 4), 'it will rain');
  assert.equal(c('buy', 'going_to', 5), 'we are going to buy');
  assert.equal(c('help', 'conditional', 0, 'neg'), "I wouldn't help");
  assert.equal(c('tell', 'conditional_perfect', 2), 'he would have told');
  assert.equal(c('have', 'present', 2, 'neg'), "he doesn't have");
  assert.deepEqual(conjugate('learn', 'past', 0), ['I learned', 'I learnt']);
  // la correction accepte forme pleine et contractée
  assert.equal(check('she does not go', c('go', 'present', 3, 'neg'), norm, 'exact').ok, true);
  assert.equal(check('I am not working', c('work', 'present_cont', 0, 'neg'), norm, 'exact').ok, true);
});

test('listes de verbes cohérentes', () => {
  const ids = [...IRREGULAR, ...REGULAR].map((v) => v.id);
  assert.equal(new Set(ids).size, ids.length, 'doublon');
  for (const v of IRREGULAR) {
    assert.ok(v.past && v.pp && v.fr && [1, 2, 3].includes(v.rank), v.base);
  }
  for (const v of REGULAR) assert.ok(v.fr, v.base);
});

test('répétition espacée', () => {
  const now = Date.UTC(2026, 0, 10, 12);
  const rng = () => 0.5;
  let c = review(newCard(), 2, now, rng);
  assert.equal(c.ivl, 1); assert.equal(c.reps, 1);
  assert.equal(isDue(c, now), false);
  assert.equal(isDue(c, now + DAY), true);
  c = review(c, 2, now + DAY, rng);
  assert.equal(c.ivl, 3);
  c = review(c, 2, now + 4 * DAY, rng);
  assert.equal(c.ivl, 8); // 3 × 2,5 = 7,5
  const lapse = review(c, 0, now + 12 * DAY, rng);
  assert.equal(lapse.lapses, 1); assert.equal(lapse.ivl, 0); assert.ok(lapse.ease < c.ease);
  assert.equal(isDue(lapse, now + 12 * DAY), false);
  assert.equal(isDue(lapse, now + 12 * DAY + 11 * 60000), true);
  const hard = review(c, 1, now + 12 * DAY, rng);
  assert.ok(hard.ivl < review(c, 2, now + 12 * DAY, rng).ivl);
  const easy = review(newCard(), 3, now, rng);
  assert.equal(easy.ivl, 7);
  assert.equal(stage(undefined), 'new');
  assert.equal(stage(easy), 'learning');
  let m = c; for (let i = 0; i < 6; i++) m = review(m, 2, m.due, rng);
  assert.equal(stage(m), 'known');
  assert.ok(m.ivl <= 365);
  assert.deepEqual(forecast([easy, c], now, 15).reduce((a, b) => a + b), 2);
});

test('séance : nouveautés, échecs, reprise', () => {
  const q = buildQueue(['r1', 'r2', 'r3', 'r4'], ['n1', 'n2'], () => 0.3);
  assert.equal(q.length, 6);
  assert.equal(q.filter((x) => x.phase === 'new').length, 2);
  const s = createSession([{ id: 'n', phase: 'new', tries: 0 }, { id: 'r', phase: 'review', tries: 0 }]);
  assert.equal(answer(s, 2).schedule, null);           // présentation + premier essai : pas noté
  assert.equal(current(s).id, 'r');
  assert.equal(answer(s, 0).schedule, 0);              // révision ratée : reprogrammée et reposée
  assert.ok(s.queue.some((x) => x.id === 'r' && x.phase === 'learn'));
  const n2 = s.queue.find((x) => x.id === 'n');
  assert.equal(n2.phase, 'learn');
  while (!finished(s)) answer(s, 2);
  assert.equal(s.first.r, 0);
  assert.deepEqual(s.wrong, ['r']);
  // « j'avais bon »
  const t = createSession([{ id: 'x', phase: 'review', tries: 0 }, { id: 'y', phase: 'review', tries: 0 }]);
  answer(t, 0);
  assert.equal(overrule(t).schedule, 2);
  assert.equal(t.queue.filter((x) => x.id === 'x').length, 0);
  assert.equal(t.correct, 1);
  // un échec répété s'arrête après maxTries
  const u = createSession([{ id: 'z', phase: 'review', tries: 0 }]);
  let k = 0; while (!finished(u) && k++ < 20) answer(u, 0);
  assert.equal(u.answered, 3);
});

test('norm : pas de contraction en fin de phrase', () => {
  assert.notEqual(norm('Yes, I am.'), norm("Yes, I'm."));
  assert.notEqual(norm("I don't know where he is"), norm("I don't know where he's"));
  assert.equal(norm('I am happy'), norm("I'm happy"));
});
