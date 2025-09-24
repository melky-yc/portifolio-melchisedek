/**
 * ========================================
 * SERVICE WORKER - PORTFÓLIO MELCHISEDEK
 * ========================================
 * Versão: 3.0.0
 * Descrição: Service Worker para funcionalidades PWA (SEM CACHE)
 */

const STATIC_CACHE = 'static-v3.0.0';
const DYNAMIC_CACHE = 'dynamic-v3.0.0';

// Recursos para cache estático (apenas para offline)
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/img/melchisedek.webp'
];

// Recursos para cache dinâmico (apenas para offline)
// const DYNAMIC_ASSETS = [
//     '/img/projects/'
// ];

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
            // Recursos locais - Network First (sempre atualizado)
            event.respondWith(networkFirst(request));
        } else if (url.hostname === 'fonts.googleapis.com' ||
                    url.hostname === 'cdnjs.cloudflare.com' ||
                    url.hostname === 'cdn.jsdelivr.net') {
            // Recursos externos - Network First
            event.respondWith(networkFirst(request));
        } else {
            // Outros recursos - Network First
            event.respondWith(networkFirst(request));
        }
    }
});

// Estratégia Network First (sempre busca na rede primeiro)
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            // Cache apenas para offline (não interfere na atualização)
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        // Fallback para cache apenas se offline
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
            icon: '/img/logoM.webp',
            badge: '/img/logoM.webp',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            },
            actions: [
                {
                    action: 'explore',
                    title: 'Ver Portfólio',
                    icon: '/img/logoM.webp'
                },
                {
                    action: 'close',
                    title: 'Fechar',
                    icon: '/img/logoM.webp'
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

console.log('Service Worker: Carregado com sucesso - Modo Network First (sem cache)');
