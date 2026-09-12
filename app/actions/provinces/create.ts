"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ERROR_CODES } from "@/lib/constants/error";
import {
  ProvinceSchema,
  type ProvinceSchemaType,
} from "@/lib/validations/zod_province";

async function validate(data: ProvinceSchemaType) {
  const session = await auth();

  if (!session?.user) throw new Error(ERROR_CODES.UNAUTHENTICATED);

  const validated = ProvinceSchema.safeParse(data);

  if (!validated.success) {
    throw new Error(ERROR_CODES.VALIDATION_ERROR);
  }
}

export async function createProvince(data: ProvinceSchemaType) {
  await validate(data);

  try {
    if (data.autoOrder) {
      // get last order
      const result = await prisma.province.aggregate({ _max: { order: true } });
      data.provinceOrder = (result._max.order ?? 0) + 1;
    }

    //insert provinces
    const res = await prisma.province.create({
      data: { provinceName: data.provinceName, order: data.provinceOrder },
    });

    return true;
  } catch (error) {
    throw new Error(ERROR_CODES.DATABASE_ERROR);
  }
}
