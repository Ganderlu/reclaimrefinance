// Deterministic formatting helpers shared by admin server and client components.

function toNumber(value: string | number | null | undefined): number {
  if (typeof value === "number") return value;
  if (!value) return 0;
  const parsed = Number(String(value).replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatNumber(value: number | string | null | undefined): string {
  return new Intl.NumberFormat("en-US").format(toNumber(value));
}

export function formatCurrency(
  value: string | number | null | undefined,
  currency = "USD",
): string {
  const amount = toNumber(value);
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `$${formatNumber(amount)}`;
  }
}

/**
 * Formats an ISO timestamp. Uses an explicit timezone so the output is
 * identical on the server and the client (avoids hydration mismatches).
 */
const DATE_TZ = process.env.NEXT_PUBLIC_DISPLAY_TIMEZONE || "UTC";

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: DATE_TZ,
  }).format(date);
}

export function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: DATE_TZ,
  }).format(date);
}

export function formatRelative(iso: string | null | undefined): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  const diff = date.getTime() - Date.now();
  const minutes = Math.round(diff / 60000);
  const abs = Math.abs(minutes);
  if (abs < 1) return "just now";
  const relative = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" });
  if (abs < 60) return relative.format(minutes, "minute");
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) return relative.format(hours, "hour");
  const days = Math.round(hours / 24);
  if (Math.abs(days) < 30) return relative.format(days, "day");
  const months = Math.round(days / 30);
  if (Math.abs(months) < 12) return relative.format(months, "month");
  return relative.format(Math.round(months / 12), "year");
}

export function formatBytes(bytes: number | null | undefined): string {
  const value = toNumber(bytes);
  if (value <= 0) return "—";
  const units = ["B", "KB", "MB", "GB"];
  const exponent = Math.min(
    Math.floor(Math.log(value) / Math.log(1024)),
    units.length - 1,
  );
  const size = value / Math.pow(1024, exponent);
  return `${size.toFixed(exponent === 0 ? 0 : 1)} ${units[exponent]}`;
}

export function initials(name: string | null | undefined): string {
  if (!name) return "AD";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function customerName(claim: {
  personalInformation?: { firstName?: string; lastName?: string };
}): string {
  const first = claim.personalInformation?.firstName ?? "";
  const last = claim.personalInformation?.lastName ?? "";
  const name = `${first} ${last}`.trim();
  return name || "Unknown customer";
}
