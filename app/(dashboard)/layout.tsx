import { auth } from "@/auth";
import Base from "@/components/dashboard/Base";
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

  return <Base>{children}</Base>;
}
