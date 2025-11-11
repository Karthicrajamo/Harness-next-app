// src/components/NavBar.tsx
"use client";

import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();

  //   const quickActions = [
  //     {
  //       name: "Notifications",
  //       icon: "🔔",
  //       onClick: () => router.push("/notifications"),
  //     },
  //     {
  //       name: "Search",
  //       icon: "🔍",
  //       onClick: () => console.log("Search clicked"),
  //     },
  //     {
  //       name: "Settings",
  //       icon: "⚙️",
  //       onClick: () => router.push("/settings"),
  //     },
  //   ];

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      <div className="flex items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
      </div>

      <div className="flex items-center space-x-4">
        {/* {quickActions.map((action) => (
          <button
            key={action.name}
            onClick={action.onClick}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
          >
            <span className="text-xl">{action.icon}</span>
          </button>
        ))} */}

        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
            A
          </div>
          <button
            onClick={() => console.log("Logout clicked")}
            className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
