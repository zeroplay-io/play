const cacheName = "ZeroPlay-Backgammon GO: Fair Dice-1.8";
const contentToCache = [
    "Build/4f511168bee26cacca170f9f48e6d337.loader.js",
    "Build/75a5de9c3908e7a1efe3e74bad1de540.framework.js.br",
    "Build/1897cbd4621888a2f0906fa885add3f8.data.br",
    "Build/c48a475f819cf6a68a2856622159d4de.wasm.br",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
