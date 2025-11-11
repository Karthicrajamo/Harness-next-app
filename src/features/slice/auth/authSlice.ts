import { createSlice } from "@reduxjs/toolkit";
import { LoginMiddleWare } from "@/features/Thunks/auth/authThunks";

interface AuthState {
  token: string | null;
  user: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginMiddleWare.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LoginMiddleWare.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload?.token || null;
        state.user = action.payload?.user || null;
        state.error = null;

        if (action.payload?.token) {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(LoginMiddleWare.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
