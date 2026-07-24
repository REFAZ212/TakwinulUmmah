"use client";

import { useEffect, useState, useCallback } from "react";
import { adminApi } from "@/lib/api";
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
import { Plus, Calendar } from "lucide-react";

const ANNOUNCEMENT_CATEGORIES = [
  { value: "GENERAL", label: "Umum" },
  { value: "PESANTREN", label: "Pesantren" },
  { value: "SMP", label: "SMP" },
  { value: "SMA", label: "SMA" },
  { value: "ADMISSION", label: "Penerimaan" },
  { value: "HOLIDAY", label: "Libur" },
  { value: "COMPETITION", label: "Kompetisi" },
  { value: "SCHOLARSHIP", label: "Beasiswa" },
  { value: "URGENT", label: "Mendesak" },
];

const STATUSES = [
  { value: "DRAFT", label: "Draft" },
  { value: "PUBLISHED", label: "Published" },
  { value: "ARCHIVED", label: "Archived" },
];

type FormData = {
  title: string;
  category: string;
  content: string;
  status: string;
  scheduledAt: string;
};

const emptyForm: FormData = {
  title: "",
  category: "GENERAL",
  content: "",
  status: "DRAFT",
  scheduledAt: "",
};

interface AnnouncementItem {
  id: string;
  title: string;
  category: string;
  status: string;
  scheduledAt: string | null;
  createdAt: string;
}

const PER_PAGE = 10;

export default function PengumumanPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.get("/announcements");
      const data = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
      setItems(data);
    } catch {
      toast("error", "Gagal memuat data pengumuman.");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchItems();
  }, [fetchItems]);

  const filtered = items.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !filterCategory || item.category === filterCategory;
    const matchStatus = !filterStatus || item.status === filterStatus;
    return matchSearch && matchCategory && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [search, filterCategory, filterStatus]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (item: AnnouncementItem) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      category: item.category,
      content: "",
      status: item.status,
      scheduledAt: item.scheduledAt ? item.scheduledAt.slice(0, 16) : "",
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload: Record<string, unknown> = {
      title: form.title,
      category: form.category,
      content: form.content,
      status: form.status,
    };
    if (form.scheduledAt) {
      payload.scheduledAt = new Date(form.scheduledAt).toISOString();
    }

    try {
      if (editingId) {
        await adminApi.patch(`/announcements/${editingId}`, payload);
        toast("success", "Pengumuman berhasil diperbarui.");
      } else {
        await adminApi.post("/announcements", payload);
        toast("success", "Pengumuman berhasil dibuat.");
      }
      setShowModal(false);
      fetchItems();
    } catch {
      toast("error", "Gagal menyimpan pengumuman.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await adminApi.delete(`/announcements/${deleteId}`);
      toast("success", "Pengumuman berhasil dihapus.");
      setDeleteId(null);
      fetchItems();
    } catch {
      toast("error", "Gagal menghapus pengumuman.");
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

  const setField = (key: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div>
      <PageHeader
        title="Pengumuman"
        description="Kelola pengumuman yayasan dan sekolah."
        action={
          <Button onClick={openCreate}>
            <Plus size={16} /> Tambah Baru
          </Button>
        }
      />

      <Card className="mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Cari pengumuman..."
            className="w-full max-w-xs"
          />
          <Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            options={[{ value: "", label: "Semua Kategori" }, ...ANNOUNCEMENT_CATEGORIES]}
            className="w-auto min-w-[160px]"
          />
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={[{ value: "", label: "Semua Status" }, ...STATUSES]}
            className="w-auto min-w-[140px]"
          />
        </div>
      </Card>

      {loading ? (
        <SkeletonTable rows={5} />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="Tidak ada pengumuman"
          description="Belum ada data pengumuman yang tersedia."
          action={<Button onClick={openCreate}>Tambah Pengumuman</Button>}
        />
      ) : (
        <Card padding={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-sand bg-sand/30">
                <tr>
                  <th className="px-5 py-3 font-medium text-ink-soft">Judul</th>
                  <th className="px-5 py-3 font-medium text-ink-soft">Kategori</th>
                  <th className="px-5 py-3 font-medium text-ink-soft">Status</th>
                  <th className="px-5 py-3 font-medium text-ink-soft">Jadwal</th>
                  <th className="px-5 py-3 font-medium text-ink-soft">Tanggal</th>
                  <th className="px-5 py-3 font-medium text-ink-soft text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand">
                {paginated.map((item) => {
                  const sb = statusBadge(item.status);
                  return (
                    <tr key={item.id} className="hover:bg-sand/20 transition-colors">
                      <td className="max-w-[300px] truncate px-5 py-3 font-medium text-ink">
                        {item.title}
                      </td>
                      <td className="px-5 py-3">
                        <Badge variant="info">
                          {ANNOUNCEMENT_CATEGORIES.find((c) => c.value === item.category)?.label ?? item.category}
                        </Badge>
                      </td>
                      <td className="px-5 py-3">
                        <Badge variant={sb.variant}>{sb.label}</Badge>
                      </td>
                      <td className="px-5 py-3 text-ink-soft">
                        {item.scheduledAt ? (
                          <span className="inline-flex items-center gap-1">
                            <Calendar size={13} />
                            {formatDate(item.scheduledAt)}
                          </span>
                        ) : (
                          <span className="text-sand">-</span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-ink-soft">
                        {formatDate(item.createdAt)}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="sm" onClick={() => openEdit(item)}>
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setDeleteId(item.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                            Hapus
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="border-t border-sand px-5 py-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-ink-soft">
                Menampilkan {Math.min((page - 1) * PER_PAGE + 1, filtered.length)}–{Math.min(page * PER_PAGE, filtered.length)} dari {filtered.length} data
              </p>
              <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          </div>
        </Card>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title={editingId ? "Edit Pengumuman" : "Tambah Pengumuman"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Judul"
            required
            value={form.title}
            onChange={(e) => setField("title", e.target.value)}
            placeholder="Masukkan judul pengumuman"
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Kategori"
              value={form.category}
              onChange={(e) => setField("category", e.target.value)}
              options={ANNOUNCEMENT_CATEGORIES}
            />
            <Select
              label="Status"
              value={form.status}
              onChange={(e) => setField("status", e.target.value)}
              options={STATUSES}
            />
          </div>
          <Textarea
            label="Konten"
            required
            rows={5}
            value={form.content}
            onChange={(e) => setField("content", e.target.value)}
            placeholder="Tulis isi pengumuman..."
          />
          <Input
            label="Jadwal Terbit (opsional)"
            type="datetime-local"
            value={form.scheduledAt}
            onChange={(e) => setField("scheduledAt", e.target.value)}
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" type="button" onClick={() => setShowModal(false)}>
              Batal
            </Button>
            <Button type="submit" loading={saving}>
              {editingId ? "Simpan" : "Buat"}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Hapus Pengumuman?"
        message="Tindakan ini tidak dapat dibatalkan. Pengumuman akan dihapus secara permanen."
        confirmLabel="Ya, Hapus"
        loading={deleting}
      />
    </div>
  );
}
