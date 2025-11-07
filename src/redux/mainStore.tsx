import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reducers from "./mainReducers";
const RESET_STORE_ACTION_TYPE = "main/RESET_APP_STATE";

const combinedReducer = combineReducers(reducers);

export type RootState = ReturnType<typeof combinedReducer>;

export const rootReducer = (state: RootState | undefined, action: any): RootState => {
  if (action.type === RESET_STORE_ACTION_TYPE) {
    state = undefined; 
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export const resetStore = (): void => {
  store.dispatch({ type: RESET_STORE_ACTION_TYPE });
};

export default store;
