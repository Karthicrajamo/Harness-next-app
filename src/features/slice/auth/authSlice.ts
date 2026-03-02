// import { createSlice } from "@reduxjs/toolkit";
// import {
//   LoginMiddleWare,
//   ResetPasswordMiddleWare,
// } from "@/features/Thunks/auth/authThunks";

// interface AuthState {
//   token: string | null;
//   user: any | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: AuthState = {
//   token: null,
//   user: null,
//   loading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.token = null;
//       state.user = null;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(LoginMiddleWare.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(LoginMiddleWare.fulfilled, (state, action) => {
//         state.loading = false;
//         state.token = action.payload?.token || null;
//         state.user = action.payload?.user || null;
//         state.error = null;
//       })
//       .addCase(LoginMiddleWare.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Login failed";
//       })
//       .addCase(ResetPasswordMiddleWare.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(ResetPasswordMiddleWare.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(ResetPasswordMiddleWare.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Reset Password failed";
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  getComapnyDetailsMiddleware,
  getPrivilegesDetailsMiddleware,
  LoginMiddleWare,
  OperationMasterMiddlware,
  ResetPasswordMiddleWare,
} from "@/features/Thunks/auth/authThunks";

interface AuthState {
  token: string | null;
  user: any | null;
  companyDetailsData: any | null;
  privilegesDetailsData:any|null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  companyDetailsData: null,
  privilegesDetailsData:null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
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
      })
      .addCase(LoginMiddleWare.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(ResetPasswordMiddleWare.pending, (state) => {
        state.loading = true;
      })
      .addCase(ResetPasswordMiddleWare.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(ResetPasswordMiddleWare.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Reset Password failed";
      })
      .addCase(getComapnyDetailsMiddleware.pending, (state) => {
        state.loading = true;
      })
      .addCase(getComapnyDetailsMiddleware.fulfilled, (state, action) => {
        state.loading = false;
        state.companyDetailsData = action.payload;
      })
      .addCase(getComapnyDetailsMiddleware.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Reset Password failed";
      })
      .addCase(getPrivilegesDetailsMiddleware.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPrivilegesDetailsMiddleware.fulfilled, (state, action) => {
        state.loading = false;
        state.privilegesDetailsData = action.payload;
      })
      .addCase(getPrivilegesDetailsMiddleware.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Reset Password failed";
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
