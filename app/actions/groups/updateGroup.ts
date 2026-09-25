"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ERROR_CODES, ERROR_MESSAGE } from "@/lib/constants/error";
import { GroupSchema, type GroupSchemaType } from "@/lib/validations/zod_group";
import { ResultType } from "@/lib/types/Result";
import { Prisma } from "@/lib/generated/prisma/client";

async function validate(data: GroupSchemaType): Promise<ResultType> {
  const session = await auth();

  if (!session?.user)
    return {
      success: false,
      message: ERROR_MESSAGE[ERROR_CODES.UNAUTHENTICATED],
    };

  const validated = GroupSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      message: ERROR_MESSAGE[ERROR_CODES.VALIDATION_ERROR],
    };
  }

  return { success: true, message: null };
}

export async function updateGroup(data: GroupSchemaType): Promise<ResultType> {
  const result = await validate(data);

  if (!result.success) return result;

  try {
    //update grroup
    await prisma.group.update({
      where: { id: data.id },
      data: {
        groupName: data.groupName,
        deviceType: data.deviceType,
        vendor: data.vendor,
        OS: data.OS,
        order: data.order,
      },
    });

    return { success: true, message: null };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { success: false, message: "نام گروه قبلاً ثبت شده است." };
      }
    }
    return {
      success: false,
      message: ERROR_MESSAGE[ERROR_CODES.DATABASE_ERROR],
    };
  }
}
