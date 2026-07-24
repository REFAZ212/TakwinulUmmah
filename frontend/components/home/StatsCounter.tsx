"use client";

const STATS = [
  { value: "500+", label: "Santri Aktif" },
  { value: "27+", label: "Tahun Mengabdi" },
  { value: "3", label: "Unit Pendidikan" },
  { value: "50+", label: "Tenaga Pengajar" },
];

export default function StatsCounter() {
  return (
    <section className="border-y border-border bg-white py-16">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-5 lg:grid-cols-4 lg:px-8">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-utility text-3xl font-bold text-deep">{s.value}</p>
            <p className="mt-1 text-sm text-ink-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
