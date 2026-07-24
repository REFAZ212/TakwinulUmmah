import type { Metadata } from "next";
import {
  BookOpen,
  GraduationCap,
  Award,
  Users,
  Heart,
  Target,
  Shield,
  Lightbulb,
  ChevronRight,
} from "lucide-react";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Tentang Yayasan",
  description: "Sejarah, visi misi, struktur organisasi, dan profil pimpinan Yayasan Takwinul Ummah.",
};

const TIMELINE = [
  { year: "1998", title: "Pendirian", desc: "Yayasan Takwinul Ummah didirikan oleh Alm. KH. Abdullah Manshur di Banjar, Jawa Barat." },
  { year: "2005", title: "SMP IT", desc: "Pembukaan jenjang pendidikan SMP IT Takwinul Ummah dengan kurikulum terpadu." },
  { year: "2008", title: "SMA IT", desc: "Perluasan ke jenjang SMA IT Takwinul Ummah untuk mengakomodasi kebutuhan pendidikan." },
  { year: "2020", title: "Transisi", desc: "Estafet kepemimpinan dilanjutkan oleh KH. Ahmad Manshur dengan semangat baru." },
  { year: "2024", title: "Modernisasi", desc: "Penguatan program digital, robotik, dan riset sains di seluruh unit pendidikan." },
];

const PROGRAMS = [
  { icon: BookOpen, title: "Tahfidz Quran", desc: "Program menghafal Al-Quran bersanad dengan target 30 juz selama masa pendidikan." },
  { icon: GraduationCap, title: "Madrasah Diniyah", desc: "Pendidikan agama intensif meliputi fiqih, aqidah, tafsir, dan bahasa Arab." },
  { icon: Award, title: "Akreditasi A", desc: "Seluruh unit pendidikan mendapatkan akreditasi A dari Kementerian Agama." },
  { icon: Users, title: "Asrama 24 Jam", desc: "Pengasuhan asrama penuh oleh musyrif berpengalaman dengan lingkungan islami." },
];

const VALUES = [
  { icon: Heart, title: "Akhlak Mulia", desc: "Membentuk karakter santri yang berakhlakul karimah dalam setiap aspek kehidupan." },
  { icon: Target, title: "Keunggulan Akademik", desc: "Kurikulum terpadu yang menggabungkan keunggulan nasional dan kepesantrenan." },
  { icon: Shield, title: "Lingkungan Islami", desc: "Suasana pesantren yang kondusif untuk pembentukan pribadi muslim yang utuh." },
  { icon: Lightbulb, title: "Inovasi Pembelajaran", desc: "Pendekatan modern dalam pendidikan dengan tetap menjaga tradisi keilmuan." },
];

const BOARD = [
  { name: "KH. Ahmad Manshur", role: "Pimpinan Pondok Pesantren", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop" },
  { name: "Hj. Maimunah Manshur", role: "Wakil Ketua", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop" },
  { name: "H. Fauzan Aditama, S.E.", role: "Sekretaris Yayasan", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop" },
  { name: "Hj. Rahma Kartika, S.Ak.", role: "Bendahara Yayasan", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop" },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/bgpst.jpeg"
            alt="Yayasan Takwinul Ummah"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-5xl px-5 py-28 text-center lg:px-8 lg:py-36">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-yayasan.png" alt="Logo Yayasan" className="mx-auto h-40 w-40 rounded-2xl object-cover sm:h-52 sm:w-52" />
          <h1 className="mt-6 font-display text-3xl font-bold text-white lg:text-4xl">
            {SITE.name}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/60">
            Mendidik generasi Qur&apos;ani yang unggul dalam ilmu, kokoh dalam akhlak,
            sejak 1998.
          </p>
        </div>
      </section>

      {/* ── Sejarah ── */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-deep">SEJARAH</span>
            <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-deep lg:text-3xl">
              Perjalanan Takwinul Ummah
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">
              Didirikan pada tahun 1998 oleh Alm. KH. Abdullah Manshur, Yayasan Takwinul Ummah
              bermula dari sebuah majelis pengajian kecil di Banjar, Jawa Barat. Seiring
              bertambahnya santri, yayasan mengembangkan jenjang pendidikan formal SMP (2005)
              dan SMA (2008), tanpa meninggalkan ruh pesantren dalam setiap aspek pembelajaran.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Beliau wafat pada tahun 2020 dan estafet kepemimpinan dilanjutkan oleh
              putranya, KH. Ahmad Manshur, yang kini memimpin pondok pesantren dengan
              tetap menjaga visi dan misi ayahanda.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="rounded-xl border border-border bg-white p-4 text-center">
                <p className="font-utility text-2xl font-bold text-deep">1998</p>
                <p className="mt-1 text-xs text-ink-muted">Tahun Berdiri</p>
              </div>
              <div className="rounded-xl border border-border bg-white p-4 text-center">
                <p className="font-utility text-2xl font-bold text-deep">27+</p>
                <p className="mt-1 text-xs text-ink-muted">Tahun Mengabdi</p>
              </div>
              <div className="rounded-xl border border-border bg-white p-4 text-center">
                <p className="font-utility text-2xl font-bold text-deep">3</p>
                <p className="mt-1 text-xs text-ink-muted">Unit Pendidikan</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative border-l-2 border-border pl-8">
            {TIMELINE.map((t, i) => (
              <div key={t.year} className={`relative pb-10 last:pb-0 ${i < TIMELINE.length - 1 ? "" : ""}`}>
                <div className="absolute -left-[41px] top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-deep bg-white text-xs font-bold text-deep">
                  {t.year.slice(2)}
                </div>
                <p className="font-utility text-xs font-medium text-deep">{t.year}</p>
                <h4 className="mt-1 font-display text-sm font-semibold text-deep">{t.title}</h4>
                <p className="mt-1 text-sm text-ink-soft">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pendiri ── */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-deep">PENDIRI</span>
          <h2 className="mt-2 font-display text-2xl font-bold text-deep lg:text-3xl">
            Alm. KH. Abdullah Manshur
          </h2>
        </div>
        <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-10">
          <div className="shrink-0 overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=600&auto=format&fit=crop"
              alt="Alm. KH. Abdullah Manshur"
              className="aspect-[4/5] w-56 object-cover sm:w-64"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-deep">PENDIRI &amp; PENGASUH (1945 — 2020)</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Alm. KH. Abdullah Manshur adalah pendiri Yayasan Takwinul Ummah yang
              memiliki visi kuat untuk mendirikan lembaga pendidikan Islam terpadu.
              Dengan keteguhan dan keikhlasan, beliau membangun pesantren dari nol
              hingga menjadi lembaga pendidikan yang dipercaya masyarakat.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Beliau wafat pada tahun 2020 dan estafet kepemimpinan dilanjutkan oleh
              putranya, KH. Ahmad Manshur, yang kini memimpin pondok pesantren dengan
              tetap menjaga visi dan misi ayahanda.
            </p>
            <div className="mt-6 flex gap-4">
              <div className="rounded-xl border border-border bg-white p-4 text-center">
                <p className="font-utility text-xl font-bold text-deep">1998</p>
                <p className="mt-1 text-xs text-ink-muted">Tahun Berdiri</p>
              </div>
              <div className="rounded-xl border border-border bg-white p-4 text-center">
                <p className="font-utility text-xl font-bold text-deep">27+</p>
                <p className="mt-1 text-xs text-ink-muted">Tahun Mengabdi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pimpinan Sekarang ── */}
      <section className="border-y border-border bg-white py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-deep">PIMPINAN SEKARANG</span>
            <h2 className="mt-2 font-display text-2xl font-bold text-deep lg:text-3xl">
              KH. Ahmad Manshur
            </h2>
            <p className="mt-2 text-sm text-ink-soft">Pimpinan Pondok Pesantren</p>
          </div>
        <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-10">
            <div className="order-2 lg:order-1">
              <p className="text-sm leading-relaxed text-ink-soft">
                KH. Ahmad Manshur, putra pertama Alm. KH. Abdullah Manshur, melanjutkan
                estafet kepemimpinan sejak 2020. Dengan latar belakang pendidikan di
                Al-Azhar Kairo, beliau membawa semangat baru dalam mengembangkan program
                tahfidz, diniyah, dan penguatan kurikulum digital.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-border bg-white p-4 text-center">
                  <p className="font-utility text-xl font-bold text-deep">3</p>
                  <p className="mt-1 text-xs text-ink-muted">Unit Pendidikan</p>
                </div>
                <div className="rounded-xl border border-border bg-white p-4 text-center">
                  <p className="font-utility text-xl font-bold text-deep">500+</p>
                  <p className="mt-1 text-xs text-ink-muted">Santri</p>
                </div>
                <div className="rounded-xl border border-border bg-white p-4 text-center">
                  <p className="font-utility text-xl font-bold text-deep">A</p>
                  <p className="mt-1 text-xs text-ink-muted">Akreditasi</p>
                </div>
              </div>
            </div>
            <div className="shrink-0 order-1 lg:order-2">
              <div className="overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop"
                  alt="KH. Ahmad Manshur"
                  className="aspect-[4/5] w-56 object-cover sm:w-64"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Visi Misi ── */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-deep">VISI &amp; MISI</span>
          <h2 className="mt-2 font-display text-2xl font-bold text-deep lg:text-3xl">
            Arah &amp; Tujuan Pendidikan
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl bg-deep p-8 text-white lg:p-10">
            <h3 className="font-display text-lg font-bold">Visi</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Menjadi lembaga pendidikan Islam terpadu yang unggul dalam ilmu, akhlak,
              dan kemandirian — melahirkan generasi Qur&apos;ani yang berdaya saing global.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-white p-8 lg:p-10">
            <h3 className="font-display text-lg font-bold text-deep">Misi</h3>
            <ul className="mt-4 space-y-3">
              {[
                "Menyelenggarakan pendidikan tahfidz dan diniyah berkualitas",
                "Mengintegrasikan kurikulum nasional dengan nilai pesantren",
                "Membangun karakter santri yang mandiri dan berdaya saing",
                "Mengembangkan potensi santri melalui program ekstrakurikuler",
                "Mewujudkan lingkungan belajar yang kondusif dan islami",
              ].map((m) => (
                <li key={m} className="flex items-start gap-3 text-sm text-ink-soft">
                  <ChevronRight size={14} className="mt-0.5 shrink-0 text-deep" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Program Unggulan ── */}
      <section className="border-y border-border bg-white py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-deep">PROGRAM</span>
            <h2 className="mt-2 font-display text-2xl font-bold text-deep lg:text-3xl">
              Program Unggulan
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROGRAMS.map((p) => (
              <div key={p.title} className="group rounded-xl border border-border p-6 transition hover:shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-deep/10 text-deep">
                  <p.icon size={20} />
                </div>
                <h3 className="mt-4 font-display text-sm font-semibold text-deep">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nilai Kami ── */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-deep">NILAI KAMI</span>
          <h2 className="mt-2 font-display text-2xl font-bold text-deep lg:text-3xl">
            Prinsip yang Kami Junjung
          </h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-xl border border-border p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold">
                <v.icon size={20} />
              </div>
              <h3 className="mt-4 font-display text-sm font-semibold text-deep">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Dewan Pengurus ── */}
      <section className="border-y border-border bg-white py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-deep">PENGURUS</span>
            <h2 className="mt-2 font-display text-2xl font-bold text-deep lg:text-3xl">
              Dewan Pembina Yayasan
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BOARD.map((b) => (
              <div key={b.name} className="group overflow-hidden rounded-xl border border-border bg-white transition hover:shadow-sm">
                <div className="relative overflow-hidden">
                  <img
                    src={b.img}
                    alt={b.name}
                    className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-sm font-semibold text-deep">{b.name}</h3>
                  <p className="mt-1 text-xs text-deep">{b.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Legalitas ── */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <div className="rounded-xl bg-deep p-10 text-center text-white lg:p-16">
          <h2 className="font-display text-2xl font-bold">Legalitas &amp; Akreditasi</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/60">
            Terdaftar sebagai badan hukum yayasan berdasarkan Akta Notaris No. 12/1998 dan
            disahkan oleh Kementerian Hukum dan HAM Republik Indonesia. Seluruh unit pendidikan
            mendapatkan <strong className="text-white">Akreditasi A</strong> dari Kementerian Agama.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <div className="rounded-lg bg-white/10 px-6 py-4">
              <p className="font-utility text-2xl font-bold text-white">A</p>
              <p className="mt-1 text-xs text-white/50">Akreditasi SMP</p>
            </div>
            <div className="rounded-lg bg-white/10 px-6 py-4">
              <p className="font-utility text-2xl font-bold text-white">A</p>
              <p className="mt-1 text-xs text-white/50">Akreditasi SMA</p>
            </div>
            <div className="rounded-lg bg-white/10 px-6 py-4">
              <p className="font-utility text-2xl font-bold text-white">A</p>
              <p className="mt-1 text-xs text-white/50">Akreditasi Pesantren</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
