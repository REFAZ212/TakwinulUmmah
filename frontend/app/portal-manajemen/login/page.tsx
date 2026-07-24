"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2 } from "lucide-react";
import { adminApi } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    try {
      const { data } = await adminApi.post("/auth/login", {
        email: form.get("email"),
        password: form.get("password"),
      });
      sessionStorage.setItem("admin_access_token", data.accessToken);
      document.cookie = `admin_access_token=${data.accessToken}; path=/portal-manajemen; max-age=86400`;
      router.push("/portal-manajemen/dashboard");
    } catch {
      setError("Email atau kata sandi salah.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-deep px-5">
      <div className="w-full max-w-sm rounded-xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-yayasan.png" alt="Logo Takwinul Ummah" className="h-14 w-14 rounded-full object-cover" />
          <h1 className="mt-4 font-display text-lg font-bold text-white">Portal Manajemen</h1>
          <p className="mt-1 text-xs text-white/40">Akses Internal — Yayasan Takwinul Ummah</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/30"
            />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              name="password"
              type="password"
              required
              placeholder="Kata Sandi"
              className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/30"
            />
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3 text-sm font-semibold text-deep transition-colors hover:bg-white/90 disabled:opacity-60"
          >
            {loading && <Loader2 size={16} className="animate-spin" />} Masuk
          </button>
        </form>
        <p className="mt-6 text-center text-[11px] text-white/25">
          Halaman ini bersifat privat dan tidak diindeks mesin pencari.
        </p>
      </div>
    </div>
  );
}
