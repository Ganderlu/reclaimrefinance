import DashboardWelcome from "@/components/admin/DashboardWelcome";
import QuickActions from "@/components/admin/QuickActions";
import RecentClaims from "@/components/admin/RecentClaims";
import StatCard from "@/components/admin/StatCard";
import SystemStatusBar from "@/components/admin/SystemStatusBar";
import { getDashboardStats, getRecentClaims } from "@/lib/admin/data";
import { getSystemHealth } from "@/lib/admin/health";
import { RANGE_OPTIONS, rangeToDays } from "@/lib/admin/types";

// Dashboard data is read per request behind the session check, so this segment
// is allowed to block on the server rather than produce an instant shell.
export const instant = false;

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const { range: rangeParam } = await searchParams;
  const range =
    RANGE_OPTIONS.find((option) => option.value === rangeParam)?.value ?? "7";
  const days = rangeToDays(range);

  const [stats, recentClaims, health] = await Promise.all([
    getDashboardStats(days),
    getRecentClaims(days, 5),
    getSystemHealth(),
  ]);

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6">
      <DashboardWelcome range={range} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          index={0}
          label="Total Claims"
          value={stats.total}
          icon="document"
          tone="navy"
        />
        <StatCard
          index={1}
          label="Approved Claims"
          value={stats.approved}
          icon="approved"
          tone="emerald"
        />
        <StatCard
          index={2}
          label="Under Review"
          value={stats.underReview}
          icon="review"
          tone="amber"
        />
        <StatCard
          index={3}
          label="Rejected Claims"
          value={stats.rejected}
          icon="rejected"
          tone="violet"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentClaims claims={recentClaims} />
        </div>
        <QuickActions />
      </div>

      <SystemStatusBar health={health} />
    </div>
  );
}
