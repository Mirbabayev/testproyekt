import { useState, useEffect } from 'react';
import { Smartphone, Laptop, LogOut, AlarmClock, MapPin, Loader2, Clock, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { az } from 'date-fns/locale';

// Cihaz interfeysi
interface Device {
  id: string;
  type: 'mobile' | 'desktop' | 'tablet' | 'other';
  name: string;
  browser: string;
  os: string;
  ipAddress: string;
  location: string;
  lastActive: Date;
  isCurrent: boolean;
}

// Demo cihaz məlumatları - backend-dən gələcək
const DEMO_DEVICES: Device[] = [
  {
    id: 'device-001',
    type: 'desktop',
    name: 'Windows PC',
    browser: 'Chrome 98.0',
    os: 'Windows 10',
    ipAddress: '192.168.1.xx',
    location: 'Bakı, Azərbaycan',
    lastActive: new Date(),
    isCurrent: true,
  },
  {
    id: 'device-002',
    type: 'mobile',
    name: 'iPhone 13',
    browser: 'Safari 15.4',
    os: 'iOS 15.4',
    ipAddress: '192.168.2.xx',
    location: 'Bakı, Azərbaycan',
    lastActive: new Date(Date.now() - 3600000 * 24 * 2), // 2 gün əvvəl
    isCurrent: false,
  },
  {
    id: 'device-003',
    type: 'tablet',
    name: 'iPad Pro',
    browser: 'Safari 14.1',
    os: 'iPadOS 14.1',
    ipAddress: '192.168.3.xx',
    location: 'Sumqayıt, Azərbaycan',
    lastActive: new Date(Date.now() - 3600000 * 24 * 7), // 7 gün əvvəl
    isCurrent: false,
  }
];

// Cihaz növünə görə ikon
const DeviceIcon = ({ type }: { type: Device['type'] }) => {
  switch (type) {
    case 'mobile':
      return <Smartphone className="h-5 w-5 text-blue-500" />;
    case 'tablet':
      return <Smartphone className="h-5 w-5 text-purple-500" />;
    case 'desktop':
      return <Laptop className="h-5 w-5 text-teal-500" />;
    default:
      return <Laptop className="h-5 w-5 text-gray-500" />;
  }
};

export default function DeviceManager() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Cihaz məlumatlarını al
  useEffect(() => {
    const fetchDevices = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // TODO: Real API çağırışı
        // const response = await fetch('/api/user/devices');
        // const data = await response.json();
        // setDevices(data.devices);
        
        // Demo məlumatlar
        await new Promise(resolve => setTimeout(resolve, 1500));
        setDevices(DEMO_DEVICES);
      } catch (err) {
        setError('Cihaz məlumatları yüklənərkən xəta baş verdi');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDevices();
  }, []);
  
  // Cihazdan çıxış et
  const logoutDevice = async (deviceId: string) => {
    setIsLogoutLoading(true);
    setError(null);
    
    try {
      // TODO: Real API çağırışı
      // const response = await fetch(`/api/user/devices/${deviceId}/logout`, {
      //   method: 'POST',
      // });
      
      // if (!response.ok) throw new Error('Cihazdan çıxış zamanı xəta baş verdi');
      
      // Demo üçün
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Silmək əvəzinə cihazların siyahısından çıxaraq
      setDevices(devices.filter(device => device.id !== deviceId));
      setShowConfirmation(false);
      setSelectedDevice(null);
    } catch (err) {
      setError('Cihazdan çıxış zamanı xəta baş verdi');
    } finally {
      setIsLogoutLoading(false);
    }
  };
  
  // Bütün cihazlardan çıxış et
  const logoutAllDevices = async () => {
    setIsLogoutLoading(true);
    setError(null);
    
    try {
      // TODO: Real API çağırışı
      // const response = await fetch('/api/user/devices/logout-all', {
      //   method: 'POST',
      // });
      
      // if (!response.ok) throw new Error('Bütün cihazlardan çıxış zamanı xəta baş verdi');
      
      // Demo üçün
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Cari cihaz xaricində hamısını sil
      setDevices(devices.filter(device => device.isCurrent));
      setShowConfirmation(false);
      setSelectedDevice(null);
    } catch (err) {
      setError('Bütün cihazlardan çıxış zamanı xəta baş verdi');
    } finally {
      setIsLogoutLoading(false);
    }
  };
  
  // Zaman formatı
  const formatTime = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true, locale: az });
  };
  
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
        <p className="mt-2 text-gray-600">Cihazlar yüklənir...</p>
      </div>
    );
  }
  
  // Təsdiqlənmə dialoqu
  const renderConfirmationDialog = () => {
    if (!showConfirmation || !selectedDevice) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-4">
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <LogOut className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mt-3">Çıxışı təsdiqləyin</h3>
            <p className="text-sm text-gray-500 mt-1">
              {selectedDevice.id === 'all' 
                ? 'Bütün cihazlardan çıxış etmək istədiyinizə əminsiniz? Bu əməliyyat geri qaytarıla bilməz.'
                : `${selectedDevice.name} cihazından çıxış etmək istədiyinizə əminsiniz? Bu əməliyyat geri qaytarıla bilməz.`}
            </p>
          </div>
          
          <div className="mt-5 sm:flex sm:justify-center space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              onClick={() => setShowConfirmation(false)}
              className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              Ləğv et
            </button>
            <button
              onClick={() => {
                if (selectedDevice.id === 'all') {
                  logoutAllDevices();
                } else {
                  logoutDevice(selectedDevice.id);
                }
              }}
              disabled={isLogoutLoading}
              className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none"
            >
              {isLogoutLoading && <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />}
              {selectedDevice.id === 'all' ? 'Bütün cihazlardan çıxış et' : 'Çıxış et'}
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Aktiv cihazlar</h2>
          <p className="text-gray-600 text-sm mt-1">
            Hesabınıza giriş etmiş bütün cihazları idarə edin
          </p>
        </div>
        
        <button
          onClick={() => {
            setSelectedDevice({ id: 'all' } as Device);
            setShowConfirmation(true);
          }}
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <LogOut className="h-4 w-4 mr-1.5" />
          Bütün cihazlardan çıx
        </button>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="divide-y divide-gray-200">
        {devices.map((device) => (
          <div 
            key={device.id}
            className={`py-4 ${device.isCurrent ? 'bg-blue-50' : ''}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <div className="pt-1">
                  <DeviceIcon type={device.type} />
                </div>
                <div className="ml-3">
                  <div className="flex items-center">
                    <h3 className="text-sm font-medium text-gray-900">
                      {device.name}
                    </h3>
                    {device.isCurrent && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        Cari cihaz
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-gray-500">{device.browser} • {device.os}</p>
                  
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>Son aktivlik: {formatTime(device.lastActive)}</span>
                  </div>
                  
                  <div className="mt-1 flex items-center text-xs text-gray-500">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    <span>{device.location} • {device.ipAddress}</span>
                  </div>
                </div>
              </div>
              
              {!device.isCurrent && (
                <button
                  onClick={() => {
                    setSelectedDevice(device);
                    setShowConfirmation(true);
                  }}
                  className="ml-4 inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs rounded text-gray-700 bg-white hover:bg-gray-50"
                >
                  <LogOut className="h-3.5 w-3.5 mr-1.5" />
                  Çıxış et
                </button>
              )}
            </div>
          </div>
        ))}
        
        {devices.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-gray-500">Aktiv cihaz tapılmadı</p>
          </div>
        )}
      </div>
      
      {renderConfirmationDialog()}
    </div>
  );
} 