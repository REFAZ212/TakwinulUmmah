import type { Metadata } from "next";
import { Megaphone, Calendar, AlertCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Pengumuman", description: "Pengumuman resmi Yayasan Takwinul Ummah." };

const ANNOUNCEMENTS = [
  { title: "Pendaftaran Santri Baru Tahun Ajaran 2026/2027 Dibuka", cat: "Admisi", date: "2026-07-01", urgent: true },
  { title: "Libur Semester Ganjil 22 Desember 2026 – 4 Januari 2027", cat: "Umum", date: "2026-06-25", urgent: false },
  { title: "Jadwal Ujian Tengah Semester SMP & SMA", cat: "SMP", date: "2026-06-18", urgent: false },
  { title: "Beasiswa Tahfidz Penuh untuk 20 Santri Berprestasi", cat: "Beasiswa", date: "2026-06-10", urgent: true },
];

export default function AnnouncementsPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-20 lg:px-8">
      <div className="flex items-center gap-3">
        <Megaphone className="text-deep" size={24} />
        <h1 className="font-display text-3xl font-bold text-deep lg:text-4xl">Pengumuman</h1>
      </div>
      <div className="mt-10 space-y-3">
        {ANNOUNCEMENTS.map((a) => (
          <div key={a.title} className="flex items-start gap-4 rounded-xl border border-border bg-white p-5">
            {a.urgent ? <AlertCircle className="mt-1 shrink-0 text-red-500" size={18} /> : <Calendar className="mt-1 shrink-0 text-ink-muted" size={18} />}
            <div className="min-w-0">
              <span className="rounded-md bg-sand px-2 py-0.5 text-[11px] font-medium text-deep">{a.cat}</span>
              <h3 className="mt-2 font-display text-sm font-semibold text-deep">{a.title}</h3>
              <p className="mt-1 text-xs text-ink-muted">{formatDate(a.date)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
