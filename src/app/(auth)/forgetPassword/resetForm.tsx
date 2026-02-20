"use client";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { LoginMiddleWare } from "@/features/Thunks/auth/authThunks";
import { AppDispatch } from "@/redux/mainStore";
import InputText from "../../../components/inputText";
import Button from "../../../components/button";
import Image from "next/image";
import LoginFooterSection from "../login/LoginFooterSection";

export default function ResetForm({ toast, formik, router }: any) {
  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-6 h-full">
      <div className="w-full max-w-sm">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
          <div className="hidden lg:block bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-center relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <div className="relative w-12 h-12 bg-white/20 rounded-xl backdrop-blur-md border border-white/30 overflow-hidden shadow-lg">
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
          </div>
          <div className="lg:hidden bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <div className="relative w-10 h-10 bg-white/20 rounded-lg backdrop-blur-sm overflow-hidden">
                <Image
                  src="/assets/harness.png"
                  alt="Harness Logo"
                  fill
                  className="object-cover p-1.5"
                  sizes="40px"
                  priority
                />
              </div>
              <h1 className="text-lg font-bold text-white">Harness ERP</h1>
            </div>
            <p className="text-blue-100/90 text-xs">Enterprise Login</p>
          </div>
          <form onSubmit={formik.handleSubmit} className="p-6">
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-xs font-semibold text-gray-700 mb-1"
              >
                Username
              </label>
              <InputText
                id="username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter username"
                className={`w-full p-2.5 border  transition-all duration-200 focus:outline-none ${
                  formik.touched.username && formik.errors.username
                    ? "border-red-400 bg-red-50/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
                    : formik.touched.username && !formik.errors.username
                      ? "border-green-400 bg-green-50/30 focus:border-green-500 focus:ring-1 focus:ring-green-500/20"
                      : "border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
                }`}
                disabled={formik.isSubmitting}
              />
              {formik.touched.username && formik.errors.username && (
                <div className="mt-1.5 p-2 bg-red-50/80 border border-red-100 rounded-md flex items-start text-xs">
                  <i className="pi pi-exclamation-circle text-red-500 mt-0.5 mr-2"></i>
                  <p className="text-red-600 font-medium">
                    {formik.errors.username}
                  </p>
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-gray-700 mb-1"
              >
                Old Password
              </label>
              <div className="relative">
                <InputText
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  value={formik.values.oldPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter old password"
                  className={`w-full p-2.5  border transition-all duration-200 focus:outline-none ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-400 bg-red-50/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
                      : formik.touched.password && !formik.errors.password
                        ? "border-green-400 bg-green-50/30 focus:border-green-500 focus:ring-1 focus:ring-green-500/20"
                        : "border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
                  }`}
                />
              </div>
              {formik.touched.oldPassword && formik.errors.oldPassword && (
                <div className="mt-1.5 p-2 bg-red-50/80 border border-red-100 rounded-md flex items-start text-xs">
                  <i className="pi pi-exclamation-circle text-red-500 mt-0.5 mr-2"></i>
                  <p className="text-red-600 font-medium">
                    {formik.errors.oldPassword}
                  </p>
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-gray-700 mb-1"
              >
                New Password
              </label>
              <div className="relative">
                <InputText
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter new password"
                  className={`w-full p-2.5  border transition-all duration-200 focus:outline-none ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-400 bg-red-50/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
                      : formik.touched.password && !formik.errors.password
                        ? "border-green-400 bg-green-50/30 focus:border-green-500 focus:ring-1 focus:ring-green-500/20"
                        : "border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
                  }`}
                />
              </div>
              {formik.touched.newPassword && formik.errors.newPassword && (
                <div className="mt-1.5 p-2 bg-red-50/80 border border-red-100 rounded-md flex items-start text-xs">
                  <i className="pi pi-exclamation-circle text-red-500 mt-0.5 mr-2"></i>
                  <p className="text-red-600 font-medium">
                    {formik.errors.newPassword}
                  </p>
                </div>
              )}
            </div>
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={() => router.push("/")}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                Back to Login Page?
              </button>
            </div>
            <Button
              type="submit"
              label={
                formik.isSubmitting ? "Authenticating..." : "Reset Password"
              }
              icon={
                formik.isSubmitting
                  ? "pi pi-spin pi-spinner"
                  : "pi pi-arrow-right"
              }
              iconPos="right"
              className="w-full bg-gradient-to-r from-[#2196f3] to-[#2196f3] hover:from-[#2196f3] hover:to-blue-800 border-0 py-2.5 text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={formik.isSubmitting}
            />

           
          </form>
          <LoginFooterSection />
        </div>
      </div>
    </div>
  );
}

// <p className="text-blue-100/90 text-xs">Secure Login Portal</p>
//  <div className="mt-6 pt-4 border-t border-gray-100">
//               <div className="grid grid-cols-3 gap-2">
//                 <div className="text-center p-2 rounded-md bg-gradient-to-br from-blue-50 to-blue-50/50 border border-blue-100">
//                   <i className="pi pi-shield text-blue-500 text-sm block"></i>
//                   <span className="text-xs text-gray-700">Secure</span>
//                 </div>
//                 <div className="text-center p-2 rounded-md bg-gradient-to-br from-green-50 to-green-50/50 border border-green-100">
//                   <i className="pi pi-bolt text-green-500 text-sm block"></i>
//                   <span className="text-xs text-gray-700">Fast</span>
//                 </div>
//                 <div className="text-center p-2 rounded-md bg-gradient-to-br from-purple-50 to-purple-50/50 border border-purple-100">
//                   <i className="pi pi-globe text-purple-500 text-sm block"></i>
//                   <span className="text-xs text-gray-700">ERP</span>
//                 </div>
//               </div>
//             </div>