const CACHE_NAME = 'extra';
const urlsToCache = ['/', '/index.html', '/app.js','/css/styles.css', '/manifest.json','/products.html'];

self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => {
        console.log("Files registered");
        return cache.addAll(urlsToCache);
    }));
});

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request).then(response => {
        return(response || fetch(event.request));
    }));
});

self .addEventListener('activate', event => {
    console.log('Service worker activated');
    
});