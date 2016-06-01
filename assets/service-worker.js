const staticCacheName = 'static-';
const expectedCaches = [
  staticCacheName
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(staticCacheName).then(cache => {
      return cache.addAll([
        "/",
        "/assets/svg-sprite-action-symbol.svg",
        "/assets/svg-sprite-content-symbol.svg",
        "/assets/svg-sprite-editor-symbol.svg",
        "/assets/svg-sprite-image-symbol.svg",
        "/assets/svg-sprite-navigation-symbol.svg",
        "/assets/refugio.css",
        "/assets/main.js"
      ]).then(() => self.skipWaiting());
    })
  );
});

// remove caches that aren't in expectedCaches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!expectedCaches.includes(key)) return caches.delete(key);
      })
    ))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
