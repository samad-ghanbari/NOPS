import BreadCrumb from "@/components/BreadCrumb";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const provinces = await prisma.province.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <>
      <BreadCrumb items={[]} />
    </>
  );
}
