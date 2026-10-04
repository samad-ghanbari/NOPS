"use server";

import { auth } from "@/auth";
import { ERROR_CODES, ERROR_MESSAGE } from "@/lib/constants/error";
import { prisma } from "@/lib/prisma";
import { ResultType } from "@/lib/types/Result";
import type { Group } from "@/lib/generated/prisma/client";

async function validate(data: Group): Promise<ResultType> {
  const session = await auth();

  if (!session?.user)
    return {
      success: false,
      message: ERROR_MESSAGE[ERROR_CODES.UNAUTHENTICATED],
    };

  return { success: true, message: null };
}

export default async function updateGroup(data: Group): Promise<ResultType> {
  const result = await validate(data);

  if (!result.success) return result;

  try {
    //delete grroup
    await prisma.group.delete({
      where: { id: data.id },
    });

    return { success: true, message: null };
  } catch (error) {
    return {
      success: false,
      message: ERROR_MESSAGE[ERROR_CODES.DATABASE_ERROR],
    };
  }
}
