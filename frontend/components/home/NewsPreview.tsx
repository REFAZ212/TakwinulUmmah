"use client";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { NEWS } from "@/lib/news-data";

export default function NewsPreview() {
  const preview = NEWS.slice(0, 3);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-deep">KABAR TERBARU</span>
            <h2 className="mt-2 font-display text-2xl font-bold text-deep lg:text-3xl">Berita &amp; Kegiatan</h2>
          </div>
          <Link href="/news" className="inline-flex items-center gap-1.5 text-sm font-medium text-deep hover:underline">
            Semua Berita <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {preview.map((n) => (
            <Link key={n.slug} href={`/news/${n.slug}`}>
              <article className="group overflow-hidden rounded-xl border border-border bg-white transition-shadow hover:shadow-sm">
                <div className="relative h-44 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={n.img} alt={n.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-md bg-deep px-2.5 py-1 text-[11px] font-medium text-white">
                    {n.cat}
                  </span>
                </div>
                <div className="p-5">
                  <p className="flex items-center gap-1.5 text-xs text-ink-muted">
                    <Calendar size={12} /> {formatDate(n.date)}
                  </p>
                  <h3 className="mt-2 font-display text-sm font-semibold leading-snug text-deep group-hover:text-deep">{n.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft line-clamp-2">{n.excerpt}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
