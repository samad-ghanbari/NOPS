"use server";

import { auth } from "@/auth";
import { ERROR_CODES, ERROR_MESSAGE } from "@/lib/constants/error";
import { prisma } from "@/lib/prisma";
import { ResultType } from "@/lib/types/Result";
import {
  UpdateRoleSchema,
  UpdateRoleSchemaType,
} from "@/lib/validations/zod_role";

async function validate(data: UpdateRoleSchemaType): Promise<ResultType> {
  const session = await auth();
  if (!session?.user)
    return {
      success: false,
      message: ERROR_MESSAGE[ERROR_CODES.UNAUTHENTICATED],
    };

  const validated = UpdateRoleSchema.safeParse(data);
  if (validated.success) return { success: true, message: null };

  return {
    success: false,
    message: ERROR_MESSAGE[ERROR_CODES.VALIDATION_ERROR],
  };
}

export async function deleteDeviceRole(
  data: UpdateRoleSchemaType,
): Promise<ResultType> {
  const result = await validate(data);
  if (!result.success) return result;

  try {
    await prisma.deviceRole.delete({ where: { id: data.id } });
    return { success: true, message: null };
  } catch (error) {
    return {
      success: false,
      message: ERROR_MESSAGE[ERROR_CODES.DATABASE_ERROR],
    };
  }
}
