// import { HOME } from "@/app/redux/actionTypes";
// import { APIROUTES } from "@/lib/apiRoutes";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const homeMiddleware = createAsyncThunk(
//  HOME,
//   async (useId, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(APIROUTES?.Home?.GET_HOME_DATA, useId);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "Something went wrong");
//     }
//   }
// );


// export const Middleware = createAsyncThunk(
//  HOME,
//   async (useId, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(APIROUTES?.Home?.GET_HOME_DATA, useId);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "Something went wrong");
//     }
//   }
// );