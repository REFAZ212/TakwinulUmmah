"use client";

import { useEffect, useState, useCallback } from "react";
import { Eye, Check } from "lucide-react";
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
  useToast,
  SkeletonTable,
} from "@/components/ui";

const ITEMS_PER_PAGE = 10;

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function PesanAdminPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [markingId, setMarkingId] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.get("/contact");
      const data = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
      setItems(data);
    } catch {
      toast("error", "Gagal memuat pesan.");
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

  const filtered = items.filter((item) => {
    const q = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.subject.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const unreadCount = items.filter((i) => !i.isRead).length;

  const handleMarkRead = async (id: string) => {
    setMarkingId(id);
    try {
      await adminApi.patch(`/contact/${id}/read`);
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, isRead: true } : item)),
      );
      if (selected?.id === id) {
        setSelected((prev) => (prev ? { ...prev, isRead: true } : prev));
      }
      toast("success", "Pesan ditandai sudah dibaca.");
    } catch {
      toast("error", "Gagal menandai pesan.");
    } finally {
      setMarkingId(null);
    }
  };

  const handleView = (item: ContactMessage) => {
    setSelected(item);
    if (!item.isRead) {
      handleMarkRead(item.id);
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div>
      <PageHeader
        title="Pesan Masuk"
        description={
          unreadCount > 0
            ? `${unreadCount} pesan belum dibaca`
            : "Kelola pesan dari formulir kontak."
        }
      />

      <Card padding={false}>
        <div className="border-b border-sand p-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Cari berdasarkan nama, email, atau subjek..."
            className="sm:max-w-sm"
          />
        </div>

        {loading ? (
          <div className="p-6">
            <SkeletonTable rows={5} />
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            title="Tidak ada pesan"
            description={
              search
                ? "Tidak ada pesan yang cocok dengan pencarian."
                : "Belum ada pesan masuk dari formulir kontak."
            }
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
                      Email
                    </th>
                    <th className="px-5 py-3 font-medium text-ink-soft">
                      Subjek
                    </th>
                    <th className="px-5 py-3 font-medium text-ink-soft">
                      Pesan
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
                  {paginated.map((item) => (
                    <tr
                      key={item.id}
                      className={`transition-colors hover:bg-sand/20 ${
                        !item.isRead ? "bg-gold/[0.04]" : ""
                      }`}
                    >
                      <td className="max-w-[160px] px-5 py-3">
                        <div className="flex items-center gap-2">
                          {!item.isRead && (
                            <span className="h-2 w-2 shrink-0 rounded-full bg-gold" />
                          )}
                          <span
                            className={`truncate ${
                              !item.isRead
                                ? "font-semibold text-ink"
                                : "font-normal text-ink-soft"
                            }`}
                          >
                            {item.name}
                          </span>
                        </div>
                      </td>
                      <td className="max-w-[200px] truncate px-5 py-3 text-ink-soft">
                        {item.email}
                      </td>
                      <td className="max-w-[200px] truncate px-5 py-3 text-ink-soft">
                        {item.subject}
                      </td>
                      <td className="max-w-[250px] truncate px-5 py-3 text-ink-soft">
                        {item.message}
                      </td>
                      <td className="px-5 py-3">
                        <Badge variant={item.isRead ? "default" : "success"}>
                          {item.isRead ? "Dibaca" : "Belum Dibaca"}
                        </Badge>
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-ink-soft">
                        {formatDate(item.createdAt)}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleView(item)}
                            className="rounded-lg p-1.5 text-ink-soft transition-colors hover:bg-gold/10 hover:text-gold"
                            aria-label="Lihat pesan"
                          >
                            <Eye size={15} />
                          </button>
                          {!item.isRead && (
                            <button
                              onClick={() => handleMarkRead(item.id)}
                              disabled={markingId === item.id}
                              className="rounded-lg p-1.5 text-ink-soft transition-colors hover:bg-green-50 hover:text-green-600 disabled:opacity-50"
                              aria-label="Tandai sudah dibaca"
                            >
                              <Check size={15} />
                            </button>
                          )}
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
                  {filtered.length} pesan
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
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Detail Pesan"
        maxW="max-w-xl"
      >
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 text-sm">
              <span className="font-medium text-ink-soft">Nama</span>
              <span className="text-ink">{selected.name}</span>

              <span className="font-medium text-ink-soft">Email</span>
              <span className="text-ink">{selected.email}</span>

              <span className="font-medium text-ink-soft">Subjek</span>
              <span className="text-ink">{selected.subject}</span>

              <span className="font-medium text-ink-soft">Tanggal</span>
              <span className="text-ink">{formatDate(selected.createdAt)}</span>

              <span className="font-medium text-ink-soft">Status</span>
              <span>
                <Badge variant={selected.isRead ? "default" : "success"}>
                  {selected.isRead ? "Dibaca" : "Belum Dibaca"}
                </Badge>
              </span>
            </div>

            <div className="rounded-xl border border-sand bg-sand/20 p-4">
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink">
                {selected.message}
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setSelected(null)}
              >
                Tutup
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
