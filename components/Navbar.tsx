"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import Logo from "./Logo";

const services = [
  { label: "Cryptocurrency Scam Assistance", href: "/services/crypto" },
  { label: "Investment Fraud", href: "/services/investment" },
  { label: "Bank Transfer Fraud", href: "/services/bank-transfer" },
  { label: "Purchase & Invoice Fraud", href: "/services/purchase" },
  { label: "Romance & Social Engineering", href: "/services/romance" },
  { label: "Account Takeover Fraud", href: "/services/account-takeover" },
  { label: "Wire & International Payment Fraud", href: "/services/wire" },
  { label: "Other Financial Scams", href: "/services/other" },
];

const resources = [
  { label: "Fraud Prevention", href: "/resources/prevention" },
  { label: "Recovery Guide", href: "/resources/guide" },
  { label: "Blog", href: "/resources/blog" },
  { label: "Contact", href: "/contact" },
];

type NavLink = {
  label: string;
  href: string;
  base?: string;
  dropdown?: { label: string; href: string }[];
};

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "#services",
    base: "/services",
    dropdown: services,
  },
  {
    label: "How It Works",
    href: "/how-it-works",
    base: "/how-it-works",
  },
  {
    label: "Resources",
    href: "#resources",
    base: "/resources",
    dropdown: resources,
  },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ darkHero = false }: { darkHero?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const onDark = darkHero && !scrolled;

  const isActive = (link: NavLink) => {
    if (link.base) {
      return pathname === link.base || pathname.startsWith(`${link.base}/`);
    }
    if (link.href === "/") return pathname === "/";
    return pathname === link.href || pathname.startsWith(`${link.href}/`);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(7,29,58,0.18)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[88px] items-center justify-between">
          <Logo light={onDark} />

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={() => link.dropdown && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  aria-current={isActive(link) ? "page" : undefined}
                  className={`relative flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                    isActive(link)
                      ? onDark
                        ? "text-emerald-light"
                        : "text-emerald"
                      : onDark
                        ? "text-white hover:text-emerald-light"
                        : scrolled
                          ? "text-slate-heading hover:text-emerald"
                          : "text-navy hover:text-emerald"
                  }`}
                >
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-200 ${
                        openDropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-2.5 bottom-0.5 h-0.5 origin-left rounded-full bg-emerald transition-transform duration-300 ${
                      isActive(link) ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>

                {link.dropdown && (
                  <AnimatePresence>
                    {openDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute left-0 top-full pt-3 w-[300px]"
                      >
                        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_20px_50px_-15px_rgba(7,29,58,0.25)]">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-text transition hover:bg-sky-soft hover:text-emerald"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/claim"
              className="group inline-flex items-center gap-1.5 rounded-full bg-emerald px-5 py-2.5 text-sm font-semibold text-white shadow-emerald transition hover:bg-emerald-soft"
            >
              Start a Claim
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className={`lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl border ${
              onDark
                ? "border-white/20 bg-white/10 text-white"
                : "border-slate-200 bg-white text-navy"
            }`}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-navy/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 z-50 flex h-full w-[86%] max-w-sm flex-col bg-white shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <Logo />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-navy"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-5">
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <MobileNavItem
                      key={link.label}
                      link={link}
                      onClose={() => setMobileOpen(false)}
                    />
                  ))}
                </ul>
              </div>
              <div className="border-t border-slate-100 p-5 flex flex-col gap-3">
                <Link
                  href="/claim"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-emerald px-5 py-3 text-sm font-semibold text-white shadow-emerald"
                >
                  Start a Claim <ArrowRight size={16} />
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileNavItem({
  link,
  onClose,
}: {
  link: NavLink;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const hasDropdown = !!link.dropdown;
  const active = link.base
    ? pathname === link.base || pathname.startsWith(`${link.base}/`)
    : link.href === "/"
      ? pathname === "/"
      : pathname === link.href || pathname.startsWith(`${link.href}/`);

  return (
    <li>
      <div className="flex items-center">
        <Link
          href={link.href}
          onClick={onClose}
          aria-current={active ? "page" : undefined}
          className={`flex-1 rounded-xl px-3 py-3 text-base font-semibold hover:bg-sky-soft hover:text-emerald ${
            active
              ? "border-l-2 border-emerald text-emerald"
              : "text-navy"
          }`}
        >
          {link.label}
        </Link>
        {hasDropdown && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-text"
            aria-label={`Toggle ${link.label}`}
          >
            <ChevronDown
              size={18}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </div>
      {hasDropdown && (
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden pl-3"
            >
              {link.dropdown!.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-text hover:text-emerald"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      )}
    </li>
  );
}
