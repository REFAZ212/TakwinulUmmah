import type { Metadata } from "next";
import NewsList from "@/components/home/NewsList";

export const metadata: Metadata = { title: "Berita", description: "Kumpulan berita dan kegiatan Yayasan Takwinul Ummah, SMP, dan SMA." };

export default function NewsPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-deep lg:text-4xl">Berita &amp; Kegiatan</h1>
      <NewsList />
    </section>
  );
}
