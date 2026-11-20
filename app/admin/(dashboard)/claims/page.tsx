import PageHeader from "@/components/admin/PageHeader";
import ClaimsFilters from "@/components/admin/ClaimsFilters";
import ClaimsTable from "@/components/admin/ClaimsTable";
import { getClaims } from "@/lib/admin/data";
import { formatNumber } from "@/lib/admin/format";
import { CLAIM_STATUSES, RANGE_OPTIONS, rangeToDays, type ClaimStatus } from "@/lib/admin/types";

// Claims data is read per request behind the session check, so this segment is
// allowed to block on the server rather than produce an instant shell.
export const instant = false;

export default async function AdminClaimsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    status?: string;
    category?: string;
    range?: string;
  }>;
}) {
  const params = await searchParams;
  const search = typeof params.search === "string" ? params.search : "";
  const status = CLAIM_STATUSES.includes(params.status as ClaimStatus)
    ? (params.status as ClaimStatus)
    : "all";
  const category = typeof params.category === "string" && params.category ? params.category : "all";
  const range =
    RANGE_OPTIONS.find((option) => option.value === params.range)?.value ?? "7";

  const claims = await getClaims({
    search,
    status,
    category,
    days: rangeToDays(range),
  });

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
      <PageHeader
        title="Claims"
        description={`${formatNumber(claims.length)} claim${
          claims.length === 1 ? "" : "s"
        } match the current filters.`}
      />

      <ClaimsFilters search={search} status={status} category={category} range={range} />
      <ClaimsTable claims={claims} />
    </div>
  );
}
