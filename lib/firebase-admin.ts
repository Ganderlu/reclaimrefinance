import {
  getApps,
  getApp,
  initializeApp,
  cert,
  type App,
} from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getAuth, type Auth } from "firebase-admin/auth";

let serviceAccount: Record<string, unknown> | undefined;

const individualVars = {
  type: process.env.FIREBASE_SERVICE_ACCOUNT_TYPE,
  project_id: process.env.FIREBASE_SERVICE_ACCOUNT_PROJECT_ID,
  private_key_id: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY,
  client_email: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_ID,
  auth_uri: process.env.FIREBASE_SERVICE_ACCOUNT_AUTH_URI,
  token_uri: process.env.FIREBASE_SERVICE_ACCOUNT_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_SERVICE_ACCOUNT_UNIVERSE_DOMAIN,
};

const hasIndividualVars = Boolean(
  individualVars.project_id && individualVars.private_key && individualVars.client_email,
);

try {
  if (hasIndividualVars) {
    // Build the service account object from individual environment variables.
    const account: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(individualVars)) {
      if (value !== undefined) account[key] = value;
    }
    serviceAccount = account;
  } else if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    // Fallback for the legacy single-line JSON variable.
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON) as Record<
      string,
      unknown
    >;
  } else {
    serviceAccount = undefined;
  }
} catch (err) {
  console.error(
    "Firebase service account could not be loaded. Firebase Admin will not be available.",
    err,
  );
  serviceAccount = undefined;
}

export const adminConfigured = Boolean(serviceAccount?.project_id);

let app: App | null = null;
let adminDb: Firestore | null = null;
let adminAuth: Auth | null = null;

if (adminConfigured) {
  const apps = getApps();
  app = apps.length ? getApp() : initializeApp({ credential: cert(serviceAccount as Parameters<typeof cert>[0]) });
  adminDb = getFirestore(app);
  adminAuth = getAuth(app);
}

export { app as adminApp, adminDb, adminAuth };
