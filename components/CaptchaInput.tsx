"use client";

import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { ShieldCheck, RefreshCw } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";

type Captcha = {
  image: string;
  token: string;
};

type InputProps = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  captcha_register: UseFormRegisterReturn<"captcha">;
  refreshRef: React.Ref<(set_focus: boolean) => void>;
};

export default function CaptchaInput({
  token,
  setToken,
  captcha_register,
  refreshRef,
}: InputProps) {
  const [image, setImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    refreshCaptcha(false);
  }, []);

  useImperativeHandle(refreshRef, () => refreshCaptcha);
  const inputRef = useRef<HTMLInputElement>(null);

  async function refreshCaptcha(set_focus: boolean = true) {
    const res: Response = await fetch("/api/captcha");
    const json: Captcha = await res.json();

    if (set_focus) inputRef.current?.focus();

    setImage(json.image);
    setToken(json.token);
  }

  return (
    <div className="flex items-center p-0 bg-transparent ">
      <button
        className="bg-trasparent h-12 w-10 cursor-pointer border-none p-2"
        onClick={() => refreshCaptcha()}
      >
        <RefreshCw className="w-full h-full text-sky-400 hover:text-sky-600 " />
      </button>
      <button
        className="bg-trasparent m-0.5 h-12 w-35 cursor-pointer border-none"
        onClick={() => refreshCaptcha()}
      >
        <img
          id="captchaImage"
          src={image}
          alt="کد امنیتی"
          className="h-12 w-35"
        />
      </button>

      <div className="relative flex-1 h-12 bg-transparent p-0 m-0" dir="rtl">
        <div className="pointer-events-none absolute inset-s-0 h-12 w-12 p-4 text-gray-500">
          <ShieldCheck className="h-full w-full" />
        </div>
        <input
          type="text"
          className="w-full input_class text-center"
          placeholder="کد امنیتی"
          data-token={token}
          autoComplete="off"
          {...captcha_register}
          ref={(element) => {
            captcha_register.ref(element);
            inputRef.current = element;
          }}
          required
        />
      </div>
    </div>
  );
}
