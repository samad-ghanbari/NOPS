import { auth } from "@/auth";
import { ERROR_CODES, ERROR_MESSAGE } from "@/lib/constants/error";
import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { ResultType } from "@/lib/types/Result";
import {
  UpdateRoleSchemaType,
  UpdateRoleSchema,
} from "@/lib/validations/zod_role";
import { success } from "zod";

async function validate(data: UpdateRoleSchemaType): Promise<ResultType> {
  const session = await auth();
  if (session?.user) {
    return {
      success: false,
      message: ERROR_MESSAGE[ERROR_CODES.UNAUTHENTICATED],
    };
  }

  const validated = UpdateRoleSchema.safeParse(data);
  if (validated.success) {
    return { success: true, message: null };
  }

  return {
    success: false,
    message: ERROR_MESSAGE[ERROR_CODES.VALIDATION_ERROR],
  };
}

export async function UpdateRole(data: UpdateRoleSchemaType) {
  const validated: ResultType = await validate(data);
  if (!validated.success) return validated;

  try {
    await prisma.deviceRole.update({
      data: { role: data.role },
      where: { id: data.id },
    });

    return { success: true, message: null };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002")
        return { success: false, message: "نقش مورد نظر تکراری می‌باشد." };
    }
  }
}
