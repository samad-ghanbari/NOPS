import LoginForm from "@/components/auth/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NOPS | Login",
  description: "Network Operations System",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-dvh items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}
