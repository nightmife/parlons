import { COURSES, DEFAULT_COURSE } from './courses.js';
import * as SRS from './srs.js';
import { buildQueue, createSession, answer, current, finished, overrule, shuffle } from './session.js';
import { resolve, isSrs } from './tasks.js';
import { expand, display, speechScore } from './check.js';
import * as Speech from './speech.js';

// ---------- État ----------

const KEY = 'parlons.v1';
const LEVELS = ['A1', 'A2', 'B1', 'B2'];
const LEVEL_NAME = { A1: 'Débutant', A2: 'Bases', B1: 'Intermédiaire', B2: 'Avancé' };
const LEVEL_DESC = {
  A1: 'Je commence ou je ne me souviens presque de rien.',
  A2: 'J’ai les bases du collège : je comprends des phrases simples.',
  B1: 'Je me débrouille, mais je fais beaucoup de fautes.',
  B2: 'Je parle assez bien, je veux être plus précis et naturel.',
};

const blank = () => ({
  v: 1, onboarded: false, course: DEFAULT_COURSE,
  settings: { level: 'A2', newPerDay: 10, maxReviews: 120, rate: 0.95, autoplay: true, accent: {}, voice: {}, method: true },
  courses: {}, log: {},
});

function sanitize(raw) {
  const s = { ...blank(), ...raw };
  s.settings = { ...blank().settings, ...(raw && raw.settings) };
  if (!LEVELS.includes(s.settings.level)) s.settings.level = 'A2';
  if (!COURSES[s.course]) s.course = DEFAULT_COURSE;
  for (const k of ['courses', 'log']) if (!s[k] || typeof s[k] !== 'object' || Array.isArray(s[k])) s[k] = {};
  for (const id of Object.keys(s.courses)) {
    const c = s.courses[id];
    if (!c || typeof c !== 'object') { delete s.courses[id]; continue; }
    if (!c.cards || typeof c.cards !== 'object') c.cards = {};
    if (!c.lessons || typeof c.lessons !== 'object') c.lessons = {};
    if (!Array.isArray(c.errors)) c.errors = [];
    for (const [cid, card] of Object.entries(c.cards)) {
      if (!card || !Number.isFinite(card.due) || !Number.isFinite(card.ivl)) delete c.cards[cid];
    }
  }
  return s;
}

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    if (raw && raw.v === 1) return sanitize(raw);
  } catch { /* stockage indisponible ou abîmé */ }
  return blank();
}

let S = load();
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { /* mode privé ou stockage plein */ }
}

const C = () => COURSES[S.course];
function CS() {
  return (S.courses[S.course] ||= { cards: {}, lessons: {}, errors: [] });
}
const accent = () => S.settings.accent[S.course] || C().voices[0][0];

// État d'écran non enregistré
const ui = { tab: 'today', stack: [], session: null, sheet: null, speak: null, drill: null, search: '', toast: null };

// ---------- Utilitaires ----------

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<em>$1</em>');
const pad = (n) => String(n).padStart(2, '0');
const dayKey = (t = Date.now()) => { const d = new Date(t); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
const plural = (n, one, many) => `${n} ${n > 1 ? many : one}`;
const pct = (a, b) => (b ? Math.round((100 * a) / b) : 0);
const norm = (x) => String(x).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
const fmtDay = (t) => new Date(t).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

const ICON = {
  today: '<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5zM4 9h16M8 2.5v3M16 2.5v3"/><path d="M8.5 14l2.2 2.2L15.5 12"/>',
  lessons: '<path d="M4 5.5C6.5 4 9.5 4 12 5.5v14C9.5 18 6.5 18 4 19.5zM20 5.5C17.5 4 14.5 4 12 5.5v14c2.5-1.5 5.5-1.5 8 0z"/>',
  words: '<path d="M4 18l5-12 5 12M5.8 14h6.4M15 9.5c.8-.6 1.7-.9 2.7-.9 1.6 0 2.8.9 2.8 2.6V18M20.5 13.2c-3.6 0-5.5.9-5.5 2.6 0 1.3 1 2.2 2.4 2.2 1.6 0 3.1-1.1 3.1-3"/>',
  verbs: '<path d="M4 7h10M4 12h16M4 17h7"/><circle cx="18" cy="7" r="2"/><circle cx="15" cy="17" r="2"/>',
  practice: '<path d="M12 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3z"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  cross: '<path d="M7 7l10 10M17 7L7 17"/>',
  chev: '<path d="M9 5l7 7-7 7"/>',
  gear: '<path d="M4 7h9M18 7h2M4 17h2M11 17h9"/><circle cx="15.5" cy="7" r="2.3"/><circle cx="8.5" cy="17" r="2.3"/>',
  chart: '<path d="M4 4v16h16M8 16v-4M12 16V8M16 16v-6"/>',
  speaker: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
  slow: '<path d="M3 15.5c0-3.6 3.2-6.5 7-6.5s7 2.9 7 6.5"/><path d="M17 13.5c1.4-.2 2.5-1.2 3-2.5M2 15.5h17.5M6 15.5V18M14 15.5V18"/>',
  mic: '<path d="M12 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3z"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
  stop: '<rect x="6.5" y="6.5" width="11" height="11" rx="2"/>',
  play: '<path d="M8 5.5v13l10-6.5z"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/>',
  next: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  prev: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
  pen: '<path d="M4 20l4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10zM14 7.5l2.5 2.5"/>',
  ear: '<path d="M7 9a5 5 0 0 1 10 0c0 3-3 4-3 7a3 3 0 0 1-5.5 1.6"/><path d="M10 9a2 2 0 0 1 4 0"/>',
  undo: '<path d="M9 14L4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/>',
};
const ic = (name, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICON[name]}</svg>`;

function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('on');
  clearTimeout(ui.toast);
  ui.toast = setTimeout(() => t.classList.remove('on'), 2600);
}

// ---------- Audio ----------

function say(text, slow = false) {
  if (!text) return Promise.resolve();
  const rate = S.settings.rate * (slow ? 0.7 : 1);
  return Speech.speak(text, { lang: accent(), voice: S.settings.voice[S.course] || null, rate });
}
const sayBtn = (text, cls = '', label = 'Écouter') => (Speech.canSpeak() && text
  ? `<button type="button" class="say ${cls}" data-a="say" data-t="${esc(text)}" aria-label="${label}">${ic('speaker')}</button>` : '');
const slowBtn = (text) => (Speech.canSpeak() && text
  ? `<button type="button" class="say" data-a="say" data-t="${esc(text)}" data-slow="1" aria-label="Écouter lentement">${ic('slow')}</button>` : '');

// ---------- Journal d'activité ----------

function logDay() {
  return (S.log[dayKey()] ||= { n: 0, ok: 0, nw: 0, sec: 0 });
}
let lastTick = 0;
function logAnswer(ok) {
  const d = logDay();
  d.n += 1;
  if (ok) d.ok += 1;
  const now = Date.now();
  if (lastTick) d.sec += Math.min(90, Math.round((now - lastTick) / 1000));
  lastTick = now;
}
function streak() {
  let n = 0;
  const t = new Date();
  if (!S.log[dayKey(t)]?.n) t.setDate(t.getDate() - 1);
  while (S.log[dayKey(t)]?.n) { n += 1; t.setDate(t.getDate() - 1); }
  return n;
}
function recentStats(days) {
  let n = 0, ok = 0, sec = 0, active = 0;
  const t = new Date();
  for (let i = 0; i < days; i++) {
    const d = S.log[dayKey(t)];
    if (d) { n += d.n; ok += d.ok; sec += d.sec; if (d.n) active += 1; }
    t.setDate(t.getDate() - 1);
  }
  return { n, ok, sec, active };
}

// ---------- Cartes ----------

const card = (id) => CS().cards[id];
const stageOf = (id) => SRS.stage(card(id));

function dueIds(now = Date.now()) {
  const cards = CS().cards;
  return Object.keys(cards)
    .filter((id) => cards[id].n > 0 && SRS.isDue(cards[id], now) && resolve(C(), id))
    .sort((a, b) => cards[a].due - cards[b].due);
}

function themeOrder() {
  const L = LEVELS.indexOf(S.settings.level);
  const rank = (t) => { const i = LEVELS.indexOf(t.level); return i >= L ? i - L : 10 + (L - i); };
  return [...C().themes].sort((a, b) => rank(a) - rank(b));
}

function newWordIds(limit, themeId) {
  const out = [];
  const themes = themeId ? C().themes.filter((t) => t.id === themeId) : themeOrder();
  for (const t of themes) for (const w of t.words) {
    if (out.length >= limit) return out;
    if (!card(`v:${w.id}`)?.n) out.push(`v:${w.id}`);
  }
  return out;
}
const newLeftToday = () => Math.max(0, S.settings.newPerDay - (S.log[dayKey()]?.nw || 0));

function nextIrregulars(limit) {
  return [...C().verbs.irregular].sort((a, b) => a.rank - b.rank)
    .filter((v) => !card(`i:${v.id}`)?.n).slice(0, limit).map((v) => `i:${v.id}`);
}

function addError(id, given) {
  const E = CS().errors.filter((e) => e.id !== id);
  E.unshift({ id, given: String(given).slice(0, 200), t: Date.now() });
  CS().errors = E.slice(0, 80);
}
const removeError = (id) => { CS().errors = CS().errors.filter((e) => e.id !== id); };

// Index des mots anglais : reconnaître une réponse juste mais qui correspond à un autre mot de la liste.
let wordIndex = null;
function otherWord(input, id) {
  if (!wordIndex) {
    wordIndex = new Map();
    for (const w of C().words) for (const f of expand(w.en)) {
      const k = C().normWord(f);
      if (!wordIndex.has(k)) wordIndex.set(k, []);
      wordIndex.get(k).push(w);
    }
  }
  const hits = wordIndex.get(C().normWord(input)) || [];
  return hits.find((w) => `v:${w.id}` !== id) || null;
}

// ---------- Séances ----------

const MODES = {
  daily: 'Séance du jour', lesson: 'Exercices', theme: 'Nouveaux mots', cram: 'Entraînement', errors: 'Mes erreurs',
  irregular: 'Verbes irréguliers', write: 'Écrire', drill: 'Conjugaison', dictation: 'Dictée',
};

// cram : les bonnes réponses sur des cartes pas encore dues ne changent pas leur planification.
function startSession(mode, queue, opts = {}) {
  if (!queue.length) { toast('Rien à travailler ici pour l’instant.'); return; }
  ui.session = {
    mode, title: opts.title || MODES[mode], s: createSession(queue), cram: !!opts.cram, lesson: opts.lesson || null,
    phase: null, task: null, result: null, prev: undefined, log: [], notice: '', input: '', started: Date.now(),
  };
  lastTick = Date.now();
  advance();
  render(true);
  focusAnswer();
}

function advance() {
  const se = ui.session;
  se.result = null; se.notice = ''; se.prev = undefined; se.input = '';
  while (!finished(se.s)) {
    const item = current(se.s);
    const task = resolve(C(), item.id);
    if (task) {
      se.task = task;
      se.phase = item.phase === 'new' && (task.kind === 'word' || task.kind === 'irregular') ? 'present' : 'ask';
      if (se.phase === 'present') {
        logDay().nw += task.kind === 'word' ? 1 : 0;
        save();
        if (S.settings.autoplay) say(task.say);
      } else if (task.kind === 'dictation') say(task.audio);
      return;
    }
    se.s.queue.shift(); // contenu retiré du cours
  }
  se.phase = 'done';
  se.task = null;
  if (se.lesson) {
    const L = CS().lessons[se.lesson] || {};
    const total = Object.keys(se.s.first).length;
    const ok = Object.values(se.s.first).filter((g) => g > 0).length;
    CS().lessons[se.lesson] = { done: Date.now(), ok, total, best: Math.max(L.best || 0, pct(ok, total)) };
    save();
  }
}

function applyGrade(id, grade) {
  const se = ui.session;
  const { schedule } = answer(se.s, grade);
  se.prev = card(id);
  if (schedule !== null && isSrs(id)) {
    const prev = card(id);
    const notDue = prev && prev.n > 0 && !SRS.isDue(prev, Date.now());
    if (!(se.cram && notDue && schedule > 0)) CS().cards[id] = SRS.review(prev || SRS.newCard(), schedule, Date.now());
  }
}

function submitAnswer(a, b) {
  const se = ui.session;
  const t = se.task;
  if (!t || se.phase !== 'ask') return;
  const empty = t.kind === 'irregular' ? !a.trim() && !b.trim() : !String(a).trim();
  const r = empty ? { ok: false, typo: false, expected: t.kind === 'irregular' ? `${t.verb.past} — ${t.verb.pp}` : display(t.spec), given: '', diff: null, gaveUp: true }
    : t.kind === 'irregular' ? t.check(a, b) : t.check(a);
  if (!r.ok && !empty && t.kind === 'word') {
    const w = otherWord(a, t.id);
    if (w) {
      se.notice = `« ${display(w.en)} » veut dire « ${w.fr} ». Ici, on cherche un autre mot : réessaie.`;
      se.input = a;
      render();
      focusAnswer();
      return;
    }
  }
  const grade = r.ok ? (r.typo ? 1 : 2) : 0;
  applyGrade(t.id, grade);
  logAnswer(r.ok);
  if (t.srs) {
    if (!r.ok && se.s.last?.phase !== 'new') addError(t.id, t.kind === 'irregular' ? `${a} — ${b}` : a);
    else if (r.ok && se.mode === 'errors') removeError(t.id);
  }
  se.result = r;
  se.input = a;
  se.inputB = b;
  se.phase = 'feedback';
  se.log.push({ id: t.id, ok: r.ok, prompt: t.prompt, expected: r.answer || r.expected, given: r.given });
  save();
  if (S.settings.autoplay && (t.kind !== 'dictation' || r.ok)) say(t.say);
  render();
  if (r.ok) focusAnswer(); else { document.activeElement?.blur(); scrollFeedback(); }
}

function nextItem() {
  if (!ui.session) return;
  advance();
  render(true);
  focusAnswer();
}

function focusAnswer() {
  const el = document.querySelector('#answer [name="a"]');
  if (!el) return;
  el.focus({ preventScroll: true });
  if (el.value) el.setSelectionRange(el.value.length, el.value.length);
}
function scrollFeedback() {
  requestAnimationFrame(() => document.querySelector('.feedback')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
}

function endSession() {
  ui.session = null;
  Speech.stopSpeaking();
  render(true);
}

// Lancements

function startDaily(extraNew = 0) {
  const due = dueIds().slice(0, S.settings.maxReviews);
  const fresh = newWordIds(newLeftToday() + extraNew);
  startSession('daily', buildQueue(due, fresh));
}
function startLesson(id) {
  const L = C().lessonById[id];
  startSession('lesson', L.ex.map((_, n) => ({ id: `g:${id}:${n}`, phase: 'learn', tries: 0 })), { cram: true, lesson: id, title: L.title });
}
function startTheme(id, practice = false) {
  const T = C().themes.find((t) => t.id === id);
  if (practice) {
    const ids = T.words.map((w) => `v:${w.id}`).filter((x) => card(x)?.n);
    startSession('cram', shuffle(ids).slice(0, 20).map((x) => ({ id: x, phase: 'review', tries: 0 })), { cram: true, title: T.name });
  } else {
    startSession('theme', newWordIds(10, id).map((x) => ({ id: x, phase: 'new', tries: 0 })), { title: T.name });
  }
}
function startErrors() {
  startSession('errors', CS().errors.slice(0, 30).map((e) => ({ id: e.id, phase: 'review', tries: 0 })).filter((q) => resolve(C(), q.id)), { cram: true });
}
function startIrregulars(practice = false) {
  if (practice) {
    const ids = C().verbs.irregular.map((v) => `i:${v.id}`).filter((x) => card(x)?.n);
    startSession('irregular', shuffle(ids).slice(0, 20).map((x) => ({ id: x, phase: 'review', tries: 0 })), { cram: true, title: 'Réviser les irréguliers' });
  } else {
    startSession('irregular', nextIrregulars(5).map((x) => ({ id: x, phase: 'new', tries: 0 })));
  }
}
function startWrite(groupId) {
  const G = C().phraseGroups.find((g) => g.id === groupId);
  startSession('write', G.items.map((p) => ({ id: `p:${p.id}`, phase: card(`p:${p.id}`)?.n ? 'review' : 'learn', tries: 0 })), { cram: true, title: G.name });
}
function startDictation() {
  const seen = C().words.filter((w) => card(`v:${w.id}`)?.n).map((w) => `d:v:${w.id}`);
  const lvl = LEVELS.indexOf(S.settings.level);
  const phr = C().phrases.filter((p) => LEVELS.indexOf(p.level) <= lvl + 1).map((p) => `d:p:${p.id}`);
  const pool = shuffle([...shuffle(seen).slice(0, 5), ...shuffle(phr).slice(0, 10)]).slice(0, 10);
  startSession('dictation', pool.map((id) => ({ id, phase: 'review', tries: 1 })), { title: 'Dictée' });
}
function startDrill() {
  const d = drillCfg();
  const V = C().verbs;
  const pool = d.verbs === 'irr' ? V.irregular.filter((v) => v.rank === 1) : d.verbs === 'reg' ? V.regular : V.all;
  const out = [];
  for (let i = 0; i < 12; i++) {
    const v = pool[Math.floor(Math.random() * pool.length)];
    const t = d.tenses[Math.floor(Math.random() * d.tenses.length)];
    const pol = d.pols[Math.floor(Math.random() * d.pols.length)];
    const p = [0, 1, 2, 3, 5, 6, 7][Math.floor(Math.random() * 7)]; // sans « it », peu naturel avec la plupart des verbes
    out.push({ id: `c:${v.id}:${t}:${p}:${pol}`, phase: 'review', tries: 1 });
  }
  startSession('drill', out);
}
function drillCfg() {
  return (ui.drill ||= { tenses: ['present', 'past', 'present_perfect'], pols: ['aff', 'neg', 'int'], verbs: 'irr' });
}

// ---------- Rendu : éléments communs ----------

function top(title, { eyebrow = '', back = false, actions = '' } = {}) {
  return `<header class="top">
    ${back ? `<button class="iconbtn" data-a="back" aria-label="Retour">${ic('back')}</button>` : ''}
    <div class="grow">${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}<h1>${esc(title)}</h1></div>
    ${actions}
  </header>`;
}
const section = (t) => `<h2 class="section">${esc(t)}</h2>`;
const levelTag = (l) => `<span class="lvl lvl-${l}">${l}</span>`;
const bar = (parts) => `<div class="bar">${parts.map(([v, cls]) => `<i class="${cls}" style="width:${v}%"></i>`).join('')}</div>`;

function row({ a, data = '', title, sub = '', left = '', right = '' }) {
  return `<button class="row" data-a="${a}" ${data}>
    ${left}<span class="grow"><b>${title}</b>${sub ? `<small>${sub}</small>` : ''}</span>${right}${ic('chev', 'muted')}
  </button>`;
}

// Leçon : petit format texte (## titre, | tableau |, > piège, = anglais // français, - liste).
function renderBody(text) {
  const out = [];
  let table = null, list = null;
  const flush = () => {
    if (table) {
      const head = table[0][0] === '';
      out.push(`<div class="tablewrap"><table>${table.map((cells, i) => `<tr>${cells.map((c, j) => (head && i === 0 ? `<th>${md(c)}</th>` : j === 0 ? `<th scope="row">${md(c)}</th>` : `<td>${md(c)}</td>`)).join('')}</tr>`).join('')}</table></div>`);
      table = null;
    }
    if (list) { out.push(`<ul>${list.map((l) => `<li>${md(l)}</li>`).join('')}</ul>`); list = null; }
  };
  for (const raw of text.trim().split('\n')) {
    const l = raw.trim();
    if (l.startsWith('|')) {
      if (list) flush();
      (table ||= []).push(l.replace(/^\||\|$/g, '').split('|').map((c) => c.trim()));
      continue;
    }
    if (l.startsWith('- ')) { if (table) flush(); (list ||= []).push(l.slice(2)); continue; }
    flush();
    if (!l) continue;
    if (l.startsWith('## ')) out.push(`<h3>${md(l.slice(3))}</h3>`);
    else if (l.startsWith('> ')) out.push(`<p class="tip">${md(l.slice(2))}</p>`);
    else if (l.startsWith('= ')) {
      const [en, fr] = l.slice(2).split(' // ');
      const spoken = en.replace(/\([^)]*\)/g, '').replace(/\s+/g, ' ');
      out.push(`<div class="example">${sayBtn(spoken, 'sm')}<div><p class="en">${md(en)}</p>${fr ? `<p class="fr">${md(fr)}</p>` : ''}</div></div>`);
    } else out.push(`<p>${md(l)}</p>`);
  }
  flush();
  return out.join('');
}

// ---------- Écrans principaux ----------

function viewToday() {
  const due = dueIds();
  const fresh = Math.min(newLeftToday(), newWordIds(newLeftToday()).length);
  const st = recentStats(7);
  const words = C().words.filter((w) => card(`v:${w.id}`)?.n).length;
  const known = C().words.filter((w) => stageOf(`v:${w.id}`) === 'known').length;
  const lessonsDone = C().lessons.filter((l) => CS().lessons[l.id]).length;
  const nextL = nextLesson();
  const errors = CS().errors.length;
  const todayLog = S.log[dayKey()];
  const total = due.length + fresh;
  const main = total
    ? `<div class="card hero">
        <p class="eyebrow">Séance du jour</p>
        <p class="big">${plural(due.length, 'révision', 'révisions')} · ${plural(fresh, 'nouveau mot', 'nouveaux mots')}</p>
        <p class="muted">Environ ${Math.max(2, Math.round((due.length * 9 + fresh * 30) / 60))} min. Tout ce que tu as appris revient juste avant que tu l’oublies.</p>
        <button class="btn primary" data-a="daily">Commencer</button>
      </div>`
    : `<div class="card hero done">
        <p class="eyebrow">Séance du jour</p>
        <p class="big">${todayLog?.n ? 'C’est fait pour aujourd’hui ✓' : 'Rien à réviser pour le moment'}</p>
        <p class="muted">${todayLog?.n ? `${plural(todayLog.n, 'réponse', 'réponses')}, ${pct(todayLog.ok, todayLog.n)} % de réussite.` : ''} Les révisions reviendront quand il le faudra.</p>
        <button class="btn soft" data-a="daily" data-extra="5">Apprendre 5 mots de plus</button>
      </div>`;
  return `${top('Aujourd’hui', {
    eyebrow: fmtDay(Date.now()),
    actions: `<button class="iconbtn" data-a="open" data-s="progress" aria-label="Progrès">${ic('chart')}</button>
      <button class="iconbtn" data-a="open" data-s="settings" aria-label="Réglages">${ic('gear')}</button>`,
  })}
  ${main}
  ${S.settings.method ? methodCard() : ''}
  ${nextL ? `${section('Prochaine leçon')}
    <button class="card lesson-next" data-a="lesson" data-id="${nextL.id}">
      ${levelTag(nextL.level)}<span class="grow"><b>${esc(nextL.title)}</b><small>${esc(nextL.goal)}</small></span>${ic('chev', 'muted')}
    </button>` : ''}
  ${errors ? `<button class="card row-card" data-a="errors">${ic('undo')}<span class="grow"><b>Revoir mes erreurs</b><small>${plural(errors, 'élément raté récemment', 'éléments ratés récemment')}</small></span>${ic('chev', 'muted')}</button>` : ''}
  ${section('Cette semaine')}
  <div class="stats">
    <div class="stat card"><b>${st.active}<i>/7</i></b><span>jours de travail</span></div>
    <div class="stat card"><b>${st.n ? pct(st.ok, st.n) : '–'}<i>${st.n ? ' %' : ''}</i></b><span>de réussite</span></div>
    <div class="stat card"><b>${Math.round(st.sec / 60)}<i> min</i></b><span>de travail</span></div>
  </div>
  <div class="stats">
    <div class="stat card"><b>${words}</b><span>mots vus</span></div>
    <div class="stat card"><b>${known}</b><span>mots acquis</span></div>
    <div class="stat card"><b>${lessonsDone}<i>/${C().lessons.length}</i></b><span>leçons</span></div>
  </div>`;
}

function methodCard() {
  return `<div class="card method">
    <button class="iconbtn ghostbtn" data-a="hideMethod" aria-label="Masquer">${ic('close')}</button>
    <h3>Comment ça marche</h3>
    <ol>
      <li><b>Comprendre.</b> Chaque point de grammaire est expliqué en français, avec les pièges des francophones.</li>
      <li><b>Produire.</b> Tu tapes toujours la réponse toi-même : pas de choix multiples à deviner.</li>
      <li><b>Répéter au bon moment.</b> Ce que tu as appris revient de plus en plus espacé, juste avant l’oubli. Une erreur le fait revenir vite.</li>
      <li><b>Parler.</b> Écoute, répète à voix haute, traduis à l’oral, fais des dictées.</li>
    </ol>
    <p class="muted">Le plus efficace : la séance du jour, tous les jours, même 10 minutes.</p>
  </div>`;
}

function nextLesson() {
  const L = LEVELS.indexOf(S.settings.level);
  const todo = C().lessons.filter((l) => !CS().lessons[l.id]);
  return todo.find((l) => LEVELS.indexOf(l.level) >= L) || todo[0] || null;
}

function viewLessons() {
  const done = CS().lessons;
  return `${top('Grammaire', { eyebrow: `${C().lessons.filter((l) => done[l.id]).length} leçons sur ${C().lessons.length}` })}
  ${LEVELS.map((lv) => {
    const list = C().lessons.filter((l) => l.level === lv);
    if (!list.length) return '';
    return `${section(`${lv} · ${LEVEL_NAME[lv]}`)}<div class="card list">${list.map((l) => {
      const d = done[l.id];
      const right = d ? `<span class="score ${d.best >= 80 ? 'good' : ''}">${d.best} %</span>` : '';
      return row({ a: 'lesson', data: `data-id="${l.id}"`, title: esc(l.title), sub: esc(l.goal), right });
    }).join('')}</div>`;
  }).join('')}`;
}

function viewWords() {
  const all = C().words.length;
  const seen = C().words.filter((w) => card(`v:${w.id}`)?.n).length;
  return `${top('Vocabulaire', { eyebrow: `${seen} mots vus sur ${all}` })}
  <form class="searchbox" data-submit="noop" role="search">${ic('search', 'muted')}
    <input type="search" placeholder="Chercher un mot (français ou anglais)" value="${esc(ui.search)}" data-f="search" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" enterkeyhint="search">
  </form>
  <div id="wres">${wordsBody()}</div>`;
}

function wordsBody() {
  const q = norm(ui.search);
  if (q.length >= 2) {
    const hits = C().words.filter((w) => norm(w.en).includes(q) || norm(w.fr).includes(q)).slice(0, 40);
    return `<div class="card list">${hits.length ? hits.map(wordRow).join('') : '<p class="empty">Aucun mot trouvé.</p>'}</div>`;
  }
  const counts = (t) => {
    let k = 0, l = 0;
    for (const w of t.words) { const s = stageOf(`v:${w.id}`); if (s === 'known') k++; else if (s === 'learning') l++; }
    return { k, l, n: t.words.length };
  };
  return LEVELS.map((lv) => {
    const list = themeOrder().filter((t) => t.level === lv);
    if (!list.length) return '';
    return `${section(`${lv} · ${LEVEL_NAME[lv]}`)}<div class="card list">${list.map((t) => {
      const c = counts(t);
      return `<button class="row theme" data-a="theme" data-id="${t.id}">
        <span class="grow"><b>${esc(t.name)}</b><small>${c.k ? `${c.k} acquis · ` : ''}${c.l ? `${c.l} en cours · ` : ''}${c.n - c.k - c.l} nouveaux</small>
        ${bar([[pct(c.k, c.n), 'k'], [pct(c.l, c.n), 'l']])}</span>${ic('chev', 'muted')}</button>`;
    }).join('')}</div>`;
  }).join('');
}

const STAGE = { new: ['nouveau', 'st-new'], learning: ['en cours', 'st-learn'], known: ['acquis', 'st-known'] };
function wordRow(w) {
  const s = stageOf(`v:${w.id}`);
  return `<div class="row word">
    ${sayBtn(display(w.en), 'sm')}
    <button class="grow wordbtn" data-a="word" data-id="${w.id}"><b lang="en">${esc(display(w.en))}</b><small>${esc(w.fr)}</small></button>
    <i class="dot ${STAGE[s][1]}" title="${STAGE[s][0]}"></i>
  </div>`;
}

function viewVerbs() {
  const V = C().verbs;
  const learned = V.irregular.filter((v) => card(`i:${v.id}`)?.n).length;
  const known = V.irregular.filter((v) => stageOf(`i:${v.id}`) === 'known').length;
  const d = drillCfg();
  return `${top('Verbes', { eyebrow: 'Conjugaison et irréguliers' })}
  <form class="searchbox big" data-submit="conjugate">${ic('search', 'muted')}
    <input name="verb" placeholder="Conjuguer un verbe : go, take, play…" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" enterkeyhint="go" lang="en">
    <button class="btn primary small">OK</button>
  </form>
  ${section('Verbes irréguliers')}
  <div class="card pad">
    <p><b>${learned}</b> verbes vus sur ${V.irregular.length}, dont <b>${known}</b> acquis.</p>
    ${bar([[pct(known, V.irregular.length), 'k'], [pct(learned - known, V.irregular.length), 'l']])}
    <div class="actions">
      <button class="btn soft" data-a="irregulars" data-practice="1" ${learned ? '' : 'disabled'}>Réviser</button>
      <button class="btn primary" data-a="irregulars" ${learned < V.irregular.length ? '' : 'disabled'}>Apprendre 5 verbes</button>
    </div>
    <button class="btn text" data-a="open" data-s="irrlist">Voir la liste complète</button>
  </div>
  ${section('Entraînement à la conjugaison')}
  <div class="card pad form">
    <div class="field"><span>Temps</span><div class="chips">${V.tenses.map((t) => `<button type="button" class="chip ${d.tenses.includes(t.id) ? 'on' : ''}" data-a="drillTense" data-id="${t.id}">${esc(t.name)}</button>`).join('')}</div></div>
    <div class="field"><span>Formes</span><div class="chips">${[['aff', 'Affirmatif'], ['neg', 'Négatif'], ['int', 'Question']].map(([k, n]) => `<button type="button" class="chip ${d.pols.includes(k) ? 'on' : ''}" data-a="drillPol" data-id="${k}">${n}</button>`).join('')}</div></div>
    <div class="field"><span>Verbes</span><div class="seg">${[['irr', 'Irréguliers'], ['reg', 'Réguliers'], ['all', 'Tous']].map(([k, n]) => `<button type="button" class="${d.verbs === k ? 'on' : ''}" data-a="drillVerbs" data-id="${k}">${n}</button>`).join('')}</div></div>
    <button class="btn primary" data-a="drill">Lancer 12 questions</button>
  </div>
  ${section('Les temps')}
  <div class="card list">${V.tenses.map((t) => `<div class="row static"><span class="grow"><b>${esc(t.name)}</b><small>${esc(t.fr)} · <em lang="en">${esc(V.conjugate('work', t.id, 0)[0])}</em></small></span></div>`).join('')}</div>`;
}

function viewPractice() {
  const groups = C().phraseGroups;
  const errors = CS().errors.length;
  const rec = Speech.canRecognize();
  return `${top('Pratique', { eyebrow: 'Parler, écouter, écrire' })}
  ${errors ? `<button class="card row-card" data-a="errors">${ic('undo')}<span class="grow"><b>Revoir mes erreurs</b><small>${plural(errors, 'élément', 'éléments')}</small></span>${ic('chev', 'muted')}</button>` : ''}
  <button class="card row-card" data-a="dictation">${ic('ear')}<span class="grow"><b>Dictée</b><small>10 phrases à écouter et à écrire</small></span>${ic('chev', 'muted')}</button>
  ${section('Parler')}
  <p class="muted pad">${rec ? 'Écoute la phrase, puis répète-la : l’app vérifie ce qu’elle a compris.' : 'Écoute la phrase, enregistre-toi et compare avec le modèle.'} Tu peux aussi traduire à l’oral depuis le français.</p>
  <div class="card list">${groups.map((g) => row({ a: 'speak', data: `data-id="${g.id}"`, title: esc(g.name), sub: `${g.items.length} phrases`, left: levelTag(g.level) })).join('')}</div>
  ${section('Écrire')}
  <p class="muted pad">Traduis des phrases utiles. Elles rejoignent ensuite tes révisions.</p>
  <div class="card list">${groups.map((g) => {
    const n = g.items.filter((p) => card(`p:${p.id}`)?.n).length;
    return row({ a: 'write', data: `data-id="${g.id}"`, title: esc(g.name), sub: n ? `${n}/${g.items.length} déjà travaillées` : `${g.items.length} phrases`, left: levelTag(g.level) });
  }).join('')}</div>`;
}

// ---------- Écrans empilés ----------

function viewLesson(id) {
  const L = C().lessonById[id];
  const d = CS().lessons[id];
  return `${top(L.title, { back: true, eyebrow: `${L.level} · ${LEVEL_NAME[L.level]}` })}
  <p class="goal">${esc(L.goal)}</p>
  <article class="card lesson">${renderBody(L.body)}</article>
  <div class="sticky-cta">
    ${d ? `<p class="muted center">Dernière fois : ${d.ok}/${d.total} du premier coup · meilleur score ${d.best} %</p>` : ''}
    <button class="btn primary" data-a="practiseLesson" data-id="${id}">${d ? 'Refaire les exercices' : `S’entraîner (${L.ex.length} exercices)`}</button>
  </div>`;
}

function viewTheme(id) {
  const T = C().themes.find((t) => t.id === id);
  const fresh = newWordIds(10, id).length;
  const seen = T.words.filter((w) => card(`v:${w.id}`)?.n).length;
  return `${top(T.name, { back: true, eyebrow: `${T.level} · ${T.words.length} mots` })}
  <div class="actions">
    <button class="btn soft" data-a="themePractice" data-id="${id}" ${seen ? '' : 'disabled'}>S’entraîner</button>
    <button class="btn primary" data-a="themeLearn" data-id="${id}" ${fresh ? '' : 'disabled'}>${fresh ? `Apprendre ${fresh} mots` : 'Tout est vu'}</button>
  </div>
  <div class="card list">${T.words.map(wordRow).join('')}</div>`;
}

function viewIrrList() {
  const V = C().verbs;
  const ranks = [[1, 'Indispensables'], [2, 'Courants'], [3, 'Moins fréquents']];
  return `${top('Verbes irréguliers', { back: true, eyebrow: `${V.irregular.length} verbes` })}
  ${ranks.map(([r, name]) => `${section(name)}<div class="card list">${V.irregular.filter((v) => v.rank === r).map((v) => {
    const s = stageOf(`i:${v.id}`);
    const forms = `${v.base}, ${v.past.split('/')[0]}, ${v.pp.split('/')[0]}`;
    return `<div class="row word">${sayBtn(forms, 'sm')}
      <button class="grow wordbtn" data-a="verb" data-id="${v.id}"><b lang="en">${esc(v.base)} · ${esc(v.past.replace('/', ' / '))} · ${esc(v.pp.replace('/', ' / '))}</b><small>${esc(v.fr)}</small></button>
      <i class="dot ${STAGE[s][1]}"></i></div>`;
  }).join('')}</div>`).join('')}`;
}

function viewVerb(id, pol = 'aff') {
  const V = C().verbs;
  const v = V.byId[id] || V.lookup(id);
  if (!v) return `${top('Verbe inconnu', { back: true })}`;
  const irr = V.irregularById[v.id];
  return `${top(`to ${v.base}`, { back: true, eyebrow: irr ? 'Verbe irrégulier' : v.guessed ? 'Conjugué avec les règles des verbes réguliers' : 'Verbe régulier' })}
  ${v.fr ? `<p class="goal">${esc(v.fr)}</p>` : ''}
  ${v.guessed ? '<p class="tip">Ce verbe n’est pas dans la liste de l’app : il est conjugué comme un verbe régulier. Vérifie s’il est irrégulier.</p>' : ''}
  ${irr ? `<div class="card pad forms3">${[['Base', irr.base], ['Prétérit', irr.past], ['Participe', irr.pp]].map(([k, f]) => `<div><small>${k}</small><b lang="en">${esc(f.replace('/', ' / '))}</b></div>`).join('')}
    ${sayBtn(`${irr.base}, ${irr.past.split('/')[0]}, ${irr.pp.split('/')[0]}`)}</div>` : ''}
  <div class="seg sticky-seg">${[['aff', 'Affirmatif'], ['neg', 'Négatif'], ['int', 'Question']].map(([k, n]) => `<button class="${pol === k ? 'on' : ''}" data-a="verbPol" data-id="${k}">${n}</button>`).join('')}</div>
  ${V.tenses.map((t) => {
    const lines = V.tablePersons.map((p) => V.tableRow(v.base, t.id, pol, p));
    return `<div class="card conj">
      <div class="conj-head"><span class="grow"><b>${esc(t.name)}</b><small>${esc(t.fr)}</small></span>${sayBtn(lines.join('. '), 'sm')}</div>
      <ul lang="en">${lines.map((l) => `<li>${esc(l)}</li>`).join('')}</ul></div>`;
  }).join('')}`;
}

function viewProgress() {
  const cards = Object.entries(CS().cards).filter(([id, c]) => c.n && resolve(C(), id));
  const kinds = { v: ['Mots', C().words.length], g: ['Exercices de grammaire', C().lessons.reduce((a, l) => a + l.ex.length, 0)], i: ['Verbes irréguliers', C().verbs.irregular.length], p: ['Phrases', C().phrases.length] };
  const by = {};
  for (const [id, c] of cards) {
    const k = id[0];
    by[k] ||= { k: 0, l: 0 };
    if (SRS.stage(c) === 'known') by[k].k++; else by[k].l++;
  }
  const fc = SRS.forecast(cards.map(([, c]) => c), Date.now(), 7);
  const maxF = Math.max(1, ...fc);
  const s7 = recentStats(7), s30 = recentStats(30);
  // 12 dernières semaines, du lundi au dimanche
  const weeks = [];
  const t = new Date();
  t.setDate(t.getDate() - ((t.getDay() + 6) % 7) - 7 * 11);
  for (let w = 0; w < 12; w++) {
    const col = [];
    for (let d = 0; d < 7; d++) {
      const k = dayKey(t);
      const n = S.log[k]?.n || 0;
      col.push(`<i class="h${n === 0 ? 0 : n < 20 ? 1 : n < 50 ? 2 : 3}${t > new Date() ? ' future' : ''}" title="${k} : ${n}"></i>`);
      t.setDate(t.getDate() + 1);
    }
    weeks.push(`<div>${col.join('')}</div>`);
  }
  const days = ['auj.', ...Array.from({ length: 6 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i + 1); return d.toLocaleDateString('fr-FR', { weekday: 'short' }).replace('.', ''); })];
  return `${top('Progrès', { back: true, eyebrow: `${streak()} jour${streak() > 1 ? 's' : ''} d’affilée` })}
  <div class="stats">
    <div class="stat card"><b>${s7.n ? pct(s7.ok, s7.n) : '–'}<i>${s7.n ? ' %' : ''}</i></b><span>réussite sur 7 jours</span></div>
    <div class="stat card"><b>${s30.n ? pct(s30.ok, s30.n) : '–'}<i>${s30.n ? ' %' : ''}</i></b><span>sur 30 jours</span></div>
    <div class="stat card"><b>${Math.round(s30.sec / 60)}<i> min</i></b><span>en 30 jours</span></div>
  </div>
  ${section('Ce que tu as appris')}
  <div class="card pad stack">${Object.entries(kinds).map(([k, [name, total]]) => {
    const b = by[k] || { k: 0, l: 0 };
    return `<div class="prog-item"><b>${name}</b><small>${b.k} acquis · ${b.l} en cours · ${total} au total</small>${bar([[pct(b.k, total), 'k'], [pct(b.l, total), 'l']])}</div>`;
  }).join('')}
  <p class="muted small">« Acquis » : revu avec succès sur des intervalles d’au moins 3 semaines.</p></div>
  ${section('Révisions à venir')}
  <div class="card pad"><div class="forecast">${fc.map((n, i) => `<div><span>${n}</span><i style="height:${Math.round((n / maxF) * 100)}%"></i><small>${days[i]}</small></div>`).join('')}</div></div>
  ${section('Activité (12 semaines)')}
  <div class="card pad"><div class="heat">${weeks.join('')}</div></div>`;
}

function viewSettings() {
  const st = S.settings;
  const voices = Speech.voicesFor(accent());
  const seg = (key, opts, cur) => `<div class="seg">${opts.map(([v, n]) => `<button class="${String(cur) === String(v) ? 'on' : ''}" data-a="set" data-k="${key}" data-v="${v}">${n}</button>`).join('')}</div>`;
  return `${top('Réglages', { back: true })}
  <div class="card pad form">
    <div class="field"><span>Mon niveau</span>${seg('level', LEVELS.map((l) => [l, l]), st.level)}<small>${esc(LEVEL_NAME[st.level])} : ${esc(LEVEL_DESC[st.level])}</small></div>
    <div class="field"><span>Nouveaux mots par jour</span>${seg('newPerDay', [[5, '5'], [10, '10'], [15, '15'], [20, '20']], st.newPerDay)}</div>
    <div class="field"><span>Révisions par séance (maximum)</span>${seg('maxReviews', [[50, '50'], [120, '120'], [250, '250']], st.maxReviews)}</div>
  </div>
  ${section('Voix')}
  <div class="card pad form">
    <div class="field"><span>Accent</span>${seg('accent', C().voices, accent())}</div>
    <div class="field"><span>Voix</span>
      ${voices.length ? `<div class="input"><select data-c="voice">${voices.map((v) => `<option value="${esc(v.voiceURI)}" ${st.voice[S.course] === v.voiceURI ? 'selected' : ''}>${esc(v.name)} (${esc(v.lang)})</option>`).join('')}</select></div>
      <small>Sur iPhone, des voix plus naturelles se téléchargent dans Réglages › Accessibilité › Contenu énoncé › Voix.</small>` : '<small>Aucune voix anglaise trouvée sur cet appareil.</small>'}</div>
    <div class="field"><span>Vitesse</span>${seg('rate', [[0.75, 'Lente'], [0.95, 'Normale'], [1.1, 'Rapide']], st.rate)}</div>
    <div class="field"><span>Lire la réponse automatiquement</span>${seg('autoplay', [[true, 'Oui'], [false, 'Non']], st.autoplay)}</div>
    <button class="btn soft" data-a="say" data-t="Hello! This is how I sound. Is this speed comfortable for you?">${ic('speaker')} Tester la voix</button>
  </div>
  ${section('Sauvegarde')}
  <div class="card pad stack">
    <p class="muted">Ta progression est enregistrée sur ce téléphone. Exporte-la de temps en temps pour ne rien perdre.</p>
    <div class="actions">
      <button class="btn soft" data-a="export">Exporter</button>
      <label class="btn soft">Importer<input type="file" accept="application/json,.json" data-c="import" hidden></label>
    </div>
    <button class="btn text" data-a="showMethod">Revoir « Comment ça marche »</button>
    <button class="btn danger" data-a="reset">Tout effacer</button>
  </div>
  <p class="muted center small">Parlons · tout fonctionne hors ligne</p>`;
}

// ---------- Séance : rendu ----------

function viewSession() {
  const se = ui.session;
  const s = se.s;
  const progress = s.total ? Math.min(100, pct(s.answered, s.answered + s.queue.length)) : 100;
  const head = `<header class="sess-top">
    <button class="iconbtn" data-a="quit" aria-label="Quitter">${ic('close')}</button>
    <div class="grow"><p class="eyebrow">${esc(se.title)}</p><div class="progress"><i style="width:${progress}%"></i></div></div>
    <span class="count">${s.queue.length}</span>
  </header>`;
  if (se.phase === 'done') return head + viewSummary();
  const t = se.task;
  if (se.phase === 'present') return head + viewPresent(t);
  return head + viewAsk(t);
}

function viewPresent(t) {
  if (t.kind === 'irregular') {
    const v = t.verb;
    return `<section class="card present">
      <p class="eyebrow">Nouveau verbe</p>
      <p class="word-en" lang="en">to ${esc(v.base)}</p>
      <p class="word-fr">${esc(v.fr)}</p>
      <div class="forms3">${[['Base', v.base], ['Prétérit', v.past], ['Participe', v.pp]].map(([k, f]) => `<div><small>${k}</small><b lang="en">${esc(f.replace('/', ' / '))}</b></div>`).join('')}</div>
      <div class="say-row">${sayBtn(t.say)}${slowBtn(t.say)}</div>
      <p class="muted">Exemple : <em lang="en">${esc(C().verbs.conjugate(v.base, 'past', 3)[0])} · ${esc(C().verbs.conjugate(v.base, 'present_perfect', 3)[0])}</em></p>
    </section>
    ${presentActions()}`;
  }
  const w = t.word;
  return `<section class="card present">
    <p class="eyebrow">Nouveau mot · ${esc(C().themes.find((x) => x.id === w.theme)?.name || '')}</p>
    <p class="word-en" lang="en">${esc(display(w.en))}</p>
    ${expand(w.en).length > 1 ? `<p class="alts">aussi : <span lang="en">${esc(expand(w.en).slice(1).join(', '))}</span></p>` : ''}
    <p class="word-fr">${esc(w.fr)}</p>
    <div class="say-row">${sayBtn(display(w.en))}${slowBtn(display(w.en))}</div>
    <div class="example">${sayBtn(w.ex, 'sm')}<p class="en">${esc(w.ex)}</p></div>
    ${w.note ? `<p class="tip">${md(w.note)}</p>` : ''}
  </section>
  ${presentActions()}`;
}
const presentActions = () => `<div class="actions sess-actions">
  <button class="btn soft" data-a="known">Je le connais déjà</button>
  <button class="btn primary" data-a="learn">À moi d’essayer</button>
</div>`;

function viewAsk(t) {
  const se = ui.session;
  const fb = se.phase === 'feedback';
  const r = se.result;
  const attrs = `autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" lang="en" enterkeyhint="${fb ? 'next' : 'go'}"`;
  let prompt = '';
  if (t.kind === 'dictation') {
    prompt = `<div class="say-row big">${sayBtn(t.audio, 'lg', 'Réécouter')}${slowBtn(t.audio)}</div><p class="muted center">Écoute autant de fois que tu veux.</p>`;
  } else if (t.kind === 'fill') {
    const [a, b] = t.prompt.split('___');
    const filled = fb ? `<u class="ok">${esc(r.ok ? se.input : (r.answer ?? ''))}</u>` : '<u class="blank">&nbsp;</u>';
    prompt = `<p class="prompt en" lang="en">${esc(a)}${filled}${esc(b)}</p>${t.hint ? `<p class="hint">${esc(t.hint)}</p>` : ''}`;
  } else if (t.kind === 'irregular') {
    prompt = `<p class="prompt en" lang="en">${esc(t.prompt)}</p><p class="sub">${esc(t.sub)}</p>`;
  } else if (t.kind === 'conj') {
    prompt = `<p class="prompt en" lang="en">${esc(t.prompt)}</p><p class="sub">${esc(t.sub)}</p>`;
  } else {
    const en = t.kind === 'fix' || t.kind === 'rewrite';
    prompt = `<p class="prompt ${en ? 'en' : ''}" ${en ? 'lang="en"' : ''}>${esc(t.prompt)}</p>`;
  }
  const inputs = t.kind === 'irregular'
    ? `<div class="grid2">
        <label class="field"><span>Prétérit</span><div class="input ${fb ? (r.okA ? 'is-ok' : 'is-bad') : ''}"><input name="a" ${attrs} value="${esc(fb ? se.input || '' : '')}" data-enter="b"></div></label>
        <label class="field"><span>Participe passé</span><div class="input ${fb ? (r.okB ? 'is-ok' : 'is-bad') : ''}"><input name="b" ${attrs} value="${esc(fb ? se.inputB || '' : '')}"></div></label>
      </div>`
    : t.kind === 'fix' || t.kind === 'translate' || t.kind === 'rewrite' || t.kind === 'dictation'
      ? `<div class="input area ${fb ? (r.ok ? 'is-ok' : 'is-bad') : ''}"><textarea name="a" rows="2" ${attrs} placeholder="${t.kind === 'fix' ? '' : 'Écris en anglais…'}">${esc(se.input || (fb ? '' : t.prefill || ''))}</textarea></div>`
      : `<div class="input ${fb ? (r.ok ? 'is-ok' : 'is-bad') : ''}"><input name="a" ${attrs} value="${esc(se.input || '')}" placeholder="${t.kind === 'fill' ? 'Le mot manquant…' : 'En anglais…'}"></div>`;
  return `<section class="card ask">
    <p class="eyebrow">${esc(t.title)}${t.lesson && ui.session.mode !== 'lesson' ? ` · ${esc(t.lesson.title)}` : ''}</p>
    ${prompt}
  </section>
  <form id="answer" data-submit="answer" class="answer">
    ${se.notice ? `<p class="notice">${esc(se.notice)}</p>` : ''}
    ${inputs}
    ${fb ? feedback(t, r) : `<div class="actions sess-actions">
      <button type="button" class="btn soft" data-a="giveUp">Je ne sais pas</button>
      <button class="btn primary">Vérifier</button>
    </div>`}
  </form>`;
}

function feedback(t, r) {
  const se = ui.session;
  const expected = t.kind === 'fill' ? t.say : t.kind === 'word' && !r.typo ? display(t.spec) : r.expected;
  const diff = r.diff && !r.gaveUp && !['fill', 'irregular', 'word'].includes(t.kind)
    ? `<p class="diff" lang="en">${r.diff.given.map((w) => `<span class="${w.ok ? '' : 'x'}">${esc(w.t)}</span>`).join(' ')}</p>` : '';
  const why = t.why ? `<p class="why">${md(t.why)}</p>` : '';
  const more = t.kind === 'word'
    ? `<div class="example">${sayBtn(t.ex, 'sm')}<p class="en" lang="en">${esc(t.ex)}</p></div>${t.note ? `<p class="tip">${md(t.note)}</p>` : ''}`
    : '';
  const alts = t.kind !== 'conj' && t.kind !== 'irregular' && t.kind !== 'dictation' && t.kind !== 'fill' && t.spec ? expand(t.spec).filter((x) => x !== expected) : [];
  const altsHtml = alts.length ? `<details class="alts"><summary>Autres réponses acceptées (${alts.length})</summary><ul lang="en">${alts.slice(0, 12).map((x) => `<li>${esc(x)}</li>`).join('')}</ul></details>` : '';
  const model = t.kind === 'word' ? display(t.spec) : t.say;
  if (r.ok) {
    return `<div class="feedback ok">
      <p class="verdict">${ic('check')} ${r.typo ? 'Juste, mais attention à l’orthographe' : ['Exact !', 'Bien joué !', 'Parfait.', 'Correct !'][se.s.answered % 4]}</p>
      <p class="model" lang="en">${sayBtn(t.say, 'sm')}${esc(model)}</p>
      ${more}
      <button class="btn primary">Continuer</button>
    </div>`;
  }
  return `<div class="feedback bad">
    <p class="verdict">${ic('cross')} ${r.gaveUp ? 'Voici la réponse' : 'Pas tout à fait'}</p>
    ${diff ? `<p class="label">Ta réponse</p>${diff}` : ''}
    <p class="label">${t.kind === 'irregular' ? 'Les formes' : 'La bonne réponse'}</p>
    <p class="model" lang="en">${sayBtn(t.say, 'sm')}${esc(expected)}</p>
    ${why}${more}${altsHtml}
    <div class="actions sess-actions">
      ${r.gaveUp ? '<span></span>' : '<button type="button" class="btn soft" data-a="overrule">J’avais bon</button>'}
      <button class="btn primary">Continuer</button>
    </div>
  </div>`;
}

function viewSummary() {
  const se = ui.session;
  const s = se.s;
  const total = Object.keys(s.first).length;
  const ok = Object.values(s.first).filter((g) => g > 0).length;
  const wrong = se.log.filter((l) => !l.ok);
  const seenWrong = new Set();
  const list = wrong.filter((l) => !seenWrong.has(l.id) && seenWrong.add(l.id));
  return `<section class="card summary">
    <p class="big">${total ? `${ok} / ${total}` : '✓'}</p>
    <p class="muted">${total ? `réussis du premier coup (${pct(ok, total)} %)` : 'Terminé'}</p>
    ${se.mode === 'lesson' ? '<p>Les exercices de cette leçon reviendront dans tes séances du jour, de plus en plus espacés.</p>' : ''}
    ${se.mode === 'theme' || (se.mode === 'daily' && Object.keys(s.first).some((id) => id.startsWith('v:'))) ? '<p>Les nouveaux mots reviendront demain, puis dans 3 jours, puis de plus en plus tard.</p>' : ''}
  </section>
  ${list.length ? `${section('À retenir')}<div class="card list">${list.map((l) => `<div class="row static"><span class="grow"><small>${esc(l.prompt)}</small><b lang="en">${esc(l.expected)}</b></span>${sayBtn(String(l.expected).split(' — ')[0], 'sm')}</div>`).join('')}</div>` : ''}
  <div class="sess-actions"><button class="btn primary" data-a="quit">Terminer</button></div>`;
}

// ---------- Parler ----------

function viewSpeak() {
  const sp = ui.speak;
  const G = C().phraseGroups.find((g) => g.id === sp.group);
  const p = G.items[sp.i];
  const model = p.en.split('|')[0];
  const translate = sp.mode === 'translate';
  const reveal = !translate || sp.revealed;
  const rec = Speech.canRecognize() && !sp.noRec;
  let result = '';
  if (sp.heard) {
    const res = translate
      ? p.en.split('|').map((x) => ({ x, ...speechScore(sp.heard, x, C().norm) })).sort((a, b) => b.score - a.score)[0]
      : { x: model, ...speechScore(sp.heard, model, C().norm) };
    const sc = Math.round(res.score * 100);
    result = `<div class="feedback ${sc >= 85 ? 'ok' : sc >= 60 ? 'mid' : 'bad'}">
      <p class="verdict">${sc >= 85 ? ic('check') + ' Très bien !' : sc >= 60 ? 'Presque : réessaie les mots en rouge' : 'Réessaie, en écoutant d’abord'} <span class="score">${sc} %</span></p>
      <p class="label">Compris</p><p class="heard" lang="en">« ${esc(sp.heard)} »</p>
      <p class="label">Modèle</p><p class="diff" lang="en">${res.diff.want.map((w) => `<span class="${w.ok ? 'okw' : 'x'}">${esc(w.t)}</span>`).join(' ')}</p>
    </div>`;
  } else if (sp.error) result = `<p class="notice">${esc(sp.error)}</p>`;
  const mine = sp.recording
    ? `<button class="btn rec on" data-a="recStop">${ic('stop')} Arrêter</button>`
    : sp.listening
      ? `<button class="btn rec on" data-a="micStop">${ic('mic')} J’écoute… (touche pour finir)</button>`
      : rec ? `<button class="btn rec" data-a="mic">${ic('mic')} ${translate ? 'Dis-le en anglais' : 'À toi : répète'}</button>`
        : Speech.canRecord() ? `<button class="btn rec" data-a="recStart">${ic('mic')} M’enregistrer</button>` : '';
  return `${top(G.name, { back: true, eyebrow: `Phrase ${sp.i + 1} sur ${G.items.length}` })}
  <div class="seg">${[['repeat', 'Répéter'], ['translate', 'Traduire à l’oral']].map(([k, n]) => `<button class="${sp.mode === k ? 'on' : ''}" data-a="speakMode" data-id="${k}">${n}</button>`).join('')}</div>
  <section class="card speak">
    ${translate ? `<p class="prompt">${esc(p.fr)}</p>` : ''}
    ${reveal ? `<p class="prompt en" lang="en">${esc(model)}</p>${translate ? '' : `<p class="fr">${esc(p.fr)}</p>`}
      <div class="say-row">${sayBtn(model, '', 'Écouter')}${slowBtn(model)}</div>` : ''}
    ${translate && !sp.revealed ? '<p class="muted center">Dis la phrase en anglais à voix haute, puis vérifie.</p>' : ''}
  </section>
  ${sp.interim ? `<p class="heard live" lang="en">${esc(sp.interim)}</p>` : ''}
  ${result}
  ${sp.audio ? `<div class="card pad"><p class="label">Ton enregistrement</p><audio controls src="${sp.audio}"></audio></div>` : ''}
  <div class="speak-actions">
    ${mine}
    ${translate && !sp.revealed ? '<button class="btn soft" data-a="reveal">Voir la réponse</button>' : ''}
    <div class="actions">
      <button class="btn soft" data-a="speakMove" data-d="-1" ${sp.i === 0 ? 'disabled' : ''}>${ic('prev')} Précédente</button>
      <button class="btn soft" data-a="speakMove" data-d="1" ${sp.i >= G.items.length - 1 ? 'disabled' : ''}>Suivante ${ic('next')}</button>
    </div>
  </div>`;
}

function speakReset() {
  const sp = ui.speak;
  Object.assign(sp, { heard: '', interim: '', error: '', revealed: false, listening: false, recording: null });
  if (sp.audio) { URL.revokeObjectURL(sp.audio); sp.audio = null; }
}

// ---------- Onboarding ----------

function viewOnboarding() {
  const st = S.settings;
  return `<div class="onboard">
    <div class="logo">${ic('spark')}</div>
    <h1>Parlons</h1>
    <p class="lead">Apprendre l’anglais pour de vrai : comprendre les règles, écrire les réponses soi-même, et réviser au bon moment.</p>
    ${section('Ton niveau')}
    <div class="stack">${LEVELS.map((l) => `<button class="card choice ${st.level === l ? 'on' : ''}" data-a="set" data-k="level" data-v="${l}">
      ${levelTag(l)}<span class="grow"><b>${LEVEL_NAME[l]}</b><small>${esc(LEVEL_DESC[l])}</small></span></button>`).join('')}</div>
    ${section('Accent')}
    <div class="seg">${C().voices.map(([v, n]) => `<button class="${accent() === v ? 'on' : ''}" data-a="set" data-k="accent" data-v="${v}">${n}</button>`).join('')}</div>
    ${section('Nouveaux mots par jour')}
    <div class="seg">${[5, 10, 15, 20].map((n) => `<button class="${st.newPerDay === n ? 'on' : ''}" data-a="set" data-k="newPerDay" data-v="${n}">${n}</button>`).join('')}</div>
    <p class="muted small">10 mots par jour, c’est environ 15 minutes avec les révisions. Tu pourras changer plus tard.</p>
    <button class="btn primary" data-a="start">C’est parti</button>
  </div>`;
}

// ---------- Rendu général ----------

const TABS = [['today', 'Aujourd’hui'], ['lessons', 'Grammaire'], ['words', 'Mots'], ['verbs', 'Verbes'], ['practice', 'Pratique']];
const VIEWS = { today: viewToday, lessons: viewLessons, words: viewWords, verbs: viewVerbs, practice: viewPractice };
const SCREENS = {
  lesson: (s) => viewLesson(s.id), theme: (s) => viewTheme(s.id), irrlist: viewIrrList, verb: (s) => viewVerb(s.id, s.pol),
  progress: viewProgress, settings: viewSettings, speak: viewSpeak,
};

let lastKey = '';
function render(toTop = false) {
  const view = $('#view');
  const tabs = $('#tabs');
  const screen = ui.stack.at(-1);
  const key = ui.session ? 'session' : !S.onboarded ? 'onboard' : screen ? `${screen.type}:${screen.id || ''}` : `tab:${ui.tab}`;
  const keep = !toTop && key === lastKey ? view.scrollTop : 0;
  lastKey = key;
  let html;
  if (!S.onboarded) html = viewOnboarding();
  else if (ui.session) html = viewSession();
  else if (screen) html = SCREENS[screen.type](screen);
  else html = VIEWS[ui.tab]();
  view.innerHTML = html;
  view.className = ui.session ? 'in-session' : '';
  view.scrollTop = keep;
  const showTabs = S.onboarded && !ui.session && !screen;
  tabs.hidden = !showTabs;
  if (showTabs) {
    const due = dueIds().length;
    tabs.innerHTML = TABS.map(([id, label]) => `<button class="${ui.tab === id ? 'on' : ''}" data-a="tab" data-tab="${id}" aria-label="${label}">
      <span class="tab-ic">${ic(id)}${id === 'today' && due ? `<em class="badge">${due > 99 ? '99+' : due}</em>` : ''}</span><span>${label}</span></button>`).join('');
  }
}

function push(screen) {
  ui.stack.push(screen);
  render(true);
}

// ---------- Actions ----------

const A = {
  tab: (d) => { ui.tab = d.tab; ui.stack = []; render(true); },
  back: () => {
    const s = ui.stack.pop();
    if (s?.type === 'speak') { Speech.stopSpeaking(); speakReset(); ui.speak = null; }
    render(true);
  },
  open: (d) => push({ type: d.s }),
  say: (d) => say(d.t, !!d.slow),
  set: (d) => {
    let v = d.v;
    if (v === 'true' || v === 'false') v = v === 'true';
    else if (/^\d+(\.\d+)?$/.test(v)) v = Number(v);
    if (d.k === 'accent') { S.settings.accent[S.course] = v; delete S.settings.voice[S.course]; } else S.settings[d.k] = v;
    save();
    render();
  },
  start: () => { S.onboarded = true; save(); try { navigator.storage?.persist?.(); } catch { /* facultatif */ } render(true); },
  hideMethod: () => { S.settings.method = false; save(); render(); },
  showMethod: () => { S.settings.method = true; save(); ui.stack = []; ui.tab = 'today'; render(true); },
  daily: (d) => startDaily(Number(d.extra) || 0),
  lesson: (d) => push({ type: 'lesson', id: d.id }),
  practiseLesson: (d) => startLesson(d.id),
  theme: (d) => push({ type: 'theme', id: d.id }),
  themeLearn: (d) => startTheme(d.id),
  themePractice: (d) => startTheme(d.id, true),
  word: (d) => openWord(d.id),
  verb: (d) => push({ type: 'verb', id: d.id, pol: 'aff' }),
  verbPol: (d) => { ui.stack.at(-1).pol = d.id; render(); },
  irregulars: (d) => startIrregulars(!!d.practice),
  errors: () => startErrors(),
  dictation: () => startDictation(),
  write: (d) => startWrite(d.id),
  drill: () => {
    const c = drillCfg();
    if (!c.tenses.length || !c.pols.length) { toast('Choisis au moins un temps et une forme.'); return; }
    startDrill();
  },
  drillTense: (d) => { const c = drillCfg(); c.tenses = c.tenses.includes(d.id) ? c.tenses.filter((x) => x !== d.id) : [...c.tenses, d.id]; render(); },
  drillPol: (d) => { const c = drillCfg(); c.pols = c.pols.includes(d.id) ? c.pols.filter((x) => x !== d.id) : [...c.pols, d.id]; render(); },
  drillVerbs: (d) => { drillCfg().verbs = d.id; render(); },
  // séance
  quit: () => endSession(),
  known: () => {
    const se = ui.session;
    applyGrade(se.task.id, 3);
    logAnswer(true);
    save();
    nextItem();
  },
  learn: () => { ui.session.phase = 'ask'; render(); focusAnswer(); },
  giveUp: () => submitAnswer('', ''),
  overrule: () => {
    const se = ui.session;
    const id = se.task.id;
    const before = se.prev;
    const { schedule } = overrule(se.s);
    if (isSrs(id)) {
      if (before) CS().cards[id] = before; else delete CS().cards[id];
      if (schedule !== null) CS().cards[id] = SRS.review(before || SRS.newCard(), schedule, Date.now());
      removeError(id);
    }
    const d = logDay(); d.ok += 1;
    const last = se.log.at(-1); if (last) last.ok = true;
    save();
    toast('D’accord, compté comme juste.');
    nextItem();
  },
  // parler
  speak: (d) => { ui.speak = { group: d.id, i: 0, mode: 'repeat' }; speakReset(); push({ type: 'speak', id: d.id }); },
  speakMode: (d) => { ui.speak.mode = d.id; speakReset(); render(); },
  speakMove: (d) => {
    const G = C().phraseGroups.find((g) => g.id === ui.speak.group);
    ui.speak.i = Math.max(0, Math.min(G.items.length - 1, ui.speak.i + Number(d.d)));
    speakReset();
    render();
    if (ui.speak.mode === 'repeat') say(G.items[ui.speak.i].en.split('|')[0]);
  },
  reveal: () => { ui.speak.revealed = true; render(); say(currentPhrase().en.split('|')[0]); },
  mic: () => startListening(),
  micStop: () => ui.speak.stopper?.(),
  recStart: () => startRecording(),
  recStop: () => stopRecording(),
  // données
  export: () => exportData(),
  reset: () => {
    if (!confirm('Effacer toute ta progression ? C’est définitif.')) return;
    S = blank(); save(); ui.stack = []; ui.tab = 'today'; render(true);
  },
};

const currentPhrase = () => C().phraseGroups.find((g) => g.id === ui.speak.group).items[ui.speak.i];

function startListening() {
  const sp = ui.speak;
  Speech.stopSpeaking();
  Object.assign(sp, { heard: '', interim: '', error: '', listening: true });
  const { promise, stop } = Speech.listen(accent(), { onInterim: (t) => { sp.interim = t; const el = document.querySelector('.heard.live'); if (el) el.textContent = t; else render(); } });
  sp.stopper = stop;
  render();
  promise.then((alts) => {
    const p = currentPhrase();
    const targets = sp.mode === 'translate' ? p.en.split('|') : [p.en.split('|')[0]];
    // parmi les transcriptions proposées, celle qui colle le mieux au modèle
    sp.heard = alts.map((h) => ({ h, s: Math.max(...targets.map((x) => speechScore(h, x, C().norm).score)) })).sort((a, b) => b.s - a.s)[0].h;
    if (sp.mode === 'translate') sp.revealed = true;
  }).catch((e) => {
    if (e.code === 'denied' || e.code === 'unsupported' || e.code === 'error') {
      sp.noRec = true;
      sp.error = 'La reconnaissance vocale n’est pas disponible ici (autorise le micro et la reconnaissance vocale dans les réglages de l’iPhone, ou active Siri et la dictée). Tu peux t’enregistrer à la place.';
    } else sp.error = 'Je n’ai rien entendu. Touche le micro et parle juste après.';
  }).finally(() => {
    sp.listening = false; sp.interim = ''; sp.stopper = null;
    if (ui.stack.at(-1)?.type === 'speak') render();
  });
}

async function startRecording() {
  const sp = ui.speak;
  try {
    Speech.stopSpeaking();
    if (sp.audio) { URL.revokeObjectURL(sp.audio); sp.audio = null; }
    sp.recording = await Speech.record();
    sp.error = '';
  } catch {
    sp.error = 'Impossible d’accéder au micro. Autorise-le dans les réglages.';
  }
  render();
}
async function stopRecording() {
  const sp = ui.speak;
  if (!sp.recording) return;
  const r = sp.recording;
  sp.recording = null;
  sp.audio = await r.stop();
  if (sp.mode === 'translate') sp.revealed = true;
  render();
}

function openWord(id) {
  const w = C().wordById[id];
  const c = card(`v:${id}`);
  const s = SRS.stage(c);
  ui.sheet = id;
  const next = c?.n ? (SRS.isDue(c, Date.now()) ? 'à réviser aujourd’hui' : `prochaine révision ${new Date(c.due).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}`) : 'pas encore appris';
  const sheet = $('#sheet');
  sheet.innerHTML = `<div class="sheet-bg" data-a="closeSheet"></div><div class="sheet-card" role="dialog" aria-modal="true">
    <div class="sheet-head"><span class="grow"></span><button class="iconbtn" data-a="closeSheet" aria-label="Fermer">${ic('close')}</button></div>
    <p class="word-en" lang="en">${esc(display(w.en))}</p>
    ${expand(w.en).length > 1 ? `<p class="alts">aussi : <span lang="en">${esc(expand(w.en).slice(1).join(', '))}</span></p>` : ''}
    <p class="word-fr">${esc(w.fr)}</p>
    <div class="say-row">${sayBtn(display(w.en))}${slowBtn(display(w.en))}</div>
    <div class="example">${sayBtn(w.ex, 'sm')}<p class="en" lang="en">${esc(w.ex)}</p></div>
    ${w.note ? `<p class="tip">${md(w.note)}</p>` : ''}
    <p class="muted"><i class="dot ${STAGE[s][1]}"></i> ${STAGE[s][0]} · ${next}</p>
    ${!c?.n ? `<button class="btn soft" data-a="markKnown" data-id="${id}">Je le connais déjà</button>` : ''}
  </div>`;
  sheet.hidden = false;
}
A.closeSheet = () => { $('#sheet').hidden = true; ui.sheet = null; };
A.markKnown = (d) => {
  CS().cards[`v:${d.id}`] = SRS.review(SRS.newCard(), 3, Date.now());
  save();
  A.closeSheet();
  render();
  toast('Noté : il reviendra dans une semaine pour vérifier.');
};

function exportData() {
  const blob = new Blob([JSON.stringify(S)], { type: 'application/json' });
  const name = `parlons-${dayKey()}.json`;
  const file = new File([blob], name, { type: 'application/json' });
  if (navigator.canShare?.({ files: [file] })) {
    navigator.share({ files: [file], title: 'Sauvegarde Parlons' }).catch(() => { /* annulé */ });
    return;
  }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.append(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}

async function importData(file) {
  try {
    const raw = JSON.parse(await file.text());
    if (!raw || raw.v !== 1 || !raw.courses) throw new Error('format');
    if (!confirm('Remplacer ta progression actuelle par cette sauvegarde ?')) return;
    S = sanitize(raw);
    S.onboarded = true;
    save();
    toast('Sauvegarde importée.');
    render(true);
  } catch {
    toast('Ce fichier n’est pas une sauvegarde Parlons.');
  }
}

// ---------- Événements ----------

document.addEventListener('click', (ev) => {
  const el = ev.target.closest('[data-a]');
  if (!el || el.disabled) return;
  ev.preventDefault();
  A[el.dataset.a]?.(el.dataset, el);
});

document.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const f = ev.target;
  const kind = f.dataset.submit;
  if (kind === 'answer') {
    const se = ui.session;
    if (!se) return;
    if (se.phase === 'feedback') { nextItem(); return; }
    const a = f.elements.a?.value ?? '';
    const b = f.elements.b?.value ?? '';
    submitAnswer(a, b);
  } else if (kind === 'conjugate') {
    const v = C().verbs.lookup(f.elements.verb.value);
    if (!v) { toast('Tape un verbe anglais, par exemple « take ».'); return; }
    push({ type: 'verb', id: v.id, pol: 'aff' });
  }
});

document.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape') { if (!$('#sheet').hidden) A.closeSheet(); return; }
  if (ev.key !== 'Enter') return;
  const el = ev.target;
  // Entrée dans un champ texte de réponse : valider (les zones de texte n'ont pas besoin de retour à la ligne).
  if (el.tagName === 'TEXTAREA' && el.form?.id === 'answer') {
    ev.preventDefault();
    if (el.form.requestSubmit) el.form.requestSubmit();
    else el.form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    return;
  }
  // Prétérit → participe passé
  if (el.dataset.enter && ui.session?.phase === 'ask') {
    ev.preventDefault();
    el.form.elements[el.dataset.enter]?.focus();
  }
});

document.addEventListener('input', (ev) => {
  const el = ev.target;
  if (el.dataset.f === 'search') {
    ui.search = el.value;
    const box = $('#wres');
    if (box) box.innerHTML = wordsBody();
  }
});

document.addEventListener('change', (ev) => {
  const el = ev.target;
  if (el.dataset.c === 'voice') { S.settings.voice[S.course] = el.value; save(); say('Hello! This is my voice.'); }
  if (el.dataset.c === 'import' && el.files?.[0]) importData(el.files[0]);
});

Speech.onVoices(() => { if (ui.stack.at(-1)?.type === 'settings') render(); });

// Nouveau jour pendant que l'app reste ouverte : le compteur de révisions change.
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && !ui.session) render();
});

render(true);

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('sw.js').catch(() => { /* hors ligne indisponible */ });
}
