// MIND MOVE — service worker
// Strategy: network-first for everything. This means every time the
// developer pushes changes to GitHub and Vercel redeploys, visitors
// (including anyone who "installed" this site as an app) always get
// the freshest version automatically. The cache is only a fallback
// for when the device is offline.

const CACHE = 'mindmove-shell-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Only handle same-origin GET requests; let everything else
  // (Supabase, fonts, APIs, POSTs) go straight to the network.
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(request, copy)).catch(() => {});
        return response;
      })
      .catch(() => caches.match(request))
  );
});
