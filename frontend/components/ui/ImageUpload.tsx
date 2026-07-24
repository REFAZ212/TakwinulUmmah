"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: string;
}

export default function ImageUpload({ value, onChange, label = "Gambar", folder }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (folder) formData.append("folder", folder);
      const res = await fetch("/api/admin/media/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) onChange(data.url);
    } catch { /* noop */ }
    setUploading(false);
  }, [onChange, folder]);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-deep">{label}</label>
      {value ? (
        <div className="relative inline-block">
          <img src={value} alt="" className="h-32 rounded-xl object-cover ring-1 ring-black/5" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -top-1.5 -right-1.5 rounded-full bg-red-500 p-0.5 text-white hover:bg-red-600"
            aria-label="Hapus gambar"
          >
            <X size={12} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex h-32 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-sand bg-white text-ink-soft transition hover:border-gold hover:text-ink"
        >
          {uploading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gold border-t-transparent" />
          ) : (
            <>
              <ImageIcon size={24} />
              <span className="text-xs">Klik untuk upload</span>
            </>
          )}
        </button>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
    </div>
  );
}
