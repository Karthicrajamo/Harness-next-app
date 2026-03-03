import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GETCOMAPANYDETAILS,
  GETPRIVILEGESDETAILS,
  LOGIN,
  OPERATION,
  RESETPASSWORD,
} from "@/redux/actionTypes";
import axios from "axios";
import Cookies from "js-cookie";
import { APIROUTES } from "@/lib/apiRoutes";
import {
  ApiResponse,
  resetPasswordPayloadType,
} from "@/app/ts_types/auth_types";
// import axiosInstance from "@/lib/axiosClient";

interface LoginPayload {
  userId: string;
  username:string;
  password: string;
  companyId: number | string;
  companyName: string;
  divisionId: number | string | null;
  divisionName: string | null;
  getDivisonId:any
}

interface LoginResponse {
  token?: string;
  message?: string;
  [key: string]: any;
}interface PrivilegesPayload {
  userId: string;
  companyId: number;
  getDivisonId: number | null;
}

interface PrivilegesResponse {
  success: boolean;
  data: any;
}

export const LoginMiddleWare = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>(
  LOGIN,
  async (
    { userId, password, companyId, companyName, divisionId, divisionName },
    { rejectWithValue },
  ) => {
    try {
      const payload = {
        userId,
        password,
        companyId,
        companyName,
        divisionId,
        divisionName,
      };

      // console.log(axiosInstance,"Login payload:", payload, APIROUTES.LOGIN.POST_LOGIN);
      const { data }: any = await axios.post(
        APIROUTES.LOGIN.POST_LOGIN,
        payload,
      );
      console.log("Login response:", data);

      return data;
    } catch (error: any) {
      console.error("Login Error:", error);

      return rejectWithValue(
        error?.response?.data?.error?.message || "Login failed",
      );
    }
  },
);

export const ResetPasswordMiddleWare = createAsyncThunk<
  ApiResponse,
  resetPasswordPayloadType,
  { rejectValue: string }
>(RESETPASSWORD, async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<ApiResponse>(
      APIROUTES.LOGIN.RESET_PASSWORD,
      payload,
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.error?.message ?? "Login failed",
      );
    }

    return rejectWithValue("Login failed");
  }
});

export const getComapnyDetailsMiddleware = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>(GETCOMAPANYDETAILS, async ({ username, password }, { rejectWithValue }) => {
  try {
    const payload = {
      username,
      password,
    };
    const { data }: any = await axios.post(
      APIROUTES.LOGIN.COMPANYDETAILSDATA,
      payload,
    );
    console.log("company details response:", data);

    return data;
  } catch (error: any) {
    console.error("company details Error:", error);

    return rejectWithValue(
      error?.response?.data?.error?.message || "company details failed",
    );
  }
});
export const getPrivilegesDetailsMiddleware = createAsyncThunk<
  PrivilegesResponse,
  PrivilegesPayload,
  { rejectValue: string }
>(
  GETPRIVILEGESDETAILS,
  async ({ userId, companyId, getDivisonId }, { rejectWithValue }) => {
    try {
      const payload = {
        userId,
        companyId,
        getDivisonId,
      };

      const { data } = await axios.post(
        APIROUTES.LOGIN.PRIVILEGESDETAILSDATA,
        payload
      );

      console.log("Privileges response:", data);

      return data;
    } catch (error: any) {
      console.error("Privileges Error:", error);

      return rejectWithValue(
        error?.response?.data?.error?.message ||
          error?.response?.data?.message ||
          "Privileges fetch failed"
      );
    }
  }
);
export const OperationMasterMiddlware = createAsyncThunk<
  ApiResponse,
  void,
  { rejectValue: string }
>(OPERATION, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<ApiResponse>(
      APIROUTES.LOGIN.OPERATION_MASTER,
      {
        query: "select * from OPERATION_MASTER",
      },
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message ?? "Operation Master failed",
      );
    }

    return rejectWithValue("Operation Master failed");
  }
});
