export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-200/70 ${className}`}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-3xl border border-line bg-white p-6 shadow-[0_10px_30px_-18px_rgba(7,29,58,0.18)] ${className}`}
    >
      <Skeleton className="h-11 w-11 rounded-2xl" />
      <Skeleton className="mt-5 h-8 w-24" />
      <Skeleton className="mt-3 h-4 w-32" />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 border-b border-line/70 px-5 py-4">
      <Skeleton className="h-10 w-10 rounded-xl" />
      <div className="flex-1">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="mt-2 h-3 w-24" />
      </div>
      <Skeleton className="h-6 w-24 rounded-full" />
    </div>
  );
}
