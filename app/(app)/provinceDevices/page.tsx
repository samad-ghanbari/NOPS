"use client";

import { Province } from "@/lib/generated/prisma/browser";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { ResultType } from "@/lib/types/Result";
import { fetchProvinces } from "@/app/actions/fetchProvinces";
import BreadCrumb from "@/components/BreadCrumb";
import Combobox from "@/components/ComboBox";
import { cn } from "@/lib/utils";
import DeviceTable from "@/components/provinceDevices/DeviceTable";

export default function provinceDevices() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [province, setProvince] = useState<Province | null>(null);

  useEffect(() => {
    //immediately invoked
    (async () => {
      const result: ResultType<Province[]> = await fetchProvinces();
      if (result.data) setProvinces(result.data);
    })();
  }, []);

  return (
    <>
      <BreadCrumb items={[{ name: " تجهیزات / تجهیزات منطقه" }]} />
      <Combobox
        items={provinces}
        selected={province}
        onSelect={setProvince}
        getValue={(prv) => prv.provinceName}
        className="w-full max-w-md mx-auto"
        label="انتخاب منطقه"
        placeholder="جستجوی منطقه"
        searchable={true}
      />

      <div
        dir="ltr"
        className={cn(
          "flex flex-row flex-wrap items-stretch justify-center gap-2 mt-8",
          !province && "hidden",
        )}
      >
        <p className="text-gray-500 text-right py-2 ml-auto">
          تجهیزات منطقه{" "}
          {province && (
            <span className="font-bold text-sky-700">
              {province.provinceName}
            </span>
          )}
        </p>
        <div className="basis-full h-0" />
        {/* devices */}
        {province && <DeviceTable province={province} />}
      </div>
    </>
  );
}
