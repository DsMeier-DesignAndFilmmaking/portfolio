"use client";

import { useState, useEffect, useCallback } from 'react';
import { ServiceStatus, DashboardSyncState } from '@/types/dashboard';

interface UseDashboardSyncReturn {
  syncState: DashboardSyncState;
  syncAll: () => Promise<void>;
  syncService: (service: string) => Promise<void>;
  isOnline: boolean;
}

export function useDashboardSync(): UseDashboardSyncReturn {
  const [syncState, setSyncState] = useState<DashboardSyncState>({
    isSyncing: false,
    lastSync: '',
    errors: {},
    services: [
      {
        service: 'github',
        status: 'offline',
        color: '#10b981',
        label: 'GitHub',
        lastSync: undefined
      },
      {
        service: 'strava',
        status: 'offline',
        color: '#f97316',
        label: 'Strava',
        lastSync: undefined
      },
      {
        service: 'openai',
        status: 'offline',
        color: '#06b6d4',
        label: 'OpenAI',
        lastSync: undefined
      },
      {
        service: 'cursor',
        status: 'offline',
        color: '#8b5cf6',
        label: 'Cursor',
        lastSync: undefined
      }
    ]
  });
  const [isOnline, setIsOnline] = useState(true);

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const updateServiceStatus = useCallback((service: string, status: ServiceStatus['status'], error?: string) => {
    setSyncState(prev => ({
      ...prev,
      services: prev.services.map(s => 
        s.service === service 
          ? { ...s, status, lastSync: status === 'online' ? new Date().toISOString() : s.lastSync, error }
          : s
      ),
      errors: error 
        ? { ...prev.errors, [service]: error }
        : { ...prev.errors, [service]: undefined }
    }));
  }, []);

  const syncService = useCallback(async (service: string) => {
    updateServiceStatus(service, 'syncing');
    
    try {
      // Simulate service-specific sync logic
      switch (service) {
        case 'github':
          // Trigger GitHub data refresh
          if (typeof window !== 'undefined') {
            const githubHook = (window as any).refreshGitHub;
            if (githubHook) await githubHook();
          }
          break;
          
        case 'strava':
          // Trigger Strava data refresh
          if (typeof window !== 'undefined') {
            const stravaHook = (window as any).refreshStrava;
            if (stravaHook) await stravaHook();
          }
          break;
          
        case 'openai':
          // Trigger OpenAI data refresh
          if (typeof window !== 'undefined') {
            const openaiHook = (window as any).refreshOpenAI;
            if (openaiHook) await openaiHook();
          }
          break;
          
        case 'cursor':
          // Trigger Cursor data refresh
          if (typeof window !== 'undefined') {
            const cursorHook = (window as any).refreshCursor;
            if (cursorHook) await cursorHook();
          }
          break;
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      updateServiceStatus(service, 'online');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sync failed';
      updateServiceStatus(service, 'error', errorMessage);
    }
  }, [updateServiceStatus]);

  const syncAll = useCallback(async () => {
    setSyncState(prev => ({ ...prev, isSyncing: true }));
    
    try {
      // Sync all services in parallel
      const syncPromises = syncState.services.map(service => 
        syncService(service.service)
      );
      
      await Promise.allSettled(syncPromises);
      
      setSyncState(prev => ({
        ...prev,
        isSyncing: false,
        lastSync: new Date().toISOString()
      }));
    } catch (error) {
      setSyncState(prev => ({
        ...prev,
        isSyncing: false,
        errors: {
          ...prev.errors,
          general: error instanceof Error ? error.message : 'Sync failed'
        }
      }));
    }
  }, [syncState.services, syncService]);

  // Auto-sync on mount and when coming back online
  useEffect(() => {
    if (isOnline) {
      syncAll();
    }
  }, [isOnline, syncAll]);

  // Auto-sync every 5 minutes when online
  useEffect(() => {
    if (!isOnline) return;

    const interval = setInterval(() => {
      syncAll();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [isOnline, syncAll]);

  return {
    syncState,
    syncAll,
    syncService,
    isOnline,
  };
}
