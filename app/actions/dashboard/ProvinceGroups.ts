import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({ provinceId: z.uuidv7() });

export async function getGroupsInfo(proviceId: string) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }
}
