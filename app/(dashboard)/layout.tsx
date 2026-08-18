import { auth } from "@/auth";
import Base from "@/components/layout/Base";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  return <Base user={session?.user.name || null}>{children}</Base>;
}
