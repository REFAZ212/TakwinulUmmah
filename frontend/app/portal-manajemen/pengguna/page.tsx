"use client";

import { useEffect, useState, useCallback } from "react";
import { adminApi } from "@/lib/api";
import { UserPlus, Trash2 } from "lucide-react";
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

const ROLES = [
  { value: "SUPER_ADMIN", label: "Super Admin" },
  { value: "ADMIN_YAYASAN", label: "Admin Yayasan" },
  { value: "ADMIN_SMP", label: "Admin SMP" },
  { value: "ADMIN_SMA", label: "Admin SMA" },
  { value: "EDITOR", label: "Editor" },
  { value: "GUEST", label: "Tamu" },
];

const ROLE_LABELS: Record<string, string> = Object.fromEntries(
  ROLES.map((r) => [r.value, r.label])
);

const ITEMS_PER_PAGE = 10;

interface UserRow {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  role: { name: string };
}

interface FormData {
  name: string;
  email: string;
  password: string;
  role: string;
}

const emptyForm: FormData = { name: "", email: "", password: "", role: "EDITOR" };

export default function PenggunaPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<UserRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.get("/users");
      const data = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
      setItems(data);
    } catch {
      toast("error", "Gagal memuat data pengguna.");
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
  }, [search]);

  const filtered = items.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const setField = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminApi.post("/users", form);
      toast("success", "Pengguna berhasil dibuat.");
      setShowModal(false);
      setForm(emptyForm);
      fetchItems();
    } catch {
      toast("error", "Gagal membuat pengguna baru.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminApi.delete(`/users/${deleteTarget.id}`);
      toast("success", `Pengguna "${deleteTarget.name}" berhasil dinonaktifkan.`);
      setDeleteTarget(null);
      fetchItems();
    } catch {
      toast("error", "Gagal menonaktifkan pengguna.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Pengguna & Peran"
        description="Kelola akun pengguna dan hak akses sistem."
        action={
          <Button onClick={() => setShowModal(true)}>
            <UserPlus size={16} />
            Tambah User
          </Button>
        }
      />

      <Card padding={false}>
        <div className="flex flex-col gap-3 border-b border-sand p-4 sm:flex-row sm:items-center">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Cari nama atau email..."
            className="sm:max-w-xs"
          />
        </div>

        {loading ? (
          <div className="p-6">
            <SkeletonTable rows={5} />
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            title="Tidak ada pengguna"
            description="Belum ada pengguna terdaftar atau sesuai pencarian."
            action={<Button onClick={() => setShowModal(true)}>Tambah Pengguna</Button>}
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-sand bg-sand/30">
                  <tr>
                    <th className="px-5 py-3 font-medium text-ink-soft">Nama</th>
                    <th className="px-5 py-3 font-medium text-ink-soft">Email</th>
                    <th className="px-5 py-3 font-medium text-ink-soft">Role</th>
                    <th className="px-5 py-3 font-medium text-ink-soft">Status</th>
                    <th className="px-5 py-3 text-right font-medium text-ink-soft">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand">
                  {paginated.map((u) => (
                    <tr key={u.id} className="transition-colors hover:bg-sand/20">
                      <td className="px-5 py-3 font-medium text-ink">{u.name}</td>
                      <td className="px-5 py-3 text-ink-soft">{u.email}</td>
                      <td className="px-5 py-3">
                        <Badge variant="warning">
                          {ROLE_LABELS[u.role.name] ?? u.role.name}
                        </Badge>
                      </td>
                      <td className="px-5 py-3">
                        <Badge variant={u.isActive ? "success" : "danger"}>
                          {u.isActive ? "Aktif" : "Nonaktif"}
                        </Badge>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button
                          onClick={() => setDeleteTarget(u)}
                          className="rounded-lg p-1.5 text-ink-soft transition-colors hover:bg-red-50 hover:text-red-500"
                          aria-label="Nonaktifkan"
                          title="Nonaktifkan"
                        >
                          <Trash2 size={15} />
                        </button>
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
                  {filtered.length} pengguna
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
        title="Tambah Pengguna"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Nama Lengkap"
            required
            minLength={3}
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            placeholder="Masukkan nama lengkap"
          />
          <Input
            label="Email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            placeholder="email@contoh.com"
          />
          <Input
            label="Kata Sandi"
            type="password"
            required
            minLength={8}
            value={form.password}
            onChange={(e) => setField("password", e.target.value)}
            placeholder="Minimal 8 karakter"
          />
          <Select
            label="Peran"
            options={ROLES}
            value={form.role}
            onChange={(e) => setField("role", e.target.value)}
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowModal(false)}
            >
              Batal
            </Button>
            <Button type="submit" loading={saving}>
              Simpan
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Nonaktifkan Pengguna?"
        message={`Pengguna "${deleteTarget?.name}" akan dinonaktifkan dan tidak dapat mengakses sistem.`}
        confirmLabel="Ya, Nonaktifkan"
        loading={deleting}
      />
    </div>
  );
}
