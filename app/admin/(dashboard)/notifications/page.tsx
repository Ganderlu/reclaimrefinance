import PageHeader from "@/components/admin/PageHeader";
import FadeIn from "@/components/admin/FadeIn";
import NotificationList from "@/components/admin/NotificationList";
import { getNotifications } from "@/lib/admin/data";
import { formatNumber } from "@/lib/admin/format";

// Notifications are read per request behind the session check, so this segment
// is allowed to block on the server rather than produce an instant shell.
export const instant = false;

export default async function AdminNotificationsPage() {
  const notifications = await getNotifications(100);
  const unread = notifications.filter((item) => !item.read).length;

  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-5">
      <PageHeader
        title="Notifications"
        description={`${formatNumber(unread)} unread of ${formatNumber(
          notifications.length,
        )} most recent notifications.`}
      />
      <FadeIn>
        <NotificationList notifications={notifications} />
      </FadeIn>
    </div>
  );
}
