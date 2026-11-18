// Service worker « Adopte un dinosaure » : permet de jouer hors ligne.
// Pense à changer la version à chaque mise à jour du jeu, sinon les joueurs garderont l'ancienne.
const CACHE = 'adopte-dino-v1';
const FICHIERS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(cles => Promise.all(cles.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Réseau d'abord pour la page (pour recevoir les mises à jour), cache sinon.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then(rep => { const copie = rep.clone(); caches.open(CACHE).then(c => c.put('./index.html', copie)); return rep; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Polices Google : mises en cache au premier passage pour le hors ligne.
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    e.respondWith(
      caches.match(e.request).then(enCache => enCache || fetch(e.request).then(rep => {
        const copie = rep.clone(); caches.open(CACHE).then(c => c.put(e.request, copie)); return rep;
      }))
    );
    return;
  }

  e.respondWith(caches.match(e.request).then(enCache => enCache || fetch(e.request)));
});
