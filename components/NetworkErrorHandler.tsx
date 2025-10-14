"use client";

import { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NetworkErrorHandlerProps {
  children: ReactNode;
  onRetry?: () => Promise<void>;
  showOfflineMessage?: boolean;
}

interface NetworkStatus {
  isOnline: boolean;
  isSlow: boolean;
  lastError: string | null;
}

export default function NetworkErrorHandler({
  children,
  onRetry,
  showOfflineMessage = true,
}: NetworkErrorHandlerProps) {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isOnline: navigator.onLine,
    isSlow: false,
    lastError: null,
  });
  const [showError, setShowError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => {
      setNetworkStatus(prev => ({ ...prev, isOnline: true, lastError: null }));
      setShowError(false);
    };

    const handleOffline = () => {
      setNetworkStatus(prev => ({ ...prev, isOnline: false, lastError: 'No internet connection' }));
      setShowError(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Monitor connection quality
  useEffect(() => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      
      const handleConnectionChange = () => {
        const isSlow = connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g';
        setNetworkStatus(prev => ({ ...prev, isSlow }));
      };

      connection.addEventListener('change', handleConnectionChange);
      handleConnectionChange(); // Initial check

      return () => {
        connection.removeEventListener('change', handleConnectionChange);
      };
    }
  }, []);

  const handleRetry = async () => {
    setIsRetrying(true);
    setRetryCount(prev => prev + 1);
    
    try {
      if (onRetry) {
        await onRetry();
      }
      setShowError(false);
      setNetworkStatus(prev => ({ ...prev, lastError: null }));
    } catch (error) {
      setNetworkStatus(prev => ({ 
        ...prev, 
        lastError: error instanceof Error ? error.message : 'Retry failed' 
      }));
    } finally {
      setIsRetrying(false);
    }
  };

  const getConnectionSpeedMessage = () => {
    if (networkStatus.isSlow) {
      return "Slow connection detected. Some features may load slowly.";
    }
    return null;
  };

  const getErrorIcon = () => {
    if (!networkStatus.isOnline) return "📡";
    if (networkStatus.isSlow) return "🐌";
    return "⚠️";
  };

  const getErrorTitle = () => {
    if (!networkStatus.isOnline) return "You're offline";
    if (networkStatus.isSlow) return "Slow connection";
    return "Connection issue";
  };

  const getErrorMessage = () => {
    if (!networkStatus.isOnline) {
      return "Please check your internet connection and try again.";
    }
    if (networkStatus.isSlow) {
      return "Your connection is slow. Some data may take longer to load.";
    }
    return networkStatus.lastError || "A network error occurred.";
  };

  return (
    <>
      <AnimatePresence>
        {/* Offline/Slow connection banner */}
        {(showError || !networkStatus.isOnline || networkStatus.isSlow) && showOfflineMessage && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-16 left-0 right-0 z-40 px-4 py-3 ${
              !networkStatus.isOnline 
                ? 'bg-red-600 text-white' 
                : networkStatus.isSlow 
                ? 'bg-yellow-600 text-white' 
                : 'bg-orange-600 text-white'
            }`}
            role="alert"
            aria-live="assertive"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl" role="img" aria-label="Network status icon">
                  {getErrorIcon()}
                </span>
                <div>
                  <h4 className="font-medium">{getErrorTitle()}</h4>
                  <p className="text-sm opacity-90">{getErrorMessage()}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {onRetry && networkStatus.lastError && (
                  <button
                    onClick={handleRetry}
                    disabled={isRetrying}
                    className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    {isRetrying ? 'Retrying...' : 'Retry'}
                  </button>
                )}
                
                <button
                  onClick={() => setShowError(false)}
                  className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-sm font-medium transition-colors"
                  aria-label="Dismiss notification"
                >
                  ✕
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connection speed indicator */}
      {networkStatus.isSlow && networkStatus.isOnline && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-4 right-4 z-30"
        >
          <div className="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg px-3 py-2 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-yellow-600 dark:text-yellow-400" role="img" aria-label="Slow connection">
                🐌
              </span>
              <span className="text-xs text-yellow-800 dark:text-yellow-200 font-medium">
                Slow connection
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Render children with error boundary protection */}
      <div className={!networkStatus.isOnline ? 'opacity-50 pointer-events-none' : ''}>
        {children}
      </div>

      {/* Retry counter for debugging */}
      {process.env.NODE_ENV === 'development' && retryCount > 0 && (
        <div className="fixed bottom-4 left-4 z-30 bg-gray-800 text-white px-2 py-1 rounded text-xs">
          Retries: {retryCount}
        </div>
      )}
    </>
  );
}

// Hook for network status
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionSpeed, setConnectionSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Monitor connection speed if available
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      
      const handleConnectionChange = () => {
        const effectiveType = connection.effectiveType;
        if (effectiveType === 'slow-2g' || effectiveType === '2g') {
          setConnectionSpeed('slow');
        } else if (effectiveType === '3g') {
          setConnectionSpeed('normal');
        } else {
          setConnectionSpeed('fast');
        }
      };

      connection.addEventListener('change', handleConnectionChange);
      handleConnectionChange();

      return () => {
        connection.removeEventListener('change', handleConnectionChange);
      };
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, connectionSpeed };
}
