const CACHE_NAME = 'autom8-cache-v1';
const FILES_TO_CACHE = [
  '/manifest.json',
  '/src/index.html',
  '/src/main.js',
  '/src/styles.css',
  '/public/assets/64x64logo.png',
  '/public/assets/265x265logo.png',
  '/public/assets/512x512logo.png',
  '/public/assets/screenshots/screenshot1.png',
  '/public/assets/screenshots/screenshot2.png',
  '/public/assets/screenshots/phone.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});