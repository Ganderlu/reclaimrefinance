import SimplePage from "@/components/SimplePage";
import ContactForm from "@/components/ContactForm";
import { Mail, MapPin } from "lucide-react";

export const metadata = {
  title: "Contact | ReclaimRefinance",
  description: "Get in touch with the ReclaimRefinance team.",
};

export default function ContactPage() {
  return (
    <SimplePage
      eyebrow="Contact Us"
      title="We're Here to Help"
      description="Have questions about your case or our services? Reach out to our team — we aim to respond promptly."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-sky-soft p-5 text-center">
          <Mail className="mx-auto text-emerald" size={24} />
          <p className="mt-3 text-sm font-semibold text-navy">Email</p>
          <p className="mt-1 text-sm text-slate-text">reclaimrefinance@hotmail.com</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-sky-soft p-5 text-center">
          <MapPin className="mx-auto text-emerald" size={24} />
          <p className="mt-3 text-sm font-semibold text-navy">International</p>
          <p className="mt-1 text-sm text-slate-text">Serving clients worldwide</p>
        </div>
      </div>

      <ContactForm />
    </SimplePage>
  );
}
