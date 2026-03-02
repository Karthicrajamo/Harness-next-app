// "use client";

// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import InputText from "../../../components/inputText";
// import Button from "../../../components/button";
// import LoginFooterSection from "./LoginFooterSection";
// // import DropdownCommon from "@/components/dropdownCommon";
// import DropdownCommon from "@/components/dropdownCommon"
// import DropDownCommon from "@/components/dropdownCommon";

// export default function LoginForm({
//   toast,
//   formik,
//   router,
//   companyOptions,
//   selectedCompanyId,
//   setSelectedCompanyId,
//   companies,
//   handleCompanyLogin,
// }: any) {
//   const [showCompanyModal, setShowCompanyModal] = useState(false);
//   const [department, setDepartment] = useState("");
//   const modalRef = useRef<HTMLDivElement>(null);

//   /* ================= SHOW MODAL IF MULTIPLE COMPANIES ================= */
//   useEffect(() => {
//     if (companies?.length > 1) {
//       setShowCompanyModal(true);
//     }
//   }, [companies]);

//   /* ================= CLICK OUTSIDE CLOSE ================= */
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         modalRef.current &&
//         !modalRef.current.contains(event.target as Node)
//       ) {
//         setShowCompanyModal(false);
//       }
//     };

//     if (showCompanyModal) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () =>
//       document.removeEventListener("mousedown", handleClickOutside);
//   }, [showCompanyModal]);

//   /* ================= ESC KEY CLOSE ================= */
//   useEffect(() => {
//     const handleEsc = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         setShowCompanyModal(false);
//       }
//     };

//     if (showCompanyModal) {
//       document.addEventListener("keydown", handleEsc);
//     }

//     return () => document.removeEventListener("keydown", handleEsc);
//   }, [showCompanyModal]);

//   return (
//     <>
//       {/* ================= LOGIN CARD ================= */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-6 h-full">
//         <div className="w-full max-w-sm">
//           <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">

//             {/* Header */}
//             <div className="hidden lg:block bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-center">
//               <div className="flex items-center justify-center space-x-3">
//                 <div className="relative w-12 h-12 bg-white/20 rounded-xl overflow-hidden">
//                   <Image
//                     src="/assets/harness.png"
//                     alt="Harness Logo"
//                     fill
//                     className="object-cover p-2"
//                     sizes="48px"
//                     priority
//                   />
//                 </div>
//                 <h1 className="text-xl font-bold text-white">
//                   Harness ERP
//                 </h1>
//               </div>
//             </div>

//             {/* Form */}
//             <form onSubmit={formik.handleSubmit} className="p-6">
//               {/* Username */}
//               <div className="mb-4">
//                 <label className="block text-xs font-semibold text-gray-700 mb-1">
//                   Username
//                 </label>
//                 <InputText
//                   name="username"
//                   value={formik.values.username}
//                   onChange={formik.handleChange}
//                   placeholder="Enter username"
//                   className="w-full p-2.5 border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
//                   disabled={formik.isSubmitting}
//                 />
//               </div>

//               {/* Password */}
//               <div className="mb-4">
//                 <label className="block text-xs font-semibold text-gray-700 mb-1">
//                   Password
//                 </label>
//                 <InputText
//                   name="password"
//                   type="password"
//                   value={formik.values.password}
//                   onChange={formik.handleChange}
//                   placeholder="Enter password"
//                   className="w-full p-2.5 border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
//                 />
//               </div>

//               {/* Reset Password */}
//               <div className="flex justify-end mb-4">
//                 <button
//                   type="button"
//                   onClick={() => router.push("/forgetPassword")}
//                   className="text-xs text-blue-600 hover:text-blue-800 font-medium"
//                 >
//                   Reset Password?
//                 </button>
//               </div>

//               {/* Login Button */}
//               <Button
//                 type="submit"
//                 label={
//                   formik.isSubmitting ? "Authenticating..." : "Login"
//                 }
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg"
//                 disabled={formik.isSubmitting}
//               />
//             </form>

//             <LoginFooterSection />
//           </div>
//         </div>
//       </div>

//       // {/* ================= COMPANY MODAL ================= */}
//       // {showCompanyModal && (
//       //   <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">

//           // <div
//           //   ref={modalRef}
//           //   className="relative bg-white w-[90%] sm:w-[420px] rounded-2xl shadow-2xl p-6 animate-fadeIn"
//           // >
//       //       {/* Close Button */}
//       //       <button
//       //         onClick={() => setShowCompanyModal(false)}
//       //         className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg"
//       //       >
//       //         ✕
//       //       </button>

//       //       <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
//       //         Select Company
//       //       </h2>

//       //       <DropdownCommon
//       //         options={companyOptions}
//       //         value={selectedCompanyId}
//       //         onChange={(val) => setSelectedCompanyId(val)}
//       //         placeholder="Choose company"
//       //         required
//       //       />

//             // <button
//             //   onClick={() => {
//             //     if (!selectedCompanyId) {
//             //       toast.current?.show({
//             //         severity: "warn",
//             //         summary: "Warning",
//             //         detail: "Please select a company",
//             //         life: 3000,
//             //       });
//             //       return;
//             //     }

//             //     handleCompanyLogin(selectedCompanyId);
//             //     setShowCompanyModal(false);
//             //   }}
//             //   className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition"
//             // >
//             //   Proceed
//             // </button>
//       //     </div>
//       //   </div>
//       // )}
//       {showCompanyModal && (

//         <div  className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
//          <div
//             ref={modalRef}
//             className="relative bg-white w-[90%] sm:w-[420px] rounded-2xl shadow-2xl p-6 animate-fadeIn"
//           >
//         <DropDownCommon
//         headerLabel="Select Company"
//         data={companyOptions}
//         placeholder="Select Department"
//         selectedData={selectedCompanyId}
//         handleChange={(item) => setSelectedCompanyId(item)}
//         isRequird={true}
//         errorMessage={!selectedCompanyId ? "Department is required" : ""}
//       />
//             <button
//               onClick={() => {
//                 if (!selectedCompanyId) {
//                   toast.current?.show({
//                     severity: "warn",
//                     summary: "Warning",
//                     detail: "Please select a company",
//                     life: 3000,
//                   });
//                   return;
//                 }

//                 handleCompanyLogin(selectedCompanyId);
//                 setShowCompanyModal(false);
//               }}
//               className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition"
//             >
//               Proceed
//             </button>
//       </div>

//     </div>
//       )}
//     </>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import InputText from "../../../components/inputText";
import Button from "../../../components/button";
import LoginFooterSection from "./LoginFooterSection";
import DropDownCommon from "@/components/dropdownCommon";

export default function LoginForm({
  toast,
  formik,
  router,
  companyOptions,
  selectedCompanyId,
  setSelectedCompanyId,
  companies,
  handleCompanyLogin,
  showCompanyModal,
  setShowCompanyModal,
  divisionOptions,
  selectedDivisionId,
  setSelectedDivisionId,
}: any) {
  const modalRef = useRef<HTMLDivElement>(null);

  /* ================= SHOW MODAL IF MULTIPLE COMPANIES ================= */
  // useEffect(() => {
  //   if (companies?.length > 1) {
  //     setShowCompanyModal(true);
  //   }
  // }, [companies]);

  /* ================= CLICK OUTSIDE CLOSE ================= */
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       modalRef.current &&
  //       !modalRef.current.contains(event.target as Node)
  //     ) {
  //       setShowCompanyModal(false);
  //     }
  //   };

  //   if (showCompanyModal) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   }

  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, [showCompanyModal]);

  /* ================= ESC KEY CLOSE ================= */
  // useEffect(() => {
  //   const handleEsc = (event: KeyboardEvent) => {
  //     if (event.key === "Escape") {
  //       setShowCompanyModal(false);
  //     }
  //   };

  //   if (showCompanyModal) {
  //     document.addEventListener("keydown", handleEsc);
  //   }

  //   return () => document.removeEventListener("keydown", handleEsc);
  // }, [showCompanyModal]);

  return (
    <>
      {/* ================= LOGIN CARD ================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-6 h-full">
        <div className="w-full max-w-sm">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
            {/* Header */}
            <div className="hidden lg:block bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-center">
              <div className="flex items-center justify-center space-x-3">
                <div className="relative w-12 h-12 bg-white/20 rounded-xl overflow-hidden">
                  <Image
                    src="/assets/harness.png"
                    alt="Harness Logo"
                    fill
                    className="object-cover p-2"
                    sizes="48px"
                    priority
                  />
                </div>
                <h1 className="text-xl font-bold text-white">Harness ERP</h1>
              </div>
            </div>

            <form onSubmit={formik.handleSubmit} className="p-6">
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Username
                </label>
                <InputText
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  placeholder="Enter username"
                  className="w-full p-2.5 border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
                  disabled={formik.isSubmitting}
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <InputText
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  placeholder="Enter password"
                  className="w-full p-2.5 border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
                />
              </div>

              {/* Reset Password */}
              <div className="flex justify-end mb-4">
                <button
                  type="button"
                  onClick={() => router.push("/forgetPassword")}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  Reset Password?
                </button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                label={formik.isSubmitting ? "Authenticating..." : "Login"}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg"
                disabled={formik.isSubmitting}
              />
            </form>

            <LoginFooterSection />
          </div>
        </div>
      </div>

      {showCompanyModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative bg-white w-[90%] sm:w-[420px] rounded-2xl shadow-2xl p-6 overflow-visible">
          <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-800">
          Select Company
        </h2>

        <button
          onClick={() => setShowCompanyModal(false)}
          className="text-gray-400 hover:text-gray-600 transition text-lg font-semibold"
        >
          ✕
        </button>
      </div>
            <div className="mb-2">
            <DropDownCommon
              headerLabel="Company"
              data={companyOptions}
              placeholder="Choose Company"
              selectedData={selectedCompanyId}
              handleChange={(item) => setSelectedCompanyId(item)}
              isRequird={true}
              errorMessage={!selectedCompanyId ? "Company is required" : ""}
            />
            </div>
            {divisionOptions?.length > 0 && (
              <DropDownCommon
                headerLabel="Division"
                data={divisionOptions}
                placeholder="Choose Division"
                selectedData={selectedDivisionId}
                handleChange={(item) => setSelectedDivisionId(item)}
                isRequird={true}
                errorMessage={!selectedDivisionId ? "Division is required" : ""}
              />
            )}
            <button
              onClick={() => {
                if (!selectedCompanyId) {
                  toast.current?.show({
                    severity: "warn",
                    summary: "Warning",
                    detail: "Please select a company",
                    life: 3000,
                  });
                  return;
                }

                handleCompanyLogin(selectedCompanyId);
                setShowCompanyModal(false);
              }}
              className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition"
            >
              Proceed
            </button>
          </div>
        </div>
      )}
    </>
  );
}
