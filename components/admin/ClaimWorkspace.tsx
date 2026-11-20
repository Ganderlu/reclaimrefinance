"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CircleCheck,
  CircleExclamationPoint,
  LoaderCircle,
  MessageSquarePlus,
  TriangleExclamationPoint,
  X,
} from "lucide-react";
import { addClaimNote, updateClaimStatus } from "@/lib/admin/actions";
import { formatDateTime } from "@/lib/admin/format";
import { CLAIM_STATUSES, type ClaimNote, type ClaimStatus } from "@/lib/admin/types";

const STATUS_HINT: Record<ClaimStatus, string> = {
  Pending: "Submitted and awaiting initial triage.",
  "Under Review": "An officer is actively reviewing the evidence.",
  Approved: "Accepted for recovery processing.",
  Rejected: "Does not meet the criteria for recovery.",
};

export default function ClaimWorkspace({
  claimId,
  reference,
  status,
  notes,
}: {
  claimId: string;
  reference: string;
  status: ClaimStatus;
  notes: ClaimNote[];
}) {
  const router = useRouter();
  const reduce = useReducedMotion();

  const [selected, setSelected] = useState<ClaimStatus>(status);
  const [confirming, setConfirming] = useState(false);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [statusSaved, setStatusSaved] = useState(false);
  const [pendingStatus, startStatus] = useTransition();

  const [note, setNote] = useState("");
  const [noteError, setNoteError] = useState<string | null>(null);
  const [noteSaved, setNoteSaved] = useState(false);
  const [pendingNote, startNote] = useTransition();

  const saveStatus = () => {
    setStatusError(null);
    startStatus(async () => {
      const result = await updateClaimStatus(claimId, selected);
      if (result.ok) {
        setConfirming(false);
        setStatusSaved(true);
        router.refresh();
      } else {
        setConfirming(false);
        setStatusError(result.error);
      }
    });
  };

  const saveNote = () => {
    setNoteError(null);
    setNoteSaved(false);
    startNote(async () => {
      const result = await addClaimNote(claimId, note);
      if (result.ok) {
        setNote("");
        setNoteSaved(true);
        router.refresh();
      } else {
        setNoteError(result.error);
      }
    });
  };

  const orderedNotes = [...notes].reverse();
  const changed = selected !== status;

  return (
    <div className="flex flex-col gap-5">
      <section className="rounded-3xl border border-line bg-white p-5 shadow-[0_12px_34px_-24px_rgba(7,29,58,0.35)] sm:p-6">
        <h2 className="text-base font-bold text-ink">Update status</h2>
        <p className="mt-1 text-[12.5px] leading-relaxed text-muted">
          Currently <span className="font-semibold text-ink">{status}</span>. Changing the
          status records an entry in the audit log.
        </p>

        <div className="mt-4 flex flex-col gap-3">
          <select
            value={selected}
            onChange={(event) => {
              setSelected(event.target.value as ClaimStatus);
              setStatusSaved(false);
            }}
            aria-label="Claim status"
            className="rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm font-semibold text-ink outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/20"
          >
            {CLAIM_STATUSES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <p className="text-[12px] leading-relaxed text-muted">{STATUS_HINT[selected]}</p>

          <button
            type="button"
            disabled={!changed || pendingStatus}
            onClick={() => setConfirming(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3 text-sm font-bold text-white transition hover:bg-navy-soft disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save status
          </button>
        </div>

        {statusSaved && (
          <p className="mt-3 flex items-center gap-2 rounded-xl border border-emerald/25 bg-emerald/[0.07] px-3.5 py-2.5 text-[12.5px] font-semibold text-emerald">
            <CircleCheck size={15} /> Status updated.
          </p>
        )}
        {statusError && (
          <p className="mt-3 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-[12.5px] font-medium text-rose-700">
            <CircleExclamationPoint size={15} /> {statusError}
          </p>
        )}
      </section>

      <section className="rounded-3xl border border-line bg-white p-5 shadow-[0_12px_34px_-24px_rgba(7,29,58,0.35)] sm:p-6">
        <h2 className="text-base font-bold text-ink">Internal notes</h2>
        <p className="mt-1 text-[12.5px] leading-relaxed text-muted">
          Visible to administrators only — never shown to the customer.
        </p>

        <div className="mt-4">
          <textarea
            value={note}
            onChange={(event) => {
              setNote(event.target.value);
              setNoteSaved(false);
            }}
            rows={4}
            maxLength={2000}
            placeholder="Add context for the recovery team…"
            className="w-full resize-y rounded-xl border border-line bg-sky-soft/60 px-3.5 py-3 text-sm text-ink outline-none transition placeholder:text-muted focus:border-emerald focus:bg-white focus:ring-2 focus:ring-emerald/20"
          />
          <div className="mt-2 flex items-center justify-between gap-3">
            <span className="text-[11.5px] text-muted">{note.length}/2000</span>
            <button
              type="button"
              onClick={saveNote}
              disabled={!note.trim() || pendingNote}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald px-4 py-2.5 text-[13px] font-bold text-white transition hover:bg-emerald-soft disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pendingNote ? (
                <LoaderCircle size={15} className="animate-spin" />
              ) : (
                <MessageSquarePlus size={15} />
              )}
              Add note
            </button>
          </div>
          {noteSaved && (
            <p className="mt-3 flex items-center gap-2 text-[12.5px] font-semibold text-emerald">
              <CircleCheck size={15} /> Note saved.
            </p>
          )}
          {noteError && (
            <p className="mt-3 flex items-center gap-2 text-[12.5px] font-medium text-rose-700">
              <CircleExclamationPoint size={15} /> {noteError}
            </p>
          )}
        </div>

        <div className="mt-5 border-t border-line pt-4">
          {orderedNotes.length === 0 ? (
            <p className="text-[12.5px] text-muted">No internal notes yet.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {orderedNotes.map((entry, index) => (
                <li
                  key={`${entry.createdAt}-${index}`}
                  className="rounded-2xl border border-line bg-sky-soft/50 px-4 py-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[12.5px] font-bold text-ink">{entry.author}</p>
                    <p className="text-[11.5px] text-muted">{formatDateTime(entry.createdAt)}</p>
                  </div>
                  <p className="mt-1.5 whitespace-pre-wrap text-[13px] leading-relaxed text-ink/80">
                    {entry.text}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <AnimatePresence>
        {confirming && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-50 bg-navy/55 backdrop-blur-sm"
              onClick={() => (pendingStatus ? undefined : setConfirming(false))}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Confirm status change"
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-line bg-white p-6 shadow-[0_30px_80px_-30px_rgba(7,29,58,0.5)]"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                  <TriangleExclamationPoint size={20} />
                </span>
                <button
                  type="button"
                  onClick={() => setConfirming(false)}
                  disabled={pendingStatus}
                  aria-label="Close"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted transition hover:bg-sky-soft hover:text-ink disabled:opacity-50"
                >
                  <X size={17} />
                </button>
              </div>
              <h3 className="mt-4 text-lg font-bold text-ink">Change claim status?</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                {reference} will be moved from{" "}
                <span className="font-semibold text-ink">{status}</span> to{" "}
                <span className="font-semibold text-emerald">{selected}</span>. This action is
                logged.
              </p>
              <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setConfirming(false)}
                  disabled={pendingStatus}
                  className="rounded-xl border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink transition hover:bg-sky-soft disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveStatus}
                  disabled={pendingStatus}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald px-4 py-2.5 text-[13px] font-bold text-white transition hover:bg-emerald-soft disabled:opacity-60"
                >
                  {pendingStatus && <LoaderCircle size={15} className="animate-spin" />}
                  Confirm change
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
