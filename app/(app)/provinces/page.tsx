"use server";

import Provinces from "@/components/province/Provinces";
import { prisma } from "@/lib/prisma";

export default async function province() {
  const records = await prisma.province.findMany({
    orderBy: [{ order: "asc" }, { provinceName: "asc" }],
  });

  return <Provinces records={records} />;
}
