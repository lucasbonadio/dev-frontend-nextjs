"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from "react";

type ToastContextType = (message: string) => void;

const ToastContext = createContext<ToastContextType>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });

  const showToast = (message: string) => {
    setToast({ message, visible: true });
  };

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      
      {toast.visible && (
        <div className="fixed bottom-4 right-4 z-50 bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg animate-fade-in-out">
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}