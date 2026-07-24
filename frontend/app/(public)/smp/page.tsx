import type { Metadata } from "next";
import UnitHero from "@/components/shared/UnitHero";
import SectionHeading from "@/components/shared/SectionHeading";
import FacilityCard from "@/components/shared/FacilityCard";
import { CheckCircle2, ArrowRight, Trophy } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SMP IT Takwinul Ummah",
  description: "SMP IT Takwinul Ummah — jenjang menengah pertama di bawah Yayasan Takwinul Ummah, memadukan kurikulum nasional dengan nilai-nilai pesantren.",
};

const TEACHERS = [
  { name: "Ust. Muhammad Fadli, S.Pd.", subject: "Bahasa Indonesia", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" },
  { name: "Ustzh. Aisyah Rahmah, S.Pd.I", subject: "Al-Quran & Hadits", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop" },
  { name: "Ust. Rizky Abdullah, M.Pd.", subject: "Matematika", img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop" },
  { name: "Ustzh. Nurhaliza, S.Pd.", subject: "Bahasa Inggris", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop" },
  { name: "Ust. Budi Santoso, S.Pd.", subject: "IPA (Fisika & Biologi)", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
  { name: "Ustzh. Siti Aminah, S.Pd.I", subject: "Fiqih & Aqidah", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" },
  { name: "Ust. Ahmad Hidayat, S.Kom.", subject: "Prakarya & Komputer", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop" },
  { name: "Ustzh. Rahmawati, S.Pd.", subject: "IPS (Sejarah & Geografi)", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" },
  { name: "Ust. Muhammad Iqbal, S.Pd.", subject: "PJOK (Olahraga)", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
  { name: "Ustzh. Fatimah Azzahra, S.Pd.", subject: "Seni & Budaya", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&auto=format&fit=crop" },
  { name: "Ust. Abdullah Fauzi, Lc.", subject: "Bahasa Arab", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" },
  { name: "Ustzh. Nur Aini, S.Pd.I", subject: "Tahfidz Quran", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop" },
  { name: "Ust. Hendra Prasetyo, S.Pd.", subject: "Matematika & Olimpiade", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop" },
];

const FACILITIES = [
  { name: "Laboratorium IPA", desc: "Ruang praktik sains dengan peralatan lengkap", location: "Gedung B, Lt. 2", img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=500&auto=format&fit=crop" },
  { name: "Perpustakaan", desc: "Koleksi buku umum & keislaman", location: "Gedung A, Lt. 1", img: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=500&auto=format&fit=crop" },
  { name: "Lapangan Olahraga", desc: "Futsal, basket, dan voli", location: "Area Tengah Kampus", img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=500&auto=format&fit=crop" },
];

const EXTRA = ["Pramuka", "Tahfidz Ekstra", "Futsal", "Kaligrafi", "Robotik", "Pidato 3 Bahasa"];

export default function SMPPage() {
  return (
    <>
      <UnitHero
        eyebrow="SMP IT TAKWINUL UMMAH"
        title="Jenjang Menengah Pertama yang Membentuk Karakter Sejak Dini"
        desc="Kurikulum nasional berpadu dengan pembiasaan akhlak, tahfidz, dan kegiatan asrama."
        img="/images/bgsmp.jpeg"
        logo="/images/logo-smp.png"
        logoAlt="Logo SMP IT Takwinul Ummah"
      />

      {/* ── Visi & Misi ── */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-deep">VISI &amp; MISI</span>
          <h2 className="mt-2 font-display text-2xl font-bold text-deep lg:text-3xl">
            Visi &amp; Misi SMP IT Takwinul Ummah
          </h2>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl bg-deep p-8 text-white lg:p-10">
            <h3 className="font-display text-lg font-bold">Visi</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Mewujudkan generasi muda berakhlak Qur&apos;ani, cerdas, dan mandiri
              melalui pendidikan yang mengintegrasikan kurikulum nasional dengan nilai-nilai pesantren.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-white p-8 lg:p-10">
            <h3 className="font-display text-lg font-bold text-deep">Misi</h3>
            <ul className="mt-4 space-y-3">
              {[
                "Menyelenggarakan Kurikulum Merdeka terintegrasi diniyah",
                "Membina hafalan Al-Quran dengan target 5 juz per tahun",
                "Mengembangkan potensi akademik melalui klub sains & olimpiade",
                "Membentuk karakter disiplin melalui kegiatan asrama",
                "Menyiapkan siswa melanjutkan ke jenjang pendidikan yang lebih tinggi",
              ].map((m) => (
                <li key={m} className="flex items-start gap-3 text-sm text-ink-soft">
                  <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-deep" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Kepala Sekolah ── */}
      <section className="border-y border-border bg-white py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-deep">KEPALA SEKOLAH</span>
            <h2 className="mt-2 font-display text-2xl font-bold text-deep lg:text-3xl">
              Ust. Muhammad Fadli, S.Pd.
            </h2>
            <p className="mt-2 text-sm text-ink-soft">Kepala Sekolah SMP IT Takwinul Ummah</p>
          </div>
          <div className="mt-10 flex flex-col items-center gap-8 sm:flex-row sm:items-start">
            <div className="shrink-0">
              <div className="overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop"
                  alt="Ust. Muhammad Fadli, S.Pd."
                  className="h-64 w-48 object-cover sm:h-72 sm:w-56"
                />
              </div>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-sm leading-relaxed text-ink-soft">
                Ust. Muhammad Fadli, S.Pd. memimpin SMP IT Takwinul Ummah dengan dedikasi
                tinggi dalam mengembangkan pendidikan yang holistik. Beliau berkomitmen
                untuk menciptakan lingkungan belajar yang kondusif, di mana setiap siswa
                dapat tumbuh secara akademik dan spiritual.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                Dengan pengalaman lebih dari 15 tahun dalam dunia pendidikan, beliau
                terus berupaya memperkuat program tahfidz, meningkatkan mutu pengajaran,
                dan membangun kerja sama yang baik dengan orang tua siswa.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-border bg-white p-3 text-center">
                  <p className="font-utility text-lg font-bold text-deep">15+</p>
                  <p className="mt-1 text-[11px] text-ink-muted">Tahun Pengalaman</p>
                </div>
                <div className="rounded-xl border border-border bg-white p-3 text-center">
                  <p className="font-utility text-lg font-bold text-deep">500+</p>
                  <p className="mt-1 text-[11px] text-ink-muted">Siswa Aktif</p>
                </div>
                <div className="rounded-xl border border-border bg-white p-3 text-center">
                  <p className="font-utility text-lg font-bold text-deep">A</p>
                  <p className="mt-1 text-[11px] text-ink-muted">Akreditasi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tenaga Pengajar ── */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <SectionHeading eyebrow="TENAGA PENGAJAR" title="Guru & Pengajar SMP IT Takwinul Ummah" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TEACHERS.map((t) => (
            <div key={t.name} className="flex items-center gap-3 rounded-xl border border-border bg-white p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.img}
                alt={t.name}
                className="h-14 w-14 shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-semibold text-deep">{t.name}</p>
                <p className="truncate text-xs text-ink-muted">{t.subject}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Fasilitas ── */}
      <section className="border-y border-border bg-white py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <SectionHeading eyebrow="FASILITAS" title="Sarana Penunjang Belajar" />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {FACILITIES.map((f) => <FacilityCard key={f.name} {...f} />)}
          </div>
        </div>
      </section>

      {/* ── Ekstrakurikuler ── */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <div className="flex flex-wrap items-center gap-3 text-deep">
          <Trophy size={18} /> <span className="text-xs font-semibold uppercase tracking-[0.2em]">EKSTRAKURIKULER</span>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {EXTRA.map((e) => (
            <span key={e} className="rounded-lg border border-border px-4 py-2 text-sm text-ink-soft">{e}</span>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-border py-20 text-center">
        <SectionHeading eyebrow="PPDB SMP" title="Bergabunglah dengan SMP IT Takwinul Ummah" />
        <p className="mx-auto mt-4 max-w-lg text-sm text-ink-soft">
          Pendaftaran santri baru tahun ajaran 2026/2027 telah dibuka. Kuota terbatas.
        </p>
        <Link href="/admissions" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-deep px-7 py-3 text-sm font-semibold text-white hover:bg-deep-2">
          Daftar Sekarang <ArrowRight size={15} />
        </Link>
      </section>
    </>
  );
}
