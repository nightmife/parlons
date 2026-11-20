// Correction des réponses tapées. Indépendant de la langue : chaque cours fournit `norm(str)`
// qui ramène une phrase à une forme canonique (minuscules, contractions, orthographes équivalentes…).

// « I [go/walk] to (the) school|I am going » → toutes les variantes acceptées.
// [a/b] : un choix obligatoire ; (a) ou (a/b) : facultatif.
export function expand(spec, cap = 96) {
  const out = [];
  for (const alt of String(spec).split('|')) {
    let forms = [''];
    const re = /\[([^\]]+)\]|\(([^)]+)\)|([^[(]+)/g;
    let m;
    while ((m = re.exec(alt))) {
      const opts = m[1] ? m[1].split('/') : m[2] ? [...m[2].split('/'), ''] : [m[3]];
      const next = [];
      for (const f of forms) for (const o of opts) if (next.length < cap) next.push(f + o);
      forms = next;
    }
    for (const f of forms) out.push(f.replace(/\s+/g, ' ').replace(/\s+([,.!?])/g, '$1').trim());
  }
  return [...new Set(out.filter(Boolean))];
}

// Forme affichée d'une réponse attendue : première variante.
export const display = (spec) => expand(spec)[0] || '';

// Distance de Damerau-Levenshtein (transpositions adjacentes comptées 1).
export function dist(a, b) {
  const n = a.length, m = b.length;
  const d = Array.from({ length: n + 1 }, (_, i) => [i, ...Array(m).fill(0)]);
  for (let j = 0; j <= m; j++) d[0][j] = j;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const c = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + c);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  }
  return d[n][m];
}

// Faute de frappe dans un mot : une seule substitution ou inversion, hors des deux dernières lettres
// (là où se jouent les terminaisons -s, -ed, -er… qui sont de vraies fautes de grammaire).
export function isTypo(given, want) {
  if (want.length < 5 || given.length !== want.length || given === want) return false;
  const diff = [];
  for (let i = 0; i < want.length; i++) if (given[i] !== want[i]) diff.push(i);
  const end = want.length - 2;
  if (diff.length === 1) return diff[0] < end;
  if (diff.length === 2 && diff[1] === diff[0] + 1 && given[diff[0]] === want[diff[1]] && given[diff[1]] === want[diff[0]]) return diff[1] < end;
  return false;
}

const tokens = (s) => s.split(' ').filter(Boolean);

// spec : chaîne à variantes (voir expand) ou liste de formes déjà développées.
// Résultat : { ok, typo, expected (forme affichée la plus proche), diff }
//   mode 'word' : un mot de vocabulaire (fautes d'orthographe légères tolérées, notées « typo »)
//   mode 'exact' : une forme précise (conjugaison, mot à compléter) : rien n'est toléré
//   mode 'sentence' : une phrase (une faute de frappe sur un mot long tolérée)
export function check(input, spec, norm, mode = 'sentence') {
  const forms = Array.isArray(spec) ? spec : expand(spec);
  const g = norm(input);
  const res = { ok: false, typo: false, expected: forms[0] || '', given: String(input).trim(), diff: null };
  if (!g) return { ...res, diff: diffWords('', forms[0] || '', norm) };
  let best = null;
  for (const f of forms) {
    const w = norm(f);
    if (w === g) return { ...res, ok: true, expected: f };
    const score = mode === 'word' ? dist(g, w) : dist(tokens(g), tokens(w)) * 100 + dist(g, w);
    if (!best || score < best.score) best = { f, w, score };
  }
  res.expected = best.f;
  if (mode === 'word') {
    const tol = best.w.length >= 8 ? 2 : best.w.length >= 4 ? 1 : 0;
    if (dist(g, best.w) <= tol) return { ...res, ok: true, typo: true, expected: best.f };
  } else if (mode === 'sentence') {
    const a = tokens(g), b = tokens(best.w);
    if (a.length === b.length) {
      const bad = a.map((t, i) => (t === b[i] ? -1 : i)).filter((i) => i >= 0);
      if (bad.length === 1 && isTypo(a[bad[0]], b[bad[0]])) return { ...res, ok: true, typo: true, expected: best.f };
    }
  }
  res.diff = diffWords(input, best.f, norm);
  return res;
}

// Comparaison mot à mot (plus longue sous-suite commune) pour surligner les erreurs.
// Renvoie { given: [{t, ok}], want: [{t, ok}] } avec les mots tels qu'écrits.
export function diffWords(given, want, norm) {
  const raw = (s) => String(s).trim().split(/\s+/).filter(Boolean);
  const A = raw(given), B = raw(want);
  const a = A.map((t) => norm(t)), b = B.map((t) => norm(t));
  const n = a.length, m = b.length;
  const L = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) {
    L[i][j] = a[i] === b[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  }
  const okA = Array(n).fill(false), okB = Array(m).fill(false);
  for (let i = 0, j = 0; i < n && j < m;) {
    if (a[i] === b[j]) { okA[i] = okB[j] = true; i++; j++; } else if (L[i + 1][j] >= L[i][j + 1]) i++; else j++;
  }
  return { given: A.map((t, i) => ({ t, ok: okA[i] })), want: B.map((t, i) => ({ t, ok: okB[i] })) };
}

// Mots reconnus à l'oral comparés à la phrase modèle : part des mots du modèle retrouvés, dans l'ordre.
export function speechScore(heard, model, norm) {
  const d = diffWords(heard, model, norm);
  const total = d.want.length || 1;
  return { score: d.want.filter((w) => w.ok).length / total, diff: d };
}
