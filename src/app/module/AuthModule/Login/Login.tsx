"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import "./Login.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { AppDispatch } from "@/redux/mainStore";
import { LoginMiddleWare } from "../../../../features/Thunks/auth/authThunks";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const toast = useRef<Toast>(null);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: (values) => {
      const errors: { username?: string; password?: string } = {};

      if (!values.username) {
        errors.username = "Username is required";
      }

      if (!values.password) {
        errors.password = "Password is required";
      }

      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      const payload = {
        companyId: 1,
        companyName: "Jay Jay Mills (Bangladesh) Private Limited",
        divisionId: null,
        divisionName: null,
        userId: values.username,
        password: values.password,
      };

      try {
        const response = await dispatch(LoginMiddleWare(payload)).unwrap();

        if (response) {
          document.cookie = `token=${response.token}; path=/;`;

          if (response.message === "Login successful") {
            toast.current?.show({
              severity: "success",
              summary: "Success",
              detail: "Logged in successfully!",
              life: 2000,
            });

            setTimeout(() => {
              router.push("/dashboard");
            }, 2000);
          } else {
            toast.current?.show({
              severity: "error",
              summary: "Error",
              detail: response.message || "Something went wrong",
              life: 3000,
            });
          }
        }
      } catch (err) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Login failed. Please try again!",
          life: 3000,
        });
        console.error("Login failed:", err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="h-screen overflow-hidden flex bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Loading Overlay */}
      {formik.isSubmitting && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl flex flex-col items-center animate-fadeIn">
            <div className="relative w-20 h-20 mb-6">
              <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
              <div className="absolute inset-2 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
              <i className="pi pi-lock absolute inset-0 flex items-center justify-center text-blue-500 text-2xl"></i>
            </div>
            <p className="text-gray-700 font-medium text-lg mb-2">
              Authenticating...
            </p>
            <p className="text-gray-500 text-sm">Please wait ...</p>
          </div>
        </div>
      )}

      <Toast ref={toast} position="top-right" className="mt-16" />

      {/* Left Side - Branding Section - Made more compact */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"></div>
        </div>

        {/* Content - Made more compact */}
        <div className="relative z-10 flex flex-col justify-center p-8 text-white w-full h-full">
          <div className="max-w-md mx-auto">
            {/* Logo/Brand - Smaller */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="relative w-16 h-16 bg-gradient-to-br from-white/25 to-white/10 rounded-2xl backdrop-blur-md border border-white/30 overflow-hidden shadow-xl">
                <Image
                  src="/assets/harness.png"
                  alt="Harness Logo"
                  fill
                  className="object-cover p-3"
                  sizes="64px"
                  priority
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Harness ERP
                </h1>
                <p className="text-blue-100/90 text-base mt-1 font-light">
                  Enterprise Resource Planning
                </p>
              </div>
            </div>

            <p className="text-base mb-6 text-blue-100/90 leading-relaxed font-light">
              Optimize your manufacturing workflow with intelligent enterprise
              solutions.
            </p>

            {/* Features List - More compact */}
            <div className="space-y-3">
              {[
                {
                  icon: "pi-chart-bar",
                  title: "Real-time Analytics",
                  desc: "Monitor production metrics",
                },
                {
                  icon: "pi-shield",
                  title: "Quality Control",
                  desc: "ISO compliance tracking",
                },
                {
                  icon: "pi-bolt",
                  title: "Production Management",
                  desc: "Streamlined workflows",
                },
                {
                  icon: "pi-users",
                  title: "Team Collaboration",
                  desc: "Cross-department coordination",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-200 cursor-default group"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                    <i className={`pi ${feature.icon} text-white text-lg`}></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{feature.title}</h3>
                    <p className="text-blue-200/80 text-xs">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form - Made more compact */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-6 h-full">
        <div className="w-full max-w-sm">
          {/* Login Card - More compact */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
            {/* Desktop Header - More compact */}
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
                <p className="text-blue-100/90 text-xs">Secure Login Portal</p>
              </div>
            </div>

            {/* Mobile Header - More compact */}
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
              {/* Username Field - More compact */}
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
                  className={`w-full p-2.5 border rounded-lg transition-all duration-200 focus:outline-none ${
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

              {/* Password Field - More compact */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <InputText
                    id="password"
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your password"
                    className={`w-full p-2.5 pl-9 border rounded-lg transition-all duration-200 focus:outline-none ${
                      formik.touched.password && formik.errors.password
                        ? "border-red-400 bg-red-50/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
                        : formik.touched.password && !formik.errors.password
                        ? "border-green-400 bg-green-50/30 focus:border-green-500 focus:ring-1 focus:ring-green-500/20"
                        : "border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
                    }`}
                  />
                  {/* <i className="pi pi-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i> */}
                </div>
                {formik.touched.password && formik.errors.password && (
                  <div className="mt-1.5 p-2 bg-red-50/80 border border-red-100 rounded-md flex items-start text-xs">
                    <i className="pi pi-exclamation-circle text-red-500 mt-0.5 mr-2"></i>
                    <p className="text-red-600 font-medium">
                      {formik.errors.password}
                    </p>
                  </div>
                )}
              </div>

              {/* Login Button - More compact */}
              <Button
                type="submit"
                label={formik.isSubmitting ? "Authenticating..." : "Login"}
                icon={
                  formik.isSubmitting
                    ? "pi pi-spin pi-spinner"
                    : "pi pi-arrow-right"
                }
                iconPos="right"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-0 py-2.5 text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={formik.isSubmitting}
              />

              {/* Additional Info - More compact */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 rounded-md bg-gradient-to-br from-blue-50 to-blue-50/50 border border-blue-100">
                    <i className="pi pi-shield text-blue-500 text-sm mb-1 block"></i>
                    <span className="text-xs text-gray-700">Secure</span>
                  </div>
                  <div className="text-center p-2 rounded-md bg-gradient-to-br from-green-50 to-green-50/50 border border-green-100">
                    <i className="pi pi-bolt text-green-500 text-sm mb-1 block"></i>
                    <span className="text-xs text-gray-700">Fast</span>
                  </div>
                  <div className="text-center p-2 rounded-md bg-gradient-to-br from-purple-50 to-purple-50/50 border border-purple-100">
                    <i className="pi pi-globe text-purple-500 text-sm mb-1 block"></i>
                    <span className="text-xs text-gray-700">ERP</span>
                  </div>
                </div>
              </div>
            </form>

            {/* Footer - More compact */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 border-t border-gray-200/50 px-6 py-4">
              <div className="text-center">
                <div className="mb-1">
                  <p className="text-xs text-gray-700 font-medium">
                    Jay Jay Mills (Bangladesh) Private Limited
                  </p>
                </div>
                <div className="text-xs text-gray-500">
                  <span>Version 1.0.0 © {new Date().getFullYear()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
