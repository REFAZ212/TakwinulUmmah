"use client";

import { useEffect, useState, useCallback } from "react";
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
  Select,
  Textarea,
} from "@/components/ui";
import { Plus, Edit, Trash2, Trophy, Award } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  type: string;
  unit: string;
  level: string;
  winner: string;
  year: number;
  description: string;
  photoMediaId?: string | null;
}

const TYPES = [
  { value: "ACADEMIC", label: "Akademik" },
  { value: "NON_ACADEMIC", label: "Non Akademik" },
];

const UNITS = [
  { value: "PESANTREN", label: "Pesantren" },
  { value: "SMP", label: "SMP" },
  { value: "SMA", label: "SMA" },
];

const LEVELS = [
  { value: "REGIONAL", label: "Regional" },
  { value: "NATIONAL", label: "Nasional" },
  { value: "INTERNATIONAL", label: "Internasional" },
];

type FormData = {
  title: string;
  type: string;
  unit: string;
  level: string;
  winner: string;
  year: number;
  description: string;
  photoMediaId: string;
};

const emptyForm: FormData = {
  title: "",
  type: "ACADEMIC",
  unit: "PESANTREN",
  level: "REGIONAL",
  winner: "",
  year: new Date().getFullYear(),
  description: "",
  photoMediaId: "",
};

const PER_PAGE = 9;

const levelBadgeVariant = (level: string) => {
  const map: Record<string, "info" | "warning" | "success"> = {
    REGIONAL: "info",
    NATIONAL: "warning",
    INTERNATIONAL: "success",
  };
  return map[level] ?? "default";
};

const unitBadgeVariant = (unit: string) => {
  const map: Record<string, "info" | "success" | "danger"> = {
    PESANTREN: "info",
    SMP: "success",
    SMA: "danger",
  };
  return map[unit] ?? "default";
};

const unitLabel = (unit: string) => {
  const map: Record<string, string> = {
    PESANTREN: "Pesantren",
    SMP: "SMP",
    SMA: "SMA",
  };
  return map[unit] ?? unit;
};

const levelLabel = (level: string) => {
  const map: Record<string, string> = {
    REGIONAL: "Regional",
    NATIONAL: "Nasional",
    INTERNATIONAL: "Internasional",
  };
  return map[level] ?? level;
};

export default function PrestasiAdminPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterUnit, setFilterUnit] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
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
      const res = await adminApi.get("/achievements");
      const data = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
      setItems(data);
    } catch {
      toast("error", "Gagal memuat data prestasi.");
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
    const matchUnit = !filterUnit || item.unit === filterUnit;
    const matchLevel = !filterLevel || item.level === filterLevel;
    return matchSearch && matchUnit && matchLevel;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => {
    setPage(1); // eslint-disable-line react-hooks/set-state-in-effect
  }, [search, filterUnit, filterLevel]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (item: Achievement) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      type: item.type,
      unit: item.unit,
      level: item.level,
      winner: item.winner,
      year: item.year,
      description: item.description,
      photoMediaId: item.photoMediaId ?? "",
    });
    setShowModal(true);
  };

  const setField = (key: keyof FormData, value: string | number) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        type: form.type,
        unit: form.unit,
        level: form.level,
        winner: form.winner,
        year: Number(form.year),
        description: form.description,
        photoMediaId: form.photoMediaId || null,
      };
      if (editingId) {
        await adminApi.patch(`/achievements/${editingId}`, payload);
        toast("success", "Prestasi berhasil diperbarui.");
      } else {
        await adminApi.post("/achievements", payload);
        toast("success", "Prestasi berhasil dibuat.");
      }
      setShowModal(false);
      fetchItems();
    } catch {
      toast("error", "Gagal menyimpan prestasi.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await adminApi.delete(`/achievements/${deleteId}`);
      toast("success", "Prestasi berhasil dihapus.");
      setDeleteId(null);
      fetchItems();
    } catch {
      toast("error", "Gagal menghapus prestasi.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Prestasi"
        description="Kelola pencapaian dan penghargaan."
        action={
          <Button onClick={openCreate}>
            <Plus size={16} /> Tambah Prestasi
          </Button>
        }
      />

      <Card className="mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Cari prestasi..."
            className="w-full max-w-xs"
          />
          <Select
            value={filterUnit}
            onChange={(e) => setFilterUnit(e.target.value)}
            options={[{ value: "", label: "Semua Unit" }, ...UNITS]}
            className="w-auto min-w-[140px]"
          />
          <Select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            options={[{ value: "", label: "Semua Tingkat" }, ...LEVELS]}
            className="w-auto min-w-[160px]"
          />
        </div>
      </Card>

      {loading ? (
        <SkeletonCardGrid count={6} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<Trophy size={28} />}
          title="Tidak ada prestasi"
          description="Belum ada data prestasi yang tersedia."
          action={<Button onClick={openCreate}>Tambah Prestasi</Button>}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {paginated.map((item) => (
              <Card key={item.id} className="flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-base text-ink line-clamp-2">{item.title}</h3>
                  <div className="flex shrink-0 gap-1">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(item)}>
                      <Edit size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteId(item.id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Badge variant={unitBadgeVariant(item.unit)}>
                    {unitLabel(item.unit)}
                  </Badge>
                  <Badge variant={levelBadgeVariant(item.level)}>
                    {levelLabel(item.level)}
                  </Badge>
                  <Badge variant="default">{item.year}</Badge>
                </div>

                {item.winner && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-ink-soft">
                    <Award size={14} className="shrink-0 text-gold" />
                    <span className="truncate">{item.winner}</span>
                  </div>
                )}

                {item.description && (
                  <p className="mt-2 line-clamp-2 text-sm text-ink-soft">
                    {item.description}
                  </p>
                )}
              </Card>
            ))}
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="text-xs text-ink-soft">
                Menampilkan {Math.min((page - 1) * PER_PAGE + 1, filtered.length)}–
                {Math.min(page * PER_PAGE, filtered.length)} dari {filtered.length} data
              </p>
              <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          </div>
        </>
      )}

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editingId ? "Edit Prestasi" : "Tambah Prestasi"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Judul"
            required
            value={form.title}
            onChange={(e) => setField("title", e.target.value)}
            placeholder="Masukkan judul prestasi"
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Tipe"
              value={form.type}
              onChange={(e) => setField("type", e.target.value)}
              options={TYPES}
            />
            <Select
              label="Unit"
              value={form.unit}
              onChange={(e) => setField("unit", e.target.value)}
              options={UNITS}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Tingkat"
              value={form.level}
              onChange={(e) => setField("level", e.target.value)}
              options={LEVELS}
            />
            <Input
              label="Tahun"
              type="number"
              required
              value={form.year}
              onChange={(e) => setField("year", Number(e.target.value))}
            />
          </div>
          <Input
            label="Pemenang"
            required
            value={form.winner}
            onChange={(e) => setField("winner", e.target.value)}
            placeholder="Nama pemenang / juara"
          />
          <Textarea
            label="Deskripsi"
            rows={3}
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            placeholder="Deskripsi prestasi (opsional)"
          />
          <Input
            label="Photo Media ID"
            value={form.photoMediaId}
            onChange={(e) => setField("photoMediaId", e.target.value)}
            placeholder="ID media foto (opsional)"
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
        title="Hapus Prestasi?"
        message="Tindakan ini tidak dapat dibatalkan. Prestasi akan dihapus secara permanen."
        confirmLabel="Ya, Hapus"
        loading={deleting}
      />
    </div>
  );
}
