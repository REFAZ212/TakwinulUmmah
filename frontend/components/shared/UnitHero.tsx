"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function UnitHero({
  eyebrow, title, desc, img, logo, logoAlt,
}: { eyebrow: string; title: string; desc: string; img: string; logo?: string; logoAlt?: string }) {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Image src={img} alt={title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>
      <div className="relative mx-auto max-w-5xl px-5 py-24 lg:py-32">
        {logo ? (
          <div className="grid items-center gap-10 sm:grid-cols-[auto_1fr]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="mx-auto sm:mx-0"
            >
              <div className="relative h-32 w-32 overflow-hidden rounded-xl border border-white/15 sm:h-40 sm:w-40">
                <Image src={logo} alt={logoAlt ?? title} fill className="object-contain p-2" />
              </div>
            </motion.div>
            <div className="text-center sm:text-left">
              <motion.span
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/70"
              >
                {eyebrow}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="mt-5 text-balance font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl"
              >
                {title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="mx-auto mt-4 max-w-xl text-sm text-white/60 sm:mx-0"
              >
                {desc}
              </motion.p>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-4xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/70"
            >
              {eyebrow}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="mt-5 text-balance font-display text-3xl font-bold text-white sm:text-4xl"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="mx-auto mt-4 max-w-xl text-sm text-white/60"
            >
              {desc}
            </motion.p>
          </div>
        )}
      </div>
    </section>
  );
}
