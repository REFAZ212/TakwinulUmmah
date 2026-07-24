"use client";

import { useEffect, useState, useCallback } from "react";
import { adminApi } from "@/lib/api";
import { Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import {
  Button,
  Card,
  Badge,
  statusBadge,
  PageHeader,
  SearchInput,
  Pagination,
  EmptyState,
  Modal,
  ConfirmModal,
  useToast,
  SkeletonTable,
  Input,
  Select,
  Textarea,
} from "@/components/ui";

const NEWS_CATEGORIES = [
  { value: "GENERAL", label: "Umum" },
  { value: "PESANTREN", label: "Pesantren" },
  { value: "SMP", label: "SMP" },
  { value: "SMA", label: "SMA" },
  { value: "ACHIEVEMENT", label: "Prestasi" },
  { value: "ANNOUNCEMENT", label: "Pengumuman" },
  { value: "EVENT", label: "Kegiatan" },
  { value: "COMPETITION", label: "Kompetisi" },
  { value: "EDUCATION", label: "Pendidikan" },
  { value: "NATIONAL", label: "Nasional" },
];

const STATUS_OPTIONS = [
  { value: "DRAFT", label: "Draft" },
  { value: "PUBLISHED", label: "Published" },
  { value: "ARCHIVED", label: "Archived" },
];

const CATEGORY_FILTER_OPTIONS = [
  { value: "", label: "Semua Kategori" },
  ...NEWS_CATEGORIES,
];

const STATUS_FILTER_OPTIONS = [
  { value: "", label: "Semua Status" },
  ...STATUS_OPTIONS,
];

const ITEMS_PER_PAGE = 10;

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  status: string;
  thumbnail: string | null;
  author: { name: string } | null;
  createdAt: string;
  publishedAt: string | null;
}

interface FormData {
  title: string;
  category: string;
  content: string;
  status: string;
  thumbnailUrl: string;
}

const emptyForm: FormData = {
  title: "",
  category: "GENERAL",
  content: "",
  status: "DRAFT",
  thumbnailUrl: "",
};

export default function BeritaPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<NewsItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.get("/news");
      const data = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
      setItems(data);
    } catch {
      toast("error", "Gagal memuat data berita.");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [search, filterCategory, filterStatus]);

  const filtered = items.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !filterCategory || item.category === filterCategory;
    const matchStatus = !filterStatus || item.status === filterStatus;
    return matchSearch && matchCategory && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      category: item.category,
      content: item.content ?? "",
      status: item.status,
      thumbnailUrl: item.thumbnail ?? "",
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        category: form.category,
        content: form.content,
        status: form.status,
        thumbnail: form.thumbnailUrl || null,
      };
      if (editingId) {
        await adminApi.patch(`/news/${editingId}`, payload);
        toast("success", "Berita berhasil diperbarui.");
      } else {
        await adminApi.post("/news", payload);
        toast("success", "Berita berhasil dibuat.");
      }
      setShowModal(false);
      fetchItems();
    } catch {
      toast("error", "Gagal menyimpan berita.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminApi.delete(`/news/${deleteTarget.id}`);
      toast("success", "Berita berhasil dihapus.");
      setDeleteTarget(null);
      fetchItems();
    } catch {
      toast("error", "Gagal menghapus berita.");
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

  const setField = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div>
      <PageHeader
        title="Berita"
        description="Kelola seluruh konten berita yayasan."
        action={
          <Button onClick={openCreate}>
            <Plus size={16} />
            Tambah Baru
          </Button>
        }
      />

      <Card padding={false}>
        <div className="flex flex-col gap-3 border-b border-sand p-4 sm:flex-row sm:items-center">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Cari berita..."
            className="sm:max-w-xs"
          />
          <Select
            options={CATEGORY_FILTER_OPTIONS}
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="sm:w-48"
          />
          <Select
            options={STATUS_FILTER_OPTIONS}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="sm:w-40"
          />
        </div>

        {loading ? (
          <div className="p-6">
            <SkeletonTable rows={5} />
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            title="Tidak ada berita"
            description="Belum ada berita yang tersedia atau sesuai filter."
            action={<Button onClick={openCreate}>Tambah Berita</Button>}
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-sand bg-sand/30">
                  <tr>
                    <th className="px-5 py-3 font-medium text-ink-soft">
                      Thumbnail
                    </th>
                    <th className="px-5 py-3 font-medium text-ink-soft">
                      Judul
                    </th>
                    <th className="px-5 py-3 font-medium text-ink-soft">
                      Kategori
                    </th>
                    <th className="px-5 py-3 font-medium text-ink-soft">
                      Status
                    </th>
                    <th className="px-5 py-3 font-medium text-ink-soft">
                      Tanggal
                    </th>
                    <th className="px-5 py-3 font-medium text-ink-soft">
                      Penulis
                    </th>
                    <th className="px-5 py-3 text-right font-medium text-ink-soft">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand">
                  {paginated.map((item) => {
                    const badge = statusBadge(item.status);
                    return (
                      <tr key={item.id} className="transition-colors hover:bg-sand/20">
                        <td className="px-5 py-3">
                          {item.thumbnail ? (
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="h-12 w-16 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-sand">
                              <ImageIcon size={16} className="text-ink-soft" />
                            </div>
                          )}
                        </td>
                        <td className="max-w-[300px] px-5 py-3">
                          <span className="line-clamp-2 font-medium text-ink">
                            {item.title}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-ink-soft">
                          {
                            NEWS_CATEGORIES.find(
                              (c) => c.value === item.category
                            )?.label ?? item.category
                          }
                        </td>
                        <td className="px-5 py-3">
                          <Badge variant={badge.variant}>{badge.label}</Badge>
                        </td>
                        <td className="whitespace-nowrap px-5 py-3 text-ink-soft">
                          {formatDate(item.publishedAt ?? item.createdAt)}
                        </td>
                        <td className="px-5 py-3 text-ink-soft">
                          {item.author?.name ?? "—"}
                        </td>
                        <td className="px-5 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => openEdit(item)}
                              className="rounded-lg p-1.5 text-ink-soft transition-colors hover:bg-gold/10 hover:text-gold"
                              aria-label="Edit"
                            >
                              <Edit size={15} />
                            </button>
                            <button
                              onClick={() => setDeleteTarget(item)}
                              className="rounded-lg p-1.5 text-ink-soft transition-colors hover:bg-red-50 hover:text-red-500"
                              aria-label="Hapus"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="border-t border-sand px-5 py-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-ink-soft">
                  Menampilkan {(page - 1) * ITEMS_PER_PAGE + 1}–
                  {Math.min(page * ITEMS_PER_PAGE, filtered.length)} dari{" "}
                  {filtered.length} berita
                </p>
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            </div>
          </>
        )}
      </Card>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editingId ? "Edit Berita" : "Tambah Berita"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Judul"
            required
            value={form.title}
            onChange={(e) => setField("title", e.target.value)}
            placeholder="Masukkan judul berita"
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Kategori"
              options={NEWS_CATEGORIES}
              value={form.category}
              onChange={(e) => setField("category", e.target.value)}
            />
            <Select
              label="Status"
              options={STATUS_OPTIONS}
              value={form.status}
              onChange={(e) => setField("status", e.target.value)}
            />
          </div>
          <Textarea
            label="Konten"
            required
            rows={6}
            value={form.content}
            onChange={(e) => setField("content", e.target.value)}
            placeholder="Tulis konten berita di sini..."
          />
          <Input
            label="Thumbnail URL"
            value={form.thumbnailUrl}
            onChange={(e) => setField("thumbnailUrl", e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
          {form.thumbnailUrl && (
            <div className="rounded-xl border border-sand p-3">
              <img
                src={form.thumbnailUrl}
                alt="Preview"
                className="max-h-32 rounded-lg object-cover"
                onError={(e) =>
                  (e.currentTarget.style.display = "none")
                }
              />
            </div>
          )}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowModal(false)}
            >
              Batal
            </Button>
            <Button type="submit" loading={saving}>
              {editingId ? "Simpan Perubahan" : "Buat Berita"}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Hapus Berita?"
        message={`Berita "${deleteTarget?.title}" akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Ya, Hapus"
        loading={deleting}
      />
    </div>
  );
}
