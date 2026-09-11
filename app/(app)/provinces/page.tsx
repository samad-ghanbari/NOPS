"use client";

import { Province } from "@/lib/generated/prisma/browser";

import SearchBar from "@/components/province/SearchBar";
import ProvinceWidget from "@/components/province/ProvinceWidget";
import { Plus } from "lucide-react";
import BreadCrumb from "@/components/BreadCrumb";
import AddProvince from "@/components/province/modals/Add";
import { useEffect, useState } from "react";
import { fetchProvince } from "@/app/actions/provinces/fetchData";

export default function Provinces() {
  const [records, setRecords] = useState<Province[]>([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  useEffect(() => {
    fetchRrecords();
  }, []);

  function openAddDialog() {
    setOpenAddModal(true);
  }

  async function fetchRrecords() {
    setRecords(await fetchProvince());
  }

  async function updatePrrovince(data: Province) {}
  async function deleteProvince(id: string) {}

  return (
    <>
      <BreadCrumb items={[{ name: "گروه‌بندی/منطقه" }]} />
      <SearchBar />

      <button
        title="ایجاد منطقه جدید"
        className="cursor-pointer block mr-auto my-4"
        onClick={openAddDialog}
      >
        <Plus className="w-8 h-8 rounded p-1 font-bold text-sky-800 bg-gray-200 hover:text-sky-100 hover:bg-sky-700 text-xl" />
      </button>
      <div className=" flex flex-row flex-wrap justify-center items-stretch gap-2 m-8">
        {records.map((rec) => (
          <ProvinceWidget
            key={rec.id}
            data={rec}
            onDelete={deleteProvince}
            onUpdate={updatePrrovince}
          />
        ))}
      </div>

      <AddProvince
        openModal={openAddModal}
        setOpenModal={setOpenAddModal}
        onAdd={fetchRrecords}
      />
    </>
  );
}
