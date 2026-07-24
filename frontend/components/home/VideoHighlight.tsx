"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { SOCIALS } from "@/lib/constants";

const VIDEO = {
  id: "2Zst8OoGlsQ",
  title: "Perpisahan Santri Ponpes Takwinul Ummah Angkatan 5",
};

function getThumbnail(id: string) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

export default function VideoHighlight() {
  const [open, setOpen] = useState(false);

  return (
    <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-deep">VIDEO PROFIL</span>
        <h2 className="mt-2 font-display text-2xl font-bold text-deep lg:text-3xl">
          Saksikan Cerita Kami
        </h2>
      </div>

      <div className="relative mx-auto mt-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-white"
          onClick={() => setOpen(true)}
        >
          <div className="relative aspect-video w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getThumbnail(VIDEO.id)}
              alt={VIDEO.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-deep shadow-lg transition-transform group-hover:scale-110">
                <Play size={28} fill="currentColor" className="ml-0.5" />
              </div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-display text-sm font-semibold text-deep">{VIDEO.title}</h3>
          </div>
        </motion.div>
      </div>

      <div className="mt-6 text-center">
        <a
          href={SOCIALS.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-deep hover:text-deep"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-[#FF0000]"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          Kunjungi Channel YouTube Kami
        </a>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute -top-10 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
              >
                <X size={16} />
              </button>
              <div className="overflow-hidden rounded-xl">
                <iframe
                  src={`https://www.youtube.com/embed/${VIDEO.id}?autoplay=1&rel=0`}
                  title={VIDEO.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="aspect-video w-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
