"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ERROR_CODES, ERROR_MESSAGE } from "@/lib/constants/error";
import { ResultType } from "@/lib/types/Result";
import { Province } from "@/lib/generated/prisma/client";

export async function fetchProvinces(): Promise<ResultType<Province[]>> {
  const session = await auth();

  if (!session?.user)
    return {
      success: false,
      message: ERROR_MESSAGE[ERROR_CODES.UNAUTHENTICATED],
      data: [],
    };

  try {
    const records = await prisma.province.findMany({
      orderBy: [{ order: "asc" }, { provinceName: "asc" }],
    });

    return { success: true, message: null, data: records };
  } catch (error) {
    return {
      success: false,
      message: ERROR_MESSAGE[ERROR_CODES.DATABASE_ERROR],
      data: [],
    };
  }
}
