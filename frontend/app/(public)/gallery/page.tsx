"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const PHOTOS = [
  { src: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?q=80&w=1200&auto=format&fit=crop", alt: "Wisuda Tahfidz" },
  { src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop", alt: "Kegiatan Belajar" },
  { src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop", alt: "Kampus" },
  { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop", alt: "Presentasi" },
  { src: "https://images.unsplash.com/photo-1564769662040-cf07dd8f92c9?q=80&w=1200&auto=format&fit=crop", alt: "Kajian" },
  { src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1200&auto=format&fit=crop", alt: "Laboratorium" },
  { src: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80&w=1200&auto=format&fit=crop", alt: "Perpustakaan" },
  { src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop", alt: "Robotik" },
];

export default function GalleryPage() {
  const [selected, setSelected] = useState<number | null>(null);

  const close = useCallback(() => setSelected(null), []);

  const prev = useCallback(() => {
    setSelected((i) => (i !== null ? (i - 1 + PHOTOS.length) % PHOTOS.length : null));
  }, []);

  const next = useCallback(() => {
    setSelected((i) => (i !== null ? (i + 1) % PHOTOS.length : null));
  }, []);

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected, close, prev, next]);

  return (
    <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-deep lg:text-4xl">Galeri</h1>

      <div className="mt-10 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
        {PHOTOS.map((photo, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className="group relative block w-full overflow-hidden rounded-xl border border-border"
            aria-label={`Lihat foto: ${photo.alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-deep/0 transition-colors group-hover:bg-deep/20" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-deep/90 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Lihat foto"
        >
          <button
            onClick={close}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
            aria-label="Tutup"
          >
            <X size={24} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
            aria-label="Foto sebelumnya"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
            aria-label="Foto berikutnya"
          >
            <ChevronRight size={24} />
          </button>

          <div className="max-h-[85vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PHOTOS[selected].src}
              alt={PHOTOS[selected].alt}
              className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain"
            />
            <p className="mt-3 text-center text-sm text-white/70">
              {PHOTOS[selected].alt} &middot; {selected + 1} / {PHOTOS.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
