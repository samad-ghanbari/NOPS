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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${Byekan.variable} ${Vazirmatn.variable} ${Kalameh.variable} ${Phamelo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-vazirmatn">
        {children}
      </body>
    </html>
  );
}
