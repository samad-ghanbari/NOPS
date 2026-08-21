import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-neutral-100">
      <LoaderCircle className="h-10 w-10 animate-spin text-sky-700" />
    </div>
  );
}
