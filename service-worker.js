const staticCacheName = 'static-';
const expectedCaches = [
  staticCacheName
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
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
      ]);
    })
  );
});

// remove caches that aren't in expectedCaches
/*self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!expectedCaches.includes(key)) return caches.delete(key);
      })
    ))
  );
});*/


self.addEventListener('fetch', event => {
  let request = event.request;
  let url = new URL(request.url);

  // Only deal with requests to my own server
  if (url.origin !== location.origin
      || request.method !== 'GET') {
      return;
  }

  if (url.pathname.endsWith('/')) {
    event.respondWith(caches.match('/'));
  } else {
    event.respondWith(
      caches.match(request).then(res => res || fetch(request))
    );
  }
});
