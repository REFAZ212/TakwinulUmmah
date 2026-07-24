"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-ink-soft transition hover:bg-sand disabled:opacity-30 disabled:pointer-events-none"
        aria-label="Sebelumnya"
      >
        <ChevronLeft size={16} />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
        .reduce<(number | "dots")[]>((acc, p, i, arr) => {
          if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("dots");
          acc.push(p);
          return acc;
        }, [])
        .map((item, i) =>
          item === "dots" ? (
            <span key={`dots-${i}`} className="px-1 text-xs text-ink-soft">...</span>
          ) : (
            <button
              key={item}
              onClick={() => onPageChange(item)}
              className={`inline-flex h-9 min-w-[36px] items-center justify-center rounded-xl px-2 text-sm font-medium transition ${
                item === page
                  ? "bg-gold text-deep shadow-sm"
                  : "text-ink-soft hover:bg-sand"
              }`}
            >
              {item}
            </button>
          ),
        )}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-ink-soft transition hover:bg-sand disabled:opacity-30 disabled:pointer-events-none"
        aria-label="Selanjutnya"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
