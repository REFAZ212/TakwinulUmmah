"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxW?: string;
}

export default function Modal({ open, onClose, title, children, maxW = "max-w-lg" }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 p-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className={`w-full ${maxW} rounded-2xl bg-white p-6 shadow-lg`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-ink">{title}</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-ink-soft hover:bg-sand" aria-label="Tutup">
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmLabel?: string;
  loading?: boolean;
}

export function ConfirmModal({ open, onClose, onConfirm, title = "Konfirmasi", message, confirmLabel = "Ya, Hapus", loading }: ConfirmModalProps) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-sm text-ink-soft mb-5">{message}</p>
      <div className="flex justify-end gap-2">
        <button onClick={onClose} className="rounded-xl border border-sand bg-white px-4 py-2.5 text-sm font-medium text-ink transition hover:bg-sand">
          Batal
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? "Menghapus..." : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
