"use client";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactMap() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-deep">LOKASI KAMI</span>
            <h2 className="mt-2 font-display text-2xl font-bold text-deep lg:text-3xl">Kunjungi Kampus Kami</h2>
            <div className="mt-6 space-y-4 text-sm text-ink-soft">
              <p className="flex gap-3"><MapPin size={16} className="mt-0.5 shrink-0 text-deep" /> Jl. Pendidikan No. 45, Banjar, Jawa Barat, Indonesia</p>
              <p className="flex gap-3"><Phone size={16} className="mt-0.5 shrink-0 text-deep" /> +62 812-3456-7890</p>
              <p className="flex gap-3"><Mail size={16} className="mt-0.5 shrink-0 text-deep" /> info@takwinul-ummah.sch.id</p>
              <p className="flex gap-3"><Clock size={16} className="mt-0.5 shrink-0 text-deep" /> Senin–Sabtu, 08.00–16.00 WIB</p>
            </div>
          </div>
          <div className="h-72 overflow-hidden rounded-xl border border-border lg:h-full">
            <iframe
              title="Lokasi Yayasan Takwinul Ummah"
              className="h-full w-full"
              loading="lazy"
              src="https://www.google.com/maps?q=Banjar,West+Java,Indonesia&output=embed"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
