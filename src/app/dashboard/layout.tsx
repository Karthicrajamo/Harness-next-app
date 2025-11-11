// /src/app/dashboard/layout.tsx
import SideBar from "@/components/SideBar";
import NavBar from "@/components/NavBar";

console.log("DashboardLayout is loading...");

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("DashboardLayout is rendering");

  return (
    <div className="flex h-screen bg-gray-50">
      <SideBar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <NavBar />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
