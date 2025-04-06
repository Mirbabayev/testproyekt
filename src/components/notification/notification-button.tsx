import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { NotificationPanel } from './notification-panel';

interface NotificationButtonProps {
  className?: string;
}

export function NotificationButton({ className = '' }: NotificationButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Oxunmamış bildirişlərin sayını yükləmək
  useEffect(() => {
    const loadUnreadCount = async () => {
      try {
        // TODO: Real API çağırışı
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Demo məqsədləri üçün təsadüfi say
        setUnreadCount(Math.floor(Math.random() * 5));
      } catch (err) {
        console.error('Oxunmamış bildiriş sayı yüklənərkən xəta baş verdi:', err);
      }
    };
    
    loadUnreadCount();
    
    // Müəyyən intervallarla yeniləmək
    const interval = setInterval(loadUnreadCount, 60000); // Hər dəqiqə
    
    return () => clearInterval(interval);
  }, []);
  
  // WebSocket vasitəsilə real-time yeniləmələr
  useEffect(() => {
    // TODO: Real WebSocket bağlantısı
    const mockWebSocketUpdates = () => {
      // Demo məqsədləri üçün simulyasiya
      const timer = setInterval(() => {
        if (Math.random() > 0.8) {
          setUnreadCount(prev => prev + 1);
        }
      }, 120000); // Hər 2 dəqiqədən bir
      
      return () => clearInterval(timer);
    };
    
    const cleanup = mockWebSocketUpdates();
    return cleanup;
  }, []);
  
  // Paneli açdıqda bildirişləri oxunmuş kimi işarələ
  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen && unreadCount > 0) {
      // Bildiriş paneli açıldıqda, sayğacı sıfırlayırıq
      // Real tətbiqdə, bu, panel bağlandıqda baş verməlidir və server ilə sinxronlaşdırılmalıdır
      setTimeout(() => {
        setUnreadCount(0);
      }, 3000);
    }
  };
  
  return (
    <>
      <button
        onClick={handleToggle}
        className={`relative p-2 rounded-full hover:bg-gray-100 ${className}`}
        aria-label="Bildirişlər"
      >
        <Bell className="w-5 h-5" />
        
        {unreadCount > 0 && (
          <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      
      <NotificationPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
} 