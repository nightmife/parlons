// Répétition espacée (variante de SM-2, à la journée). Pur : aucune dépendance au DOM.
// Carte : { due (ms), ivl (jours), ease, reps (réussites d'affilée), lapses, last (ms), n (nombre de révisions) }
// Note : 0 raté, 1 difficile (faute de frappe, indice), 2 bon, 3 facile (« je connais déjà »).

export const MIN = 60000;
export const DAY = 86400000;
export const MAX_IVL = 365;

export const newCard = () => ({ due: 0, ivl: 0, ease: 2.5, reps: 0, lapses: 0, last: 0, n: 0 });

// Jour local (nombre entier), pour qu'une carte prévue « demain » soit due dès minuit.
export const dayNum = (t) => {
  const d = new Date(t);
  return Math.floor((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())) / DAY);
};

export function isDue(c, now) {
  if (!c) return false;
  return c.ivl >= 1 ? dayNum(c.due) <= dayNum(now) : c.due <= now;
}

export function review(card, grade, now, rng = Math.random) {
  const c = { ...newCard(), ...card };
  c.n += 1;
  if (grade <= 0) {
    if (c.reps > 0) c.lapses += 1;
    c.reps = 0;
    c.ease = Math.max(1.3, c.ease - 0.2);
    c.ivl = 0;
    c.due = now + 10 * MIN;
    c.last = now;
    return c;
  }
  // Révision en retard réussie : on tient compte du temps réellement écoulé.
  const elapsed = c.last ? Math.max(0, (now - c.last) / DAY) : 0;
  const base = Math.max(c.ivl, Math.min(elapsed, c.ivl * 2));
  let ivl;
  if (grade === 3) {
    ivl = c.reps === 0 ? 7 : Math.max(base + 1, base * c.ease * 1.3);
    c.ease = Math.min(3, c.ease + 0.15);
  } else if (c.reps === 0) ivl = 1;
  else if (c.reps === 1) ivl = grade === 1 ? 2 : 3;
  else if (grade === 1) ivl = Math.max(base + 1, base * 1.2);
  else ivl = Math.max(base + 1, base * c.ease);
  if (grade === 1) c.ease = Math.max(1.3, c.ease - 0.15);
  if (ivl >= 4) ivl *= 0.95 + rng() * 0.1; // léger aléa : évite que tout revienne le même jour
  c.ivl = Math.min(MAX_IVL, Math.max(1, Math.round(ivl)));
  c.reps += 1;
  c.due = now + c.ivl * DAY;
  c.last = now;
  return c;
}

// État d'une carte pour l'affichage.
export function stage(c) {
  if (!c || !c.n) return 'new';
  if (c.ivl >= 21) return 'known';
  return 'learning';
}

// Nombre de cartes dues chaque jour pendant `days` jours (aujourd'hui compris, retards inclus).
export function forecast(cards, now, days = 7) {
  const out = Array(days).fill(0);
  const today = dayNum(now);
  for (const c of cards) {
    if (!c || !c.n) continue;
    const d = Math.max(0, dayNum(c.due) - today);
    if (d < days) out[d] += 1;
  }
  return out;
}
