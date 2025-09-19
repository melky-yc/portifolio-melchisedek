/**
 * ========================================
 * SERVICE WORKER - PORTFÓLIO MELCHISEDEK
 * ========================================
 * Versão: 2.0.0
 * Descrição: Service Worker para funcionalidades PWA
 */

const STATIC_CACHE = 'static-v2.0.0';
const DYNAMIC_CACHE = 'dynamic-v2.0.0';

// Recursos para cache estático
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/script.js',
    '/manifest.json',
    '/img/melchisedek.webp',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Roboto:wght@300;400&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css'
];

// Recursos para cache dinâmico (imagens de projetos)
const DYNAMIC_ASSETS = [
    '/img/projects/',
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/'
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
    console.log('Service Worker: Instalando...');

    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('Service Worker: Cache estático aberto');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('Service Worker: Instalação concluída');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Service Worker: Erro na instalação:', error);
            })
    );
});

// Ativar Service Worker
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Ativando...');

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Service Worker: Removendo cache antigo:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Ativação concluída');
                return self.clients.claim();
            })
    );
});

// Interceptar requisições
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Estratégia para diferentes tipos de recursos
    if (request.method === 'GET') {
        if (url.origin === location.origin) {
            // Recursos locais - Cache First
            event.respondWith(cacheFirst(request));
        } else if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'cdnjs.cloudflare.com' || url.hostname === 'cdn.jsdelivr.net') {
            // Recursos externos - Stale While Revalidate
            event.respondWith(staleWhileRevalidate(request));
        } else {
            // Outros recursos - Network First
            event.respondWith(networkFirst(request));
        }
    }
});

// Estratégia Cache First
async function cacheFirst(request) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }

        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        console.error('Cache First Error:', error);
        return new Response('Recurso não disponível offline', { status: 503 });
    }
}

// Estratégia Stale While Revalidate
async function staleWhileRevalidate(request) {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);

    const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    }).catch(() => cachedResponse);

    return cachedResponse || fetchPromise;
}

// Estratégia Network First
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }

        // Fallback para páginas
        if (request.destination === 'document') {
            return caches.match('/index.html');
        }

        return new Response('Recurso não disponível offline', { status: 503 });
    }
}

// Limpeza de cache
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CLEAN_CACHE') {
        cleanOldCaches();
    }
});

async function cleanOldCaches() {
    const cacheNames = await caches.keys();
    const validCaches = [STATIC_CACHE, DYNAMIC_CACHE];

    const deletePromises = cacheNames
        .filter(cacheName => !validCaches.includes(cacheName))
        .map(cacheName => caches.delete(cacheName));

    await Promise.all(deletePromises);
    console.log('Service Worker: Cache limpo');
}

// Background Sync (se suportado)
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    console.log('Service Worker: Background sync executado');
    // Implementar lógica de sincronização em background
}

// Push Notifications (se suportado)
self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/icon-192x192.png',
            badge: '/badge-72x72.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            },
            actions: [
                {
                    action: 'explore',
                    title: 'Ver Portfólio',
                    icon: '/icon-192x192.png'
                },
                {
                    action: 'close',
                    title: 'Fechar',
                    icon: '/icon-192x192.png'
                }
            ]
        };

        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Click em notificação
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            self.clients.openWindow('/')
        );
    }
});

console.log('Service Worker: Carregado com sucesso');
