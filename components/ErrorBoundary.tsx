"use client";

import { Component, ReactNode, ErrorInfo } from "react";
import { motion } from "framer-motion";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetOnPropsChange?: boolean;
  resetKeys?: Array<string | number>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  resetCount: number;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private resetTimeoutId: number | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      resetCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetKeys, resetOnPropsChange } = this.props;
    const { hasError, resetCount } = this.state;

    // Reset error boundary when resetKeys change
    if (hasError && resetKeys && prevProps.resetKeys) {
      const hasResetKeyChanged = resetKeys.some((key, index) => key !== prevProps.resetKeys![index]);
      if (hasResetKeyChanged) {
        this.resetErrorBoundary();
      }
    }

    // Reset error boundary when props change (if enabled)
    if (hasError && resetOnPropsChange && prevProps.children !== this.props.children) {
      this.resetErrorBoundary();
    }
  }

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  resetErrorBoundary = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      resetCount: prevState.resetCount + 1,
    }));
  };

  retryAfterDelay = () => {
    // Auto-retry after 3 seconds
    this.resetTimeoutId = window.setTimeout(() => {
      this.resetErrorBoundary();
    }, 3000);
  };

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-900 rounded-xl border border-red-200 dark:border-red-800 p-6 shadow-sm"
          role="alert"
          aria-live="assertive"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="text-red-500 text-2xl" role="img" aria-label="Error icon">
              ⚠️
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Something went wrong
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                An unexpected error occurred
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-800 dark:text-red-200 font-medium mb-2">
                Error Details:
              </p>
              <p className="text-sm text-red-700 dark:text-red-300 font-mono">
                {error?.message || 'Unknown error occurred'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.resetErrorBoundary}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                aria-label="Retry loading this component"
              >
                Try Again
              </button>
              
              <button
                onClick={this.retryAfterDelay}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                aria-label="Auto-retry in 3 seconds"
              >
                Auto-retry (3s)
              </button>

              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 focus:bg-gray-200 dark:focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                aria-label="Reload the entire page"
              >
                Reload Page
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4">
                <summary className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-800 dark:hover:text-gray-200">
                  Show technical details (development only)
                </summary>
                <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-800 dark:text-gray-200 overflow-auto">
                  {error?.stack}
                </pre>
              </details>
            )}
          </div>
        </motion.div>
      );
    }

    return children;
  }
}

// Specialized error boundary for dashboard sections
export function DashboardErrorBoundary({ 
  children, 
  sectionName = "Dashboard Section",
  onError 
}: { 
  children: ReactNode; 
  sectionName?: string;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}) {
  return (
    <ErrorBoundary
      onError={onError}
      fallback={
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-900 rounded-xl border border-red-200 dark:border-red-800 p-6"
        >
          <div className="text-center">
            <div className="text-red-500 text-4xl mb-3" role="img" aria-label="Error icon">
              ⚠️
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {sectionName} Error
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Unable to load {sectionName.toLowerCase()}. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </motion.div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

// Error boundary specifically for charts
export function ChartErrorBoundary({ 
  children, 
  chartName = "Chart",
  onRetry 
}: { 
  children: ReactNode; 
  chartName?: string;
  onRetry?: () => void;
}) {
  return (
    <ErrorBoundary
      fallback={
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-900 rounded-xl border border-red-200 dark:border-red-800 p-6"
        >
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-red-500 text-4xl mb-3" role="img" aria-label="Chart error icon">
                📊
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {chartName} Error
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Unable to render {chartName.toLowerCase()}. The data might be corrupted or unavailable.
              </p>
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Retry
                </button>
              )}
            </div>
          </div>
        </motion.div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}