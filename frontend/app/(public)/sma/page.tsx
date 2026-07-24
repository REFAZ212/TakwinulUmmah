import type { Metadata } from "next";
import UnitHero from "@/components/shared/UnitHero";
import SectionHeading from "@/components/shared/SectionHeading";
import FacilityCard from "@/components/shared/FacilityCard";
import { CheckCircle2, ArrowRight, GraduationCap } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SMA IT Takwinul Ummah",
  description: "SMA IT Takwinul Ummah — jenjang menengah atas di bawah Yayasan Takwinul Ummah dengan jurusan IPA, IPS, dan program tahfidz lanjutan.",
};

const TEACHERS = [
  { name: "Ust. Ahmad Syafi'i, M.Pd.", subject: "Matematika", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop" },
  { name: "Ustzh. Fatimah Zahra, S.Si.", subject: "Biologi", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop" },
  { name: "Ust. Hamzah Yusuf, S.Pd.", subject: "Ekonomi", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
  { name: "Ust. Hendra Wijaya, M.Si.", subject: "Fisika", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop" },
  { name: "Ustzh. Nurul Hidayah, S.Pd.", subject: "Bahasa Indonesia", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" },
  { name: "Ust. Muhammad Rizal, S.Pd.I", subject: "Al-Quran & Hadits", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" },
  { name: "Ustzh. Dewi Kartika, S.Pd.", subject: "Bahasa Inggris", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" },
  { name: "Ust. Ali Mustofa, M.Pd.", subject: "Kimia", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
  { name: "Ustzh. Siti Nurjanah, S.Pd.I", subject: "Fiqih & Aqidah", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&auto=format&fit=crop" },
  { name: "Ust. Bambang Setiawan, S.Pd.", subject: "Geografi", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
  { name: "Ust. Farid Nugroho, S.H.", subject: "PPKn & Hukum", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop" },
  { name: "Ustzh. Aminah Rasyid, S.Pd.", subject: "Sosiologi", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop" },
  { name: "Ust. Yusuf Kurniawan, S.Kom.", subject: "Informatika", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop" },
];

const DEPARTMENTS = [
  { name: "Jurusan IPA", desc: "Matematika, Fisika, Kimia, Biologi — jalur riset & kedokteran" },
  { name: "Jurusan IPS", desc: "Ekonomi, Sosiologi, Geografi — jalur hukum & ekonomi Islam" },
  { name: "Kelas Tahfidz Lanjutan", desc: "Target hafalan 30 juz dengan sanad" },
];

const FACILITIES = [
  { name: "Laboratorium Komputer", desc: "Coding & desain digital", location: "Gedung C, Lt. 1", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=500&auto=format&fit=crop" },
  { name: "Aula Serbaguna", desc: "Kajian, seminar, dan acara sekolah", location: "Gedung Utama", img: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=500&auto=format&fit=crop" },
  { name: "Masjid Kampus", desc: "Pusat ibadah & kajian rutin", location: "Area Tengah Kampus", img: "https://images.unsplash.com/photo-1542320868-996a2e7ac9e6?q=80&w=500&auto=format&fit=crop" },
];

export default function SMAPage() {
  return (
    <>
      <UnitHero
        eyebrow="SMA IT TAKWINUL UMMAH"
        title="Menyiapkan Lulusan Siap Kuliah & Berdaya Saing Global"
        desc="Jurusan IPA/IPS dengan penguatan tahfidz lanjutan dan bimbingan masuk perguruan tinggi."
        img="/images/bgsma.jpeg"
        logo="/images/logo-sma.png"
        logoAlt="Logo SMA IT Takwinul Ummah"
      />

      {/* ── Visi & Misi ── */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-deep">VISI &amp; MISI</span>
          <h2 className="mt-2 font-display text-2xl font-bold text-deep lg:text-3xl">
            Visi &amp; Misi SMA IT Takwinul Ummah
          </h2>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl bg-deep p-8 text-white lg:p-10">
            <h3 className="font-display text-lg font-bold">Visi</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Menyiapkan lulusan yang unggul secara akademik, berintegritas, dan berdaya saing
              global melalui pendidikan yang mengintegrasikan kurikulum nasional, tahfidz lanjutan,
              dan kematangan spiritual.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-white p-8 lg:p-10">
            <h3 className="font-display text-lg font-bold text-deep">Misi</h3>
            <ul className="mt-4 space-y-3">
              {[
                "Menyelenggarakan bimbingan intensif SNBT & masuk PTN/PTKIN",
                "Mengembangkan kelas riset & karya tulis ilmiah",
                "Memperluas kerja sama beasiswa Al-Azhar & LIPIA",
                "Menyelenggarakan studi banding & kunjungan industri",
                "Membina hafalan Al-Quran juz 30 dengan sanad",
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

      {/* ── Jurusan ── */}
      <section className="border-y border-border bg-white py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <SectionHeading eyebrow="JURUSAN" title="Peminatan Akademik" />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {DEPARTMENTS.map((d) => (
              <div key={d.name} className="rounded-xl border border-border p-6">
                <GraduationCap className="text-deep" size={24} />
                <p className="mt-4 font-display text-sm font-semibold text-deep">{d.name}</p>
                <p className="mt-1.5 text-sm text-ink-soft">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Kepala Sekolah ── */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-deep">KEPALA SEKOLAH</span>
          <h2 className="mt-2 font-display text-2xl font-bold text-deep lg:text-3xl">
            Ust. Ahmad Syafi&apos;i, M.Pd.
          </h2>
          <p className="mt-2 text-sm text-ink-soft">Kepala Sekolah SMA IT Takwinul Ummah</p>
        </div>
        <div className="mt-10 flex flex-col items-center gap-8 sm:flex-row sm:items-start">
          <div className="shrink-0">
            <div className="overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop"
                alt="Ust. Ahmad Syafi'i, M.Pd."
                className="h-64 w-48 object-cover sm:h-72 sm:w-56"
              />
            </div>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-sm leading-relaxed text-ink-soft">
              Ust. Ahmad Syafi&apos;i, M.Pd. memimpin SMA IT Takwinul Ummah dengan fokus
              pada peningkatan mutu akademik dan pembentukan karakter siswa yang berintegritas.
              Beliau berkomitmen untuk menyiapkan lulusan yang siap bersaing di tingkat nasional
              dan internasional.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Dengan pengalaman lebih dari 18 tahun dalam pendidikan, beliau telah berhasil
              memperluas jaringan kerja sama dengan berbagai perguruan tinggi dan lembaga
              beasiswa, serta mengembangkan program khusus persiapan masuk PTN/PTKIN.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-border bg-white p-3 text-center">
                <p className="font-utility text-lg font-bold text-deep">18+</p>
                <p className="mt-1 text-[11px] text-ink-muted">Tahun Pengalaman</p>
              </div>
              <div className="rounded-xl border border-border bg-white p-3 text-center">
                <p className="font-utility text-lg font-bold text-deep">400+</p>
                <p className="mt-1 text-[11px] text-ink-muted">Siswa Aktif</p>
              </div>
              <div className="rounded-xl border border-border bg-white p-3 text-center">
                <p className="font-utility text-lg font-bold text-deep">A</p>
                <p className="mt-1 text-[11px] text-ink-muted">Akreditasi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tenaga Pengajar ── */}
      <section className="border-y border-border bg-white py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <SectionHeading eyebrow="TENAGA PENGAJAR" title="Guru & Pengajar SMA IT Takwinul Ummah" />
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
        </div>
      </section>

      {/* ── Fasilitas ── */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <SectionHeading eyebrow="FASILITAS" title="Sarana Penunjang Belajar" />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {FACILITIES.map((f) => <FacilityCard key={f.name} {...f} />)}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-border py-20 text-center">
        <SectionHeading eyebrow="PPDB SMA" title="Bergabunglah dengan SMA IT Takwinul Ummah" />
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
