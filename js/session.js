// File d'une séance de travail. Pur : l'appelant applique la note à la carte (srs.review) quand `schedule` n'est pas null.
// Étapes d'un élément : 'new' (présentation puis premier essai, non noté), 'learn' (essai noté), 'review'.

export function shuffle(a, rng = Math.random) {
  const x = [...a];
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

// Les nouveautés sont réparties régulièrement parmi les révisions.
export function buildQueue(dueIds, newIds, rng = Math.random) {
  const rev = shuffle(dueIds, rng).map((id) => ({ id, phase: 'review', tries: 0 }));
  const fresh = newIds.map((id) => ({ id, phase: 'new', tries: 0 }));
  if (!fresh.length) return rev;
  const out = [];
  const step = Math.max(1, Math.floor(rev.length / fresh.length));
  let r = 0;
  for (const f of fresh) {
    out.push(...rev.slice(r, r + step));
    r += step;
    out.push(f);
  }
  out.push(...rev.slice(r));
  return out;
}

export function createSession(queue, opts = {}) {
  return { queue: [...queue], total: queue.length, answered: 0, correct: 0, first: {}, wrong: [], maxTries: opts.maxTries ?? 3, gap: opts.gap ?? 4 };
}

export const current = (s) => s.queue[0] || null;
export const finished = (s) => s.queue.length === 0;

function reinsert(s, item, gap) {
  const at = Math.min(gap, s.queue.length);
  s.queue.splice(at, 0, item);
}

// grade : 0 raté, 1 difficile, 2 bon, 3 facile. Renvoie { schedule: note à appliquer ou null }.
export function answer(s, grade) {
  const item = s.queue.shift();
  if (!item) return { schedule: null };
  s.last = { id: item.id, phase: item.phase };
  s.answered += 1;
  if (!(item.id in s.first)) {
    s.first[item.id] = grade;
    if (grade > 0) s.correct += 1;
    else s.wrong.push(item.id);
  }
  // « Je connais déjà » ou bonne réponse à une révision / à l'essai noté : terminé.
  if (grade === 3) return { schedule: 3 };
  if (item.phase === 'new') {
    reinsert(s, { ...item, phase: 'learn', tries: item.tries + 1 }, grade > 0 ? s.gap + 1 : s.gap - 1);
    return { schedule: null };
  }
  if (grade > 0) return { schedule: grade };
  if (item.tries + 1 < s.maxTries) reinsert(s, { ...item, phase: 'learn', tries: item.tries + 1 }, s.gap);
  return { schedule: 0 };
}

// L'élève corrige la correction (« j'avais bon ») : on annule l'échec de la dernière réponse.
// Renvoie { schedule } : la note à appliquer à la carte telle qu'elle était avant la réponse (ou null).
export function overrule(s) {
  const last = s.last;
  if (!last) return { schedule: null };
  const id = last.id;
  s.last = null;
  if (last.phase !== 'new') {
    const i = s.queue.findIndex((q) => q.id === id);
    if (i >= 0) s.queue.splice(i, 1);
  }
  if (s.first[id] === 0) {
    s.first[id] = 2;
    s.correct += 1;
    s.wrong = s.wrong.filter((w) => w !== id);
  }
  return { schedule: last.phase === 'new' ? null : 2 };
}
