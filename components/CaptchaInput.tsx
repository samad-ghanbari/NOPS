"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, RefreshCw } from "lucide-react";

type Captcha = {
  image: string;
  token: string;
};

export default function CaptchaInput() {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    refreshCaptcha();
  }, []);

  async function refreshCaptcha() {
    const res: Response = await fetch("/api/captcha");
    const json: Captcha = await res.json();

    setImage(json.image);
    setToken(json.token);
  }
  return (
    <div className="flex items-center p-0 bg-transparent ">
      <button
        className="bg-trasparent h-12 w-10 cursor-pointer border-none p-2"
        onClick={refreshCaptcha}
      >
        <RefreshCw className="w-full h-full text-sky-400 hover:text-sky-600 " />
      </button>
      <button
        className="bg-trasparent m-0.5 h-12 w-35 cursor-pointer border-none"
        onClick={refreshCaptcha}
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
          name="captcha"
          className="w-full input_class text-center"
          placeholder="کد امنیتی"
          data-token={token}
          autoComplete="off"
          required
        />
      </div>
    </div>
  );
}
