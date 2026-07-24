"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Edit, Trash2, Building2, MapPin } from "lucide-react";
import { adminApi } from "@/lib/api";
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
  SkeletonCardGrid,
  Input,
  Textarea,
  Select,
} from "@/components/ui";

const ITEMS_PER_PAGE = 9;

const UNIT_OPTIONS = [
  { value: "", label: "Semua Unit" },
  { value: "PESANTREN", label: "Pesantren" },
  { value: "SMP", label: "SMP" },
  { value: "SMA", label: "SMA" },
];

interface Facility {
  id: string;
  name: string;
  description: string;
  location: string;
  photoMediaId: string | null;
  pesantrenId: string | null;
  smpId: string | null;
  smaId: string | null;
  createdAt: string;
}

interface FormData {
  name: string;
  description: string;
  location: string;
  photoMediaId: string;
  unit: string;
}

const emptyForm: FormData = {
  name: "",
  description: "",
  location: "",
  photoMediaId: "",
  unit: "",
};

const getUnit = (item: Facility): string => {
  if (item.smpId) return "SMP";
  if (item.smaId) return "SMA";
  if (item.pesantrenId) return "Pesantren";
  return "";
};

const UNIT_BADGE: Record<string, "info" | "success" | "warning"> = {
  Pesantren: "info",
  SMP: "success",
  SMA: "warning",
};

export default function FasilitasAdminPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterUnit, setFilterUnit] = useState("");
  const [page, setPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<Facility | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.get("/facilities");
      const data = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
      setItems(data);
    } catch {
      toast("error", "Gagal memuat data fasilitas.");
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
  }, [search, filterUnit]);

  const filtered = items.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const unit = getUnit(item);
    const matchUnit = !filterUnit || unit === filterUnit;
    return matchSearch && matchUnit;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (item: Facility) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      description: item.description,
      location: item.location,
      photoMediaId: item.photoMediaId ?? "",
      unit: getUnit(item),
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: Record<string, string> = {
        name: form.name,
        description: form.description,
        location: form.location,
      };
      if (form.photoMediaId) payload.photoMediaId = form.photoMediaId;

      if (form.unit === "PESANTREN") payload.pesantrenId = "default";
      else if (form.unit === "SMP") payload.smpId = "default";
      else if (form.unit === "SMA") payload.smaId = "default";

      if (editingId) {
        await adminApi.patch(`/facilities/${editingId}`, payload);
        toast("success", "Fasilitas berhasil diperbarui.");
      } else {
        await adminApi.post("/facilities", payload);
        toast("success", "Fasilitas berhasil ditambahkan.");
      }
      setShowModal(false);
      fetchItems();
    } catch {
      toast("error", "Gagal menyimpan fasilitas.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminApi.delete(`/facilities/${deleteTarget.id}`);
      toast("success", "Fasilitas berhasil dihapus.");
      setDeleteTarget(null);
      fetchItems();
    } catch {
      toast("error", "Gagal menghapus fasilitas.");
    } finally {
      setDeleting(false);
    }
  };

  const setField = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const descriptionPreview = (text: string) =>
    text.length > 80 ? text.slice(0, 80) + "..." : text;

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div>
      <PageHeader
        title="Fasilitas"
        description="Kelola fasilitas yayasan dan pesantren."
        action={
          <Button onClick={openCreate}>
            <Plus size={16} />
            Tambah Fasilitas
          </Button>
        }
      />

      <Card padding={false}>
        <div className="flex flex-col gap-3 border-b border-sand p-4 sm:flex-row sm:items-center">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Cari fasilitas..."
            className="sm:max-w-xs"
          />
          <Select
            options={UNIT_OPTIONS}
            value={filterUnit}
            onChange={(e) => setFilterUnit(e.target.value)}
            className="sm:w-44"
          />
        </div>

        {loading ? (
          <div className="p-6">
            <SkeletonCardGrid count={6} />
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            title="Tidak ada fasilitas"
            description="Belum ada fasilitas yang tersedia atau sesuai pencarian."
            action={<Button onClick={openCreate}>Tambah Fasilitas</Button>}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginated.map((item) => {
                const unit = getUnit(item);
                return (
                  <Card key={item.id} className="flex flex-col overflow-hidden p-0">
                    <div className="flex h-36 items-center justify-center bg-sand/50">
                      <Building2 size={32} className="text-ink-soft/40" />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-base text-ink">{item.name}</h3>
                        {unit && (
                          <Badge variant={UNIT_BADGE[unit] ?? "default"} className="shrink-0">{unit}</Badge>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-ink-soft">
                        {descriptionPreview(item.description)}
                      </p>
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-ink-soft">
                        <MapPin size={12} />
                        {item.location}
                      </div>
                      <p className="mt-2 text-[10px] text-ink-soft/60">{formatDate(item.createdAt)}</p>
                      <div className="mt-auto flex gap-2 pt-3">
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => openEdit(item)}>
                          <Edit size={14} /> Edit
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => setDeleteTarget(item)}>
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="border-t border-sand px-6 py-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-ink-soft">
                  Menampilkan {(page - 1) * ITEMS_PER_PAGE + 1}–
                  {Math.min(page * ITEMS_PER_PAGE, filtered.length)} dari{" "}
                  {filtered.length} fasilitas
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
        title={editingId ? "Edit Fasilitas" : "Tambah Fasilitas"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nama"
            required
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            placeholder="Masukkan nama fasilitas"
          />
          <Textarea
            label="Deskripsi"
            required
            rows={4}
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            placeholder="Tulis deskripsi fasilitas..."
          />
          <Input
            label="Lokasi"
            required
            value={form.location}
            onChange={(e) => setField("location", e.target.value)}
            placeholder="Masukkan lokasi fasilitas"
          />
          <Input
            label="Photo Media ID"
            value={form.photoMediaId}
            onChange={(e) => setField("photoMediaId", e.target.value)}
            placeholder="ID media dari Galeri (opsional)"
          />
          <Select
            label="Unit"
            value={form.unit}
            onChange={(e) => setField("unit", e.target.value)}
            options={[
              { value: "", label: "Umum (Semua Unit)" },
              { value: "PESANTREN", label: "Pesantren" },
              { value: "SMP", label: "SMP" },
              { value: "SMA", label: "SMA" },
            ]}
          />
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
        title="Hapus Fasilitas?"
        message={`Fasilitas "${deleteTarget?.name}" akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Ya, Hapus"
        loading={deleting}
      />
    </div>
  );
}
