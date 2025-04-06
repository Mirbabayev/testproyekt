import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import OfflineStatusBar from '../../components/offline/OfflineStatusBar';
import OfflineSync from '../../components/offline/OfflineSync';
import { OfflineManager, initNetworkListeners } from '../../lib/offline-mode';
import { CloudOff, Settings, ArrowDownCircle, RefreshCw, Check, Database } from 'lucide-react';

export default function OfflineDashboard() {
  const [isOfflineModeEnabled, setIsOfflineModeEnabled] = useState(OfflineManager.isOfflineModeEnabled());
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [activeTab, setActiveTab] = useState('overview');
  const [cachingProgress, setCachingProgress] = useState(0);
  const [isCaching, setIsCaching] = useState(false);
  const [cachedData, setCachedData] = useState({
    products: false,
    categories: false,
    images: false,
    settings: false
  });
  
  // Network dinləyicilərini başlat
  useEffect(() => {
    initNetworkListeners();
    
    const handleNetworkChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      setIsOnline(customEvent.detail?.isOnline ?? navigator.onLine);
    };
    
    const handleOfflineModeChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      setIsOfflineModeEnabled(customEvent.detail?.enabled ?? OfflineManager.isOfflineModeEnabled());
    };
    
    window.addEventListener('networkstatuschange', handleNetworkChange);
    window.addEventListener('offlinemodechange', handleOfflineModeChange);
    
    return () => {
      window.removeEventListener('networkstatuschange', handleNetworkChange);
      window.removeEventListener('offlinemodechange', handleOfflineModeChange);
    };
  }, []);
  
  // Offline rejimi aktiv/deaktiv et
  const toggleOfflineMode = () => {
    OfflineManager.setOfflineMode(!isOfflineModeEnabled);
  };
  
  // Demo: Məlumatları keşləmə
  const cacheData = async () => {
    if (isCaching) return;
    
    setIsCaching(true);
    setCachingProgress(0);
    setCachedData({
      products: false,
      categories: false,
      images: false,
      settings: false
    });
    
    // Məhsulları keşlə
    setCachingProgress(10);
    await new Promise(resolve => setTimeout(resolve, 700));
    setCachedData(prev => ({ ...prev, products: true }));
    
    // Kateqoriyaları keşlə
    setCachingProgress(35);
    await new Promise(resolve => setTimeout(resolve, 500));
    setCachedData(prev => ({ ...prev, categories: true }));
    
    // Şəkilləri keşlə
    setCachingProgress(60);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setCachedData(prev => ({ ...prev, images: true }));
    
    // Parametrləri keşlə
    setCachingProgress(90);
    await new Promise(resolve => setTimeout(resolve, 300));
    setCachedData(prev => ({ ...prev, settings: true }));
    
    // Tamamlandı
    setCachingProgress(100);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsCaching(false);
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              <CloudOff className="h-6 w-6 mr-2 text-primary" />
              Offline Rejimi
            </h1>
            <p className="text-gray-600 mt-1">
              İnternet bağlantısı olmadan işləmək üçün parametrlər və sinxronizasiya
            </p>
          </div>
          
          <div className="flex items-center">
            <span className={`mr-2 inline-flex h-3 w-3 rounded-full ${
              isOnline ? 'bg-green-500' : 'bg-amber-500'
            }`}></span>
            <span className="text-sm text-gray-700 mr-4">
              {isOnline ? 'Online' : 'Offline'}
            </span>
            
            <button
              onClick={toggleOfflineMode}
              className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${
                isOfflineModeEnabled
                  ? 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                  : 'border-transparent text-white bg-primary hover:bg-primary/90'
              }`}
            >
              {isOfflineModeEnabled ? 'Offline rejimi deaktiv et' : 'Offline rejimi aktiv et'}
            </button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Ümumi Baxış</TabsTrigger>
            <TabsTrigger value="sync">Sinxronizasiya</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-primary" />
                  Offline Rejim Parametrləri
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <div>
                      <h3 className="font-medium">Offline rejim</h3>
                      <p className="text-sm text-gray-500">İnternet bağlantısı olmadan işləməyə imkan verir</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={isOfflineModeEnabled}
                        onChange={toggleOfflineMode}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b">
                    <div>
                      <h3 className="font-medium">Avtomatik sinxronizasiya</h3>
                      <p className="text-sm text-gray-500">İnternet bağlantısı bərpa olunduqda məlumatları sinxronlaşdırır</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        defaultChecked={true}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b">
                    <div>
                      <h3 className="font-medium">Offline bildirişləri</h3>
                      <p className="text-sm text-gray-500">Offline rejimlə bağlı bildirişləri göstərir</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        defaultChecked={true}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <div>
                      <h3 className="font-medium">Offline məlumat keş limiti</h3>
                      <p className="text-sm text-gray-500">Offline saxlanılan məlumatların maksimum həcmi</p>
                    </div>
                    <select className="border border-gray-300 rounded-md text-sm p-2 bg-white">
                      <option value="10">10 MB</option>
                      <option value="50">50 MB</option>
                      <option value="100" selected>100 MB</option>
                      <option value="500">500 MB</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <ArrowDownCircle className="h-5 w-5 mr-2 text-primary" />
                  Offline Məlumat Yükləmə
                </h2>
                
                <p className="text-sm text-gray-600 mb-4">
                  Offline rejimində işləmək üçün lazım olan məlumatları əvvəlcədən yükləyin.
                  Bu əməliyyat internet bağlantısı tələb edir.
                </p>
                
                {isCaching && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Yüklənir...</span>
                      <span className="text-sm text-gray-500">{cachingProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full transition-all duration-500" 
                        style={{ width: `${cachingProgress}%` }}
                      ></div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center">
                        <span className={`mr-2 ${cachedData.products ? 'text-green-500' : 'text-gray-300'}`}>
                          {cachedData.products ? <Check className="h-4 w-4" /> : <RefreshCw className="h-4 w-4 animate-spin" />}
                        </span>
                        <span className="text-sm">Məhsul məlumatları</span>
                      </div>
                      <div className="flex items-center">
                        <span className={`mr-2 ${cachedData.categories ? 'text-green-500' : 'text-gray-300'}`}>
                          {cachedData.categories ? <Check className="h-4 w-4" /> : <RefreshCw className="h-4 w-4 animate-spin" />}
                        </span>
                        <span className="text-sm">Kateqoriya məlumatları</span>
                      </div>
                      <div className="flex items-center">
                        <span className={`mr-2 ${cachedData.images ? 'text-green-500' : 'text-gray-300'}`}>
                          {cachedData.images ? <Check className="h-4 w-4" /> : <RefreshCw className="h-4 w-4 animate-spin" />}
                        </span>
                        <span className="text-sm">Məhsul şəkilləri</span>
                      </div>
                      <div className="flex items-center">
                        <span className={`mr-2 ${cachedData.settings ? 'text-green-500' : 'text-gray-300'}`}>
                          {cachedData.settings ? <Check className="h-4 w-4" /> : <RefreshCw className="h-4 w-4 animate-spin" />}
                        </span>
                        <span className="text-sm">Tətbiq parametrləri</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-4">
                  <button
                    onClick={cacheData}
                    disabled={!isOnline || isCaching}
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                  >
                    <Database className="h-4 w-4 mr-2" />
                    Offline məlumatları yüklə
                  </button>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          Offline rejimində işləmək üçün əvvəlcədən lazımi məlumatları yükləmək tövsiyə olunur.
                          Bu əməliyyat təxminən 2-5 MB məlumat istifadə edəcək.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sync">
            <OfflineSync />
          </TabsContent>
        </Tabs>
        
        <OfflineStatusBar />
      </div>
    </div>
  );
} 