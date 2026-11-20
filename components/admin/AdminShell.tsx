"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Bell,
  ChevronDown,
  FileSpreadsheet,
  FileText,
  FolderOpen,
  Headphones,
  LayoutDashboard,
  LogOut,
  Menu,
  PanelsTopLeft,
  ScrollText,
  Search,
  Settings,
  ShieldCheck,
  UserCog,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import Logo from "@/components/Logo";
import LiveRefresher from "@/components/admin/LiveRefresher";
import { initials } from "@/lib/admin/format";
import { signOutAdmin } from "@/lib/admin/session-actions";

export interface AdminSummary {
  name: string;
  email: string;
  role: string;
}

export interface ShellNotification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
  badge?: number;
};

function buildNav(unreadCount: number): NavItem[] {
  return [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
    { label: "Claims", href: "/admin/claims", icon: FileText },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Documents", href: "/admin/documents", icon: FolderOpen },
    { label: "Reports", href: "/admin/reports", icon: FileSpreadsheet },
    { label: "Settings", href: "/admin/settings", icon: Settings },
    {
      label: "Notifications",
      href: "/admin/notifications",
      icon: Bell,
      badge: unreadCount,
    },
    { label: "Audit Logs", href: "/admin/audit-logs", icon: ScrollText },
    { label: "Support", href: "/admin/support", icon: Headphones },
  ];
}

export default function AdminShell({
  admin,
  unreadCount,
  notifications,
  children,
}: {
  admin: AdminSummary;
  unreadCount: number;
  notifications: ShellNotification[];
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"bell" | "profile" | null>(null);
  const [search, setSearch] = useState("");
  const [signingOut, setSigningOut] = useState(false);
  const [activePath, setActivePath] = useState(pathname);

  const nav = buildNav(unreadCount);

  // Close transient menus when the route changes. Adjusting state during
  // render avoids an extra effect-driven render pass.
  if (activePath !== pathname) {
    setActivePath(pathname);
    setMobileOpen(false);
    setOpenMenu(null);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (item: NavItem) =>
    item.exact
      ? pathname === item.href
      : pathname === item.href || pathname.startsWith(`${item.href}/`);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const term = search.trim();
    router.push(term ? `/admin/claims?search=${encodeURIComponent(term)}` : "/admin/claims");
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOutAdmin();
    router.replace("/admin/login");
    router.refresh();
  };

  const sidebarInner = (compact: boolean) => (
    <div className="flex h-full flex-col">
      <div className={`flex items-center gap-3 px-4 pt-5 ${compact ? "justify-center px-0" : ""}`}>
        <Logo light size={compact ? 30 : 28} />
        {!compact && (
          <div className="min-w-0">
            <p className="truncate text-[15px] font-bold leading-tight text-white">
              ReclaimRefinance
            </p>
            <p className="truncate text-[10.5px] font-semibold tracking-wide text-emerald-light">
              Recover • Refinance • Move Forward
            </p>
          </div>
        )}
      </div>

      <nav className="mt-7 flex-1 overflow-y-auto px-3 pb-4">
        <ul className="flex flex-col gap-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  title={compact ? item.label : undefined}
                  aria-current={active ? "page" : undefined}
                  className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                    compact ? "justify-center px-0" : ""
                  } ${active ? "text-white" : "text-white/65 hover:bg-white/10 hover:text-white"}`}
                >
                  {active && (
                    <motion.span
                      layoutId="admin-nav-active"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-xl bg-emerald shadow-[0_10px_24px_-10px_rgba(8,185,154,0.85)]"
                    />
                  )}
                  <Icon size={19} className="relative z-10 shrink-0" />
                  {!compact && <span className="relative z-10 truncate">{item.label}</span>}
                  {!compact && !!item.badge && item.badge > 0 && (
                    <span className="relative z-10 ml-auto inline-flex min-w-[22px] items-center justify-center rounded-full bg-emerald-light px-1.5 text-[11px] font-bold text-navy">
                      {item.badge}
                    </span>
                  )}
                  {compact && !!item.badge && item.badge > 0 && (
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-light" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {!compact && (
        <div className="mx-3 mb-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-4">
          <div className="relative">
            <div className="pointer-events-none absolute -right-6 -top-8 h-20 w-20 rounded-full bg-emerald/25 blur-2xl" />
            <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-emerald/20 text-emerald-light ring-1 ring-emerald/30">
              <ShieldCheck size={20} />
            </span>
            <p className="relative mt-3 text-sm font-bold text-white">
              Secure. Trusted. Professional.
            </p>
            <p className="relative mt-1 text-[11.5px] leading-relaxed text-white/60">
              Managing recovery with confidence.
            </p>
          </div>
        </div>
      )}

      <div className={`px-3 pb-5 ${compact ? "flex justify-center px-0" : ""}`}>
        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          title="Logout"
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/65 transition hover:bg-rose-500/15 hover:text-rose-200 disabled:opacity-60 ${
            compact ? "w-auto justify-center px-2.5" : ""
          }`}
        >
          <LogOut size={19} />
          {!compact && <span>{signingOut ? "Signing out…" : "Logout"}</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-sky-soft">
      <LiveRefresher />

      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 78 : 236 }}
        transition={{ type: "spring", stiffness: 320, damping: 34 }}
        className="sticky top-0 hidden h-screen shrink-0 overflow-hidden bg-gradient-to-b from-navy to-navy-soft lg:block"
      >
        {sidebarInner(collapsed)}
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-navy/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }
              }
              className="fixed inset-y-0 left-0 z-50 w-[252px] bg-gradient-to-b from-navy to-navy-soft lg:hidden"
            >
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation"
                className="absolute right-3 top-4 inline-flex h-9 w-9 items-center justify-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>
              {sidebarInner(false)}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-line bg-white/85 backdrop-blur-xl">
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex h-16 items-center gap-3 px-4 sm:px-6"
          >
            <button
              type="button"
              onClick={() => {
                if (window.matchMedia("(min-width: 1024px)").matches) setCollapsed((v) => !v);
                else setMobileOpen(true);
              }}
              aria-label="Toggle navigation"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-navy transition hover:border-emerald/40 hover:text-emerald"
            >
              {collapsed ? <PanelsTopLeft size={19} /> : <Menu size={19} />}
            </button>

            <form onSubmit={handleSearch} className="relative hidden flex-1 max-w-md sm:block">
              <Search
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search claims, users..."
                className="w-full rounded-xl border border-line bg-sky-soft/70 py-2.5 pl-10 pr-4 text-sm text-ink outline-none transition placeholder:text-muted focus:border-emerald focus:bg-white focus:ring-2 focus:ring-emerald/20"
              />
            </form>

            <div className="ml-auto flex items-center gap-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setOpenMenu((current) => (current === "bell" ? null : "bell"))
                  }
                  aria-label="Notifications"
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-navy transition hover:border-emerald/40 hover:text-emerald"
                >
                  <Bell size={19} />
                  {unreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 inline-flex min-w-[19px] items-center justify-center rounded-full bg-emerald px-1 text-[10.5px] font-bold text-white">
                      <motion.span
                        animate={reduce ? undefined : { scale: [1, 1.18, 1] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        {unreadCount}
                      </motion.span>
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {openMenu === "bell" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute right-0 top-full z-40 mt-2 w-80 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_60px_-24px_rgba(7,29,58,0.35)]"
                    >
                      <div className="flex items-center justify-between border-b border-line px-4 py-3">
                        <p className="text-sm font-bold text-ink">Notifications</p>
                        <span className="rounded-full bg-sky-soft px-2 py-0.5 text-[11px] font-semibold text-muted">
                          {unreadCount} unread
                        </span>
                      </div>
                      <ul className="max-h-72 overflow-y-auto">
                        {notifications.length === 0 && (
                          <li className="px-4 py-6 text-center text-sm text-muted">
                            No notifications yet.
                          </li>
                        )}
                        {notifications.map((item) => (
                          <li
                            key={item.id}
                            className="border-b border-line/60 px-4 py-3 last:border-0"
                          >
                            <div className="flex items-start gap-2.5">
                              <span
                                className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                                  item.read ? "bg-slate-300" : "bg-emerald"
                                }`}
                              />
                              <div className="min-w-0">
                                <p className="truncate text-[13px] font-semibold text-ink">
                                  {item.title}
                                </p>
                                <p className="mt-0.5 line-clamp-2 text-[12px] leading-relaxed text-muted">
                                  {item.message}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/admin/notifications"
                        onClick={() => setOpenMenu(null)}
                        className="block border-t border-line px-4 py-3 text-center text-[13px] font-semibold text-emerald hover:bg-sky-soft"
                      >
                        View all notifications
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setOpenMenu((current) => (current === "profile" ? null : "profile"))
                  }
                  className="flex items-center gap-2.5 rounded-xl border border-line bg-white py-1.5 pl-1.5 pr-2.5 transition hover:border-emerald/40"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-[12px] font-bold text-white">
                    {initials(admin.name)}
                  </span>
                  <span className="hidden text-left sm:block">
                    <span className="block text-[13px] font-bold leading-tight text-ink">
                      Admin
                    </span>
                    <span className="block max-w-[140px] truncate text-[11px] leading-tight text-muted">
                      {admin.email}
                    </span>
                  </span>
                  <ChevronDown
                    size={15}
                    className={`text-muted transition-transform ${openMenu === "profile" ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {openMenu === "profile" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute right-0 top-full z-40 mt-2 w-60 overflow-hidden rounded-2xl border border-line bg-white py-1.5 shadow-[0_24px_60px_-24px_rgba(7,29,58,0.35)]"
                    >
                      <div className="px-4 py-2.5">
                        <p className="text-[13px] font-bold text-ink">{admin.name}</p>
                        <p className="truncate text-[11.5px] text-muted">{admin.email}</p>
                      </div>
                      <div className="my-1 h-px bg-line" />
                      <Link
                        href="/admin/settings"
                        onClick={() => setOpenMenu(null)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-ink transition hover:bg-sky-soft"
                      >
                        <UserCog size={16} className="text-muted" /> My Profile
                      </Link>
                      <Link
                        href="/admin/settings"
                        onClick={() => setOpenMenu(null)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-ink transition hover:bg-sky-soft"
                      >
                        <Settings size={16} className="text-muted" /> Account Settings
                      </Link>
                      <div className="my-1 h-px bg-line" />
                      <button
                        type="button"
                        onClick={handleSignOut}
                        disabled={signingOut}
                        className="flex w-full items-center gap-2.5 px-4 py-2.5 text-[13px] font-semibold text-rose-600 transition hover:bg-rose-50 disabled:opacity-60"
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </header>

        {/* Page content with transition */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
