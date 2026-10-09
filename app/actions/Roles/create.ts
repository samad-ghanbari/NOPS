import { ERROR_CODES, ERROR_MESSAGE } from "@/lib/constants/error";
import { ResultType } from "@/lib/types/Result";
import { CreateRoleSchemaType } from "@/lib/validations/zod_role";

export async function CreateRole(
  data: CreateRoleSchemaType,
): Promise<ResultType> {
  return {
    success: false,
    message: ERROR_MESSAGE[ERROR_CODES.DATABASE_ERROR],
  };
}
