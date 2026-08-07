"use client";

import { useEffect, useState } from "react";
import refresh from "@/assets/images/refresh.png";

type Captcha = {
  image: string;
  token: string;
};

export default function CaptchaInput() {
  const [image, setImage] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    refreshCaptcha();
  }, []);

  async function refreshCaptcha() {
    const res: Response = await fetch("/api/captcha");
    const json: Captcha = await res.json();

    setImage(json.image);
    setToken(token);
  }
  return (
    <div className="flex items-center p-0">
      <button
        className="bg-trasparent h-12 w-10 cursor-pointer border-none"
        onClick={refreshCaptcha}
      >
        <img
          id="captchaImage"
          src={refresh.src}
          alt="کد امنیتی"
          className=" h-12 w-10"
        />
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
      <input
        type="text"
        name="captcha"
        className="h-12 w-25 rounded border border-blue-200 text-blue-900 placeholder:text-right focus:ring-2 focus:ring-blue-400 focus:outline-none"
        placeholder="کد امنیتی"
        data-token={token}
        required
      />
    </div>
  );
}
