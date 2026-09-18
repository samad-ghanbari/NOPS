"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ERROR_CODES } from "@/lib/constants/error";
import {
  UpdateProvinceSchema,
  type UpdateProvinceSchemaType,
} from "@/lib/validations/zod_province";

async function validate(data: UpdateProvinceSchemaType) {
  const session = await auth();

  if (!session?.user) throw new Error(ERROR_CODES.UNAUTHENTICATED);

  const validated = UpdateProvinceSchema.safeParse(data);

  if (!validated.success) {
    throw new Error(ERROR_CODES.VALIDATION_ERROR);
  }

  return validated.data;
}

export async function updateProvince(data: UpdateProvinceSchemaType) {
  const validated_data = await validate(data);

  try {
    //update provinces
    await prisma.province.update({
      where: { id: validated_data.id },
      data: {
        provinceName: validated_data.provinceName,
        order: validated_data.order,
      },
    });

    return true;
  } catch (error) {
    throw new Error(ERROR_CODES.DATABASE_ERROR);
  }
}
