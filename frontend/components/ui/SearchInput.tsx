"use client";

import { Search, X } from "lucide-react";
import { useRef } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchInput({ value, onChange, placeholder = "Cari...", className = "" }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={`relative ${className}`}>
      <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-sand bg-white py-2.5 pl-9 pr-8 text-sm text-ink placeholder:text-ink-soft outline-none transition focus:border-gold focus:ring-1 focus:ring-gold/20"
      />
      {value && (
        <button
          onClick={() => { onChange(""); inputRef.current?.focus(); }}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-ink-soft hover:bg-sand"
          aria-label="Hapus pencarian"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
