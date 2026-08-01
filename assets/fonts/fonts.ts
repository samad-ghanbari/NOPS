import localFont from "next/font/local";
import { Geist } from "next/font/google";

export const GeistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const Vazirmatn = localFont({
  src: [
    {
      path: "./Vazirmatn-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./Vazirmatn-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Vazirmatn-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const Kalameh = localFont({
  src: [
    {
      path: "./Kalameh-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Kalameh-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-kalameh",
  display: "swap",
});

export const Byekan = localFont({
  src: [
    {
      path: "./BYekan-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./BYekan-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-byekan",
  display: "swap",
});

export const Phamelo = localFont({
  src: [
    {
      path: "./Phamelo.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-phamelo",
  display: "swap",
});
