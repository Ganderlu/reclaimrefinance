export type ContactMethod = "email" | "phone" | "whatsapp";

export interface PersonalInformation {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  preferredContact: ContactMethod;
  referralSource: string;
  confirmAccurate: boolean;
}

export type ScamCategory =
  | "crypto"
  | "investment"
  | "bank-transfer"
  | "purchase"
  | "romance"
  | "account-takeover"
  | "wire"
  | "other";

export interface ScamDetails {
  category: ScamCategory | "";
  platformName: string;
  incidentDate: string;
  incidentLocation: string;
  incidentHappened: string;
  description: string;
}

export type Currency =
  | "USD"
  | "EUR"
  | "GBP"
  | "NGN"
  | "CAD"
  | "AUD"
  | "CHF"
  | "ZAR"
  | "INR"
  | "Other";

export type PaymentMethod =
  | "bank-transfer"
  | "cryptocurrency"
  | "credit-card"
  | "paypal"
  | "mobile-money"
  | "other";

export interface FinancialDetails {
  amountLost: string;
  currency: Currency | "";
  paymentMethod: PaymentMethod | "";
  transactionDate: string;
  transactionReference: string;
  recipientDetails: string;
  institution: string;
}

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
  category: string;
  status: "uploading" | "success" | "error";
  progress: number;
  storagePath?: string;
  downloadUrl?: string;
}

export interface ReviewConsent {
  accurate: boolean;
  terms: boolean;
  authorize: boolean;
}

export interface ClaimData {
  personal: PersonalInformation;
  scam: ScamDetails;
  financial: FinancialDetails;
  documents: UploadedFile[];
  consent: ReviewConsent;
}

export const emptyClaim: ClaimData = {
  personal: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    preferredContact: "email",
    referralSource: "",
    confirmAccurate: false,
  },
  scam: {
    category: "",
    platformName: "",
    incidentDate: "",
    incidentLocation: "",
    incidentHappened: "",
    description: "",
  },
  financial: {
    amountLost: "",
    currency: "",
    paymentMethod: "",
    transactionDate: "",
    transactionReference: "",
    recipientDetails: "",
    institution: "",
  },
  documents: [],
  consent: { accurate: false, terms: false, authorize: false },
};
