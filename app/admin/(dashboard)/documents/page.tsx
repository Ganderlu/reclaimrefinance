import Link from "next/link";
import { Download, ExternalLink, FolderOpen } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import FadeIn from "@/components/admin/FadeIn";
import EmptyState from "@/components/admin/EmptyState";
import { getDocuments } from "@/lib/admin/data";
import { formatBytes, formatDateTime, formatNumber } from "@/lib/admin/format";
import { categoryLabel } from "@/lib/admin/types";

// Documents are read per request behind the session check, so this segment is
// allowed to block on the server rather than produce an instant shell.
export const instant = false;

export default async function AdminDocumentsPage() {
  const documents = await getDocuments();
  const totalBytes = documents.reduce((sum, item) => sum + item.size, 0);

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
      <PageHeader
        title="Documents"
        description={`${formatNumber(documents.length)} supporting document${
          documents.length === 1 ? "" : "s"
        } stored securely (${formatBytes(totalBytes)}). Preview and download are restricted to authorised administrators.`}
      />

      <FadeIn>
        <section className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_12px_34px_-24px_rgba(7,29,58,0.35)]">
          {documents.length === 0 ? (
            <EmptyState
              icon={FolderOpen}
              title="No documents uploaded"
              description="Files uploaded with a claim submission will be listed here for secure review."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line bg-sky-soft/60 text-[11.5px] font-bold uppercase tracking-wide text-muted">
                    <th className="px-5 py-3.5">Document</th>
                    <th className="px-5 py-3.5">Claim reference</th>
                    <th className="px-5 py-3.5">Customer</th>
                    <th className="px-5 py-3.5">Category</th>
                    <th className="px-5 py-3.5">Size</th>
                    <th className="px-5 py-3.5">Uploaded</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((document) => (
                    <tr
                      key={document.id}
                      className="border-b border-line/70 transition-colors last:border-0 hover:bg-sky-soft/70"
                    >
                      <td className="px-5 py-4">
                        <p className="text-[13.5px] font-semibold text-ink">{document.name}</p>
                        <p className="text-[12px] text-muted">
                          {document.format ? document.format.toUpperCase() : document.type}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <Link
                          href={`/admin/claims/${document.claimId}`}
                          className="text-[13px] font-semibold text-emerald transition hover:text-emerald-soft"
                        >
                          {document.claimReference}
                        </Link>
                      </td>
                      <td className="px-5 py-4 text-[12.5px] text-muted">
                        {document.customerName}
                      </td>
                      <td className="px-5 py-4 text-[12.5px] text-muted">
                        {categoryLabel(document.category)}
                      </td>
                      <td className="px-5 py-4 text-[12.5px] text-muted">
                        {formatBytes(document.size)}
                      </td>
                      <td className="px-5 py-4 text-[12.5px] text-muted">
                        {formatDateTime(document.uploadedAt)}
                      </td>
                      <td className="px-5 py-4">
                        {document.secureUrl ? (
                          <div className="flex justify-end gap-2">
                            <a
                              href={document.secureUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3 py-2 text-[12px] font-semibold text-ink transition hover:border-emerald/40 hover:text-emerald"
                            >
                              <ExternalLink size={14} /> Preview
                            </a>
                            <a
                              href={document.secureUrl}
                              download
                              className="inline-flex items-center gap-1.5 rounded-xl bg-navy px-3 py-2 text-[12px] font-semibold text-white transition hover:bg-navy-soft"
                            >
                              <Download size={14} /> Download
                            </a>
                          </div>
                        ) : (
                          <p className="text-right text-[12px] text-muted">Not available</p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </FadeIn>
    </div>
  );
}
