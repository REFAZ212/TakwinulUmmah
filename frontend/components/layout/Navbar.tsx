"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

const NAV = [
  { label: "Beranda", href: "/" },
  {
    label: "Profil",
    children: [
      { label: "Tentang Yayasan", href: "/about" },
      { label: "SMP IT", href: "/smp" },
      { label: "SMA IT", href: "/sma" },
    ],
  },
  { label: "Berita", href: "/news" },
  { label: "Pengumuman", href: "/announcements" },
  { label: "Prestasi", href: "/achievements" },
  { label: "Galeri", href: "/gallery" },
  { label: "Fasilitas", href: "/facilities" },
  { label: "Unduhan", href: "/downloads" },
  { label: "Kontak", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled ? "border-border bg-white shadow-sm" : "border-transparent bg-white"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
        <Link href="/" scroll onClick={(e) => { e.preventDefault(); window.location.href = "/"; }} className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-yayasan.png" alt="Logo" className="h-9 w-9 rounded-full object-cover" />
          <div className="leading-tight">
            <span className="font-display text-base font-bold text-deep">
              Takwinul Ummah
            </span>
            <span className="block text-[10px] font-utility tracking-[0.15em] text-ink-muted">
              YAYASAN PONDOK PESANTREN
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <button className="flex items-center gap-1 px-3 py-2 text-[13px] font-medium text-ink-soft transition-colors hover:text-deep">
                  {item.label}
                  <ChevronDown size={13} className="transition-transform group-hover:rotate-180" />
                </button>
                <div className="invisible absolute left-0 top-full z-50 min-w-[200px] rounded-lg border border-border bg-white py-1.5 opacity-0 shadow-md transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  {item.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="block px-4 py-2 text-[13px] text-ink-soft hover:bg-sand hover:text-deep"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                scroll
                className="px-3 py-2 text-[13px] font-medium text-ink-soft transition-colors hover:text-deep"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/admissions"
            className="rounded-lg bg-deep px-5 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-deep-2"
          >
            Daftar Sekarang
          </Link>
        </div>

        <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Buka menu">
          <Menu size={22} className="text-ink" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-white lg:hidden">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <Link href="/" scroll onClick={(e) => { e.preventDefault(); setOpen(false); window.location.href = "/"; }} className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo-yayasan.png" alt="Logo" className="h-7 w-7 rounded-full object-cover" />
              <span className="font-display text-base font-bold text-deep">Takwinul Ummah</span>
            </Link>
            <button onClick={() => setOpen(false)} aria-label="Tutup menu">
              <X size={20} className="text-ink" />
            </button>
          </div>
          <nav className="overflow-y-auto px-5 py-4">
            {NAV.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <p className="py-2.5 text-[13px] font-semibold uppercase tracking-wider text-ink-muted">{item.label}</p>
                  <div className="pl-3">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setOpen(false)}
                        className="block py-2 text-sm text-ink-soft hover:text-deep"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  scroll
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-sm font-medium text-ink-soft hover:text-deep"
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              href="/admissions"
              scroll
              onClick={() => setOpen(false)}
              className="mt-6 block rounded-lg bg-deep px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Daftar Sekarang
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
