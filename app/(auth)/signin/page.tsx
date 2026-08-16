import SigninForm from "@/components/auth/SigninForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NOPS | Sign-in",
  description: "Network Operations System",
};

export default function SigninPage() {
  return (
    <div className="flex flex-col min-h-dvh items-center justify-center p-4">
      <SigninForm />
    </div>
  );
}
