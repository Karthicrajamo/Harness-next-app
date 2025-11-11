"use client";
import "./globals.css";
import { Provider } from "react-redux";
import store from "../redux/mainStore";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
// import { store } from "@/redux/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
