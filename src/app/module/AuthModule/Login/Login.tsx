"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useFormik } from "formik";
import "./Login.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { AppDispatch } from "@/redux/mainStore";
import { LoginMiddleWare } from "../../../../features/Thunks/auth/authThunks";

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toast ref={toast} />
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1 font-medium">
            Username
          </label>
          <InputText
            id="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full border rounded p-inputtext-sm ${
              formik.touched.username && formik.errors.username
                ? "border-red-500"
                : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter username"
          />
          {formik.touched.username && formik.errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.username}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <Password
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            toggleMask
            feedback={false}
            placeholder="Enter password"
            inputClassName={`w-full p-3 rounded ${
              formik.touched.password && formik.errors.password
                ? "border-red-500"
                : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            style={{ width: "100%" }}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>
        <Button
          type="submit"
          label={formik.isSubmitting ? "Logging in..." : "Login"}
          className="w-full p-button-primary"
          disabled={formik.isSubmitting}
        />
      </form>
    </div>
  );
}
