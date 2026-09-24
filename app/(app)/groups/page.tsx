"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Group, Province } from "@/lib/generated/prisma/browser";
import { fetchProvinces } from "@/app/actions/groups/fetchProvinces";
import { ResultType } from "@/lib/types/Result";
import ProvinceComboBox from "@/components/group/ProvinceCBox";
import BreadCrumb from "@/components/BreadCrumb";
import Searchbar from "@/components/SearchBar";
import { Loader2, Pencil, Plus, Trash } from "lucide-react";
import { fetchGroups } from "@/app/actions/groups/fetchGroups";
import CreateGroupModal from "@/components/group/modals/Create";
import UpdateGroupModal from "@/components/group/modals/Update";
import DeleteGroupModal from "@/components/group/modals/Delete";
import Combobox from "@/components/ComboBox";

export default function groups() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [provinceId, setProvinceId] = useState<string | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [search, setSearch] = useState<string>("");
  const [selectedGroup, selectGroup] = useState<Group | null>(null);
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
    if (!provinceId) {
      setGroups([]);
      return;
    }

    loadGroups();
  }, [provinceId]);

  const loadGroups = async () => {
    setLoading(true);
    const res: ResultType<Group[]> = await fetchGroups(provinceId);
    if (res.data) setGroups(res.data);
    setLoading(false);
  };

  const selectedProvince: Province | undefined = provinces.find(
    (province) => province.id === provinceId,
  );

  return (
    <>
      <BreadCrumb items={[{ name: "گروه‌بندی/گروه" }]} />
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

      <Searchbar value={search} onChange={setSearch} className="my-2" />

      <button
        title="ایجاد گروه جدید"
        className="cursor-pointer block mr-auto my-4 border-sky-200 border rounded"
        onClick={() => {
          setModal("create");
        }}
      >
        <Plus className="w-8 h-8 rounded p-1 font-bold text-white bg-sky-700  hover:bg-sky-900 text-xl" />
      </button>

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
          گروه‌های منطقه{" "}
          {selectedProvince && (
            <span className="font-bold text-sky-700">
              {selectedProvince.provinceName}
            </span>
          )}
        </p>
        <div className="basis-full h-0" />
        {/* groups */}

        {groups.map((grp) => {
          return (
            <div
              key={grp.id}
              className=" group w-fit border border-gray-300 rounded inline-block"
            >
              <p className="p-2 text-gray-600 group-hover:text-sky-700 font-bold text-center bg-gray-200 border-b border-gray-300">
                {grp.groupName}
              </p>
              <p className="p-4 text-gray-800 text-sm text-center border-b border-gray-300 last:border-b-0 bg-neutral-50 group-hover:bg-white">
                Vendor: {grp.vendor}
              </p>
              <p className="p-4 text-gray-800 text-sm text-center bg-neutral-50 group-hover:bg-white">
                type: {grp.deviceType}
              </p>
              <div className="relative p-1 bottom-0 h-8 bg-gray-200 flex flex-row items-center justify-start gap-1 border-t border-gray-300">
                <button
                  title="ویرایش گروه"
                  className="cursor-pointer  hover:bg-green-700 hover:text-white text-green-700 p-1 rounded"
                  onClick={() => {
                    selectGroup(grp);
                    setModal("update");
                  }}
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  title="حذف گروه"
                  className="cursor-pointer hover:bg-red-500 hover:text-white text-red-500 p-1 rounded"
                  onClick={() => {
                    selectGroup(grp);
                    setModal("delete");
                  }}
                >
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <CreateGroupModal
        modal={modal}
        province={selectedProvince}
        setModal={setModal}
        onSuccess={() => {
          loadGroups();
        }}
      />

      <UpdateGroupModal
        modal={modal}
        setModal={setModal}
        data={selectedGroup}
        onSuccess={() => {
          loadGroups();
        }}
      />

      <DeleteGroupModal
        modal={modal}
        setModal={setModal}
        data={selectedGroup}
        onSuccess={() => {
          loadGroups();
        }}
      />
    </>
  );
}
