"use client";

import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api";
import {
  Newspaper,
  Megaphone,
  FileText,
  Mail,
  Trophy,
  ImageIcon,
  Building2,
  Download,
  TrendingUp,
  Clock,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { Card, Badge, statusBadge, SkeletonTable } from "@/components/ui";

interface Stats {
  news: number;
  announcements: number;
  admissions: number;
  contacts: number;
  users: number;
  achievements: number;
  albums: number;
  facilities: number;
  downloads: number;
}

interface RecentNews {
  id: string;
  title: string;
  category: string;
  status: string;
  createdAt: string;
}

interface RecentAdmission {
  id: string;
  fullName: string;
  unit: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    news: 0, announcements: 0, admissions: 0, contacts: 0, users: 0,
    achievements: 0, albums: 0, facilities: 0, downloads: 0,
  });
  const [recentNews, setRecentNews] = useState<RecentNews[]>([]);
  const [recentAdmissions, setRecentAdmissions] = useState<RecentAdmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [newsRes, announcementsRes, admissionsRes, contactsRes, usersRes, achievementsRes, galleryRes, facilitiesRes, downloadsRes] =
          await Promise.all([
            adminApi.get("/news").catch(() => ({ data: [] })),
            adminApi.get("/announcements").catch(() => ({ data: [] })),
            adminApi.get("/admissions").catch(() => ({ data: [] })),
            adminApi.get("/contact").catch(() => ({ data: [] })),
            adminApi.get("/users").catch(() => ({ data: [] })),
            adminApi.get("/achievements").catch(() => ({ data: [] })),
            adminApi.get("/gallery").catch(() => ({ data: [] })),
            adminApi.get("/facilities").catch(() => ({ data: [] })),
            adminApi.get("/downloads").catch(() => ({ data: [] })),
          ]);

        const extract = (res: { data: unknown }) =>
          Array.isArray(res.data) ? res.data : (res.data as { data?: unknown[] })?.data ?? [];

        const newsData = extract(newsRes);
        const announcementsData = extract(announcementsRes);
        const admissionsData = extract(admissionsRes);

        setStats({
          news: newsData.length,
          announcements: announcementsData.length,
          admissions: admissionsData.length,
          contacts: extract(contactsRes).length,
          users: extract(usersRes).length,
          achievements: extract(achievementsRes).length,
          albums: extract(galleryRes).length,
          facilities: extract(facilitiesRes).length,
          downloads: extract(downloadsRes).length,
        });

        setRecentNews(newsData.slice(0, 5));
        setRecentAdmissions(admissionsData.slice(0, 5));
      } catch {
        setError("Gagal memuat data dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <div className="h-8 w-48 bg-sand animate-pulse rounded mb-2" />
          <div className="h-4 w-72 bg-sand animate-pulse rounded" />
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 mb-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-3 w-20 bg-sand rounded mb-3" />
              <div className="h-7 w-10 bg-sand rounded" />
            </Card>
          ))}
        </div>
        <SkeletonTable rows={5} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[60vh] items-center justify-center gap-3 text-red-500">
        <AlertCircle size={20} />
        <span>{error}</span>
      </div>
    );
  }

  const contentStats = [
    { label: "Berita", value: stats.news, icon: Newspaper, href: "/portal-manajemen/berita", color: "bg-deep/10 text-deep" },
    { label: "Pengumuman", value: stats.announcements, icon: Megaphone, href: "/portal-manajemen/pengumuman", color: "bg-gold/10 text-gold" },
    { label: "Prestasi", value: stats.achievements, icon: Trophy, href: "/portal-manajemen/prestasi", color: "bg-sage/10 text-sage" },
    { label: "Galeri", value: stats.albums, icon: ImageIcon, href: "/portal-manajemen/galeri", color: "bg-deep/10 text-deep" },
  ];

  const systemStats = [
    { label: "Fasilitas", value: stats.facilities, icon: Building2, href: "/portal-manajemen/fasilitas", color: "bg-gold/10 text-gold" },
    { label: "Unduhan", value: stats.downloads, icon: Download, href: "/portal-manajemen/unduhan", color: "bg-sage/10 text-sage" },
    { label: "Pendaftar", value: stats.admissions, icon: FileText, href: "/portal-manajemen/pendaftar", color: "bg-deep/10 text-deep" },
    { label: "Pesan", value: stats.contacts, icon: Mail, href: "/portal-manajemen/pesan", color: "bg-gold/10 text-gold" },
  ];

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-ink">Dashboard</h1>
        <p className="mt-1 text-sm text-ink-soft">Ringkasan aktivitas dan konten yayasan hari ini.</p>
      </div>

      {/* Content stats */}
      <div className="mb-6">
        <div className="mb-3 flex items-center gap-2">
          <TrendingUp size={14} className="text-ink-soft/60" />
          <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft/60">Konten</span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {contentStats.map((card) => (
            <Link key={card.label} href={card.href}>
              <Card className="transition-all hover:shadow-md hover:-translate-y-0.5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${card.color}`}>
                    <card.icon size={16} />
                  </div>
                </div>
                <p className="font-utility text-2xl font-bold text-ink">{card.value}</p>
                <p className="mt-0.5 text-xs text-ink-soft">{card.label}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* System stats */}
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <Building2 size={14} className="text-ink-soft/60" />
          <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft/60">Data & Sistem</span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {systemStats.map((card) => (
            <Link key={card.label} href={card.href}>
              <Card className="transition-all hover:shadow-md hover:-translate-y-0.5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${card.color}`}>
                    <card.icon size={16} />
                  </div>
                </div>
                <p className="font-utility text-2xl font-bold text-ink">{card.value}</p>
                <p className="mt-0.5 text-xs text-ink-soft">{card.label}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent tables */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent news */}
        <Card padding={false}>
          <div className="flex items-center justify-between border-b border-sand px-5 py-4">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-ink-soft/60" />
              <h2 className="font-display text-sm font-semibold text-ink">Berita Terbaru</h2>
            </div>
            <Link href="/portal-manajemen/berita" className="text-xs text-gold hover:underline">
              Lihat Semua
            </Link>
          </div>
          <div className="divide-y divide-sand">
            {recentNews.length === 0 ? (
              <p className="p-5 text-sm text-ink-soft">Belum ada berita.</p>
            ) : (
              recentNews.map((item) => {
                const { variant, label } = statusBadge(item.status);
                return (
                  <div key={item.id} className="flex items-center justify-between px-5 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink">{item.title}</p>
                      <p className="text-xs text-ink-soft">{formatDate(item.createdAt)}</p>
                    </div>
                    <Badge variant={variant} className="ml-3 shrink-0">
                      {label}
                    </Badge>
                  </div>
                );
              })
            )}
          </div>
        </Card>

        {/* Recent admissions */}
        <Card padding={false}>
          <div className="flex items-center justify-between border-b border-sand px-5 py-4">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-ink-soft/60" />
              <h2 className="font-display text-sm font-semibold text-ink">Pendaftar Terbaru</h2>
            </div>
            <Link href="/portal-manajemen/pendaftar" className="text-xs text-gold hover:underline">
              Lihat Semua
            </Link>
          </div>
          <div className="divide-y divide-sand">
            {recentAdmissions.length === 0 ? (
              <p className="p-5 text-sm text-ink-soft">Belum ada pendaftar.</p>
            ) : (
              recentAdmissions.map((item) => {
                const { variant, label } = statusBadge(item.status);
                return (
                  <div key={item.id} className="flex items-center justify-between px-5 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink">{item.fullName}</p>
                      <p className="text-xs text-ink-soft">{item.unit} &middot; {formatDate(item.createdAt)}</p>
                    </div>
                    <Badge variant={variant} className="ml-3 shrink-0">
                      {label}
                    </Badge>
                  </div>
                );
              })
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
