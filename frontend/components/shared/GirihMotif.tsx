/**
 * Signature decorative element: an 8-pointed star (girih) motif built from
 * Islamic geometric construction. Used as a section divider and card badge
 * instead of generic numbering — the three institutions are parallel, not
 * sequential, so a shared geometric mark identifies "part of this family"
 * rather than implying an order.
 */
export function GirihStar({ className = "", size = 32 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none">
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M50 5 L61 39 L95 50 L61 61 L50 95 L39 61 L5 50 L39 39 Z" />
        <path d="M50 20 L57 43 L80 50 L57 57 L50 80 L43 57 L20 50 L43 43 Z" opacity="0.5" />
      </g>
    </svg>
  );
}

export function GirihDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-16 bg-gold/40" />
      <GirihStar size={18} className="text-gold" />
      <span className="h-px w-16 bg-gold/40" />
    </div>
  );
}
