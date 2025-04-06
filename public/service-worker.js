// Keş versiyası
const CACHE_VERSION = 'v1';
const CACHE_NAME = `perfume-store-${CACHE_VERSION}`;

// Keş ediləcək faylların siyahısı
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png',
  '/static/css/main.css',
  '/static/js/main.js',
];

// SW quraşdırılma hadisəsi
self.addEventListener('install', (event) => {
  console.log('Service Worker quraşdırılır...');
  
  // Keşi yaratmaq və faylları əlavə etmək
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Statik resurslar keşlənir');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('Statik resursların keşlənməsi başa çatdı');
        // Köhnə SW-i gözləmədən aktivləşdirmək
        return self.skipWaiting();
      })
  );
});

// SW aktivləşdirmə hadisəsi
self.addEventListener('activate', (event) => {
  console.log('Service Worker aktivləşdirilir...');
  
  // Köhnə keşləri təmizləmək
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Köhnə keş silinir:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker artıq aktiv və hazırdır');
        // SW-in bütün səhifələri nəzarət altına alması üçün
        return self.clients.claim();
      })
  );
});

// Şəbəkə sorğularını emal etmək
self.addEventListener('fetch', (event) => {
  // API sorğuları üçün şəbəkə-ilk (network-first) strategiyası
  if (event.request.url.includes('/api/')) {
    event.respondWith(networkFirstStrategy(event.request));
  } 
  // Statik resurslar üçün keş-ilk (cache-first) strategiyası
  else {
    event.respondWith(cacheFirstStrategy(event.request));
  }
});

// Keş-ilk strategiya
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    // Əgər resurs keşdə varsa, onu qaytarırıq
    return cachedResponse;
  }
  
  // Keşdə yoxdursa, şəbəkədən yükləyib keşə əlavə edirik
  try {
    const networkResponse = await fetch(request);
    
    // Yalnız GET sorğularını keşə əlavə edirik
    if (request.method === 'GET') {
      await updateCache(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Şəbəkə sorğusu zamanı xəta:', error);
    
    // Offline səhifəsini qaytara bilərik, əgər mövcuddursa
    return caches.match('/offline.html');
  }
}

// Şəbəkə-ilk strategiya
async function networkFirstStrategy(request) {
  try {
    // Əvvəlcə şəbəkədən yükləməyə çalışırıq
    const networkResponse = await fetch(request);
    
    // GET sorğusudursa və uğurludursa keşə əlavə edirik
    if (request.method === 'GET' && networkResponse.status === 200) {
      await updateCache(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Şəbəkə bağlantısı yoxdur, keşə baxılır');
    
    // Şəbəkə xətası varsa, keşdən oxumağa çalışırıq
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Heç bir variant yoxdursa, offline cavabını qaytarırıq
    return caches.match('/offline.html');
  }
}

// Keşi yeniləmək
async function updateCache(request, response) {
  if (!response || response.status !== 200) {
    return;
  }
  
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response);
}

// Push bildirişlərini qəbul etmək
self.addEventListener('push', (event) => {
  console.log('Push bildirişi alındı:', event);
  
  // Boş bildiriş deyilsə
  if (event.data) {
    try {
      const data = event.data.json();
      
      const options = {
        body: data.body,
        icon: data.icon || '/logo192.png',
        badge: data.badge || '/logo192.png',
        data: {
          url: data.url || '/'
        }
      };
      
      event.waitUntil(
        self.registration.showNotification(data.title, options)
      );
    } catch (error) {
      console.error('Push bildirişi emal edilərkən xəta:', error);
    }
  }
});

// Bildirişə klikləmə hadisəsi
self.addEventListener('notificationclick', (event) => {
  console.log('Bildirişə klik edildi', event);
  
  event.notification.close();
  
  // Bildirişin göstərdiyi URL-ə istiqamətləndirmək
  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
}); 