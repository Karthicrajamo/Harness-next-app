"use client";

import LoginLeftSection from "./LoginLeftSection";
import LoginForm from "./LoginForm";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/mainStore";
import { useFormik } from "formik";
import { LoginMiddleWare } from "@/features/Thunks/auth/authThunks";

export default function LoginPage() {
  const toast = useRef<Toast>(null);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: (values) => {
      const errors: { username?: string; password?: string } = {};
      if (!values.username) errors.username = "Username is required";
      if (!values.password) errors.password = "Password is required";
      return errors;
    },
    // onSubmit: async (values, { setSubmitting }) => {
    //   const payload = {
    //     companyId: 1,
    //     companyName: "Jay Jay Mills (Bangladesh) Private Limited",
    //     divisionId: null,
    //     divisionName: null,
    //     userId: values.username,
    //     password: values.password,
    //   };

    //   try {
    //     const response = await dispatch(LoginMiddleWare(payload)).unwrap();

    //     if (response?.message === "Login successful") {
    //       document.cookie = `token=${response.token}; path=/;`;

    //       toast.current?.show({
    //         severity: "success",
    //         summary: "Success",
    //         detail: "Logged in successfully!",
    //         life: 2000,
    //       });

    //       setTimeout(() => {
    //         router.push("/dashboard");
    //       }, 2000);
    //     } else {
    //       toast.current?.show({
    //         severity: "error",
    //         summary: "Error",
    //         detail: response?.message || "Login failed",
    //         life: 3000,
    //       });
    //     }
    //   } catch {
    //     toast.current?.show({
    //       severity: "error",
    //       summary: "Error",
    //       detail: "Login failed. Please try again!",
    //       life: 3000,
    //     });
    //   } finally {
    //     setSubmitting(false);
    //   }
    // },
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

    if (response?.message === "Login successful") {
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Logged in successfully!",
        life: 2000,
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }
  } catch {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: "Login failed",
      life: 3000,
    });
  } finally {
    setSubmitting(false);
  }
}
  });
  return (
    <div className="h-screen overflow-hidden flex bg-gradient-to-br from-gray-50 to-blue-50/30">
      <LoginLeftSection />
      <Toast ref={toast} position="top-right" />
      <LoginForm toast={toast} formik={formik} router={router} />
    </div>
  );
}
