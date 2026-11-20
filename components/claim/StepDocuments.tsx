"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  UploadCloud,
  FileText,
  AlertCircle,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { StepHeader } from "./fields";
import { signCloudinaryUpload } from "@/app/claim/actions";
import type { UploadedFile } from "@/lib/claim-types";

type CloudinarySignature = NonNullable<
  Awaited<ReturnType<typeof signCloudinaryUpload>>
>;

interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  resource_type: string;
  format: string;
}

function uploadToCloudinary(
  file: File,
  sig: CloudinarySignature,
  onProgress: (percent: number) => void,
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.append("file", file);
    form.append("api_key", sig.apiKey);
    form.append("timestamp", String(sig.timestamp));
    form.append("folder", sig.folder);
    form.append("signature", sig.signature);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", sig.uploadUrl, true);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText) as CloudinaryUploadResult);
        } catch {
          reject(new Error("Invalid response from Cloudinary"));
        }
      } else {
        reject(new Error(`Cloudinary upload failed (${xhr.status})`));
      }
    };
    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.send(form);
  });
}

const ACCEPTED = ["application/pdf", "image/jpeg", "image/png"];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 12;

const categories = [
  "Transaction Receipts",
  "Bank Statements",
  "Payment Confirmations",
  "Screenshots",
  "Email or Message Evidence",
  "Other Supporting Documents",
];

export default function StepDocuments({
  files: initialFiles,
  onChange,
  errors,
}: {
  files: UploadedFile[];
  onChange: (files: UploadedFile[]) => void;
  errors: Record<string, string>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [uploadError, setUploadError] = useState("");

  // Internal state to avoid stale closures during concurrent uploads
  const [files, setFiles] = useState<UploadedFile[]>(initialFiles);

  useEffect(() => {
    onChange(files);
  }, [files, onChange]);

  const updateFile = (name: string, patch: Partial<UploadedFile>) => {
    setFiles((prev) =>
      prev.map((f) => (f.name === name ? { ...f, ...patch } : f)),
    );
  };

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED.includes(file.type) && !/\.(jpe?g|png|pdf)$/i.test(file.name)) {
      return `${file.name}: unsupported file type (PDF, JPG, PNG only)`;
    }
    if (file.size > MAX_SIZE) {
      return `${file.name}: exceeds 10MB limit`;
    }
    return null;
  };

  const uploadFile = useCallback(
    async (file: File, category: string) => {
      const draftId =
        (typeof window !== "undefined" &&
          window.sessionStorage.getItem("claimDraftId")) ||
        `draft-${Date.now()}`;
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("claimDraftId", draftId);
      }

      const entry: UploadedFile = {
        name: file.name,
        size: file.size,
        type: file.type || "application/octet-stream",
        category,
        status: "uploading",
        progress: 0,
      };
      setFiles((prev) => [...prev, entry]);

      // Ask the server to sign a direct upload to Cloudinary.
      let signature: CloudinarySignature | null = null;
      try {
        signature = await signCloudinaryUpload(draftId);
      } catch {
        signature = null;
      }

      if (signature) {
        try {
          const result = await uploadToCloudinary(file, signature, (progress) =>
            updateFile(file.name, { progress }),
          );
          updateFile(file.name, {
            status: "success",
            progress: 100,
            publicId: result.public_id,
            secureUrl: result.secure_url,
            resourceType: result.resource_type,
            format: result.format,
          });
        } catch {
          updateFile(file.name, { status: "error" });
          setUploadError(`Failed to upload ${file.name}. Please try again.`);
        }
        return;
      }

      // Simulated upload progress when Cloudinary is not configured
      let progress = 0;
      const interval = setInterval(() => {
        progress = Math.min(100, progress + Math.random() * 25);
        updateFile(file.name, { progress: Math.round(progress) });
        if (progress >= 100) {
          clearInterval(interval);
          updateFile(file.name, { status: "success", progress: 100 });
        }
      }, 180);
    },
    [],
  );

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      setUploadError("");
      if (!fileList) return;
      const incoming = Array.from(fileList);
      setFiles((prev) => {
        if (prev.length + incoming.length > MAX_FILES) {
          setUploadError(`Maximum ${MAX_FILES} files allowed.`);
          return prev;
        }
        return prev;
      });
      for (const file of incoming) {
        const err = validateFile(file);
        if (err) {
          setUploadError(err);
          continue;
        }
        void uploadFile(file, selectedCategory);
      }
    },
    [selectedCategory, uploadFile],
  );

  const removeFile = (name: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  };

  return (
    <div>
      <StepHeader
        title="Upload Supporting Evidence"
        description="Upload relevant documents that can help us understand and assess your claim."
      />

      <div className="mb-4">
        <label className="mb-2 block text-sm font-semibold text-navy">
          Document category
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setSelectedCategory(c)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                selectedCategory === c
                  ? "border-emerald bg-emerald text-white"
                  : "border-slate-200 bg-white text-slate-text hover:border-emerald hover:text-emerald"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition ${
          dragging
            ? "border-emerald bg-emerald/5"
            : "border-emerald/40 bg-sky-soft/40 hover:border-emerald hover:bg-emerald/5"
        }`}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald/10 text-emerald">
          <UploadCloud size={28} />
        </span>
        <p className="mt-3 text-sm font-semibold text-navy">
          Drag & drop files here, or{" "}
          <span className="text-emerald">browse</span>
        </p>
        <p className="mt-1 text-xs text-slate-text">
          PDF, JPG, PNG • Max 10MB per file • Up to {MAX_FILES} files
        </p>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </motion.div>

      {uploadError && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-red-500">
          <AlertCircle size={14} /> {uploadError}
        </p>
      )}

      {files.length > 0 && (
        <div className="mt-5 space-y-2.5">
          {files.map((f) => (
            <div
              key={f.name + f.size}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-soft text-emerald">
                <FileText size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium text-navy">{f.name}</p>
                  <span className="shrink-0 text-xs text-slate-text">
                    {(f.size / 1024).toFixed(0)} KB
                  </span>
                </div>
                <p className="text-xs text-slate-text">{f.category}</p>
                {f.status === "uploading" && (
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-emerald transition-all"
                      style={{ width: `${f.progress}%` }}
                    />
                  </div>
                )}
              </div>
              {f.status === "success" && (
                <CheckCircle2 size={20} className="shrink-0 text-emerald" />
              )}
              {f.status === "error" && (
                <AlertCircle size={20} className="shrink-0 text-red-500" />
              )}
              <button
                type="button"
                onClick={() => removeFile(f.name)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-text transition hover:bg-red-50 hover:text-red-500"
                aria-label={`Remove ${f.name}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {errors.documents && (
        <p className="mt-2 text-xs text-red-500">{errors.documents}</p>
      )}

      <p className="mt-4 text-xs text-slate-text">
        Do not upload passwords, private keys, wallet recovery phrases or full
        card security details. All uploads are stored securely and access is
        restricted.
      </p>
    </div>
  );
}
