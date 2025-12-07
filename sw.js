/**
 * Weekly To-Do List App - Service Worker
 * Author: Weekly Team
 * Description: Service worker for PWA offline caching and functionality
 */

// Service Worker Version - Update this when you want to force cache refresh
const CACHE_VERSION = 'weekly-v1.0.0';

// Cache names
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;

// Files to cache immediately (static assets)
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    'https://cdn.tailwindcss.com'
];

// Maximum number of items in dynamic cache
const DYNAMIC_CACHE_LIMIT = 50;

// ===========================
// Service Worker Installation
// ===========================

/**
 * Install event - cache static assets
 */
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing service worker...', event);
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('[Service Worker] Precaching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .catch((error) => {
                console.error('[Service Worker] Error during precaching:', error);
            })
    );
    
    // Force the waiting service worker to become the active service worker
    self.skipWaiting();
});

// ===========================
// Service Worker Activation
// ===========================

/**
 * Activate event - clean up old caches
 */
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating service worker...', event);
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        // Delete old caches
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('[Service Worker] Removing old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[Service Worker] Service worker activated');
                // Claim clients immediately
                return self.clients.claim();
            })
    );
});

// ===========================
// Fetch Event - Caching Strategy
// ===========================

/**
 * Fetch event - serve from cache, fallback to network
 * Strategy: Cache first, then network
 */
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip cross-origin requests that aren't our CDN assets
    if (url.origin !== location.origin && !url.href.includes('cdn.tailwindcss.com')) {
        return;
    }
    
    event.respondWith(
        caches.match(request)
            .then((cacheResponse) => {
                // Return cached response if available
                if (cacheResponse) {
                    console.log('[Service Worker] Serving from cache:', request.url);
                    return cacheResponse;
                }
                
                // Otherwise fetch from network
                return fetch(request)
                    .then((networkResponse) => {
                        // Clone the response
                        const responseClone = networkResponse.clone();
                        
                        // Only cache successful responses
                        if (networkResponse.status === 200) {
                            caches.open(DYNAMIC_CACHE)
                                .then((cache) => {
                                    cache.put(request, responseClone);
                                    limitCacheSize(DYNAMIC_CACHE, DYNAMIC_CACHE_LIMIT);
                                })
                                .catch((error) => {
                                    console.error('[Service Worker] Error caching response:', error);
                                });
                        }
                        
                        console.log('[Service Worker] Serving from network:', request.url);
                        return networkResponse;
                    })
                    .catch((error) => {
                        console.error('[Service Worker] Fetch failed:', error);
                        
                        // Return offline page if available
                        if (request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});

// ===========================
// Background Sync (Optional)
// ===========================

/**
 * Background sync event for offline task creation
 * This allows tasks created offline to be synced when connection is restored
 */
self.addEventListener('sync', (event) => {
    console.log('[Service Worker] Background sync event:', event.tag);
    
    if (event.tag === 'sync-tasks') {
        event.waitUntil(
            syncTasks()
        );
    }
});

/**
 * Sync tasks (placeholder for future implementation)
 */
async function syncTasks() {
    console.log('[Service Worker] Syncing tasks...');
    // Placeholder for syncing tasks with a backend server
    // Currently, we use localStorage, so no server sync needed
    return Promise.resolve();
}

// ===========================
// Push Notifications (Optional)
// ===========================

/**
 * Push event for receiving push notifications
 * This can be used for server-sent reminders
 */
self.addEventListener('push', (event) => {
    console.log('[Service Worker] Push notification received:', event);
    
    let data = {
        title: 'Weekly Reminder',
        body: 'You have tasks due soon!',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-192x192.png'
    };
    
    if (event.data) {
        try {
            data = event.data.json();
        } catch (error) {
            console.error('[Service Worker] Error parsing push data:', error);
        }
    }
    
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: data.icon,
            badge: data.badge,
            vibrate: [200, 100, 200],
            tag: 'weekly-notification',
            requireInteraction: false
        })
    );
});

/**
 * Notification click event
 */
self.addEventListener('notificationclick', (event) => {
    console.log('[Service Worker] Notification clicked:', event);
    
    event.notification.close();
    
    // Open or focus the app
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientList) => {
                // If app is already open, focus it
                for (let client of clientList) {
                    if (client.url === '/' && 'focus' in client) {
                        return client.focus();
                    }
                }
                
                // Otherwise open a new window
                if (clients.openWindow) {
                    return clients.openWindow('/');
                }
            })
    );
});

// ===========================
// Utility Functions
// ===========================

/**
 * Limit cache size by removing oldest entries
 */
async function limitCacheSize(cacheName, maxItems) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    
    if (keys.length > maxItems) {
        // Delete the oldest entries (first in the array)
        const deleteCount = keys.length - maxItems;
        for (let i = 0; i < deleteCount; i++) {
            await cache.delete(keys[i]);
        }
        console.log(`[Service Worker] Trimmed ${deleteCount} items from ${cacheName}`);
    }
}

/**
 * Clear all caches (useful for debugging)
 */
async function clearAllCaches() {
    const cacheNames = await caches.keys();
    return Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName))
    );
}

// ===========================
// Message Handler
// ===========================

/**
 * Handle messages from the main app
 */
self.addEventListener('message', (event) => {
    console.log('[Service Worker] Message received:', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            clearAllCaches().then(() => {
                console.log('[Service Worker] All caches cleared');
            })
        );
    }
});

// ===========================
// Service Worker Lifecycle Logging
// ===========================

console.log('[Service Worker] Service Worker script loaded');
