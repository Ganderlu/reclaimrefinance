import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { getClaims } from "@/lib/admin/data";
import { categoryLabel } from "@/lib/admin/types";

function cell(value: unknown): string {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

/** Exports the claim register as CSV. Administrator session required. */
export async function GET(request: Request) {
  await requireAdmin();

  const url = new URL(request.url);
  const days = Number(url.searchParams.get("days")) || 365;
  const claims = await getClaims({ days });

  const header = [
    "Reference",
    "First name",
    "Last name",
    "Email",
    "Phone",
    "Country",
    "Fraud category",
    "Amount lost",
    "Currency",
    "Payment method",
    "Status",
    "Submitted at",
  ];

  const rows = claims.map((claim) => [
    claim.referenceNumber,
    claim.personalInformation.firstName,
    claim.personalInformation.lastName,
    claim.personalInformation.email,
    claim.personalInformation.phone,
    claim.personalInformation.country,
    categoryLabel(claim.scamDetails.category),
    claim.financialDetails.amountLost,
    claim.financialDetails.currency,
    claim.financialDetails.paymentMethod,
    claim.status,
    claim.createdAt,
  ]);

  const csv = [header, ...rows].map((row) => row.map(cell).join(",")).join("\r\n");
  const filename = `reclaimrefinance-claims-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(`\uFEFF${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
