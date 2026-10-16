import { auth } from "@/auth";
import { ERROR_CODES, ERROR_MESSAGE } from "@/lib/constants/error";
import { Device } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { ResultType } from "@/lib/types/Result";

const PAGE_SIZE = 20;

async function validate(): Promise<ResultType> {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      message: ERROR_MESSAGE[ERROR_CODES.UNAUTHENTICATED],
    };
  }

  return { success: true, message: null };
}

export default async function fetchDevice({
  provinceId,
  cursor,
}: {
  provinceId: string;
  cursor?: string;
}): Promise<{ devices: Device[]; nextCursor: string | null }> {
  const result = await validate();
  if (!result.success) return { devices: [], nextCursor: null };

  try {
    const devices: Device[] = await prisma.device.findMany({
      where: { provinceId: provinceId },
      take: PAGE_SIZE + 1,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      orderBy: [{ roleId: "asc" }, { deviceName: "asc" }, { id: "asc" }],
    });

    const hasMore = devices.length > PAGE_SIZE;

    if (hasMore) {
      devices.pop();
    }

    return {
      devices,
      nextCursor: hasMore ? devices[devices.length - 1].id : null,
    };
  } catch (error) {
    return { devices: [], nextCursor: null };
  }
}
