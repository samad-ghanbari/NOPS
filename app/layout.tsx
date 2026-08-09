import {
  GeistSans,
  Vazirmatn,
  Kalameh,
  Phamelo,
  Byekan,
} from "@/assets/fonts/fonts";
import "@/styles/globals.css";
import DisableContextMenu from "@/components/DisableContextMenu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        dir="rtl"
        className={`${GeistSans.variable} ${Byekan.variable} ${Vazirmatn.variable} ${Kalameh.variable} ${Phamelo.variable} p-0 m-0 min-h-full select-none w-full font-kalameh`}
      >
        <DisableContextMenu>{children}</DisableContextMenu>
      </body>
    </html>
  );
}
