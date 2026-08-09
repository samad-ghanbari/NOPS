import { auth } from "@/auth";
import Header from "@/components/dashboard/Header";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="relative w-full h-full min-h-dvh bg-red-100 p-2">
      <Header />
      {children}
    </div>
  );
}
