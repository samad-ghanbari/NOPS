"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Group, Province } from "@/lib/generated/prisma/browser";
import { fetchProvinces } from "@/app/actions/groups/fetchProvinces";
import { ResultType } from "@/lib/types/Result";
import ProvinceComboBox from "@/components/group/ProvinceCBox";

export default function province() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [provinceId, setProvinceId] = useState<string | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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

    const loadGroups = async () => {};

    loadGroups();
  }, [provinceId]);

  return (
    <>
      <ProvinceComboBox
        provinces={provinces}
        value={provinceId}
        onChange={setProvinceId}
      />
    </>
  );
}
