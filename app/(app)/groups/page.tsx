"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Group, Province } from "@/lib/generated/prisma/browser";

export default function province() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [provinceId, setProvinceId] = useState<string | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {}, []);

  return <div> groups</div>;
}
