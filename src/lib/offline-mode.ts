// Offline rejim üçün lazım olan utility funksiyaları

import { v4 as uuidv4 } from 'uuid';

// Mümkün offline əməliyyat növləri
export enum OfflineOperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

// Sinxronizasiya statusu 
export enum SyncStatus {
  PENDING = 'pending',
  SYNCING = 'syncing',
  SYNCED = 'synced',
  FAILED = 'failed',
}

// Offline əməliyyat interfeysi
export interface OfflineOperation {
  id: string;
  type: OfflineOperationType;
  entity: string; // məsələn, 'product', 'order', etc.
  entityId: string;
  data: any;
  timestamp: number;
  syncStatus: SyncStatus;
  syncAttempts: number;
  syncError?: string;
}

// Əsas offline əməliyyat idarəetmə sinifi
export class OfflineManager {
  private static OPERATIONS_KEY = 'offline_operations';
  private static OFFLINE_MODE_KEY = 'offline_mode_enabled';
  private static DATA_STORE_PREFIX = 'offline_data_';
  
  // Offline rejimi aktiv/deaktiv et
  static setOfflineMode(enabled: boolean): void {
    localStorage.setItem(this.OFFLINE_MODE_KEY, JSON.stringify(enabled));
    
    // Offline rejim statusunu dinləyən hadisə göndərək
    const event = new CustomEvent('offlinemodechange', { detail: { enabled } });
    window.dispatchEvent(event);
  }
  
  // Offline rejim statusunu əldə et
  static isOfflineModeEnabled(): boolean {
    const value = localStorage.getItem(this.OFFLINE_MODE_KEY);
    return value ? JSON.parse(value) : false;
  }
  
  // İnternetin varlığını yoxla
  static isOnline(): boolean {
    return navigator.onLine;
  }
  
  // Bütün əməliyyatları əldə et
  static getOperations(): OfflineOperation[] {
    const operationsJson = localStorage.getItem(this.OPERATIONS_KEY);
    return operationsJson ? JSON.parse(operationsJson) : [];
  }
  
  // Tamamlanmamış əməliyyatları əldə et
  static getPendingOperations(): OfflineOperation[] {
    return this.getOperations().filter(op => 
      op.syncStatus === SyncStatus.PENDING || op.syncStatus === SyncStatus.FAILED
    );
  }
  
  // Yeni offline əməliyyat əlavə et
  static addOperation(
    type: OfflineOperationType,
    entity: string,
    entityId: string,
    data: any
  ): OfflineOperation {
    const operations = this.getOperations();
    
    const newOperation: OfflineOperation = {
      id: uuidv4(),
      type,
      entity,
      entityId,
      data,
      timestamp: Date.now(),
      syncStatus: SyncStatus.PENDING,
      syncAttempts: 0,
    };
    
    operations.push(newOperation);
    localStorage.setItem(this.OPERATIONS_KEY, JSON.stringify(operations));
    
    // Yeni əməliyyat əlavə edildiyini göstərən hadisə
    const event = new CustomEvent('offlineoperationadded', { detail: { operation: newOperation } });
    window.dispatchEvent(event);
    
    return newOperation;
  }
  
  // Əməliyyat statusunu güncəllə
  static updateOperationStatus(
    operationId: string,
    status: SyncStatus,
    error?: string
  ): void {
    const operations = this.getOperations();
    const index = operations.findIndex(op => op.id === operationId);
    
    if (index !== -1) {
      operations[index].syncStatus = status;
      
      if (status === SyncStatus.FAILED) {
        operations[index].syncAttempts += 1;
        if (error) operations[index].syncError = error;
      } else if (status === SyncStatus.SYNCED) {
        operations[index].syncError = undefined;
      }
      
      localStorage.setItem(this.OPERATIONS_KEY, JSON.stringify(operations));
      
      // Status dəyişikliyi hadisəsi
      const event = new CustomEvent('offlineoperationupdated', { 
        detail: { operation: operations[index] } 
      });
      window.dispatchEvent(event);
    }
  }
  
  // Tamamlanmış əməliyyatları təmizlə
  static clearSyncedOperations(): void {
    const operations = this.getOperations();
    const filteredOperations = operations.filter(op => op.syncStatus !== SyncStatus.SYNCED);
    localStorage.setItem(this.OPERATIONS_KEY, JSON.stringify(filteredOperations));
  }
  
  // Hər hansı bir entitynin offline məlumatlarını saxla
  static saveOfflineData(entity: string, id: string, data: any): void {
    const key = `${this.DATA_STORE_PREFIX}${entity}_${id}`;
    localStorage.setItem(key, JSON.stringify(data));
  }
  
  // Saxlanmış offline məlumatları əldə et
  static getOfflineData<T>(entity: string, id: string): T | null {
    const key = `${this.DATA_STORE_PREFIX}${entity}_${id}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  
  // Bir entitynin bütün məlumatlarını əldə et
  static getAllOfflineData<T>(entity: string): T[] {
    const prefix = `${this.DATA_STORE_PREFIX}${entity}_`;
    const keys = Object.keys(localStorage).filter(key => key.startsWith(prefix));
    
    return keys.map(key => {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }).filter(Boolean) as T[];
  }
  
  // Offline sinxronizasiya funksiyası
  static async syncOfflineOperations(
    syncFunction: (operation: OfflineOperation) => Promise<boolean>
  ): Promise<{ success: number; failed: number }> {
    if (!this.isOnline()) {
      return { success: 0, failed: 0 };
    }
    
    const pendingOperations = this.getPendingOperations();
    let successCount = 0;
    let failedCount = 0;
    
    for (const operation of pendingOperations) {
      this.updateOperationStatus(operation.id, SyncStatus.SYNCING);
      
      try {
        const success = await syncFunction(operation);
        
        if (success) {
          this.updateOperationStatus(operation.id, SyncStatus.SYNCED);
          successCount++;
        } else {
          this.updateOperationStatus(operation.id, SyncStatus.FAILED, 'Sinxronizasiya zamanı xəta');
          failedCount++;
        }
      } catch (error) {
        this.updateOperationStatus(
          operation.id, 
          SyncStatus.FAILED, 
          error instanceof Error ? error.message : 'Sinxronizasiya zamanı xəta'
        );
        failedCount++;
      }
    }
    
    // Uğurlu sinxronizasiya olduqda hadisə göndər
    if (successCount > 0) {
      const event = new CustomEvent('offlinesynccompleted', { 
        detail: { success: successCount, failed: failedCount } 
      });
      window.dispatchEvent(event);
    }
    
    return { success: successCount, failed: failedCount };
  }
}

// Network vəziyyətini izləmək üçün hook
export const initNetworkListeners = (): void => {
  // Online statusu yoxla
  const checkConnection = () => {
    // Network vəziyyəti hadisəsi
    const event = new CustomEvent('networkstatuschange', { 
      detail: { isOnline: navigator.onLine } 
    });
    window.dispatchEvent(event);
    
    // Offline rejim avtomatik aktivləşdirilməsi
    if (!navigator.onLine && !OfflineManager.isOfflineModeEnabled()) {
      OfflineManager.setOfflineMode(true);
      
      // İstifadəçiyə bildiriş göstərmək üçün hadisə
      const notifyEvent = new CustomEvent('offlinemodeactivated');
      window.dispatchEvent(notifyEvent);
    }
  };
  
  // Network hadisələrini dinlə
  window.addEventListener('online', checkConnection);
  window.addEventListener('offline', checkConnection);
  
  // İlkin yoxlama
  checkConnection();
};

export default OfflineManager; 