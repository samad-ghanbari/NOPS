"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ERROR_CODES, ERROR_MESSAGE } from "@/lib/constants/error";
import {
  CreateGroupSchema,
  type CreateGroupSchemaType,
} from "@/lib/validations/zod_group";
import { ResultType } from "@/lib/types/Result";
import { Prisma } from "@/lib/generated/prisma/client";

async function validate(data: CreateGroupSchemaType): Promise<ResultType> {
  const session = await auth();

  if (!session?.user) {
    return {
      success: false,
      message: ERROR_MESSAGE[ERROR_CODES.UNAUTHENTICATED],
    };
  }

  const validated = CreateGroupSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      message: ERROR_MESSAGE[ERROR_CODES.VALIDATION_ERROR],
    };
  }

  return {
    success: true,
    message: null,
  };
}

export async function createGroup(data: CreateGroupSchemaType) {
  const validated_data = await validate(data);
  if (!validated_data.success) return validated_data;

  try {
    if (data.autoOrder) {
      // get last order
      const result = await prisma.group.aggregate({ _max: { order: true } });
      data.order = (result._max.order ?? 0) + 1;
    }

    //insert group
    const res = await prisma.group.create({
      data: {
        provinceId: data.provinceId,
        groupName: data.groupName,
        deviceType: data.deviceType,
        vendor: data.vendor,
        OS: data.OS,
        order: data.order,
      },
    });

    return {
      success: true,
      message: null,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          success: false,
          message: "نام گروه قبلاً ثبت شده است.",
        };
      }
    }

    return {
      success: false,
      message: ERROR_MESSAGE[ERROR_CODES.DATABASE_ERROR],
    };
  }
}
