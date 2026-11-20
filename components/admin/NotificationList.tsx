"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  Bell,
  Check,
  CheckCheck,
  CircleCheck,
  ExternalLink,
  LoaderCircle,
  Undo2,
} from "lucide-react";
import EmptyState from "./EmptyState";
import { markAllNotificationsRead, markNotificationRead } from "@/lib/admin/actions";
import { formatDateTime } from "@/lib/admin/format";
import type { NotificationItem } from "@/lib/admin/types";

const TYPE_LABELS: Record<NotificationItem["type"], string> = {
  claim: "Claim",
  support: "Support",
  system: "System",
  user: "User",
};

const TYPE_STYLES: Record<NotificationItem["type"], string> = {
  claim: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  support: "bg-blue-50 text-blue-700 ring-blue-200",
  system: "bg-slate-100 text-slate-600 ring-slate-200",
  user: "bg-violet-50 text-violet-700 ring-violet-200",
};

export default function NotificationList({
  notifications,
}: {
  notifications: NotificationItem[];
}) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [tab, setTab] = useState<"all" | "unread">("all");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const unread = notifications.filter((item) => !item.read);
  const visible = tab === "unread" ? unread : notifications;

  const toggle = (item: NotificationItem) => {
    setPendingId(item.id);
    startTransition(async () => {
      await markNotificationRead(item.id, !item.read);
      setPendingId(null);
      router.refresh();
    });
  };

  const markAll = () => {
    startTransition(async () => {
      await markAllNotificationsRead();
      router.refresh();
    });
  };

  return (
    <section className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_12px_34px_-24px_rgba(7,29,58,0.35)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
        <div className="inline-flex rounded-xl border border-line bg-sky-soft/60 p-1">
          {(["all", "unread"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setTab(value)}
              className={`relative rounded-lg px-3.5 py-1.5 text-[12.5px] font-semibold capitalize transition ${
                tab === value ? "text-white" : "text-muted hover:text-ink"
              }`}
            >
              {tab === value && (
                <motion.span
                  layoutId="notification-tab"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-lg bg-navy"
                />
              )}
              <span className="relative z-10">
                {value} {value === "unread" && unread.length > 0 ? `(${unread.length})` : ""}
              </span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={markAll}
          disabled={pending || unread.length === 0}
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2 text-[12.5px] font-semibold text-ink transition hover:border-emerald/40 hover:text-emerald disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? <LoaderCircle size={15} className="animate-spin" /> : <CheckCheck size={15} />}
          Mark all as read
        </button>
      </div>

      {visible.length === 0 ? (
        <EmptyState
          icon={tab === "unread" ? CircleCheck : Bell}
          title={tab === "unread" ? "You're all caught up" : "No notifications yet"}
          description={
            tab === "unread"
              ? "Every notification has been read."
              : "Notifications about new claims, support requests and system events will appear here."
          }
        />
      ) : (
        <ul>
          {visible.map((item, index) => (
            <motion.li
              key={item.id}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.32,
                delay: reduce ? 0 : index * 0.03,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`flex flex-col gap-3 border-b border-line/70 px-5 py-4 last:border-0 sm:flex-row sm:items-start sm:justify-between sm:px-6 ${
                item.read ? "bg-white" : "bg-emerald/[0.035]"
              }`}
            >
              <div className="flex min-w-0 gap-3.5">
                <span
                  className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                    item.read ? "bg-slate-300" : "bg-emerald"
                  }`}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[13.5px] font-bold text-ink">{item.title}</p>
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${
                        TYPE_STYLES[item.type] ?? TYPE_STYLES.system
                      }`}
                    >
                      {TYPE_LABELS[item.type] ?? "System"}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted">{item.message}</p>
                  <p className="mt-1.5 text-[11.5px] text-muted">
                    {formatDateTime(item.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 pl-[22px] sm:pl-0">
                {item.link && (
                  <a
                    href={item.link}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3 py-2 text-[12px] font-semibold text-ink transition hover:border-emerald/40 hover:text-emerald"
                  >
                    <ExternalLink size={14} /> Open
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => toggle(item)}
                  disabled={pendingId === item.id}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3 py-2 text-[12px] font-semibold text-ink transition hover:border-emerald/40 hover:text-emerald disabled:opacity-50"
                >
                  {pendingId === item.id ? (
                    <LoaderCircle size={14} className="animate-spin" />
                  ) : item.read ? (
                    <Undo2 size={14} />
                  ) : (
                    <Check size={14} />
                  )}
                  {item.read ? "Mark unread" : "Mark read"}
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </section>
  );
}
