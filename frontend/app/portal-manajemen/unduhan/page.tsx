"use client";

import { useEffect, useState, useCallback } from "react";
import { adminApi } from "@/lib/api";
import { Plus, Edit, Trash2, Download as DownloadIcon, ExternalLink } from "lucide-react";
import {
  Button,
  Card,
  Badge,
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
} from "@/components/ui";

const DOWNLOAD_CATEGORIES = [
  { value: "ACADEMIC_CALENDAR", label: "Kalender Akademik" },
  { value: "SCHOOL_RULES", label: "Tata Tertib" },
  { value: "BROCHURE", label: "Brosur" },
  { value: "REGISTRATION_FORM", label: "Formulir Pendaftaran" },
  { value: "OTHER", label: "Lainnya" },
];

const CATEGORY_FILTER_OPTIONS = [
  { value: "", label: "Semua Kategori" },
  ...DOWNLOAD_CATEGORIES,
];

const CATEGORY_BADGE_VARIANT: Record<string, "default" | "info" | "success" | "warning" | "danger"> = {
  ACADEMIC_CALENDAR: "info",
  SCHOOL_RULES: "warning",
  BROCHURE: "success",
  REGISTRATION_FORM: "default",
  OTHER: "default",
};

const ITEMS_PER_PAGE = 10;

interface DownloadItem {
  id: string;
  title: string;
  category: string;
  fileUrl: string;
  fileType: string;
  fileSize?: string;
  createdAt: string;
}

interface FormData {
  title: string;
  category: string;
  fileUrl: string;
  fileType: string;
  fileSize: string;
}

const emptyForm: FormData = {
  title: "",
  category: "OTHER",
  fileUrl: "",
  fileType: "",
  fileSize: "",
};

export default function UnduhanAdminPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<DownloadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [page, setPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<DownloadItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.get("/downloads");
      const data = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
      setItems(data);
    } catch {
      toast("error", "Gagal memuat data unduhan.");
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
  }, [search, filterCategory]);

  const filtered = items.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !filterCategory || item.category === filterCategory;
    return matchSearch && matchCategory;
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

  const openEdit = (item: DownloadItem) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      category: item.category,
      fileUrl: item.fileUrl,
      fileType: item.fileType,
      fileSize: item.fileSize ?? "",
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: Record<string, string> = {
        title: form.title,
        category: form.category,
        fileUrl: form.fileUrl,
        fileType: form.fileType,
      };
      if (form.fileSize) payload.fileSize = form.fileSize;

      if (editingId) {
        await adminApi.patch(`/downloads/${editingId}`, payload);
        toast("success", "Unduhan berhasil diperbarui.");
      } else {
        await adminApi.post("/downloads", payload);
        toast("success", "Unduhan berhasil dibuat.");
      }
      setShowModal(false);
      fetchItems();
    } catch {
      toast("error", "Gagal menyimpan unduhan.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminApi.delete(`/downloads/${deleteTarget.id}`);
      toast("success", "Unduhan berhasil dihapus.");
      setDeleteTarget(null);
      fetchItems();
    } catch {
      toast("error", "Gagal menghapus unduhan.");
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
        title="Unduhan"
        description="Kelola file unduhan untuk siswa dan orang tua."
        action={
          <Button onClick={openCreate}>
            <Plus size={16} />
            Tambah Unduhan
          </Button>
        }
      />

      <Card padding={false}>
        <div className="flex flex-col gap-3 border-b border-sand p-4 sm:flex-row sm:items-center">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Cari unduhan..."
            className="sm:max-w-xs"
          />
          <Select
            options={CATEGORY_FILTER_OPTIONS}
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="sm:w-52"
          />
        </div>

        {loading ? (
          <div className="p-6">
            <SkeletonTable rows={5} />
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            title="Tidak ada unduhan"
            description="Belum ada file unduhan yang tersedia atau sesuai filter."
            action={<Button onClick={openCreate}>Tambah Unduhan</Button>}
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-sand bg-sand/30">
                  <tr>
                    <th className="px-5 py-3 font-medium text-ink-soft">Judul</th>
                    <th className="px-5 py-3 font-medium text-ink-soft">Kategori</th>
                    <th className="px-5 py-3 font-medium text-ink-soft">File</th>
                    <th className="px-5 py-3 font-medium text-ink-soft">Ukuran</th>
                    <th className="px-5 py-3 font-medium text-ink-soft">Tanggal</th>
                    <th className="px-5 py-3 text-right font-medium text-ink-soft">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand">
                  {paginated.map((item) => (
                    <tr key={item.id} className="transition-colors hover:bg-sand/20">
                      <td className="max-w-[300px] px-5 py-3">
                        <div className="flex items-center gap-2">
                          <DownloadIcon size={14} className="shrink-0 text-ink-soft/60" />
                          <span className="line-clamp-2 font-medium text-ink">{item.title}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <Badge variant={CATEGORY_BADGE_VARIANT[item.category] ?? "default"}>
                          {DOWNLOAD_CATEGORIES.find((c) => c.value === item.category)?.label ?? item.category}
                        </Badge>
                      </td>
                      <td className="px-5 py-3 text-ink-soft">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs">{item.fileType}</span>
                          <a
                            href={item.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gold hover:text-gold-light"
                          >
                            <ExternalLink size={12} />
                          </a>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-ink-soft">
                        {item.fileSize || "—"}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-ink-soft">
                        {formatDate(item.createdAt)}
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
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-sand px-5 py-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-ink-soft">
                  Menampilkan {(page - 1) * ITEMS_PER_PAGE + 1}–
                  {Math.min(page * ITEMS_PER_PAGE, filtered.length)} dari{" "}
                  {filtered.length} unduhan
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
        title={editingId ? "Edit Unduhan" : "Tambah Unduhan"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Judul"
            required
            value={form.title}
            onChange={(e) => setField("title", e.target.value)}
            placeholder="Masukkan judul unduhan"
          />
          <Select
            label="Kategori"
            options={DOWNLOAD_CATEGORIES}
            value={form.category}
            onChange={(e) => setField("category", e.target.value)}
          />
          <Input
            label="URL File"
            required
            value={form.fileUrl}
            onChange={(e) => setField("fileUrl", e.target.value)}
            placeholder="https://example.com/file.pdf"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Tipe File"
              required
              value={form.fileType}
              onChange={(e) => setField("fileType", e.target.value)}
              placeholder="PDF, DOCX..."
            />
            <Input
              label="Ukuran"
              value={form.fileSize}
              onChange={(e) => setField("fileSize", e.target.value)}
              placeholder="2.4 MB"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
              Batal
            </Button>
            <Button type="submit" loading={saving}>
              {editingId ? "Simpan Perubahan" : "Simpan"}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Hapus Unduhan?"
        message={`File "${deleteTarget?.title}" akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Ya, Hapus"
        loading={deleting}
      />
    </div>
  );
}
