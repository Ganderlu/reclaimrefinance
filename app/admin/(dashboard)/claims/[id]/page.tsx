import Link from "next/link";
import { notFound } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  Banknote,
  Download,
  ExternalLink,
  FileText,
  Inbox,
  Mail,
  Phone,
  ShieldExclamationPoint,
  UserRound,
} from "lucide-react";
import ClaimWorkspace from "@/components/admin/ClaimWorkspace";
import StatusBadge from "@/components/admin/StatusBadge";
import { getClaimById } from "@/lib/admin/data";
import { formatBytes, formatCurrency, formatDate, formatDateTime } from "@/lib/admin/format";
import { categoryLabel } from "@/lib/admin/types";

// Claim detail is read per request behind the session check, so this segment is
// allowed to block on the server rather than produce an instant shell.
export const instant = false;

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11.5px] font-semibold uppercase tracking-wide text-muted">{label}</dt>
      <dd className="mt-1 text-[13.5px] font-medium text-ink break-words">
        {value || "—"}
      </dd>
    </div>
  );
}

function Panel({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-line bg-white p-5 shadow-[0_12px_34px_-24px_rgba(7,29,58,0.35)] sm:p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald/12 text-emerald ring-1 ring-emerald/20">
          <Icon size={18} />
        </span>
        <h2 className="text-base font-bold text-ink">{title}</h2>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default async function ClaimDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const claim = await getClaimById(id);
  if (!claim) notFound();

  const { personalInformation: personal, scamDetails: scam, financialDetails: financial } = claim;
  const customer =
    `${personal.firstName} ${personal.lastName}`.trim() || personal.email || "Unknown customer";

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
      <Link
        href="/admin/claims"
        className="inline-flex w-fit items-center gap-2 text-[13px] font-semibold text-muted transition hover:text-emerald"
      >
        <ArrowLeft size={16} /> Back to claims
      </Link>

      <div className="flex flex-col gap-4 rounded-3xl border border-line bg-white p-5 shadow-[0_12px_34px_-24px_rgba(7,29,58,0.35)] sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-extrabold tracking-tight text-ink">
              {claim.referenceNumber}
            </h1>
            <StatusBadge status={claim.status} />
          </div>
          <p className="mt-1.5 text-[13px] text-muted">
            {customer} · Submitted {formatDateTime(claim.createdAt)}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-sky-soft/70 px-4 py-3">
          <p className="text-[11.5px] font-semibold uppercase tracking-wide text-muted">
            Estimated loss
          </p>
          <p className="mt-1 text-xl font-extrabold text-ink">
            {formatCurrency(financial.amountLost, financial.currency)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="flex flex-col gap-5 lg:col-span-2">
          <Panel title="Customer information" icon={UserRound}>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Full name" value={customer} />
              <Field label="Email" value={personal.email} />
              <Field label="Phone" value={personal.phone} />
              <Field label="Preferred contact" value={personal.preferredContact} />
              <Field
                label="Location"
                value={[personal.state, personal.country].filter(Boolean).join(", ")}
              />
              <Field label="Referral source" value={personal.referralSource} />
            </dl>
            <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
              {personal.email && (
                <a
                  href={`mailto:${personal.email}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2 text-[12.5px] font-semibold text-ink transition hover:border-emerald/40 hover:text-emerald"
                >
                  <Mail size={15} /> Email customer
                </a>
              )}
              {personal.phone && (
                <a
                  href={`tel:${personal.phone}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2 text-[12.5px] font-semibold text-ink transition hover:border-emerald/40 hover:text-emerald"
                >
                  <Phone size={15} /> Call customer
                </a>
              )}
            </div>
          </Panel>

          <Panel title="Fraud details" icon={ShieldExclamationPoint}>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Category" value={categoryLabel(scam.category)} />
              <Field label="Platform / company" value={scam.platformName} />
              <Field label="Incident date" value={formatDate(scam.incidentDate)} />
              <Field label="Location of incident" value={scam.incidentLocation} />
            </dl>
            <div className="mt-4">
              <p className="text-[11.5px] font-semibold uppercase tracking-wide text-muted">
                What happened
              </p>
              <p className="mt-1.5 whitespace-pre-wrap text-[13.5px] leading-relaxed text-ink/85">
                {scam.description || scam.incidentHappened || "—"}
              </p>
            </div>
          </Panel>

          <Panel title="Financial details" icon={Banknote}>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="Amount lost"
                value={formatCurrency(financial.amountLost, financial.currency)}
              />
              <Field label="Payment method" value={financial.paymentMethod} />
              <Field label="Transaction date" value={formatDate(financial.transactionDate)} />
              <Field label="Transaction reference" value={financial.transactionReference} />
              <Field label="Recipient details" value={financial.recipientDetails} />
              <Field label="Institution" value={financial.institution} />
            </dl>
          </Panel>

          <Panel title="Supporting documents" icon={FileText}>
            {claim.supportingDocuments.length === 0 ? (
              <p className="text-[13px] text-muted">No documents were attached to this claim.</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {claim.supportingDocuments.map((doc, index) => (
                  <li
                    key={`${doc.publicId ?? doc.name}-${index}`}
                    className="flex flex-col gap-3 rounded-2xl border border-line bg-sky-soft/50 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-navy/60 ring-1 ring-line">
                        <FileText size={16} />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-semibold text-ink">{doc.name}</p>
                        <p className="text-[11.5px] text-muted">
                          {doc.category} · {formatBytes(doc.size)}
                        </p>
                      </div>
                    </div>
                    {doc.secureUrl ? (
                      <div className="flex shrink-0 gap-2">
                        <a
                          href={doc.secureUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3 py-2 text-[12px] font-semibold text-ink transition hover:border-emerald/40 hover:text-emerald"
                        >
                          <ExternalLink size={14} /> Preview
                        </a>
                        <a
                          href={doc.secureUrl}
                          download
                          className="inline-flex items-center gap-1.5 rounded-xl bg-navy px-3 py-2 text-[12px] font-semibold text-white transition hover:bg-navy-soft"
                        >
                          <Download size={14} /> Download
                        </a>
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3 py-2 text-[12px] font-semibold text-muted">
                        <Inbox size={14} /> File unavailable
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>

        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <ClaimWorkspace
              claimId={claim.id}
              reference={claim.referenceNumber}
              status={claim.status}
              notes={claim.notes}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
