"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Newspaper,
  Megaphone,
  Trophy,
  Image as ImageIcon,
  Building2,
  Download,
  Users,
  Settings,
  LogOut,
  FileText,
  Mail,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Shield,
} from "lucide-react";
import { ToastProvider } from "@/components/ui/Toast";

interface NavSection {
  label: string;
  items: { label: string; icon: typeof LayoutDashboard; href: string }[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    label: "Konten",
    items: [
      { label: "Berita", icon: Newspaper, href: "/portal-manajemen/berita" },
      { label: "Pengumuman", icon: Megaphone, href: "/portal-manajemen/pengumuman" },
      { label: "Prestasi", icon: Trophy, href: "/portal-manajemen/prestasi" },
      { label: "Galeri", icon: ImageIcon, href: "/portal-manajemen/galeri" },
      { label: "Fasilitas", icon: Building2, href: "/portal-manajemen/fasilitas" },
      { label: "Unduhan", icon: Download, href: "/portal-manajemen/unduhan" },
    ],
  },
  {
    label: "Data",
    items: [
      { label: "Pendaftar", icon: FileText, href: "/portal-manajemen/pendaftar" },
      { label: "Pesan", icon: Mail, href: "/portal-manajemen/pesan" },
    ],
  },
  {
    label: "Sistem",
    items: [
      { label: "Pengguna", icon: Users, href: "/portal-manajemen/pengguna" },
      { label: "Pengaturan", icon: Settings, href: "/portal-manajemen/pengaturan" },
    ],
  },
];

function SidebarContent({ collapsed, onNavClick }: { collapsed: boolean; onNavClick?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("admin_access_token");
    document.cookie = "admin_access_token=; path=/portal-manajemen; max-age=0";
    router.push("/portal-manajemen/login");
  };

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className={`flex h-16 shrink-0 items-center border-b border-white/10 px-4 ${collapsed ? "justify-center" : "gap-3"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/logo-yayasan.png" alt="Logo" className={`shrink-0 rounded-full object-cover ${collapsed ? "h-8 w-8" : "h-9 w-9"}`} />
        {!collapsed && (
          <div className="min-w-0">
            <span className="block truncate font-display text-sm font-semibold leading-tight text-gold-light">Takwinul Ummah</span>
            <span className="block truncate text-[10px] text-white/40">Content Management</span>
          </div>
        )}
      </div>

      {/* Dashboard link */}
      <div className="mt-3 px-2">
        <Link
          href="/portal-manajemen/dashboard"
          onClick={onNavClick}
          title={collapsed ? "Dashboard" : undefined}
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${
            collapsed ? "justify-center px-2" : ""
          } ${
            pathname === "/portal-manajemen/dashboard"
              ? "bg-gold/15 text-gold-light font-medium"
              : "text-white/60 hover:bg-sage/20 hover:text-white"
          }`}
        >
          <LayoutDashboard size={18} className="shrink-0" />
          {!collapsed && <span className="truncate">Dashboard</span>}
        </Link>
      </div>

      {/* Nav sections */}
      <nav className="mt-3 flex-1 space-y-4 overflow-y-auto px-2">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <span className="mb-1 block px-3 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                {section.label}
              </span>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavClick}
                    title={collapsed ? item.label : undefined}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${
                      collapsed ? "justify-center px-2" : ""
                    } ${
                      isActive
                        ? "bg-gold/15 text-gold-light font-medium"
                        : "text-white/60 hover:bg-sage/20 hover:text-white"
                    }`}
                  >
                    <item.icon size={18} className="shrink-0" />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="shrink-0 border-t border-white/10 p-2">
        <button
          onClick={handleLogout}
          title={collapsed ? "Keluar" : undefined}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/60 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400 ${
            collapsed ? "justify-center px-2" : ""
          }`}
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Keluar</span>}
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setMobileOpen(false);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const isLoginPage = pathname === "/portal-manajemen/login";

  return (
    <ToastProvider>
      <div className={`flex h-screen overflow-hidden ${isLoginPage ? "" : "bg-sand"}`}>
        {!isLoginPage && (
          <>
            {/* Desktop sidebar */}
            <aside
              className={`hidden lg:flex fixed inset-y-0 left-0 z-40 flex-col border-r border-white/10 bg-deep text-white transition-all duration-300 ${
                collapsed ? "w-[68px]" : "w-64"
              }`}
            >
              <SidebarContent collapsed={collapsed} />
            </aside>

            {/* Mobile backdrop */}
            {mobileOpen && (
              <div
                className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm lg:hidden"
                onClick={() => setMobileOpen(false)}
              />
            )}

            {/* Mobile sidebar */}
            <aside
              className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10 bg-deep text-white transition-transform duration-300 lg:hidden ${
                mobileOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-4">
                <span className="font-display text-sm font-semibold text-gold-light">Takwinul Ummah CMS</span>
                <button onClick={() => setMobileOpen(false)} className="rounded-lg p-1 text-white/50 hover:bg-white/10 hover:text-white" aria-label="Tutup menu">
                  <X size={18} />
                </button>
              </div>
              <SidebarContent collapsed={false} onNavClick={() => setMobileOpen(false)} />
            </aside>
          </>
        )}

        {/* Main area */}
        <div className={`flex flex-1 flex-col transition-all duration-300 ${isLoginPage ? "" : collapsed ? "lg:ml-[68px]" : "lg:ml-64"}`}>
          {!isLoginPage && (
            <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-4 border-b border-sand bg-white/80 px-4 backdrop-blur-md lg:px-6">
              <button
                onClick={() => setMobileOpen(true)}
                className="rounded-lg p-2 text-ink-soft hover:bg-sand lg:hidden"
                aria-label="Buka menu"
              >
                <Menu size={20} />
              </button>
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="hidden lg:flex rounded-lg p-2 text-ink-soft hover:bg-sand transition-colors"
                aria-label={collapsed ? "Perluas sidebar" : "Ciutkan sidebar"}
              >
                {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              </button>
              <div className="ml-auto flex items-center gap-2">
                <Shield size={14} className="text-ink-soft/60" />
                <span className="text-xs text-ink-soft">Admin</span>
              </div>
            </header>
          )}

          <main className={isLoginPage ? "" : "flex-1 overflow-y-auto"}>
            {isLoginPage ? children : (
              <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
                {children}
              </div>
            )}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
