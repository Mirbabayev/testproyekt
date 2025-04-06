/**
 * PWA funksionallığını idarə etmək üçün kitabxana
 * Bu fayl service worker qeydiyyatı, bildirişlər və offline funksionallıq üçün interfeys təqdim edir
 */

/**
 * Service Worker-i qeydiyyatdan keçirmək
 */
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service Worker bu brauzerdə dəstəklənmir');
    return null;
  }
  
  try {
    const registration = await navigator.serviceWorker.register('/service-worker.js', {
      scope: '/'
    });
    
    console.log('Service Worker uğurla qeydiyyatdan keçdi', registration.scope);
    return registration;
  } catch (error) {
    console.error('Service Worker qeydiyyatı zamanı xəta baş verdi:', error);
    return null;
  }
};

/**
 * Push bildirişləri üçün icazə almaq
 */
export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (!('Notification' in window)) {
    console.warn('Bu brauzerdə bildiriş dəstəklənmir');
    return 'denied';
  }
  
  if (Notification.permission === 'granted') {
    return Notification.permission;
  }
  
  const permission = await Notification.requestPermission();
  return permission;
};

/**
 * Push bildiriş abunəliyi üçün
 */
export const subscribeToPushNotifications = async (registration: ServiceWorkerRegistration): Promise<PushSubscription | null> => {
  if (!registration || !registration.pushManager) {
    console.warn('Push Manager mövcud deyil');
    return null;
  }
  
  try {
    const options = {
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        'YOUR_PUBLIC_VAPID_KEY' // TODO: Real VAPID key əlavə edin
      )
    };
    
    const subscription = await registration.pushManager.subscribe(options);
    
    // TODO: Burada backend-ə abunəliyi göndərmək lazımdır ki,
    // istifadəçiyə push bildiriş göndərmək mümkün olsun
    console.log('Push bildirişlərinə abunəlik:', subscription);
    
    return subscription;
  } catch (error) {
    console.error('Push bildirişlərinə abunəlik zamanı xəta:', error);
    return null;
  }
};

/**
 * Cache-dən oflayn məlumatları əldə etmək
 */
export const getCachedData = async (url: string): Promise<Response | null> => {
  if (!('caches' in window)) {
    console.warn('Cache API dəstəklənmir');
    return null;
  }
  
  try {
    const cache = await caches.open('perfume-store-v1');
    const cachedResponse = await cache.match(url);
    
    return cachedResponse;
  } catch (error) {
    console.error('Cache-dən məlumat əldə edilməsi zamanı xəta:', error);
    return null;
  }
};

/**
 * Məlumatları cache-ə saxlamaq
 */
export const cacheData = async (url: string, response: Response): Promise<void> => {
  if (!('caches' in window)) {
    console.warn('Cache API dəstəklənmir');
    return;
  }
  
  try {
    const cache = await caches.open('perfume-store-v1');
    await cache.put(url, response.clone());
  } catch (error) {
    console.error('Məlumatın cache-ə saxlanması zamanı xəta:', error);
  }
};

/**
 * Tətbiqin oflayn vəziyyətdə olub-olmadığını yoxlamaq
 */
export const isOffline = (): boolean => {
  return !navigator.onLine;
};

/**
 * Oflayn vəziyyət üçün event dinləyiciləri əlavə etmək
 */
export const setupOfflineListeners = (
  onOffline: () => void, 
  onOnline: () => void
): () => void => {
  window.addEventListener('offline', onOffline);
  window.addEventListener('online', onOnline);
  
  return () => {
    window.removeEventListener('offline', onOffline);
    window.removeEventListener('online', onOnline);
  };
};

/**
 * Tətbiqi "Add to Home Screen" kimi quraşdırmaq üçün yoxlamaq
 */
export const checkInstallationStatus = (): 'installed' | 'standalone' | 'browser' => {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return 'standalone';
  }
  
  // @ts-ignore
  if (window.navigator.standalone === true) {
    return 'standalone';
  }
  
  return 'browser';
};

/**
 * Base64 public key-i Uint8Array formatına çevirmək
 */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  
  return outputArray;
} 