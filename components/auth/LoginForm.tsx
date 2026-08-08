"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import {
  loginSchema,
  type LoginSchemaType,
} from "@/lib/validations/auth_login";
import { useRouter } from "next/navigation";

import Input from "@/components/Input";
import CaptchaInput from "../CaptchaInput";

import Image from "next/image";
import logo from "@/assets/images/logo/logo512.png";

import Divider from "@/components/Divider";
import { useEffect, useState, useRef } from "react";

export default function LoginForm() {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      natid: "",
      password: "",
      captcha: "",
    },
  });
  const natidField = form.register("natid");
  const passwordField = form.register("password");
  const captchaField = form.register("captcha");

  const refreshRef = useRef<(set_focus: boolean) => Promise<void>>(null);

  const router = useRouter();

  const [authError, setAuthError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  useEffect(() => {
    form.setFocus("natid");
  }, []);

  const onSubmit = async (data: LoginSchemaType) => {
    const result = await signIn("credentials", {
      natid: data.natid,
      password: data.password,
      captcha: data.captcha,
      captchaToken: captchaToken,
      redirect: false,
    });

    console.log("result:", result);
    setAuthError("");

    if (result?.error) {
      if (result.code === "CAPTCHA_INVALID") {
        setAuthError("عبارت امنیتی صحیح نمی‌باشد.");
        refreshRef?.current?.(true);
      } else if (result.code === "CRED_INVALID")
        setAuthError("کد ملی یا رمز عبور صحیح نمی‌باشد.");
    } else router.push("/home");
  };

  const NopsLabel: React.ReactNode = (
    <div className="text-center font-phamelo text-2xl text-muted-foreground">
      <span className="text-sky-600 font-bold">N</span>etwork{" "}
      <span className="text-sky-600 font-bold">OP</span>erations{" "}
      <span className="text-sky-600 font-bold">S</span>ystem
    </div>
  );

  return (
    <div className="w-95 bg-neutral-50/30 p-2 border border-gray-300 rounded-xl">
      <Image
        src={logo}
        alt="NOPS Logo"
        className="h-48 w-48 mx-auto"
        draggable={false}
      />

      <Divider label={NopsLabel} label_class="text-gray-600 text-center p-2" />

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="text"
            label="کد ملی"
            icon="name"
            placeholder="کد ملی خود را وارد نمایید"
            {...natidField}
            onChange={(e) => {
              natidField.onChange(e);
              setAuthError(null);
            }}
          />
        </div>

        <div className="space-y-2">
          <Input
            type="password"
            icon="password"
            label="رمز عبور"
            placeholder="رمز عبور خود را وارد نمایید"
            {...passwordField}
            onChange={(e) => {
              passwordField.onChange(e);
              setAuthError(null);
            }}
          />
        </div>

        <CaptchaInput
          token={captchaToken}
          setToken={setCaptchaToken}
          captcha_register={captchaField}
          refreshRef={refreshRef}
        />

        {/* errors */}
        {form.formState.errors.natid && (
          <p className="text-sm text-pink-700" dir="rtl">
            {form.formState.errors.natid.message}
          </p>
        )}
        {form.formState.errors.password && (
          <p className="text-sm text-pink-700" dir="rtl">
            {form.formState.errors.password.message}
          </p>
        )}

        {authError && (
          <p className="text-sm text-pink-700" dir="rtl">
            {authError}
          </p>
        )}

        <button
          className="w-full text-lg btn_class"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "در حال ورود..." : "ورود به سامانه"}
        </button>
      </form>
    </div>
  );
}
