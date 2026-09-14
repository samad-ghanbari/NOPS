"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ERROR_CODES } from "@/lib/constants/error";

export async function deleteProvince(id: string) {
  const session = await auth();

  if (!session?.user) {
    throw new Error(ERROR_CODES.UNAUTHENTICATED);
  }

  if (!id) {
    throw new Error(ERROR_CODES.VALIDATION_ERROR);
  }

  try {
    await prisma.province.delete({
      where: { id },
    });

    return true;
  } catch (error) {
    throw new Error(ERROR_CODES.DATABASE_ERROR);
  }
}
