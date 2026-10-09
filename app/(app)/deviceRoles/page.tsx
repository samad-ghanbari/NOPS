"use client";

import { DeviceRole, Province, Role } from "@/lib/generated/prisma/browser";
import { useEffect, useState } from "react";
import { Loader2, Pencil, Plus, Trash } from "lucide-react";
import { ResultType } from "@/lib/types/Result";
import { fetchProvinces } from "@/app/actions/fetchProvinces";
import BreadCrumb from "@/components/BreadCrumb";
import Combobox from "@/components/ComboBox";
import { cn } from "@/lib/utils";
import { fetchRoles } from "@/app/actions/DeviceRoles/fetchRoles";
import { CreateRole } from "@/app/actions/Roles/create";
import CreateDeviceRole from "@/components/deviceRoles/Modals/Create";

export default function deviceRoles() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [provinceId, setProvinceId] = useState<string | null>(null);
  const selectedProvince: Province | undefined = provinces.find(
    (province) => province.id === provinceId,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [roles, setRoles] = useState<DeviceRole[]>([]);

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

  useEffect(() => {
    loadRoles();
  }, [provinceId]);

  async function loadRoles() {
    const result: ResultType<DeviceRole[]> = await fetchRoles(provinceId);
    if (result.success) if (result.data) setRoles(result.data);
  }

  return (
    <>
      <BreadCrumb items={[{ name: "تجهیزات / نقش تجهیزات" }]} />
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

      {provinceId && (
        <button
          title="افزودن نقش جدید"
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
          نقش تجهیزات منطقه{" "}
          {selectedProvince && (
            <span className="font-bold text-sky-700">
              {selectedProvince.provinceName}
            </span>
          )}
        </p>
        <div className="basis-full h-0" />
        {/* roles */}
        {roles.map((item) => {
          return (
            <div
              key={item.id}
              className=" group w-fit min-w-32 border border-gray-300 rounded inline-block"
            >
              <p
                className="p-2 text-gray-600 group-hover:text-sky-700 font-bold text-center bg-neutral-50 border-b border-gray-300"
                dir="rtl"
              >
                {item.role}
              </p>
              <div className="relative p-1 bottom-0 h-8 bg-gray-200 flex flex-row items-center justify-start gap-1 border-t border-gray-300">
                <button
                  title="ویرایش نقش"
                  className="cursor-pointer  hover:bg-green-700 hover:text-white text-green-700 p-1 rounded"
                  onClick={() => {}}
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  title="حذف نقش"
                  className="cursor-pointer hover:bg-red-500 hover:text-white text-red-500 p-1 rounded"
                  onClick={() => {}}
                >
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {provinceId && (
        <CreateDeviceRole
          provinceId={provinceId}
          modal={modal}
          setModal={setModal}
          onSuccess={loadRoles}
        />
      )}
    </>
  );
}
