import { toPersianDigits } from "@/lib/utils";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 dark:bg-black">
      <h1 className="font-vazirmatn text-lg">
        Home Page Test page for سلام شب بخیر 123456789 vazir
        {new Intl.NumberFormat("fa-IR").format(123456789)}
        {toPersianDigits(1234.56789)}
      </h1>

      <h1 className="font-phamelo text-lg">
        Home Page Test page for home 12345 ۱۲۳۴۵
      </h1>

      <h1 className="font-byekan text-lg">
        Home Page Test page for home 12345 byekan ۱۲۳۴۵
      </h1>

      <h1 className="font-kalameh text-lg">
        Home Page Test page for سلام سلام شب بخیر 1234354 kalameh ۱۲۳۴۵
      </h1>

      <h1 className="font-geist text-lg">
        Home Page Test page for home 1234567 geist ۱۲۳۴۵
      </h1>

      <h1 className="text-lg">Home Page Test page for سلام سلام شب بخیر</h1>
    </div>
  );
}
