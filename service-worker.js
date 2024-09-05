self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('digimon-store').then((cache) => cache.addAll([
            '/index.html',
            '/styles.css',
            '/app.js',
            '/manifest.json',
            '/icons/playstore.png'
            
        ]))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request))
    );
});
