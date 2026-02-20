"use client";

import { LoginFooterSectionProps } from "@/app/ts_types/auth_types";
import React from "react";

const LoginFooterSection: React.FC<LoginFooterSectionProps> = ({
  version = "1.0.0",
  companyName = "Jay Jay Mills (Bangladesh) Private Limited",
}) => {
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-blue-50/30 border-t border-gray-200 px-6 py-4">
      <div className="text-center space-y-1">
        <p className="text-xs font-medium text-gray-700">{companyName}</p>

        <p className="text-xs text-gray-500">
          Version {version} © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default LoginFooterSection;
