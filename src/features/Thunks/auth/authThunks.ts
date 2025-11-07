import { createAsyncThunk } from "@reduxjs/toolkit";
import { LOGIN } from "@/redux/actionTypes";
import axios from "axios";
import Cookies from "js-cookie";
import { APIROUTES } from "@/lib/apiRoutes";
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
    {
      userId,
      password,
      companyId,
      companyName,
      divisionId,
      divisionName,
    },
    { rejectWithValue }
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
      const { data }: any = await axios.post(APIROUTES.LOGIN.POST_LOGIN, payload); 
      console.log("Login response:", data);
      if (data?.token) {
        Cookies.set("token", data.token);
      }
      return data;
    } catch (error: any) {
      console.error("Login Error:", error);

      return rejectWithValue(
        error?.response?.data?.error?.message || "Login failed"
      );
    }
  }
);
