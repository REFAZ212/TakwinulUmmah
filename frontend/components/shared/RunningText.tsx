"use client";

const ITEMS = [
  "Pendaftaran Santri Baru Tahun Ajaran 2026/2027 telah dibuka",
  "Selamat kepada Tim Tahfidz atas Juara 1 MTQ Tingkat Provinsi",
  "Libur Semester Ganjil: 22 Desember 2026 – 4 Januari 2027",
];

export default function RunningText() {
  return (
    <div className="overflow-hidden bg-deep py-2 text-xs font-medium text-white/90">
      <div className="animate-[marquee_28s_linear_infinite] whitespace-nowrap">
        {[...ITEMS, ...ITEMS].map((t, i) => (
          <span key={i} className="mx-8 font-utility">
            &bull; {t}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}
