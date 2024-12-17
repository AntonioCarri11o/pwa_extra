const CACHE_NAME = 'extra';
const urlsToCache = 
[
    '/',
    '/index.html',
    '/products.html',
    '/app.js',
    '/css/styles.css',
    '/manifest.json',
    '/conection_notifier.js',
    '/pouchdb.js',
    'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/pouchdb@7.3.1/dist/pouchdb.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css'
];

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