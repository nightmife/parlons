// Hors ligne : réseau d'abord (mises à jour immédiates), cache en secours.
// Incrémenter CACHE à chaque modification d'un fichier servi.
const CACHE = 'parlons-v1';
const CORE = ['./', 'index.html', 'css/app.css', 'manifest.webmanifest', 'icons/icon-180.png', 'icons/icon-192.png',
  'js/app.js', 'js/courses.js', 'js/check.js', 'js/srs.js', 'js/session.js', 'js/tasks.js', 'js/speech.js',
  'js/en/index.js', 'js/en/norm.js', 'js/en/verbs.js', 'js/en/vocab.js', 'js/en/lessons_a.js', 'js/en/lessons_b.js', 'js/en/phrases.js'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(fetch(req).then((res) => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
    return res;
  }).catch(() => caches.match(req, { ignoreSearch: true }).then((hit) => hit || caches.match('index.html'))));
});
