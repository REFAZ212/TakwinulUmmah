"use client";

import { useEffect, useState, useCallback } from "react";
import { Save, RotateCcw } from "lucide-react";
import { adminApi, publicApi } from "@/lib/api";
import Button from "@/components/ui/Button";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import PageHeader from "@/components/ui/PageHeader";
import { useToast } from "@/components/ui/Toast";
import { Skeleton } from "@/components/ui/Skeleton";

interface SettingsData {
  siteName: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  logoUrl: string;
  themeColor: string;
  googleMapsEmbed: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    whatsapp?: string;
  };
  copyright?: string;
  hours?: string;
}

const INITIAL: SettingsData = {
  siteName: "",
  address: "",
  phone: "",
  whatsapp: "",
  email: "",
  logoUrl: "",
  themeColor: "#146C43",
  googleMapsEmbed: "",
  socialLinks: { facebook: "", instagram: "", youtube: "", tiktok: "", whatsapp: "" },
  copyright: "",
  hours: "",
};

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-sand bg-cream p-6">
          <Skeleton className="h-5 w-40 mb-6" />
          <div className="grid gap-5 sm:grid-cols-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-full mt-5" />
        </div>
      ))}
    </div>
  );
}

export default function PengaturanPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<SettingsData>(INITIAL);

  const loadSettings = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await publicApi.get("/settings");
      setForm({
        siteName: data.siteName ?? "",
        address: data.address ?? "",
        phone: data.phone ?? "",
        whatsapp: data.whatsapp ?? "",
        email: data.email ?? "",
        logoUrl: data.logoUrl ?? "",
        themeColor: data.themeColor ?? "#146C43",
        googleMapsEmbed: data.googleMapsEmbed ?? "",
        socialLinks: {
          facebook: data.socialLinks?.facebook ?? "",
          instagram: data.socialLinks?.instagram ?? "",
          youtube: data.socialLinks?.youtube ?? "",
          tiktok: data.socialLinks?.tiktok ?? "",
          whatsapp: data.socialLinks?.whatsapp ?? "",
        },
        copyright: data.socialLinks?.copyright ?? "",
        hours: data.socialLinks?.hours ?? "",
      });
    } catch {
      toast("error", "Gagal memuat pengaturan.");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadSettings();
  }, [loadSettings]);

  const set = (field: keyof SettingsData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const setSocial = (field: keyof SettingsData["socialLinks"], value: string) =>
    setForm((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [field]: value },
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminApi.patch("/settings", {
        siteName: form.siteName,
        themeColor: form.themeColor,
        googleMapsEmbed: form.googleMapsEmbed,
        socialLinks: {
          ...form.socialLinks,
          copyright: form.copyright,
          hours: form.hours,
        },
      });
      toast("success", "Pengaturan berhasil disimpan.");
    } catch {
      toast("error", "Gagal menyimpan pengaturan. Pastikan Anda memiliki akses.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <PageHeader title="Pengaturan" description="Kelola informasi website, media sosial, dan footer." />
        <LoadingSkeleton />
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <PageHeader
        title="Pengaturan"
        description="Kelola informasi website, media sosial, dan footer."
        action={
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="md" onClick={() => void loadSettings()}>
              <RotateCcw size={15} />
              Reset
            </Button>
            <Button type="submit" variant="primary" size="md" loading={saving}>
              <Save size={15} />
              Simpan Perubahan
            </Button>
          </div>
        }
      />

      <div className="space-y-6">
        {/* Informasi Website */}
        <Card>
          <CardHeader>
            <CardTitle>Informasi Website</CardTitle>
          </CardHeader>
          <div className="space-y-5">
            <Input
              label="Nama Situs"
              value={form.siteName}
              onChange={(e) => set("siteName", e.target.value)}
              placeholder="Yayasan Takwinul Ummah"
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-ink">Warna Tema</label>
                <div className="flex gap-3">
                  <div
                    className="h-10 w-10 shrink-0 rounded-xl border border-sand"
                    style={{ backgroundColor: form.themeColor }}
                  />
                  <Input
                    value={form.themeColor}
                    onChange={(e) => set("themeColor", e.target.value)}
                    placeholder="#146C43"
                  />
                </div>
              </div>
              <Input
                label="Logo URL"
                value={form.logoUrl}
                onChange={(e) => set("logoUrl", e.target.value)}
                placeholder="https://..."
              />
            </div>

            <Textarea
              label="Google Maps Embed"
              value={form.googleMapsEmbed}
              onChange={(e) => set("googleMapsEmbed", e.target.value)}
              placeholder='<iframe src="https://www.google.com/maps/embed?..." />'
              rows={3}
            />
          </div>
        </Card>

        {/* Media Sosial */}
        <Card>
          <CardHeader>
            <CardTitle>Media Sosial</CardTitle>
          </CardHeader>
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="Facebook"
              type="url"
              value={form.socialLinks.facebook ?? ""}
              onChange={(e) => setSocial("facebook", e.target.value)}
              placeholder="https://facebook.com/..."
            />
            <Input
              label="Instagram"
              type="url"
              value={form.socialLinks.instagram ?? ""}
              onChange={(e) => setSocial("instagram", e.target.value)}
              placeholder="https://instagram.com/..."
            />
            <Input
              label="YouTube"
              type="url"
              value={form.socialLinks.youtube ?? ""}
              onChange={(e) => setSocial("youtube", e.target.value)}
              placeholder="https://youtube.com/..."
            />
            <Input
              label="TikTok"
              type="url"
              value={form.socialLinks.tiktok ?? ""}
              onChange={(e) => setSocial("tiktok", e.target.value)}
              placeholder="https://tiktok.com/..."
            />
            <Input
              label="WhatsApp"
              type="tel"
              value={form.socialLinks.whatsapp ?? ""}
              onChange={(e) => setSocial("whatsapp", e.target.value)}
              placeholder="6281234567890"
            />
          </div>
        </Card>

        {/* Footer */}
        <Card>
          <CardHeader>
            <CardTitle>Footer</CardTitle>
          </CardHeader>
          <div className="space-y-5">
            <Input
              label="Teks Hak Cipta"
              value={form.copyright ?? ""}
              onChange={(e) => set("copyright", e.target.value)}
              placeholder="&copy; 2026 Yayasan Takwinul Ummah"
            />
            <Input
              label="Alamat"
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
              placeholder="Jl. Contoh No. 1, Kota..."
            />
            <Input
              label="Jam Operasional"
              value={form.hours ?? ""}
              onChange={(e) => set("hours", e.target.value)}
              placeholder="Senin - Sabtu: 07.00 - 16.00 WIB"
            />
          </div>
        </Card>

        {/* Bottom actions (mobile / scrolling convenience) */}
        <div className="flex justify-end gap-2 pb-4">
          <Button type="button" variant="outline" size="md" onClick={() => void loadSettings()}>
            <RotateCcw size={15} />
            Reset
          </Button>
          <Button type="submit" variant="primary" size="md" loading={saving}>
            <Save size={15} />
            Simpan Perubahan
          </Button>
        </div>
      </div>
    </form>
  );
}
