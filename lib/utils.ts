import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toPersianDigits(value: string | number) {
  return value
    .toString()
    .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)])
    .replace(/\./g, "/");
}
