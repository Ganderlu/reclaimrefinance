import Skeleton, { SkeletonCard, SkeletonRow } from "@/components/admin/Skeleton";

export default function AdminLoading() {
  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="mt-3 h-4 w-80" />
        </div>
        <Skeleton className="h-11 w-40" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((index) => (
          <SkeletonCard key={index} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="overflow-hidden rounded-3xl border border-line bg-white lg:col-span-2">
          {[0, 1, 2, 3, 4].map((index) => (
            <SkeletonRow key={index} />
          ))}
        </div>
        <Skeleton className="h-72 rounded-3xl" />
      </div>
    </div>
  );
}
