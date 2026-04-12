const CACHE_NAME = 'birthmark-v1';
const urlsToCache = ['/'];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Use a Network-First strategy to ensure updates are seen
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // If network is successful, update cache
        if (event.request.method === 'GET') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // If network fails, fallback to cache
        return caches.match(event.request);
      })
  );
});