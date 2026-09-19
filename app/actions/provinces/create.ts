"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ERROR_CODES, ERROR_MESSAGE } from "@/lib/constants/error";
import {
  ProvinceSchema,
  type ProvinceSchemaType,
} from "@/lib/validations/zod_province";
import { ResultType } from "@/lib/types/Result";
import { Prisma } from "@/lib/generated/prisma/client";

async function validate(data: ProvinceSchemaType): Promise<ResultType> {
  const session = await auth();

  if (!session?.user) {
    return {
      success: false,
      message: ERROR_MESSAGE[ERROR_CODES.UNAUTHENTICATED],
    };
  }

  const validated = ProvinceSchema.safeParse(data);

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

export async function createProvince(data: ProvinceSchemaType) {
  const validated_data = await validate(data);
  if (!validated_data.success) return validated_data;

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

    return {
      success: true,
      message: null,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          success: false,
          message: "نام منطقه قبلاً ثبت شده است.",
        };
      }
    }

    return {
      success: false,
      message: ERROR_MESSAGE[ERROR_CODES.DATABASE_ERROR],
    };
  }
}
