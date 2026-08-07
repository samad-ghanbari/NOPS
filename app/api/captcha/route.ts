import { NextResponse } from "next/server";
import { getCaptchaJson } from "@/lib/captcha";

export async function GET() {
  const res: string = await getCaptchaJson();
  const json: { image: string; token: string } = JSON.parse(res);

  return NextResponse.json(json);
}
