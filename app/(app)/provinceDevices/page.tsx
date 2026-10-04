"use client";

import { Province } from "@/lib/generated/prisma/browser";
import { useEffect, useState } from "react";
import { Loader2, Pencil, Plus, Trash } from "lucide-react";
import { ResultType } from "@/lib/types/Result";
import { fetchProvinces } from "@/app/actions/fetchProvinces";
import BreadCrumb from "@/components/BreadCrumb";
import Combobox from "@/components/ComboBox";
import Searchbar from "@/components/SearchBar";

export default function provinceDevices() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [provinceId, setProvinceId] = useState<string | null>(null);
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
    </>
  );
}
