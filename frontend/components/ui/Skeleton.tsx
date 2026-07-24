export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-sand ${className}`} />;
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 space-y-3 animate-pulse ${className}`}>
      <div className="h-4 bg-sand rounded-lg w-1/3" />
      <div className="h-3 bg-sand rounded-lg w-full" />
      <div className="h-3 bg-sand rounded-lg w-2/3" />
    </div>
  );
}

export function SkeletonCardGrid({ count = 6, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 4, className = "" }: { rows?: number; cols?: number; className?: string }) {
  return (
    <div className={`rounded-2xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden animate-pulse ${className}`}>
      <div className="h-11 bg-sand border-b border-sand" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-5 py-3 border-b border-sand last:border-b-0">
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="h-3 bg-sand rounded-lg flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}
