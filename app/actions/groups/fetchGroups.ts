"use server";
import { auth } from "@/auth";
import { ERROR_CODES, ERROR_MESSAGE } from "@/lib/constants/error";
import { Group } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { ResultType } from "@/lib/types/Result";

export async function fetchGroups(
  provinceId: string | null,
): Promise<ResultType<Group[]>> {
  if (provinceId === null) return { success: true, message: null, data: [] };

  const session = await auth();
  if (!session?.user)
    return {
      success: false,
      message: ERROR_MESSAGE[ERROR_CODES.UNAUTHENTICATED],
      data: [],
    };

  try {
    const records: Group[] = await prisma.group.findMany({
      where: { provinceId: provinceId },
      orderBy: [{ order: "asc" }, { groupName: "asc" }],
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
