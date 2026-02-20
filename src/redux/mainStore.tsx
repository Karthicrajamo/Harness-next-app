// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import reducers from "./mainReducers";
// const RESET_STORE_ACTION_TYPE = "main/RESET_APP_STATE";

// const combinedReducer = combineReducers(reducers);

// export type RootState = ReturnType<typeof combinedReducer>;

// export const rootReducer = (state: RootState | undefined, action: any): RootState => {
//   if (action.type === RESET_STORE_ACTION_TYPE) {
//     state = undefined; 
//   }
//   return combinedReducer(state, action);
// };

// export const store = configureStore({
//   reducer: rootReducer,
// });

// export type AppDispatch = typeof store.dispatch;

// export const resetStore = (): void => {
//   store.dispatch({ type: RESET_STORE_ACTION_TYPE });
// };

// export default store;


import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reducers from "./mainReducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

const RESET_STORE_ACTION_TYPE = "main/RESET_APP_STATE";

const combinedReducer = combineReducers(reducers);

const rootReducer = (state: any, action: any) => {
  if (action.type === RESET_STORE_ACTION_TYPE) {
    state = undefined;
  }
  return combinedReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authSlice"], // 👈 only persist auth
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export const resetStore = () => {
  store.dispatch({ type: RESET_STORE_ACTION_TYPE });
};

export type AppDispatch = typeof store.dispatch;
export default store;