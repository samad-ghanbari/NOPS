"use client";

import logo from "@/assets/images/logo/logo128.png";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [loaded, setLoaded] = useState(false);

  const router = useRouter();
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="relative w-full h-dvh bg-pink-100 flex flex-col gap-4 items-center justify-center">
      <Image
        src={logo}
        alt=""
        className="fixed top-0 left-0 object-fill opacity-5 h-full w-full"
      />
      <Image src={logo} alt="NOPS" className="z-0 w-32 h-32" />
      <p
        className={cn(
          "text-pink-700 font-bold  transition-all duration-1000",
          loaded ? "text-3xl" : "text-8xl",
        )}
      >
        خطا ۴۰۴
      </p>
      <p className="text-xl text-pink-800">صفحه مورد نظر شما یافت نشد.</p>
      <button
        onClick={() => router.back()}
        className="z-10 flex flex-row items-center justify-center rounded bg-pink-700 px-8 py-2 text-white hover:bg-pink-800 my-8"
      >
        <ChevronRight className="w-5 h-5 text-white" /> بازگشت به صقحه قبل
      </button>
    </div>
  );
}
