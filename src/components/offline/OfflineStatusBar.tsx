import { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, Check, Database, Upload } from 'lucide-react';
import { OfflineManager, SyncStatus } from '../../lib/offline-mode';

export default function OfflineStatusBar() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isOfflineModeEnabled, setIsOfflineModeEnabled] = useState(OfflineManager.isOfflineModeEnabled());
  const [pendingOperations, setPendingOperations] = useState(OfflineManager.getPendingOperations());
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);
  
  // Network statusunu izlə
  useEffect(() => {
    const handleNetworkChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      setIsOnline(customEvent.detail?.isOnline ?? navigator.onLine);
    };
    
    const handleOfflineModeChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      setIsOfflineModeEnabled(customEvent.detail?.enabled ?? OfflineManager.isOfflineModeEnabled());
    };
    
    const handleOperationsChange = () => {
      setPendingOperations(OfflineManager.getPendingOperations());
    };
    
    const handleSyncCompleted = () => {
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 3000);
    };
    
    // Event dinləyiciləri
    window.addEventListener('networkstatuschange', handleNetworkChange);
    window.addEventListener('offlinemodechange', handleOfflineModeChange);
    window.addEventListener('offlineoperationadded', handleOperationsChange);
    window.addEventListener('offlineoperationupdated', handleOperationsChange);
    window.addEventListener('offlinesynccompleted', handleSyncCompleted);
    
    // Komponent söndürüldükdə təmizləmə
    return () => {
      window.removeEventListener('networkstatuschange', handleNetworkChange);
      window.removeEventListener('offlinemodechange', handleOfflineModeChange);
      window.removeEventListener('offlineoperationadded', handleOperationsChange);
      window.removeEventListener('offlineoperationupdated', handleOperationsChange);
      window.removeEventListener('offlinesynccompleted', handleSyncCompleted);
    };
  }, []);
  
  // Offline rejimi aktiv/deaktiv et
  const toggleOfflineMode = () => {
    OfflineManager.setOfflineMode(!isOfflineModeEnabled);
  };
  
  // Demo üçün sinxronizasiya funksiyası
  const handleSync = async () => {
    if (!isOnline || pendingOperations.length === 0) return;
    
    setIsSyncing(true);
    
    // Demo sinxronizasiya funksiyası
    const mockSyncFunction = async (operation: any) => {
      // Gerçək həyatda burada API çağırışlarımız olacaq
      await new Promise(resolve => setTimeout(resolve, 1000));
      // 90% uğur nisbəti simulyasiyası
      return Math.random() > 0.1;
    };
    
    await OfflineManager.syncOfflineOperations(mockSyncFunction);
    setIsSyncing(false);
  };
  
  // Əgər offline rejim aktiv deyilsə və gözləyən əməliyyatlar yoxdursa, paneli göstərmə
  if (!isOfflineModeEnabled && pendingOperations.length === 0 && isOnline) {
    return null;
  }
  
  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 ${
      isOnline ? 'bg-white' : 'bg-amber-50'
    } border-t shadow-md py-2 px-4`}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          {isOnline ? (
            <Wifi className="h-5 w-5 text-green-500 mr-2" />
          ) : (
            <WifiOff className="h-5 w-5 text-amber-500 mr-2" />
          )}
          
          <span className="text-sm font-medium">
            {isOnline 
              ? 'Online rejim: Sistem tam funksionaldır' 
              : 'Offline rejim: İnternet bağlantısı yoxdur'}
          </span>
          
          {isOfflineModeEnabled && isOnline && (
            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
              Offline rejim aktiv
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          {pendingOperations.length > 0 && (
            <div className="flex items-center">
              <Database className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-xs text-gray-600">
                {pendingOperations.length} gözləyən əməliyyat
              </span>
            </div>
          )}
          
          {syncSuccess && (
            <div className="flex items-center text-green-600 text-xs">
              <Check className="h-4 w-4 mr-1" />
              Sinxronizasiya tamamlandı
            </div>
          )}
          
          {isOnline && pendingOperations.length > 0 && (
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="inline-flex items-center px-2 py-1 text-xs bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50"
            >
              {isSyncing ? (
                <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
              ) : (
                <Upload className="h-3 w-3 mr-1" />
              )}
              {isSyncing ? 'Sinxronizasiya...' : 'Sinxronizasiya et'}
            </button>
          )}
          
          {isOnline && (
            <button
              onClick={toggleOfflineMode}
              className={`inline-flex items-center px-2 py-1 text-xs rounded ${
                isOfflineModeEnabled 
                  ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              }`}
            >
              {isOfflineModeEnabled ? (
                <>
                  <Wifi className="h-3 w-3 mr-1" />
                  Online rejimə keç
                </>
              ) : (
                <>
                  <WifiOff className="h-3 w-3 mr-1" />
                  Offline rejimə keç
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 