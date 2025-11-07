// import { createSlice } from "@reduxjs/toolkit";
// import { , PRofileMiddleware } from "./";
// type homeType = {
//   isLoading: boolean;
//   homeData: any;
//   error: string|any;
// };
// const homeInitialState: homeType = {
//   isLoading: false,
//   homeData: [],
//   error: "",
//   prome:[]
// };

// const homeSlice = createSlice({
//   name: "home",
//   initialState: homeInitialState,
//   reducers: {  },
//   extraReducers: (builder) => {
//     builder
//       .addCase(.pending, (state) => {
//         state.isLoading = true;
//         state.error = "";
//       })
//       .addCase(.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.homeData = action.payload || [];
//       })
//       .addCase(.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || "Home data fetch failed";
//       });
//       builder
//       .addCase(PRofileMiddleware.pending, (state) => {
//         state.isLoading = true;
//         state.error = "";
//       })
//       .addCase(PRofileMiddleware.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.prome = action.payload || [];
//       })
//       .addCase(PRofileMiddleware.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || "Home data fetch failed";
//       })
      
//   },
// });
// export default homeSlice.reducer;
