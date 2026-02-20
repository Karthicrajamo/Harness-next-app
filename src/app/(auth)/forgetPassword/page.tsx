"use client";

import { useRef } from "react";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/mainStore";
import { FormikErrors, useFormik } from "formik";
import {
  LoginMiddleWare,
  ResetPasswordMiddleWare,
} from "@/features/Thunks/auth/authThunks";
import LoginLeftSection from "../login/LoginLeftSection";
import ResetForm from "./resetForm";
import { resetPasswordFormValues } from "@/app/ts_types/auth_types";

const ForgetPassword = () => {
  const toast = useRef<Toast>(null);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: {
      username: "",
      oldPassword: "",
      newPassword: "",
    },
    validate: (values) => {
      const errors: FormikErrors<resetPasswordFormValues> = {};

      if (!values.username) errors.username = "Username is required";
      if (!values.oldPassword) errors.oldPassword = "Old Password is required";
      if (!values.newPassword) errors.newPassword = "New Password is required";

      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      const payload = {
        userId: values.username,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        companyId: 1,
        divisionId: null,
      };
      try {
        const response = await dispatch(
          ResetPasswordMiddleWare(payload),
        ).unwrap();

        if (response?.message === "Password changed successfully") {
          toast.current?.show({
            severity: "success",
            summary: "Success",
            detail: "Password Reset Successful!",
            life: 2000,
          });

          setTimeout(() => {
            router.push("/");
          }, 2000);
        } else {
          toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: response?.message || "Login failed",
            life: 3000,
          });
        }
      } catch {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Login failed. Please try again!",
          life: 3000,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <div className="h-screen overflow-hidden flex bg-gradient-to-br from-gray-50 to-blue-50/30">
      <LoginLeftSection />
      <Toast ref={toast} position="top-right" />
      <ResetForm toast={toast} formik={formik} router={router} />
    </div>
  );
};
export default ForgetPassword;
