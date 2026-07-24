"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Edit, Trash2, ImageIcon, ImageOff } from "lucide-react";
import { adminApi } from "@/lib/api";
import {
  Button,
  Card,
  PageHeader,
  SearchInput,
  Pagination,
  EmptyState,
  Modal,
  ConfirmModal,
  useToast,
  SkeletonCardGrid,
  Input,
  Select,
  Textarea,
  Badge,
} from "@/components/ui";

interface MediaItem {
  id: string;
  url: string;
}

interface GalleryAlbum {
  id: string;
  title: string;
  category: string;
  description?: string | null;
  coverId?: string | null;
  cover?: MediaItem | null;
  photos: MediaItem[];
  createdAt: string;
}

const GALLERY_CATEGORIES = [
  { value: "PESANTREN", label: "Pesantren" },
  { value: "SMP", label: "SMP" },
  { value: "SMA", label: "SMA" },
];

const CATEGORY_BADGE: Record<string, "success" | "info" | "warning"> = {
  PESANTREN: "success",
  SMP: "info",
  SMA: "warning",
};

const PER_PAGE = 9;

const EMPTY_FORM = {
  title: "",
  category: "PESANTREN",
  description: "",
  coverId: "",
  photoIds: "",
};

export default function GaleriAdminPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [page, setPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchAlbums = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await adminApi.get("/gallery");
      setItems(Array.isArray(data) ? data : data?.data ?? []);
    } catch {
      toast("error", "Gagal memuat data galeri.");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchAlbums();
  }, [fetchAlbums]);

  const filtered = items.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !filterCategory || item.category === filterCategory;
    return matchSearch && matchCategory;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleFilterCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(e.target.value);
    setPage(1);
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEdit = (album: GalleryAlbum) => {
    setEditingId(album.id);
    setForm({
      title: album.title,
      category: album.category,
      description: album.description ?? "",
      coverId: album.coverId ?? "",
      photoIds: album.photos.map((p) => p.id).join(", "),
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: Record<string, unknown> = {
        title: form.title,
        category: form.category,
      };
      if (form.description) payload.description = form.description;
      if (form.coverId) payload.coverId = form.coverId;
      if (form.photoIds) {
        payload.photoIds = form.photoIds
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }

      if (editingId) {
        await adminApi.patch(`/gallery/${editingId}`, payload);
        toast("success", "Album berhasil diperbarui.");
      } else {
        await adminApi.post("/gallery", payload);
        toast("success", "Album berhasil dibuat.");
      }
      setShowModal(false);
      fetchAlbums();
    } catch {
      toast("error", editingId ? "Gagal memperbarui album." : "Gagal membuat album.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await adminApi.delete(`/gallery/${deleteId}`);
      toast("success", "Album berhasil dihapus.");
      setDeleteId(null);
      fetchAlbums();
    } catch {
      toast("error", "Gagal menghapus album.");
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const setField = (key: keyof typeof EMPTY_FORM, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div>
      <PageHeader
        title="Galeri"
        description="Kelola album foto dan galeri media."
        action={
          <Button onClick={openCreate}>
            <Plus size={16} /> Tambah Album
          </Button>
        }
      />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          value={search}
          onChange={handleSearch}
          placeholder="Cari album..."
          className="sm:max-w-xs"
        />
        <select
          value={filterCategory}
          onChange={handleFilterCategory}
          className="w-full rounded-xl border border-sand bg-cream px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/30 sm:w-auto"
        >
          <option value="">Semua Kategori</option>
          {GALLERY_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <SkeletonCardGrid count={6} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<ImageIcon size={28} />}
          title="Belum ada album"
          description="Buat album pertama untuk mengelola koleksi foto galeri."
          action={<Button onClick={openCreate}>Tambah Album</Button>}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {paged.map((album) => (
              <Card key={album.id} padding={false} className="overflow-hidden">
                <div className="relative aspect-video bg-sand">
                  {album.cover?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={album.cover.url}
                      alt={album.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-2 text-ink-soft">
                      <ImageOff size={32} />
                      <span className="text-xs">Tidak ada gambar</span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <Badge variant={CATEGORY_BADGE[album.category] ?? "default"}>
                      {album.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="truncate font-display text-base text-ink">{album.title}</h3>
                  <div className="mt-2 flex items-center justify-between text-xs text-ink-soft">
                    <span>{album.photos.length} foto</span>
                    <span>{formatDate(album.createdAt)}</span>
                  </div>
                  <div className="mt-3 flex justify-end gap-1">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(album)}>
                      <Edit size={14} /> Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteId(album.id)}
                      className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8">
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </>
      )}

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editingId ? "Edit Album" : "Tambah Album"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Judul"
            required
            value={form.title}
            onChange={(e) => setField("title", e.target.value)}
            placeholder="Judul album"
          />
          <Select
            label="Kategori"
            value={form.category}
            onChange={(e) => setField("category", e.target.value)}
            options={GALLERY_CATEGORIES}
          />
          <Textarea
            label="Deskripsi"
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            placeholder="Deskripsi singkat album (opsional)"
            rows={3}
          />
          <Input
            label="Cover ID"
            value={form.coverId}
            onChange={(e) => setField("coverId", e.target.value)}
            placeholder="ID media untuk cover (opsional)"
          />
          <Input
            label="Photo IDs"
            value={form.photoIds}
            onChange={(e) => setField("photoIds", e.target.value)}
            placeholder="ID media, pisahkan koma (opsional)"
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" type="button" onClick={() => setShowModal(false)}>
              Batal
            </Button>
            <Button type="submit" loading={saving}>
              {editingId ? "Simpan Perubahan" : "Buat Album"}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Hapus Album?"
        message="Album dan semua foto di dalamnya akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan."
        loading={deleting}
      />
    </div>
  );
}
