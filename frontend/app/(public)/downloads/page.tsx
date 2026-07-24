import type { Metadata } from "next";
import { FileText, Download } from "lucide-react";

export const metadata: Metadata = { title: "Unduhan", description: "Pusat unduhan dokumen resmi Yayasan Takwinul Ummah." };

const FILES = [
  { name: "Kalender Akademik 2026/2027", type: "PDF", size: "1.2 MB", url: "#" },
  { name: "Tata Tertib Santri", type: "PDF", size: "800 KB", url: "#" },
  { name: "Brosur PPDB 2026/2027", type: "PDF", size: "3.4 MB", url: "#" },
  { name: "Formulir Pendaftaran", type: "DOC", size: "150 KB", url: "#" },
];

export default function DownloadsPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-20 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-deep lg:text-4xl">Pusat Unduhan</h1>
      <div className="mt-10 space-y-3">
        {FILES.map((f) => (
          <div key={f.name} className="flex items-center justify-between rounded-xl border border-border bg-white p-5">
            <div className="flex min-w-0 items-center gap-3">
              <FileText className="shrink-0 text-deep" size={20} />
              <div className="min-w-0">
                <p className="truncate font-medium text-deep">{f.name}</p>
                <p className="text-xs text-ink-muted">{f.type} &middot; {f.size}</p>
              </div>
            </div>
            <a href={f.url} download className="grid h-10 w-10 place-items-center rounded-lg border border-border text-ink-muted hover:border-deep hover:text-deep transition-colors" aria-label={`Unduh ${f.name}`}>
              <Download size={16} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
