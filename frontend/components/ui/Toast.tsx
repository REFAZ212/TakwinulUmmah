"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { CheckCircle, XCircle, AlertTriangle, X, Info } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";
interface Toast { id: number; type: ToastType; message: string; }

interface ToastContextValue {
  toast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((type: ToastType, message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const remove = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const icons = {
    success: <CheckCircle size={16} className="text-sage" />,
    error: <XCircle size={16} className="text-red-500" />,
    warning: <AlertTriangle size={16} className="text-gold" />,
    info: <Info size={16} className="text-deep" />,
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2" aria-live="polite">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-2.5 rounded-xl bg-white px-4 py-3 shadow-lg ring-1 ring-black/5 animate-in slide-in-from-right"
          >
            {icons[t.type]}
            <span className="text-sm text-ink">{t.message}</span>
            <button onClick={() => remove(t.id)} className="ml-1 rounded p-0.5 text-ink-soft hover:bg-sand" aria-label="Tutup">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
