import type { Metadata } from "next";
import SectionHeading from "@/components/shared/SectionHeading";
import AdmissionForm from "@/components/shared/AdmissionForm";
import { FileCheck, ClipboardList, Wallet, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Pendaftaran Santri Baru",
  description: "Informasi pendaftaran, persyaratan, alur, dan biaya di Yayasan Takwinul Ummah untuk unit Pesantren, SMP, dan SMA.",
};

const STEPS = [
  { title: "Isi Formulir Online", desc: "Lengkapi data calon santri di bawah ini" },
  { title: "Verifikasi Berkas", desc: "Panitia menghubungi Anda dalam 2x24 jam" },
  { title: "Tes Seleksi", desc: "Tes akademik, baca Qur'an, dan wawancara" },
  { title: "Pengumuman & Daftar Ulang", desc: "Pembayaran biaya pendaftaran ulang" },
];

const REQUIREMENTS = ["Fotokopi akta kelahiran & KK", "Fotokopi rapor terakhir", "Pas foto 3x4 (4 lembar)", "Surat keterangan sehat"];

export default function AdmissionsPage() {
  return (
    <>
      <section className="border-b border-border bg-deep py-16 text-center">
        <div className="mx-auto max-w-3xl px-5">
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">Pendaftaran Santri Baru 2026/2027</h1>
          <p className="mt-4 text-sm text-white/60">Bergabunglah dengan Pesantren, SMP, atau SMA IT Takwinul Ummah.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <SectionHeading eyebrow="ALUR PENDAFTARAN" title="4 Langkah Mudah" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={s.title} className="rounded-xl border border-border bg-white p-5">
              <span className="font-utility text-2xl font-bold text-deep">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-3 font-display text-sm font-semibold text-deep">{s.title}</p>
              <p className="mt-1.5 text-sm text-ink-soft">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-white py-20">
        <div className="mx-auto grid max-w-5xl gap-5 px-5 sm:grid-cols-2 lg:px-8">
          <div className="rounded-xl border border-border p-6">
            <FileCheck className="text-deep" size={22} />
            <h3 className="mt-4 font-display text-sm font-semibold text-deep">Persyaratan</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              {REQUIREMENTS.map((r) => <li key={r}>• {r}</li>)}
            </ul>
          </div>
          <div className="rounded-xl border border-border p-6">
            <Wallet className="text-deep" size={22} />
            <h3 className="mt-4 font-display text-sm font-semibold text-deep">Biaya Pendaftaran</h3>
            <p className="mt-3 text-sm text-ink-soft">Rp 350.000 (sudah termasuk tes seleksi &amp; formulir). Info biaya SPP &amp; asrama dapat ditanyakan ke panitia PPDB.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-5 py-20 lg:px-8">
        <SectionHeading eyebrow="FORMULIR" title="Daftar Online Sekarang" />
        <div className="mt-10">
          <AdmissionForm />
        </div>
      </section>

      <section className="border-t border-border py-12 text-center">
        <ClipboardList className="mx-auto text-deep" size={22} />
        <p className="mt-3 flex items-center justify-center gap-2 text-sm text-ink-soft">
          <HelpCircle size={14} /> Pertanyaan lain? Hubungi panitia PPDB di +62 812-3456-7890
        </p>
      </section>
    </>
  );
}
