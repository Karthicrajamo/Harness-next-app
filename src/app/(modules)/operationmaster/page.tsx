// "use client";

// import React, { useEffect } from "react";
// import { OperationMasterMiddlware } from "@/features/Thunks/auth/authThunks";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/redux/mainStore";

// const OperationMaster = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   const { operationData, loading, error } = useSelector(
//     (state: RootState) => state.authSlice,
//   );

//   useEffect(() => {
//     dispatch(OperationMasterMiddlware());
//   }, [dispatch]);

//   const rows = operationData?.data || [];

//   return (
//     <div className="p-4 sm:p-6 lg:p-8">
//       <h2 className="text-xl sm:text-2xl font-bold mb-6">Operation Master</h2>

//       {loading && <p className="text-blue-500">Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {/* ================= MOBILE CARD VIEW ================= */}
//       <div className="grid gap-4 sm:hidden">
//         {rows.map((row: any[], index: number) => (
//           <div key={index} className="bg-white shadow-md rounded-xl p-4 border">
//             <div className="space-y-2 text-sm">
//               <p>
//                 <span className="font-semibold">ID:</span> {row[0]}
//               </p>
//               <p>
//                 <span className="font-semibold">Code:</span> {row[1]}
//               </p>
//               <p>
//                 <span className="font-semibold">English:</span> {row[2]}
//               </p>
//               <p>
//                 <span className="font-semibold">Hindi:</span> {row[3]}
//               </p>
//               <p>
//                 <span className="font-semibold">Tamil:</span> {row[4]}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ================= TABLE VIEW (Tablet & Desktop) ================= */}
//       <div className="hidden sm:block overflow-x-auto shadow-lg rounded-xl border">
//         <table className="min-w-full text-sm text-left">
//           <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//             <tr>
//               <th className="px-6 py-3">ID</th>
//               <th className="px-6 py-3">Code</th>
//               <th className="px-6 py-3">English</th>
//               <th className="px-6 py-3">Hindi</th>
//               <th className="px-6 py-3">Tamil</th>
//             </tr>
//           </thead>

//           <tbody className="divide-y">
//             {rows.map((row: any[], index: number) => (
//               <tr key={index} className="hover:bg-gray-50 transition">
//                 <td className="px-6 py-4">{row[0]}</td>
//                 <td className="px-6 py-4">{row[1]}</td>
//                 <td className="px-6 py-4">{row[2]}</td>
//                 <td className="px-6 py-4">{row[3]}</td>
//                 <td className="px-6 py-4">{row[4]}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default OperationMaster;
import React from "react";

const OperationMaster=()=>{
  return(
    <div>
    OperationMaster
    </div>
  )
}
export default OperationMaster
