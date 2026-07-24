import type { Metadata } from "next";
import Image from "next/image";
import { Trophy } from "lucide-react";

export const metadata: Metadata = { title: "Prestasi", description: "Prestasi akademik dan non-akademik santri Takwinul Ummah tingkat regional, nasional, dan internasional." };

const ACHIEVEMENTS = [
  { title: "Juara 1 MTQ Tingkat Provinsi", winner: "Muhammad Iqbal", year: 2026, level: "Regional", img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=500&auto=format&fit=crop" },
  { title: "Juara 1 OSN Matematika Kabupaten", winner: "Aisyah Putri", year: 2026, level: "Regional", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=500&auto=format&fit=crop" },
  { title: "Medali Perak Olimpiade Sains Nasional", winner: "Tim SMA IT Takwinul Ummah", year: 2025, level: "Nasional", img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=500&auto=format&fit=crop" },
  { title: "Juara 3 Kompetisi Robotik ASEAN", winner: "Tim Robotik SMP", year: 2025, level: "Internasional", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=500&auto=format&fit=crop" },
];

export default function AchievementsPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
      <div className="flex items-center gap-3">
        <Trophy className="text-deep" size={24} />
        <h1 className="font-display text-3xl font-bold text-deep lg:text-4xl">Prestasi Santri</h1>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ACHIEVEMENTS.map((a) => (
          <div key={a.title} className="overflow-hidden rounded-xl border border-border bg-white">
            <div className="relative h-40 w-full">
              <Image src={a.img} alt={a.title} fill className="object-cover" />
              <span className="absolute left-3 top-3 rounded-md bg-deep px-2.5 py-1 text-[10px] font-medium text-white">{a.level}</span>
            </div>
            <div className="p-5">
              <h3 className="font-display text-sm font-semibold leading-snug text-deep">{a.title}</h3>
              <p className="mt-2 text-xs text-ink-muted">{a.winner} &middot; {a.year}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
