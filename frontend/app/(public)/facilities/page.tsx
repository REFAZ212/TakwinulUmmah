import type { Metadata } from "next";
import FacilityCard from "@/components/shared/FacilityCard";

export const metadata: Metadata = { title: "Fasilitas", description: "Fasilitas penunjang pendidikan di Yayasan Takwinul Ummah." };

const FACILITIES = [
  { name: "Masjid Kampus", desc: "Pusat ibadah & kajian rutin santri", location: "Area Tengah Kampus", img: "https://images.unsplash.com/photo-1542320868-996a2e7ac9e6?q=80&w=500&auto=format&fit=crop" },
  { name: "Asrama Putra", desc: "12 unit asrama dengan kapasitas 40 santri/unit", location: "Blok Utara", img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=500&auto=format&fit=crop" },
  { name: "Asrama Putri", desc: "8 unit asrama dengan pengasuhan penuh", location: "Blok Selatan", img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=500&auto=format&fit=crop" },
  { name: "Perpustakaan Terpadu", desc: "Koleksi 8.000+ judul buku", location: "Gedung A", img: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=500&auto=format&fit=crop" },
  { name: "Laboratorium Sains", desc: "Fisika, kimia, dan biologi", location: "Gedung B", img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=500&auto=format&fit=crop" },
  { name: "Klinik Kesehatan", desc: "Layanan kesehatan 24 jam", location: "Gedung Utama", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=500&auto=format&fit=crop" },
];

export default function FacilitiesPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-deep lg:text-4xl">Fasilitas</h1>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FACILITIES.map((f) => <FacilityCard key={f.name} {...f} />)}
      </div>
    </section>
  );
}
