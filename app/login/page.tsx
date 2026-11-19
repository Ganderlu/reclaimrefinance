import SimplePage from "@/components/SimplePage";
import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "Login | ReclaimRefinance",
  description: "Log in to your ReclaimRefinance account.",
};

export default function LoginPage() {
  return (
    <SimplePage
      eyebrow="Client Portal"
      title="Log In to Your Account"
      description="Access your case dashboard and track your recovery progress."
    >
      <LoginForm />
    </SimplePage>
  );
}
