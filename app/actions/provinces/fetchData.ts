"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ERROR_CODES } from "@/lib/constants/error";

async function validate() {
  const session = await auth();

  if (!session?.user) throw new Error(ERROR_CODES.UNAUTHENTICATED);
}

export async function fetchProvince(filter?: string) {
  await validate();

  try {
    const records = await prisma.province.findMany({
      where: filter?.trim()
        ? {
            provinceName: {
              contains: filter.trim(),
            },
          }
        : undefined,
      orderBy: [{ order: "asc" }, { provinceName: "asc" }],
    });

    return records;
  } catch (error) {
    throw new Error(ERROR_CODES.DATABASE_ERROR);
  }
}
