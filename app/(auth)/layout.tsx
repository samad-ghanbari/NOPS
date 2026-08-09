import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import bg from "@/assets/images/background/back3.jpg";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session) {
    redirect("/home");
  }

  return (
    <div
      className={`relative p-0 m-0 z-0 bg-linear-to-br from-neutral-100 to-blue-100 min-h-dvh`}
    >
      <Image
        src={bg}
        alt="Cover"
        fill
        className="object-cover pointer-events-none z-0"
        draggable={false}
      />

      <div className="relative z-10 min-h-dvh">{children}</div>
    </div>
  );
}
