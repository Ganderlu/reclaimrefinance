import PageHeader from "@/components/admin/PageHeader";
import FadeIn from "@/components/admin/FadeIn";
import SupportList from "@/components/admin/SupportList";
import { getSupportRequests } from "@/lib/admin/data";
import { formatNumber } from "@/lib/admin/format";

// Support requests are read per request behind the session check, so this
// segment is allowed to block on the server rather than produce an instant shell.
export const instant = false;

export default async function AdminSupportPage() {
  const requests = await getSupportRequests(100);
  const open = requests.filter((item) => item.status !== "Resolved").length;

  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-5">
      <PageHeader
        title="Support"
        description={`${formatNumber(open)} open of ${formatNumber(
          requests.length,
        )} customer enquiries and support requests.`}
      />
      <FadeIn>
        <SupportList requests={requests} />
      </FadeIn>
    </div>
  );
}
