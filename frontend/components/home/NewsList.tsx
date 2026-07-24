"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { NEWS, type NewsItem } from "@/lib/news-data";

export type { NewsItem };

const CATEGORIES = ["Semua", "Pesantren", "SMP", "SMA", "Prestasi", "Pengumuman"];

export default function NewsList() {
  const [active, setActive] = useState("Semua");

  const filtered = active === "Semua" ? NEWS : NEWS.filter((n) => n.cat === active);

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-lg border px-4 py-1.5 text-sm transition-colors ${
              active === c
                ? "border-deep bg-deep text-white"
                : "border-border text-ink-soft hover:border-deep hover:text-deep"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 ? (
          <p className="col-span-full py-16 text-center text-ink-muted">Belum ada berita untuk kategori ini.</p>
        ) : (
          filtered.map((n) => (
            <Link key={n.slug} href={`/news/${n.slug}`} className="group block">
              <article className="overflow-hidden rounded-xl border border-border bg-white transition-shadow hover:shadow-sm">
                <div className="relative h-44 w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={n.img} alt={n.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-md bg-deep px-2.5 py-1 text-[11px] font-medium text-white">{n.cat}</span>
                </div>
                <div className="p-5">
                  <p className="flex items-center gap-1.5 text-xs text-ink-muted"><Calendar size={12} /> {formatDate(n.date)}</p>
                  <h3 className="mt-2 font-display text-sm font-semibold leading-snug text-deep">{n.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft line-clamp-2">{n.excerpt}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-deep group-hover:underline">
                    Baca Selengkapnya <ArrowRight size={12} />
                  </span>
                </div>
              </article>
            </Link>
          ))
        )}
      </div>
    </>
  );
}
