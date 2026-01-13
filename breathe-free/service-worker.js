self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("breathe-free").then(c =>
      c.addAll([
        "/",
        "/index.html",
        "/manifest.json",
        "/css/style.css",
        "/js/app.js",
        "/js/storage.js",
        "/js/program.js",
        "/js/ai.js",
        "/js/pro.js"
      ])
    )
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
self.addEventListener("install", e => {
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(fetch(e.request));
});

