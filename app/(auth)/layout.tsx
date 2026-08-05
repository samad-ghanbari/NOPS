import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import bg from "@/assets/images/background/back3.jpg";

import type { Metadata } from "next";
import {
  GeistSans,
  Vazirmatn,
  Kalameh,
  Phamelo,
  Byekan,
} from "@/assets/fonts/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "NOPS | Login",
  description: "Network Operations System",
};

import DisableContextMenu from "@/components/DisableContextMenu";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session) {
    redirect("/home");
  }

  return (
    <DisableContextMenu>
      <div
        className={`flex min-h-dvh items-center justify-center bg-linear-to-br from-neutral-100 to-blue-100 select-none ${GeistSans.variable} ${Byekan.variable} ${Vazirmatn.variable} ${Kalameh.variable} ${Phamelo.variable}`}
      >
        <Image
          src={bg}
          alt="Cover"
          fill
          className="object-cover"
          draggable={false}
        />
        <div className="relative z-10">{children}</div>
      </div>
    </DisableContextMenu>
  );
}
