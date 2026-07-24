import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import { NEWS, getNewsBySlug } from "@/lib/news-data";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return NEWS.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const news = getNewsBySlug(slug);
  if (!news) return { title: "Berita Tidak Ditemukan" };
  return {
    title: news.title,
    description: news.excerpt,
    openGraph: { title: news.title, description: news.excerpt, images: [{ url: news.img }] },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const news = getNewsBySlug(slug);

  if (!news) notFound();

  const paragraphs = news.content.split("\n\n");

  return (
    <article className="mx-auto max-w-3xl px-5 py-20 lg:px-8">
      <Link href="/news" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-deep transition-colors mb-8">
        <ArrowLeft size={14} /> Kembali ke Berita
      </Link>

      <span className="inline-block rounded-md bg-deep px-2.5 py-1 text-[11px] font-medium text-white mb-4">
        {news.cat}
      </span>

      <h1 className="font-display text-2xl font-bold leading-tight text-deep sm:text-3xl">{news.title}</h1>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-ink-muted">
        <span className="flex items-center gap-1.5"><Calendar size={13} /> {formatDate(news.date)}</span>
        <span className="flex items-center gap-1.5"><User size={13} /> {news.author}</span>
      </div>

      <div className="relative mt-8 h-64 w-full overflow-hidden rounded-xl sm:h-96">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={news.img} alt={news.title} className="h-full w-full object-cover" />
      </div>

      <div className="mt-10 space-y-5 text-base leading-relaxed text-ink">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="mt-12 border-t border-border pt-8">
        <Link href="/news" className="inline-flex items-center gap-1.5 text-sm font-medium text-deep hover:underline">
          <ArrowLeft size={14} /> Lihat Berita Lainnya
        </Link>
      </div>
    </article>
  );
}
