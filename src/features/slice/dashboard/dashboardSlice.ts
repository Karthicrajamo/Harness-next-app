// features/slice/dashboard/dashboardSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { dashboardMiddleware } from "@/features/Thunks/dashboard/dashboardThunk";

type Module = {
  module_id: number;
  module_name: string;
};

export type DashboardData = {
  QUALITY: Module[];
  IE_DEPARTMENT: Module[];
  CUTTING: Module[];
};

type HomeState = {
  isLoading: boolean;
  dashboardData: DashboardData | null;
  error: string;
};

const initialState: HomeState = {
  isLoading: false,
  dashboardData: null,
  error: "",
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(dashboardMiddleware.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(dashboardMiddleware.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboardData = action.payload;
      })
      .addCase(dashboardMiddleware.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Dashboard data fetch failed";
      });
  },
});

export default dashboardSlice.reducer;