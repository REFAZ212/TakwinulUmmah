"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SLIDES = [
  { src: "/images/bgpst.jpeg", alt: "Suasana Pondok Pesantren" },
  { src: "/images/hero2.jpeg", alt: "Kampus Takwinul Ummah" },
  { src: "/images/hero3.jpeg", alt: "Kegiatan Belajar Mengajar" },
  { src: "/images/hero4.jpeg", alt: "Laboratorium Sains" },
  { src: "/images/hero5.jpeg", alt: "Kegiatan Keagamaan" },
];

const INTERVAL = 5000;

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[85vh] overflow-hidden bg-ink">
      {/* Slideshow */}
      <div className="absolute inset-0">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.src}
              alt={slide.alt}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Text */}
      <div className="relative z-10 mx-auto flex h-full max-w-5xl items-center justify-center px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          
        </motion.div>
      </div>
    </section>
  );
}
