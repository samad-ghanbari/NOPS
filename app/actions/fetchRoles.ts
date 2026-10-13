"use server";
import { auth } from "@/auth";
import { ERROR_CODES, ERROR_MESSAGE } from "@/lib/constants/error";
import { DeviceRole } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { ResultType } from "@/lib/types/Result";

export async function fetchRoles(
  provinceId: string | null,
  filter?: string,
): Promise<ResultType<DeviceRole[]>> {
  if (provinceId === null) return { success: true, message: null, data: [] };

  const session = await auth();
  if (!session?.user)
    return {
      success: false,
      message: ERROR_MESSAGE[ERROR_CODES.UNAUTHENTICATED],
      data: [],
    };

  try {
    const records: DeviceRole[] = await prisma.deviceRole.findMany({
      where: {
        provinceId: provinceId,
        role: filter?.trim()
          ? {
              contains: filter.trim(),
              mode: "insensitive",
            }
          : undefined,
      },

      orderBy: [{ role: "asc" }],
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
