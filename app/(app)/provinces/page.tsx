"use client";

import { Province } from "@/lib/generated/prisma/browser";

import SearchBar from "@/components/province/SearchBar";
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
  const [modal, setModal] = useState<"create" | "update" | "delete" | null>(
    null,
  );

  useEffect(() => {
    fetchRrecords();
  }, []);

  async function fetchRrecords() {
    setRecords(await fetchProvince());
  }

  return (
    <>
      <BreadCrumb items={[{ name: "گروه‌بندی/منطقه" }]} />
      <SearchBar />

      <button
        title="ایجاد منطقه جدید"
        className="cursor-pointer block mr-auto my-4"
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

      <CreateProvince setModal={setModal} modal={modal} onAdd={fetchRrecords} />
      <UpdateProvince
        setModal={setModal}
        modal={modal}
        onUpdate={fetchRrecords}
        data={selectedProvince}
      />
      <DeleteProvince
        setModal={setModal}
        modal={modal}
        onDelete={fetchRrecords}
        data={selectedProvince}
      />
    </>
  );
}
