"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ERROR_CODES, ERROR_MESSAGE } from "@/lib/constants/error";
import { ResultType } from "@/lib/types/Result";

export async function deleteProvince(id: string): Promise<ResultType> {
  const session = await auth();

  if (!session?.user) {
    return {
      success: false,
      message: ERROR_MESSAGE[ERROR_CODES.UNAUTHENTICATED],
    };
  }

  if (!id) {
    return {
      success: false,
      message: ERROR_MESSAGE[ERROR_CODES.VALIDATION_ERROR],
    };
  }

  try {
    await prisma.province.delete({
      where: { id },
    });

    return {
      success: true,
      message: null,
    };
  } catch (error) {
    return {
      success: false,
      message: ERROR_MESSAGE[ERROR_CODES.DATABASE_ERROR],
    };
  }
}
