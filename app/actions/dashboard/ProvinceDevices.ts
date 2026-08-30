"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { ERROR_CODES } from "@/lib/constants/error";

const schema = z.object({ provinceId: z.uuidv7() });

async function validate(provinceId: string) {
  const session = await auth();

  if (!session?.user) {
    throw new Error(ERROR_CODES.UNAUTHENTICATED);
  }

  const result = schema.safeParse({ provinceId });

  if (!result.success) throw new Error(ERROR_CODES.VALIDATION_ERROR);
}

export async function getDevices(
  provinceId: string,
  groupId: string | null = null,
) {
  validate(provinceId);

  const devices = await prisma.device.findMany({
    where: {
      provinceId,
      ...(groupId !== null && { groups: { some: { groupId } } }),
    },
    include: {
      role: true,
      province: true,
      groups: { include: { group: true } },
    },
    orderBy: [{ role: { role: "asc" } }, { deviceName: "asc" }],
  });

  return devices;
}

export async function getDeviceCount(
  provinceId: string,
  groupId: string | null = null,
) {
  validate(provinceId);

  const cnt: number = await prisma.device.count({
    where: {
      provinceId,
      ...(groupId !== null && { groups: { some: { groupId } } }),
    },
  });
  return cnt;
}
