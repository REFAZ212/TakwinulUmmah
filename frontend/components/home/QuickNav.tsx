"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const UNITS = [
  {
    name: "Pondok Pesantren",
    tagline: "Tahfidz & Madrasah Diniyah",
    href: "/about",
    img: "/images/pesantren.jpeg",
  },
  {
    name: "SMP IT Takwinul Ummah",
    tagline: "Kurikulum Nasional + Pesantren",
    href: "/smp",
    img: "/images/smp.jpeg",
  },
  {
    name: "SMA IT Takwinul Ummah",
    tagline: "Unggul dalam IPTAK & Akhlak",
    href: "/sma",
    img: "/images/sma.jpeg",
  },
];

export default function QuickNav() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {UNITS.map((u) => (
          <Link
            key={u.name}
            href={u.href}
            className="group relative overflow-hidden rounded-xl border border-border bg-white"
          >
            <div className="relative h-40 w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={u.img}
                alt={u.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-display text-sm font-semibold text-deep">{u.name}</h3>
                <p className="mt-0.5 text-xs text-ink-muted">{u.tagline}</p>
              </div>
              <ArrowUpRight size={16} className="text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-deep" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
