import React, { createContext, useState, useCallback, ReactNode } from 'react';
import Toast from '../components/common/Toast';
import { ToastModel } from '@/interface/Toast.interface';

interface ToastContextType {
  showToast: (
    message: string,
    type: ToastModel['type'],
    className?: string
  ) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<ToastModel | null>(null);

  const showToast = useCallback(
    (message: string, type: ToastModel['type'], className?: string) => {
      setToast({ message, type, className });
    },
    []
  );

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
          className={toast.className}
        />
      )}
    </ToastContext.Provider>
  );
};
