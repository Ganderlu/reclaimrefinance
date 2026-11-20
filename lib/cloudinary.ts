import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const uploadFolder =
  process.env.CLOUDINARY_UPLOAD_FOLDER || "reclaimrefinance/claims";

export const cloudinaryConfigured = Boolean(cloudName && apiKey && apiSecret);

if (cloudinaryConfigured) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

export interface CloudinarySignature {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  folder: string;
  signature: string;
  uploadUrl: string;
}

/**
 * Builds the parameters the browser needs to upload a file directly to
 * Cloudinary. The API secret never leaves the server — the browser only
 * receives a short-lived signature.
 */
export function createUploadSignature(draftId: string): CloudinarySignature | null {
  if (!cloudinaryConfigured) return null;

  const safeDraftId = draftId.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64) || "draft";
  const timestamp = Math.round(Date.now() / 1000);
  const folder = `${uploadFolder}/${safeDraftId}`;

  const signature = cloudinary.utils.api_sign_request(
    { folder, timestamp },
    apiSecret as string,
  );

  return {
    cloudName: cloudName as string,
    apiKey: apiKey as string,
    timestamp,
    folder,
    signature,
    uploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
  };
}

export { cloudinary };
