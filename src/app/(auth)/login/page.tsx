"use client";

import LoginLeftSection from "./LoginLeftSection";
import LoginForm from "./LoginForm";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/mainStore";
import { useFormik } from "formik";
import {
  getComapnyDetailsMiddleware,
  getPrivilegesDetailsMiddleware,
  LoginMiddleWare,
} from "@/features/Thunks/auth/authThunks";
import DropdownCommon from "@/components/dropdownCommon";

export default function LoginPage() {
  const { loading, companyDetailsData } = useSelector(
    (state: RootState) => state.authSlice,
  );
  console.log(companyDetailsData, "companyDetailsData");
  const companies =
    companyDetailsData?.data?.companyDivisionDTO?.associatedCompanies || [];

  const companyOptions = companies.map((comp: any) => ({
    label: comp.companyName,
    value: comp.companyId,
    originalData: comp,
  }));
  const toast = useRef<Toast>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<{
    label: string;
    value: number;
    originalData: any;
  } | null>(null);
  const [selectedDivisionId, setSelectedDivisionId] = useState<{
    label: string;
    value: number;
  } | null>(null);
  const [showCompanyPopup, setShowCompanyPopup] = useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  console.log(
    selectedCompanyId?.originalData,
    "selectedCompanyIdselectedCompanyIdselectedCompanyId",
  );
  const divisionOptions =
    selectedCompanyId?.originalData?.associatedDivisions?.map((div: any) => ({
      label: div.divisionName,
      value: div.divisionId,
    })) || [];
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

    onSubmit: async (values, { setSubmitting }) => {
      const payload = {
        username: values.username,
        password: values.password,
      };
      try {
        const responseCompany = await dispatch(
          getComapnyDetailsMiddleware(payload),
        ).unwrap();

        if (responseCompany.success) {
          setShowCompanyModal(true);
        }
      } catch (error: any) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: error || "Login failed",
          life: 3000,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });
const handleCompanyLogin = async () => {
  if (!selectedCompanyId) {
    toast.current?.show({
      severity: "warn",
      summary: "Warning",
      detail: "Please select a company",
      life: 3000,
    });
    return;
  }

  if (divisionOptions.length > 0 && !selectedDivisionId) {
    toast.current?.show({
      severity: "warn",
      summary: "Warning",
      detail: "Please select a division",
      life: 3000,
    });
    return;
  }

  try {
    const loginPayload = {
      companyId: selectedCompanyId.value,
      companyName: selectedCompanyId.label,
      divisionId: selectedDivisionId?.value || null,
      divisionName: selectedDivisionId?.label || null,
      userId: formik.values.username,
      password: formik.values.password,
    };

    const loginResponse = await dispatch(
      LoginMiddleWare(loginPayload)
    ).unwrap();

    if (loginResponse?.success) {
      await dispatch(
        getPrivilegesDetailsMiddleware({
          userId: formik.values.username,
          companyId: selectedCompanyId.value,
          getDivisonId: selectedDivisionId?.value || null,
        })
      ).unwrap();

      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Logged in successfully!",
        life: 2000,
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    }
  } catch (error: any) {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: error || "Login failed",
      life: 3000,
    });
  }
};
  return (
    <div className="h-screen overflow-hidden flex bg-gradient-to-br from-gray-50 to-blue-50/30">
      <LoginLeftSection />
      <Toast ref={toast} position="top-right" />
      <LoginForm
        toast={toast}
        formik={formik}
        router={router}
        companyOptions={companyOptions}
        selectedCompanyId={selectedCompanyId}
        setSelectedCompanyId={setSelectedCompanyId}
        companies={companies}
        showCompanyModal={showCompanyModal}
        setShowCompanyModal={setShowCompanyModal}
        handleCompanyLogin={handleCompanyLogin}
        divisionOptions={divisionOptions}
        selectedDivisionId={selectedDivisionId}
        setSelectedDivisionId={setSelectedDivisionId}
      />
    </div>
  );
}
