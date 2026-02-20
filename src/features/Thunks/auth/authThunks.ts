import { createAsyncThunk } from "@reduxjs/toolkit";
import { LOGIN, RESETPASSWORD } from "@/redux/actionTypes";
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
  password: string;
  companyId: number | string;
  companyName: string;
  divisionId: number | string | null;
  divisionName: string | null;
}

interface LoginResponse {
  token?: string;
  message?: string;
  [key: string]: any;
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
