"use client";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

const POINTS = [
  "Kurikulum terpadu: Nasional, Tahfidz, dan Diniyah",
  "Pengasuhan asrama 24 jam oleh musyrif berpengalaman",
  "Akreditasi A dari Kementerian Agama",
  "Program tahfidz bersanad dengan target 30 juz",
];

export default function AboutSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-deep">TENTANG KAMI</span>
          <h2 className="mt-3 text-balance font-display text-2xl font-bold leading-tight text-deep lg:text-3xl">
            Ekosistem Pendidikan Islam yang Utuh
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-ink-soft">
            Yayasan Takwinul Ummah didirikan untuk menjawab kebutuhan pendidikan yang
            menyeimbangkan ilmu agama dan akademik. Kini kami menaungi Pondok Pesantren, SMP, dan
            SMA dalam satu manajemen yang terintegrasi.
          </p>
          <ul className="mt-6 space-y-3">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-ink-soft">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-deep" /> {p}
              </li>
            ))}
          </ul>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-deep px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-deep-2"
          >
            Profil Lengkap <ArrowRight size={15} />
          </Link>
        </div>

        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80&w=1200&auto=format&fit=crop"
            alt="Kegiatan santri Takwinul Ummah"
            className="w-full rounded-xl object-cover"
          />
          <div className="absolute -bottom-6 -right-6 hidden rounded-xl border border-border bg-white p-4 shadow-sm sm:block">
            <p className="font-display text-xl font-bold text-deep">27+ Tahun</p>
            <p className="text-xs text-ink-muted">Mendidik dengan Amanah</p>
          </div>
        </div>
      </div>
    </section>
  );
}
