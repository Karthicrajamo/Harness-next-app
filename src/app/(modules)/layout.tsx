// "use client";

// import { useState, ReactNode } from "react";
// import { useRouter } from "next/navigation";
// import Sidebar from "@/components/sidebar";
// import Navbar from "@/components/navbar";

// interface DashboardLayoutProps {
//   children: ReactNode;
// }

// export default function DashboardLayout({ children }: DashboardLayoutProps) {
//   const [collapsed, setCollapsed] = useState(false);
//   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

//   const router = useRouter();

//   const handleLogoutClick = () => {
//     console.log("Logout clicked");
//     localStorage.removeItem("login");
//     router.push("/login");
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar
//         collapsed={collapsed}
//         setCollapsed={setCollapsed}
//         onLogoutClick={handleLogoutClick}
//         showLogoutConfirm={showLogoutConfirm}
//         setShowLogoutConfirm={setShowLogoutConfirm}
//       />

//       <div className="flex flex-1">
//         <Sidebar collapsed={collapsed} />
//         {collapsed && (
//           <div
//             onClick={() => setCollapsed(false)}
//             className="fixed inset-0 bg-black/40 z-40 md:hidden"
//           />
//         )}
// <main
//   className={`
//     flex-1 p-4 sm:p-6
//     pt-24 md:pt-14
//     transition-all duration-300 ease-in-out
//     bg-blue-50
//     ${collapsed ? "md:ml-64" : "md:ml-0"}
//   `}
// >
//   {children}
// </main>
//       </div>
//       {showLogoutConfirm && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <p className="mb-4">Are you sure you want to logout?</p>
//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setShowLogoutConfirm(false)}
//                 className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleLogoutClick}
//                 className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const router = useRouter();

  const handleLogoutClick = () => {
    localStorage.removeItem("login");
    router.push("/login");
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onLogoutClick={handleLogoutClick}
        showLogoutConfirm={showLogoutConfirm}
        setShowLogoutConfirm={setShowLogoutConfirm}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar collapsed={collapsed} />

        {collapsed && (
          <div
            onClick={() => setCollapsed(false)}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          />
        )}

        <main
          className={`
            flex-1
            overflow-y-auto
            p-4 sm:p-6
            pt-24 md:pt-20
            transition-all duration-300 ease-in-out
           
            ${collapsed ? "md:ml-50" : "md:ml-0"}
          `}
        >
          {children}
        </main>
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutClick}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
