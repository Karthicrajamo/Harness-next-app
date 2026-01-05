"use client";
import "./globals.css";
import { Provider } from "react-redux";
import store from "../redux/mainStore";
import 'primereact/resources/themes/saga-blue/theme.css';   
import 'primereact/resources/primereact.min.css';          
import 'primeicons/primeicons.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 1. Added suppressHydrationWarning to prevent React errors when classes change
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* 2. Added Inline Script to prevent the white flash on refresh */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      {/* 3. Updated body classes to support dark mode transition */}
      <body className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}