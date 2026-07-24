"use client";

import { useEffect, useCallback, useState } from "react";
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
  useToast,
  SkeletonTable,
  Select,
} from "@/components/ui";

const UNIT_MAP: Record<string, string> = {
  PESANTREN: "Pesantren",
  SMP: "SMP",
  SMA: "SMA",
};

const STATUS_FILTER_OPTIONS = [
  { value: "", label: "Semua Status" },
  { value: "SUBMITTED", label: "Diajukan" },
  { value: "VERIFIED", label: "Terverifikasi" },
  { value: "TEST_SCHEDULED", label: "Tes Terjadwal" },
  { value: "ACCEPTED", label: "Diterima" },
  { value: "REJECTED", label: "Ditolak" },
];

const STATUS_ACTION_OPTIONS = [
  { value: "SUBMITTED", label: "Diajukan" },
  { value: "VERIFIED", label: "Terverifikasi" },
  { value: "TEST_SCHEDULED", label: "Tes Terjadwal" },
  { value: "ACCEPTED", label: "Diterima" },
  { value: "REJECTED", label: "Ditolak" },
];

const STATUS_LABEL: Record<string, string> = {
  SUBMITTED: "Diajukan",
  VERIFIED: "Terverifikasi",
  TEST_SCHEDULED: "Tes Terjadwal",
  ACCEPTED: "Diterima",
  REJECTED: "Ditolak",
};

const ITEMS_PER_PAGE = 10;

interface Admission {
  id: string;
  fullName: string;
  unit: string;
  parentName: string;
  phone: string;
  email: string;
  address: string;
  previousSchool: string;
  message: string | null;
  status: string;
  createdAt: string;
}

export default function PendaftarPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(1);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const params = filterStatus ? `?status=${filterStatus}` : "";
      const res = await adminApi.get(`/admissions${params}`);
      setItems(Array.isArray(res.data) ? res.data : res.data?.data ?? []);
    } catch {
      toast("error", "Gagal memuat data pendaftar.");
    } finally {
      setLoading(false);
    }
  }, [filterStatus, toast]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [search, filterStatus]);

  const filtered = items.filter((item) => {
    return item.fullName.toLowerCase().includes(search.toLowerCase());
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      await adminApi.patch(`/admissions/${id}/status`, { status: newStatus });
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item,
        ),
      );
      toast("success", `Status berhasil diubah ke ${STATUS_LABEL[newStatus] ?? newStatus}.`);
    } catch {
      toast("error", "Gagal mengubah status pendaftar.");
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div>
      <PageHeader
        title="Pendaftar"
        description="Kelola data pendaftaran siswa baru."
      />

      <Card padding={false}>
        <div className="flex flex-col gap-3 border-b border-sand p-4 sm:flex-row sm:items-center">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Cari nama pendaftar..."
            className="sm:max-w-xs"
          />
          <Select
            options={STATUS_FILTER_OPTIONS}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="sm:w-48"
          />
        </div>

        {loading ? (
          <div className="p-6">
            <SkeletonTable rows={5} />
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            title="Tidak ada pendaftar"
            description="Belum ada data pendaftaran atau sesuai filter."
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-sand bg-sand/30">
                  <tr>
                    <th className="px-5 py-3 font-medium text-ink-soft">
                      Nama
                    </th>
                    <th className="px-5 py-3 font-medium text-ink-soft">
                      Unit
                    </th>
                    <th className="px-5 py-3 font-medium text-ink-soft">
                      Orang Tua
                    </th>
                    <th className="px-5 py-3 font-medium text-ink-soft">
                      Telepon
                    </th>
                    <th className="px-5 py-3 font-medium text-ink-soft">
                      Email
                    </th>
                    <th className="px-5 py-3 font-medium text-ink-soft">
                      Status
                    </th>
                    <th className="px-5 py-3 font-medium text-ink-soft">
                      Tanggal
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
                      <tr
                        key={item.id}
                        className="transition-colors hover:bg-sand/20"
                      >
                        <td className="max-w-[180px] px-5 py-3">
                          <span className="line-clamp-1 font-medium text-ink">
                            {item.fullName}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-ink-soft">
                          {UNIT_MAP[item.unit] ?? item.unit}
                        </td>
                        <td className="max-w-[160px] px-5 py-3 text-ink-soft">
                          <span className="line-clamp-1">
                            {item.parentName}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-5 py-3 text-ink-soft">
                          {item.phone}
                        </td>
                        <td className="max-w-[180px] px-5 py-3 text-ink-soft">
                          <span className="line-clamp-1">{item.email}</span>
                        </td>
                        <td className="px-5 py-3">
                          <Badge variant={badge.variant}>{badge.label}</Badge>
                        </td>
                        <td className="whitespace-nowrap px-5 py-3 text-ink-soft">
                          {formatDate(item.createdAt)}
                        </td>
                        <td className="px-5 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {STATUS_ACTION_OPTIONS.filter(
                              (opt) => opt.value !== item.status,
                            ).map((opt) => (
                              <Button
                                key={opt.value}
                                variant="ghost"
                                size="sm"
                                disabled={updatingId === item.id}
                                onClick={() =>
                                  handleStatusChange(item.id, opt.value)
                                }
                                title={`Ubah ke ${opt.label}`}
                                className="px-2"
                              >
                                {opt.label}
                              </Button>
                            ))}
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
                  {filtered.length} pendaftar
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
    </div>
  );
}
