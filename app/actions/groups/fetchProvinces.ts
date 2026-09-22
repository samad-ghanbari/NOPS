"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ERROR_CODES, ERROR_MESSAGE } from "@/lib/constants/error";

export async function fetchProvince() {
  const session = await auth();

  if (!session?.user)
    return {
      success: false,
      message: ERROR_MESSAGE[ERROR_CODES.UNAUTHENTICATED],
    };

  try {
    const records = await prisma.province.findMany({
      orderBy: [{ order: "asc" }, { provinceName: "asc" }],
    });

    return { success: true };
  } catch (error) {
    throw new Error(ERROR_CODES.DATABASE_ERROR);
  }
}
