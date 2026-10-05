"use client";

import { Province } from "@/lib/generated/prisma/browser";
import { useEffect, useState } from "react";
import { Loader2, Pencil, Plus, Trash } from "lucide-react";
import { ResultType } from "@/lib/types/Result";
import { fetchProvinces } from "@/app/actions/fetchProvinces";
import BreadCrumb from "@/components/BreadCrumb";
import Combobox from "@/components/ComboBox";
import Searchbar from "@/components/SearchBar";
import { cn } from "@/lib/utils";

export default function provinceDevices() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [provinceId, setProvinceId] = useState<string | null>(null);
  const selectedProvince: Province | undefined = provinces.find(
    (province) => province.id === provinceId,
  );
  const [loading, setLoading] = useState<boolean>(false);

  const [search, setSearch] = useState<string>("");
  const [modal, setModal] = useState<"create" | "update" | "delete" | null>(
    null,
  );

  useEffect(() => {
    const loadProvinces = async () => {
      const result: ResultType<Province[]> = await fetchProvinces();
      if (result.data) setProvinces(result.data);
    };
    loadProvinces();
  }, []);

  return (
    <>
      <BreadCrumb items={[{ name: "مدیریت عملیات / تجهیزات منطقه" }]} />
      <Combobox
        items={provinces}
        value={provinceId}
        onChange={setProvinceId}
        getLabel={(province) => province.provinceName}
        getValue={(province) => province.id}
        className="w-full max-w-md mx-auto"
        placeholder="جستجوی منطقه"
        searchable={true}
      />

      <Searchbar
        value={search}
        onChange={setSearch}
        placeholder="جستجوی تجهیز..."
        className="my-2"
      />

      {provinceId && (
        <button
          title="افزودن تجهیز جدید"
          className="cursor-pointer block mr-auto my-4 border-sky-200 border rounded"
          onClick={() => {
            setModal("create");
          }}
        >
          <Plus className="w-8 h-8 rounded p-1 font-bold text-white bg-sky-700  hover:bg-sky-900 text-xl" />
        </button>
      )}

      {loading && (
        <Loader2 className="h-12 w-12 mx-auto animate-spin text-sky-600" />
      )}

      <div
        dir="ltr"
        className={cn(
          "flex flex-row flex-wrap items-stretch justify-center gap-2 mt-8",
          !selectedProvince && "hidden",
        )}
      >
        <p className="text-gray-500 text-right py-2 ml-auto">
          تجهیزات منطقه{" "}
          {selectedProvince && (
            <span className="font-bold text-sky-700">
              {selectedProvince.provinceName}
            </span>
          )}
        </p>
        <div className="basis-full h-0" />
        {/* devices */}
      </div>
    </>
  );
}
