// "use client";
// import type { ReactNode } from "react";
// import { Provider } from "react-redux";
// import store from "@/redux/mainStore";


// export function Providers({ children }: { children: ReactNode }) {
//   return <Provider store={store}>{children}</Provider>;
// }

"use client";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import store, { persistor } from "@/redux/mainStore";
import { PersistGate } from "redux-persist/integration/react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}