"use server";

import { prisma } from "@/lib/prisma";
import Dashboard from "@/components/dashboard/Dashboard";
import type { Province } from "@/lib/generated/prisma/client"; // it is using prisma client which should be used on the server

export default async function DashboardPage() {
  const provinces: Province[] = await prisma.province.findMany({
    orderBy: [{ order: "asc" }, { provinceName: "asc" }],
  });

  return (
    <>
      <Dashboard provinces={provinces} />
    </>
  );
}
