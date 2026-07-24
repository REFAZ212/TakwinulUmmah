"use client";

import { useEffect, useRef, useState, useCallback, type DragEvent } from "react";
import { Image as ImageIcon, Upload, FileIcon, ExternalLink } from "lucide-react";
import { adminApi } from "@/lib/api";
import {
  Button,
  Card,
  PageHeader,
  SearchInput,
  Pagination,
  EmptyState,
  useToast,
  SkeletonCardGrid,
} from "@/components/ui";

interface MediaItem {
  id: string;
  url: string;
  altText: string | null;
  mimeType: string | null;
  uploadedAt: string;
}

const ITEMS_PER_PAGE = 12;

const ACCEPTED = "image/*,.pdf,.doc,.docx";

const MIME_LABEL: Record<string, string> = {
  "image/jpeg": "JPG",
  "image/png": "PNG",
  "image/gif": "GIF",
  "image/webp": "WEBP",
  "image/svg+xml": "SVG",
  "application/pdf": "PDF",
  "application/msword": "DOC",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "DOCX",
};

function mimeLabel(m: string | null): string {
  if (!m) return "File";
  return MIME_LABEL[m] ?? m.split("/").pop()?.toUpperCase() ?? "File";
}

function isImage(m: MediaItem) {
  return m.mimeType?.startsWith("image/");
}

export default function MediaPage() {
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);

  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [altText, setAltText] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [dragOver, setDragOver] = useState(false);

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await adminApi.get("/media");
      setItems(Array.isArray(data) ? data : data?.data ?? []);
    } catch {
      toast("error", "Gagal memuat data media.");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchMedia();
  }, [fetchMedia]);

  const doUpload = useCallback(
    async (file: File) => {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        if (altText.trim()) formData.append("altText", altText.trim());
        await adminApi.post("/media/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setAltText("");
        if (fileRef.current) fileRef.current.value = "";
        toast("success", `"${file.name}" berhasil diunggah.`);
        fetchMedia();
      } catch {
        toast("error", "Gagal mengunggah file. Pastikan ukuran di bawah 10MB.");
      } finally {
        setUploading(false);
      }
    },
    [altText, fetchMedia, toast],
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) void doUpload(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) void doUpload(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const filtered = items.filter((item) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (item.altText ?? "").toLowerCase().includes(q);
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div>
      <PageHeader
        title="Media"
        description="Kelola file gambar dan dokumen yang diunggah."
        action={
          <>
            <input
              ref={fileRef}
              type="file"
              accept={ACCEPTED}
              className="hidden"
              onChange={handleFileInput}
            />
            <Button onClick={() => fileRef.current?.click()} loading={uploading}>
              <Upload size={16} />
              Unggah File
            </Button>
          </>
        }
      />

      <Card className="mb-6">
        <p className="mb-2 text-sm font-medium text-ink">Drag & Drop</p>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
            dragOver
              ? "border-gold bg-gold/5"
              : "border-sand hover:border-gold/40"
          }`}
        >
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-sand text-ink-soft">
            <Upload size={20} />
          </div>
          <p className="mt-3 text-sm text-ink">
            {dragOver ? "Lepaskan file di sini..." : "Seret & lepas file ke sini"}
          </p>
          <p className="mt-1 text-xs text-ink-soft">
            atau gunakan tombol &quot;Unggah File&quot; di atas
          </p>
        </div>
      </Card>

      <Card className="mb-6" padding={false}>
        <div className="flex flex-wrap items-center gap-3 border-b border-sand p-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Cari berdasarkan alt text..."
            className="sm:max-w-xs"
          />
          {altText && (
            <p className="text-xs text-ink-soft">
              Alt text &quot;{altText}&quot; akan disertakan pada unggahan berikutnya
            </p>
          )}
          <div className="ml-auto flex items-center gap-2">
            <label className="text-xs text-ink-soft">Alt text (unggahan):</label>
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Deskripsi singkat"
              className="w-48 rounded-xl border border-sand bg-cream px-3 py-1.5 text-xs text-ink placeholder:text-ink-soft outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/30"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-6">
            <SkeletonCardGrid count={8} />
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<ImageIcon size={28} />}
            title={search ? "Tidak ada hasil" : "Belum ada media"}
            description={
              search
                ? `Tidak ditemukan media dengan alt text "${search}".`
                : "Unggah file pertama untuk memulai."
            }
            action={
              !search
                ? { label: "Unggah File", onClick: () => fileRef.current?.click() }
                : undefined
            }
          />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {paged.map((m) => (
                <div
                  key={m.id}
                  className="group overflow-hidden rounded-xl border border-sand bg-cream shadow-sm transition hover:shadow-md"
                >
                  <div className="relative aspect-square bg-sand">
                    {isImage(m) ? (
                      <img
                        src={m.url}
                        alt={m.altText ?? ""}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-1 text-ink-soft">
                        <FileIcon size={32} />
                        <span className="text-[10px] uppercase tracking-wide">
                          {mimeLabel(m.mimeType)}
                        </span>
                      </div>
                    )}
                    <a
                      href={m.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-lg bg-black/50 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100"
                      title="Buka file"
                    >
                      <ExternalLink size={14} />
                    </a>
                    <span className="absolute bottom-2 left-2 rounded-md bg-black/50 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                      {mimeLabel(m.mimeType)}
                    </span>
                  </div>
                  <div className="px-3 py-2.5">
                    <p
                      className="truncate text-xs font-medium text-ink"
                      title={m.altText ?? m.url}
                    >
                      {m.altText ?? "Tanpa alt text"}
                    </p>
                    <p className="mt-0.5 text-[10px] text-ink-soft">
                      {formatDate(m.uploadedAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-sand px-6 py-4">
              <p className="text-xs text-ink-soft">
                Menampilkan {(page - 1) * ITEMS_PER_PAGE + 1}–
                {Math.min(page * ITEMS_PER_PAGE, filtered.length)} dari{" "}
                {filtered.length} media
              </p>
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
