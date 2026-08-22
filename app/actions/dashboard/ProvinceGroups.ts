"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { ERROR_CODES } from "@/lib/constants/error";
import { Group } from "@/lib/generated/prisma/client";

const schema = z.object({ provinceId: z.uuidv7() });

async function validate(provinceId: string) {
  const session = await auth();

  if (!session?.user) {
    throw new Error(ERROR_CODES.UNAUTHENTICATED);
  }

  const result = schema.safeParse({ provinceId });

  if (!result.success) throw new Error(ERROR_CODES.VALIDATION_ERROR);
}

export async function getGroupCount(provinceId: string) {
  validate(provinceId);

  const groupCount: number = await prisma.group.count({
    where: { provinceId: provinceId },
  });

  return groupCount;
}

//

export async function getGroups(provinceId: string) {
  validate(provinceId);

  const groups: Group[] = await prisma.group.findMany({
    where: { provinceId: provinceId },
    orderBy: [{ order: "asc" }, { groupName: "asc" }],
  });

  return groups;
}
