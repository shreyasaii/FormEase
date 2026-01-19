'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (message: string, type: ToastType = 'info', duration: number = 3000) => {
      const id = Date.now().toString();
      const toast: Toast = { id, message, type, duration };

      setToasts((prev) => [...prev, toast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50 pointer-events-none">
        {toasts.map((toast) => (
          <ToastComponent
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastComponent({
  toast,
  onClose,
}: {
  toast: Toast;
  onClose: () => void;
}) {
  const bgColor =
    toast.type === 'success'
      ? 'bg-green-500/10 border-green-500/30'
      : toast.type === 'error'
        ? 'bg-red-500/10 border-red-500/30'
        : 'bg-blue-500/10 border-blue-500/30';

  const icon =
    toast.type === 'success' ? (
      <CheckCircle2 className="w-5 h-5 text-green-500" />
    ) : toast.type === 'error' ? (
      <AlertCircle className="w-5 h-5 text-red-500" />
    ) : (
      <Info className="w-5 h-5 text-blue-500" />
    );

  const textColor =
    toast.type === 'success'
      ? 'text-green-700 dark:text-green-200'
      : toast.type === 'error'
        ? 'text-red-700 dark:text-red-200'
        : 'text-blue-700 dark:text-blue-200';

  return (
    <div
      className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-sm ${bgColor} ${textColor} animate-in fade-in slide-in-from-right-4 duration-200`}
    >
      {icon}
      <p className="text-sm font-medium">{toast.message}</p>
      <button
        onClick={onClose}
        className="ml-auto opacity-70 hover:opacity-100 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
