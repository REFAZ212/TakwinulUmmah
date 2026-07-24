"use client";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  { name: "Bapak Ahmad Sujarwo", role: "Orang Tua Santri", text: "Perubahan akhlak dan hafalan anak kami sangat terasa sejak mondok di sini. Pengasuhnya sabar dan komunikatif." },
  { name: "Ibu Siti Nurjanah", role: "Wali Murid SMA", text: "Kombinasi kurikulum agama dan sains di SMA IT Takwinul Ummah membuat anak saya siap untuk kuliah kedokteran." },
  { name: "Fauzan Ridwan", role: "Alumni 2019", text: "Bekal tahfidz dan kedisiplinan dari pesantren ini yang membawa saya lolos beasiswa ke Al-Azhar." },
];

export default function Testimonials() {
  return (
    <section className="border-y border-border bg-white py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-deep">TESTIMONI</span>
          <h2 className="mt-2 font-display text-2xl font-bold text-deep lg:text-3xl">Kata Mereka Tentang Kami</h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="rounded-xl border border-border p-6">
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} size={14} fill="currentColor" strokeWidth={0} />)}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-4 border-t border-border pt-4">
                <p className="font-display text-sm font-semibold text-deep">{t.name}</p>
                <p className="text-xs text-ink-muted">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
