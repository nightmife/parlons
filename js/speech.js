// Voix de synthèse, reconnaissance vocale et enregistrement (repli quand la reconnaissance n'existe pas).

const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
let voices = [];
const listeners = new Set();

function loadVoices() {
  if (!synth) return;
  voices = synth.getVoices();
  listeners.forEach((f) => f(voices));
}
if (synth) {
  loadVoices();
  synth.addEventListener?.('voiceschanged', loadVoices);
}

export const canSpeak = () => !!synth;
export const onVoices = (f) => { listeners.add(f); return () => listeners.delete(f); };

// Voix disponibles pour une langue (« en » → en-US, en-GB, en-AU…), les plus naturelles d'abord.
export function voicesFor(lang) {
  const base = lang.split('-')[0];
  const score = (v) => (/premium|enhanced|natural|neural/i.test(v.name) ? 0 : 1) + (v.lang.replace('_', '-') === lang ? 0 : 2) + (v.localService ? 0 : 0.5);
  return voices.filter((v) => v.lang.replace('_', '-').toLowerCase().startsWith(base)).sort((a, b) => score(a) - score(b));
}

function pickVoice(lang, uri) {
  const list = voicesFor(lang);
  return list.find((v) => v.voiceURI === uri) || list.find((v) => v.lang.replace('_', '-') === lang) || list[0] || null;
}

// Prononce un texte. Renvoie une promesse résolue à la fin (ou tout de suite si la synthèse manque).
export function speak(text, { lang = 'en-US', voice = null, rate = 1 } = {}) {
  if (!synth || !text) return Promise.resolve();
  synth.cancel();
  return new Promise((resolve) => {
    const u = new SpeechSynthesisUtterance(text);
    const v = pickVoice(lang, voice);
    if (v) u.voice = v;
    u.lang = v ? v.lang : lang;
    u.rate = rate;
    u.onend = u.onerror = () => resolve();
    synth.speak(u);
    // Safari peut ne jamais émettre « end » si la page passe en arrière-plan.
    setTimeout(resolve, 2000 + text.length * 120 / rate);
  });
}
export const stopSpeaking = () => synth?.cancel();

// ---------- Reconnaissance vocale ----------

const SR = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;
export const canRecognize = () => !!SR;

// Écoute une phrase. Résout avec les transcriptions possibles (la plus probable d'abord).
// Rejette avec une erreur dont `code` vaut 'unsupported', 'denied', 'no-speech' ou 'error'.
export function listen(lang = 'en-US', { onInterim } = {}) {
  if (!SR) return { promise: Promise.reject(Object.assign(new Error('unsupported'), { code: 'unsupported' })), stop() {} };
  const rec = new SR();
  rec.lang = lang;
  rec.interimResults = true;
  rec.maxAlternatives = 5;
  rec.continuous = false;
  let finals = [];
  let interim = '';
  const promise = new Promise((resolve, reject) => {
    rec.onresult = (ev) => {
      interim = '';
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        const r = ev.results[i];
        if (r.isFinal) finals = [...r].map((a) => a.transcript.trim());
        else interim += r[0].transcript;
      }
      onInterim?.(finals[0] || interim);
    };
    rec.onerror = (ev) => {
      const code = ev.error === 'not-allowed' || ev.error === 'service-not-allowed' ? 'denied' : ev.error === 'no-speech' ? 'no-speech' : 'error';
      reject(Object.assign(new Error(ev.error), { code }));
    };
    rec.onend = () => {
      const out = finals.length ? finals : interim ? [interim.trim()] : [];
      if (out.length) resolve(out);
      else reject(Object.assign(new Error('no-speech'), { code: 'no-speech' }));
    };
  });
  try { rec.start(); } catch (e) { return { promise: Promise.reject(Object.assign(e, { code: 'error' })), stop() {} }; }
  return { promise, stop: () => { try { rec.stop(); } catch { /* déjà arrêtée */ } } };
}

// ---------- Enregistrement de sa voix ----------

export const canRecord = () => typeof window !== 'undefined' && !!(navigator.mediaDevices?.getUserMedia && window.MediaRecorder);

export async function record() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const type = ['audio/mp4', 'audio/webm', 'audio/ogg'].find((t) => MediaRecorder.isTypeSupported?.(t)) || '';
  const rec = new MediaRecorder(stream, type ? { mimeType: type } : undefined);
  const chunks = [];
  rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
  rec.start();
  return {
    stop: () => new Promise((resolve) => {
      rec.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        resolve(URL.createObjectURL(new Blob(chunks, { type: rec.mimeType || type || 'audio/mp4' })));
      };
      rec.stop();
    }),
  };
}
