"use client";

import { Province } from "@/lib/generated/prisma/browser";

import SearchBar from "@/components/SearchBar";
import ProvinceWidget from "@/components/province/ProvinceWidget";
import { Plus } from "lucide-react";
import BreadCrumb from "@/components/BreadCrumb";
import CreateProvince from "@/components/province/modals/Create";
import UpdateProvince from "@/components/province/modals/Update";
import DeleteProvince from "@/components/province/modals/Delete";
import { useEffect, useState } from "react";
import { fetchProvince } from "@/app/actions/provinces/fetchData";

export default function Provinces() {
  const [records, setRecords] = useState<Province[]>([]);

  const [selectedProvince, selectProvince] = useState<Province | null>(null);
  const [search, setSearch] = useState<string>("");
  const [modal, setModal] = useState<"create" | "update" | "delete" | null>(
    null,
  );

  useEffect(() => {
    setSearch("");
    fetchRrecords(search);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRrecords(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  async function fetchRrecords(search: string) {
    setRecords(await fetchProvince(search));
  }

  return (
    <>
      <BreadCrumb items={[{ name: "گروه‌بندی/منطقه" }]} />
      <SearchBar value={search} onChange={setSearch} />

      <button
        title="ایجاد منطقه جدید"
        className="cursor-pointer block mr-auto my-4 shadow-md shadow-gray-500"
        onClick={() => {
          setModal("create");
        }}
      >
        <Plus className="w-8 h-8 rounded p-1 font-bold text-sky-800 bg-gray-200 hover:text-sky-100 hover:bg-sky-700 text-xl" />
      </button>
      <div className=" flex flex-row flex-wrap justify-center items-stretch gap-2 m-8">
        {records.map((rec) => (
          <ProvinceWidget
            key={rec.id}
            data={rec}
            setModal={setModal}
            selectProvince={selectProvince}
          />
        ))}
      </div>

      <CreateProvince
        setModal={setModal}
        modal={modal}
        onAdd={() => fetchRrecords(search)}
      />
      <UpdateProvince
        setModal={setModal}
        modal={modal}
        onUpdate={() => fetchRrecords(search)}
        data={selectedProvince}
      />
      <DeleteProvince
        setModal={setModal}
        modal={modal}
        onDelete={() => fetchRrecords(search)}
        data={selectedProvince}
      />
    </>
  );
}
