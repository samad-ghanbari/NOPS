"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import { loginSchema, type LoginSchemaType } from "@/lib/validations/login";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import Image from "next/image";
import logo from "@/assets/images/logo512.png";

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

  return (
    <Card className="w-95">
      <CardHeader className="space-y-4">
        <div className="flex justify-center">
          <Image src={logo} alt="NOPS Logo" className="h-48 w-48" />
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Network Operations System
        </p>
      </CardHeader>

      <CardContent>
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
            className="w-full bg-sky-400 border-blue-400 hover:bg-sky-600"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
