import { useState, useEffect } from 'react';
import { Bell, X, Check, Trash2, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
  read: boolean;
  createdAt: string;
  link?: string;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Bildirişləri yükləmək
  useEffect(() => {
    if (isOpen) {
      loadNotifications();
    }
  }, [isOpen]);
  
  // Bildirişlərin yenilənməsi üçün WebSocket bağlantısı
  useEffect(() => {
    // TODO: Burada real WebSocket bağlantısı qurulmalıdır
    const connect = () => {
      // Demo məqsədləri üçün simulyasiya edilmiş bağlantı
      console.log('WebSocket bağlantısı quruldu');
      
      // Yeni bildiriş gəldikdə bildirişlər siyahısını yeniləyirik
      const timer = setInterval(() => {
        if (Math.random() > 0.7) {
          const mockNotification: Notification = {
            id: `notif-${Date.now()}`,
            title: 'Yeni bildiriş',
            message: 'Bu demo məqsədləri üçün yaradılmış bir bildirişdir',
            type: 'info',
            read: false,
            createdAt: new Date().toISOString()
          };
          
          setNotifications(prev => [mockNotification, ...prev]);
        }
      }, 30000); // 30 saniyədən bir
      
      return () => {
        clearInterval(timer);
        console.log('WebSocket bağlantısı bağlandı');
      };
    };
    
    if (isOpen) {
      const disconnect = connect();
      return disconnect;
    }
  }, [isOpen]);
  
  // Bildirişləri yükləmək
  const loadNotifications = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Real API çağırışı
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Demo bildirişlər
      const mockNotifications: Notification[] = [
        {
          id: 'notif-1',
          title: 'Sifarişiniz təsdiq edildi',
          message: 'Sifarişiniz #12345 təsdiq edildi və hazırlanır',
          type: 'success',
          read: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
          link: '/orders/12345'
        },
        {
          id: 'notif-2',
          title: 'Yeni kolleksiya',
          message: 'Yeni yaz kolleksiyası artıq satışdadır',
          type: 'info',
          read: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
          link: '/products?collection=spring'
        },
        {
          id: 'notif-3',
          title: 'Kart məlumatınız yenilənməlidir',
          message: 'Sizin ödəniş kartınızın müddəti bitmək üzrədir',
          type: 'warning',
          read: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          link: '/profile/payment'
        }
      ];
      
      setNotifications(mockNotifications);
    } catch (err) {
      console.error('Bildirişlər yüklənərkən xəta baş verdi:', err);
      setError('Bildirişlər yüklənərkən xəta baş verdi');
    } finally {
      setLoading(false);
    }
  };
  
  // Bildirişi oxunmuş kimi işarələmək
  const markAsRead = async (id: string) => {
    try {
      // TODO: Real API çağırışı
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === id ? { ...notif, read: true } : notif
        )
      );
    } catch (err) {
      console.error('Bildiriş statusu yenilənərkən xəta baş verdi:', err);
    }
  };
  
  // Bütün bildirişləri oxunmuş kimi işarələmək
  const markAllAsRead = async () => {
    try {
      // TODO: Real API çağırışı
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setNotifications(prev => 
        prev.map(notif => ({ ...notif, read: true }))
      );
    } catch (err) {
      console.error('Bildiriş statusları yenilənərkən xəta baş verdi:', err);
    }
  };
  
  // Bildirişi silmək
  const deleteNotification = async (id: string) => {
    try {
      // TODO: Real API çağırışı
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setNotifications(prev => 
        prev.filter(notif => notif.id !== id)
      );
    } catch (err) {
      console.error('Bildiriş silinərkən xəta baş verdi:', err);
    }
  };
  
  // Vaxtı formatlamaq
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) return 'İndicə';
    if (diffMins < 60) return `${diffMins} dəqiqə əvvəl`;
    if (diffHours < 24) return `${diffHours} saat əvvəl`;
    if (diffDays < 7) return `${diffDays} gün əvvəl`;
    
    return date.toLocaleDateString('az-AZ');
  };
  
  // Bildiriş ikonunu əldə etmək
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <Check className="w-5 h-5 text-green-500" />;
      case 'error': return <X className="w-5 h-5 text-red-500" />;
      case 'warning': return <Bell className="w-5 h-5 text-amber-500" />;
      default: return <Bell className="w-5 h-5 text-blue-500" />;
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Qaranlıq arxa fon */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Bildiriş paneli */}
      <div className="relative w-full max-w-sm bg-white shadow-lg flex flex-col h-full animate-in slide-in-from-right">
        {/* Panel başlığı */}
        <div className="border-b p-4 flex items-center justify-between">
          <h2 className="text-lg font-medium">Bildirişlər</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Panel əməliyyatları */}
        <div className="border-b p-2 flex justify-end">
          <button
            onClick={markAllAsRead}
            disabled={notifications.every(n => n.read)}
            className="text-xs text-primary hover:text-primary/80 disabled:text-gray-400 px-2 py-1"
          >
            Hamısını oxunmuş kimi işarələ
          </button>
        </div>
        
        {/* Bildirişlər siyahısı */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">{error}</div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Heç bir bildiriş yoxdur</p>
            </div>
          ) : (
            <ul className="divide-y">
              {notifications.map(notification => (
                <li 
                  key={notification.id}
                  className={`
                    p-4 hover:bg-gray-50 relative 
                    ${notification.read ? '' : 'bg-blue-50/50'}
                  `}
                >
                  <div className="flex">
                    <div className="flex-shrink-0 mr-3 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <p className={`text-sm font-medium ${notification.read ? 'text-gray-700' : 'text-black'}`}>
                          {notification.title}
                        </p>
                        
                        <div className="flex items-center ml-2">
                          <span className="text-xs text-gray-500 whitespace-nowrap flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatTime(notification.createdAt)}
                          </span>
                        </div>
                      </div>
                      
                      <p className={`text-sm ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                        {notification.message}
                      </p>
                      
                      {notification.link && (
                        <a 
                          href={notification.link} 
                          className="text-primary text-xs hover:underline mt-1 inline-block"
                        >
                          Daha ətraflı
                        </a>
                      )}
                      
                      <div className="flex gap-2 mt-2">
                        {!notification.read && (
                          <button 
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-gray-500 hover:text-primary"
                          >
                            Oxunmuş kimi işarələ
                          </button>
                        )}
                        
                        <button 
                          onClick={() => deleteNotification(notification.id)}
                          className="text-xs text-gray-500 hover:text-red-500 flex items-center"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Sil
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {!notification.read && (
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary" />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
} 