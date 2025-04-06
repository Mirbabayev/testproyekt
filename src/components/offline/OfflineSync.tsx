import { useState, useEffect } from 'react';
import { CloudOff, RefreshCw, ArrowUpDown, CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';
import { OfflineManager, OfflineOperation, SyncStatus } from '../../lib/offline-mode';

const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString('az-AZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Əməliyyat tipinə görə rəng və ikon təyin edir
const getOperationTypeConfig = (type: string) => {
  switch (type) {
    case 'create':
      return { color: 'text-green-600 bg-green-100', icon: <CheckCircle className="h-4 w-4" /> };
    case 'update':
      return { color: 'text-blue-600 bg-blue-100', icon: <ArrowUpDown className="h-4 w-4" /> };
    case 'delete':
      return { color: 'text-red-600 bg-red-100', icon: <XCircle className="h-4 w-4" /> };
    default:
      return { color: 'text-gray-600 bg-gray-100', icon: <Clock className="h-4 w-4" /> };
  }
};

// Sinxronizasiya statusuna görə rəng və ikon təyin edir
const getSyncStatusConfig = (status: SyncStatus) => {
  switch (status) {
    case SyncStatus.SYNCED:
      return { color: 'text-green-600', icon: <CheckCircle className="h-4 w-4" />, label: 'Sinxronlaşdırıldı' };
    case SyncStatus.SYNCING:
      return { color: 'text-blue-600', icon: <RefreshCw className="h-4 w-4 animate-spin" />, label: 'Sinxronlaşdırılır' };
    case SyncStatus.FAILED:
      return { color: 'text-red-600', icon: <AlertTriangle className="h-4 w-4" />, label: 'Uğursuz' };
    case SyncStatus.PENDING:
    default:
      return { color: 'text-amber-600', icon: <Clock className="h-4 w-4" />, label: 'Gözləyir' };
  }
};

// Entiti tipini daha oxunaqlı formaya çevirmək
const formatEntityType = (type: string): string => {
  const mapping: Record<string, string> = {
    product: 'Məhsul',
    order: 'Sifariş',
    collection: 'Kolleksiya',
    user: 'İstifadəçi',
    review: 'Rəy',
  };
  
  return mapping[type] || type;
};

export default function OfflineSync() {
  const [operations, setOperations] = useState<OfflineOperation[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [filter, setFilter] = useState<SyncStatus | 'all'>('all');
  const [showSynced, setShowSynced] = useState(true);
  
  // Offline əməliyyatları yüklə
  useEffect(() => {
    const loadOperations = () => {
      let ops = OfflineManager.getOperations();
      
      // Filtrlə
      if (filter !== 'all') {
        ops = ops.filter(op => op.syncStatus === filter);
      }
      
      // Əgər sinxronlaşdırılmışları göstərməmək istəyiriksə
      if (!showSynced) {
        ops = ops.filter(op => op.syncStatus !== SyncStatus.SYNCED);
      }
      
      // Tarix üzrə sırala, ən yenilər əvvəlcə
      ops.sort((a, b) => b.timestamp - a.timestamp);
      
      setOperations(ops);
    };
    
    loadOperations();
    
    // Hadisələri dinlə
    const handleOperationChange = loadOperations;
    const handleNetworkChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      setIsOnline(customEvent.detail?.isOnline ?? navigator.onLine);
    };
    
    window.addEventListener('offlineoperationadded', handleOperationChange);
    window.addEventListener('offlineoperationupdated', handleOperationChange);
    window.addEventListener('networkstatuschange', handleNetworkChange);
    
    return () => {
      window.removeEventListener('offlineoperationadded', handleOperationChange);
      window.removeEventListener('offlineoperationupdated', handleOperationChange);
      window.removeEventListener('networkstatuschange', handleNetworkChange);
    };
  }, [filter, showSynced]);
  
  // Demo sinxronizasiya funksiyası
  const handleSync = async () => {
    if (!isOnline || operations.length === 0 || isSyncing) return;
    
    setIsSyncing(true);
    
    // Demo sinxronizasiya funksiyası
    const mockSyncFunction = async (operation: OfflineOperation) => {
      // Gerçək həyatda burada API çağırışlarımız olacaq
      await new Promise(resolve => setTimeout(resolve, 1000));
      // 90% uğur nisbəti simulyasiyası
      return Math.random() > 0.1;
    };
    
    await OfflineManager.syncOfflineOperations(mockSyncFunction);
    setIsSyncing(false);
  };
  
  // Sinxronlaşdırılmış əməliyyatları təmizlə
  const clearSyncedOperations = () => {
    OfflineManager.clearSyncedOperations();
  };
  
  // Filtrlənmiş əməliyyatların sayı
  const pendingCount = operations.filter(op => op.syncStatus === SyncStatus.PENDING).length;
  const failedCount = operations.filter(op => op.syncStatus === SyncStatus.FAILED).length;
  const syncedCount = operations.filter(op => op.syncStatus === SyncStatus.SYNCED).length;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Offline Sinxronizasiya</h2>
          <p className="text-gray-600 text-sm mt-1">
            Offline rejimdə edilmiş dəyişiklikləri sinxronlaşdırın
          </p>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={clearSyncedOperations}
            disabled={syncedCount === 0}
            className="text-xs px-2 py-1 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
          >
            Sinxronlaşdırılmışları təmizlə
          </button>
          
          <button
            onClick={handleSync}
            disabled={!isOnline || pendingCount + failedCount === 0 || isSyncing}
            className="inline-flex items-center px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50"
          >
            {isSyncing ? (
              <>
                <RefreshCw className="h-4 w-4 mr-1.5 animate-spin" />
                Sinxronlaşdırılır...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-1.5" />
                Sinxronlaşdır
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Status filterləri */}
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-gray-500 text-sm">Filter:</span>
        <button
          onClick={() => setFilter('all')}
          className={`px-2 py-1 text-xs rounded-full ${
            filter === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Hamısı ({operations.length})
        </button>
        <button
          onClick={() => setFilter(SyncStatus.PENDING)}
          className={`px-2 py-1 text-xs rounded-full ${
            filter === SyncStatus.PENDING ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
          }`}
        >
          Gözləyir ({pendingCount})
        </button>
        <button
          onClick={() => setFilter(SyncStatus.FAILED)}
          className={`px-2 py-1 text-xs rounded-full ${
            filter === SyncStatus.FAILED ? 'bg-red-600 text-white' : 'bg-red-100 text-red-700 hover:bg-red-200'
          }`}
        >
          Uğursuz ({failedCount})
        </button>
        <button
          onClick={() => setFilter(SyncStatus.SYNCED)}
          className={`px-2 py-1 text-xs rounded-full ${
            filter === SyncStatus.SYNCED ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          Sinxronlaşdırılıb ({syncedCount})
        </button>
        
        <div className="ml-auto flex items-center">
          <input
            id="show-synced"
            type="checkbox"
            checked={showSynced}
            onChange={(e) => setShowSynced(e.target.checked)}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="show-synced" className="ml-2 text-sm text-gray-600">
            Sinxronlaşdırılmışları göstər
          </label>
        </div>
      </div>
      
      {/* Əməliyyatlar siyahısı */}
      {operations.length === 0 ? (
        <div className="text-center py-8 border border-dashed rounded-lg bg-gray-50">
          <CloudOff className="h-12 w-12 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-500">
            {filter === 'all'
              ? 'Heç bir offline əməliyyat tapılmadı'
              : `${getSyncStatusConfig(filter as SyncStatus).label} vəziyyətində əməliyyat tapılmadı`}
          </p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Əməliyyat
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tip
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarix
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {operations.map((operation) => {
                const typeConfig = getOperationTypeConfig(operation.type);
                const statusConfig = getSyncStatusConfig(operation.syncStatus);
                
                return (
                  <tr key={operation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-gray-100">
                          {typeConfig.icon}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {formatEntityType(operation.entity)} #{operation.entityId}
                          </div>
                          <div className="text-xs text-gray-500 max-w-xs truncate">
                            {JSON.stringify(operation.data).slice(0, 50)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeConfig.color}`}>
                        {operation.type === 'create' && 'Yaratma'}
                        {operation.type === 'update' && 'Yeniləmə'}
                        {operation.type === 'delete' && 'Silmə'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(operation.timestamp)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center text-xs ${statusConfig.color}`}>
                        {statusConfig.icon}
                        <span className="ml-1.5">{statusConfig.label}</span>
                        
                        {operation.syncStatus === SyncStatus.FAILED && (
                          <span className="ml-1 text-xs text-gray-500">
                            (Cəhd: {operation.syncAttempts})
                          </span>
                        )}
                      </span>
                      
                      {operation.syncStatus === SyncStatus.FAILED && operation.syncError && (
                        <div className="mt-1 text-xs text-red-500">
                          {operation.syncError}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 