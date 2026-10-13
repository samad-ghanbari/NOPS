"use server";

import { auth } from "@/auth";
import { ERROR_CODES, ERROR_MESSAGE } from "@/lib/constants/error";
import { prisma } from "@/lib/prisma";
import { ResultType } from "@/lib/types/Result";
import {
  CreateRoleSchema,
  CreateRoleSchemaType,
} from "@/lib/validations/zod_role";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

async function validate(data: CreateRoleSchemaType): Promise<ResultType> {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      message: ERROR_MESSAGE[ERROR_CODES.UNAUTHENTICATED],
    };
  }

  const validated = CreateRoleSchema.safeParse(data);
  if (!validated.success) {
    return {
      success: false,
      message: ERROR_MESSAGE[ERROR_CODES.VALIDATION_ERROR],
    };
  }

  return { success: true, message: null };
}

export async function CreateRole(
  data: CreateRoleSchemaType,
): Promise<ResultType> {
  const result = await validate(data);
  if (!result.success) return result;

  try {
    await prisma.deviceRole.create({
      data: { provinceId: data.provinceId, role: data.role },
    });

    return { success: true, message: null };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { success: false, message: "نقش قبلا ثبت شده است." };
      }
    }

    return {
      success: false,
      message: ERROR_MESSAGE[ERROR_CODES.DATABASE_ERROR],
    };
  }
}
