"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import { loginSchema, type LoginSchemaType } from "@/lib/validations/login";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import Image from "next/image";
import logo from "@/assets/images/logo/logo512.png";

import Divider from "@/components/Divider";

export default function LoginForm() {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      natid: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: LoginSchemaType) => {
    const result = await signIn("credentials", {
      natid: data.natid,
      password: data.password,
      redirect: false,
    });

    router.push("/home");
  };

  const NopsLabel: React.ReactNode = (
    <p className="text-center font-vazirmatn text-xl text-muted-foreground mb-4 ">
      <span className="text-sky-600">N</span>etwork{" "}
      <span className="text-sky-600">OP</span>erations{" "}
      <span className="text-sky-600">S</span>ystem
    </p>
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
          <Label>National ID</Label>

          <Input
            type="text"
            placeholder="Enter national ID"
            {...form.register("natid")}
          />
          {form.formState.errors.natid && (
            <p className="text-sm text-red-800">
              {form.formState.errors.natid.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Password</Label>

          <Input
            type="password"
            placeholder="Enter Password"
            {...form.register("password")}
          />
          {form.formState.errors.password && (
            <p className="text-sm text-red-800">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        <Button
          className="w-full bg-sky-400 border-blue-400 hover:bg-sky-600 mt-12"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
