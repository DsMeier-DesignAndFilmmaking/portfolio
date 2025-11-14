"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FriendlyErrorMessageProps {
  type?: 'error' | 'warning' | 'info' | 'success';
  title?: string;
  message?: string;
  icon?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
  };
  children?: ReactNode;
  className?: string;
  showIcon?: boolean;
}

const errorConfig = {
  error: {
    icon: '⚠️',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800',
    iconColor: 'text-red-500',
    titleColor: 'text-red-800 dark:text-red-200',
    textColor: 'text-red-700 dark:text-red-300',
    buttonClass: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
  },
  warning: {
    icon: '⚠️',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
    iconColor: 'text-yellow-500',
    titleColor: 'text-yellow-800 dark:text-yellow-200',
    textColor: 'text-yellow-700 dark:text-yellow-300',
    buttonClass: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
  },
  info: {
    icon: 'ℹ️',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    iconColor: 'text-blue-500',
    titleColor: 'text-blue-800 dark:text-blue-200',
    textColor: 'text-blue-700 dark:text-blue-300',
    buttonClass: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
  },
  success: {
    icon: '✅',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800',
    iconColor: 'text-green-500',
    titleColor: 'text-green-800 dark:text-green-200',
    textColor: 'text-green-700 dark:text-green-300',
    buttonClass: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
  },
};

const defaultTitles = {
  error: 'Something went wrong',
  warning: 'Please note',
  info: 'Information',
  success: 'Success!',
};

const defaultMessages = {
  error: 'An unexpected error occurred. Please try again.',
  warning: 'Please review the information below.',
  info: 'Here\'s some helpful information.',
  success: 'Operation completed successfully.',
};

export default function FriendlyErrorMessage({
  type = 'error',
  title,
  message,
  icon,
  action,
  children,
  className = "",
  showIcon = true,
}: FriendlyErrorMessageProps) {
  const config = errorConfig[type];
  const displayIcon = icon || config.icon;
  const displayTitle = title || defaultTitles[type];
  const displayMessage = message || defaultMessages[type];

  const buttonVariants = {
    primary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
  };

  const actionButtonClass = action?.variant 
    ? buttonVariants[action.variant] 
    : config.buttonClass;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`rounded-lg border p-4 ${config.bgColor} ${config.borderColor} ${className}`}
      role="alert"
      aria-live={type === 'error' ? 'assertive' : 'polite'}
    >
      <div className="flex items-start gap-3">
        {showIcon && (
          <div className={`text-xl ${config.iconColor}`} role="img" aria-label={`${type} icon`}>
            {displayIcon}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h4 className={`font-semibold ${config.titleColor}`}>
            {displayTitle}
          </h4>
          
          {displayMessage && (
            <p className={`mt-1 text-sm ${config.textColor}`}>
              {displayMessage}
            </p>
          )}
          
          {children && (
            <div className="mt-2">
              {children}
            </div>
          )}
          
          {action && (
            <div className="mt-3">
              <button
                onClick={action.onClick}
                className={`px-4 py-2 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${actionButtonClass}`}
                aria-label={action.label}
              >
                {action.label}
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Specialized error message components
export function ErrorMessage({ 
  title, 
  message, 
  action, 
  children, 
  className 
}: Omit<FriendlyErrorMessageProps, 'type'>) {
  return (
    <FriendlyErrorMessage
      type="error"
      title={title}
      message={message}
      action={action}
      className={className}
    >
      {children}
    </FriendlyErrorMessage>
  );
}

export function WarningMessage({ 
  title, 
  message, 
  action, 
  children, 
  className 
}: Omit<FriendlyErrorMessageProps, 'type'>) {
  return (
    <FriendlyErrorMessage
      type="warning"
      title={title}
      message={message}
      action={action}
      className={className}
    >
      {children}
    </FriendlyErrorMessage>
  );
}

export function InfoMessage({ 
  title, 
  message, 
  action, 
  children, 
  className 
}: Omit<FriendlyErrorMessageProps, 'type'>) {
  return (
    <FriendlyErrorMessage
      type="info"
      title={title}
      message={message}
      action={action}
      className={className}
    >
      {children}
    </FriendlyErrorMessage>
  );
}

export function SuccessMessage({ 
  title, 
  message, 
  action, 
  children, 
  className 
}: Omit<FriendlyErrorMessageProps, 'type'>) {
  return (
    <FriendlyErrorMessage
      type="success"
      title={title}
      message={message}
      action={action}
      className={className}
    >
      {children}
    </FriendlyErrorMessage>
  );
}

// Specific error messages for common scenarios
export function NetworkErrorMessage({ onRetry, className }: { onRetry?: () => void; className?: string }) {
  return (
    <ErrorMessage
      title="Connection Problem"
      message="Unable to connect to the server. Please check your internet connection and try again."
      action={onRetry ? { label: 'Try Again', onClick: onRetry } : undefined}
      className={className}
    />
  );
}

export function DataLoadErrorMessage({ 
  dataType = 'data', 
  onRetry, 
  className 
}: { 
  dataType?: string; 
  onRetry?: () => void; 
  className?: string; 
}) {
  return (
    <ErrorMessage
      title={`Unable to Load ${dataType}`}
      message={`There was a problem loading your ${dataType}. This might be due to a temporary server issue.`}
      action={onRetry ? { label: 'Retry', onClick: onRetry } : undefined}
      className={className}
    />
  );
}

export function PermissionErrorMessage({ 
  resource = 'resource', 
  onRequestAccess, 
  className 
}: { 
  resource?: string; 
  onRequestAccess?: () => void; 
  className?: string; 
}) {
  return (
    <ErrorMessage
      title="Access Denied"
      message={`You don't have permission to access this ${resource}. Please contact your administrator if you believe this is an error.`}
      action={onRequestAccess ? { label: 'Request Access', onClick: onRequestAccess } : undefined}
      className={className}
    />
  );
}

export function NotFoundErrorMessage({ 
  item = 'item', 
  onGoBack, 
  className 
}: { 
  item?: string; 
  onGoBack?: () => void; 
  className?: string; 
}) {
  return (
    <ErrorMessage
      title={`${item} Not Found`}
      message={`The ${item} you're looking for doesn't exist or may have been removed.`}
      action={onGoBack ? { label: 'Go Back', onClick: onGoBack } : undefined}
      className={className}
    />
  );
}
