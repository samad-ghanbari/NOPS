import BreadCrumb from "@/components/BreadCrumb";

export default async function DashboardPage() {
  return (
    <>
      <BreadCrumb
        items={[
          { name: "گروه", href: "/group" },
          { name: "داشبورد", href: "/dashboard" },
          { name: "تجهیزات" },
        ]}
      />
      <h1>HOME</h1>
    </>
  );
}
