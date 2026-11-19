import {
  getApps,
  getApp,
  initializeApp,
  cert,
  type App,
} from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getStorage, type Storage } from "firebase-admin/storage";

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)
  : undefined;

export const adminConfigured = Boolean(serviceAccount?.project_id);

let app: App | null = null;
let adminDb: Firestore | null = null;
let adminStorage: Storage | null = null;

if (adminConfigured) {
  const apps = getApps();
  app = apps.length ? getApp() : initializeApp({ credential: cert(serviceAccount) });
  adminDb = getFirestore(app);
  adminStorage = getStorage(app);
}

export { app as adminApp, adminDb, adminStorage };
