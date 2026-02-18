// app/cut-panel-bundle-audit/page.tsx (Next.js)
"use client";

import { Monitor } from "lucide-react";

export default function CutPanelBundleAuditPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <Monitor className="w-8 h-8 mr-3 text-blue-600" />
          CUT PANEL BUNDLE AUDIT
        </h1>
        <p className="text-gray-600 mt-2">
          Track and audit all cut panel bundles in the production line
        </p>
      </div>

      {/* Your module content goes here */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Bundle Audit Dashboard
        </h2>
        {/* Add your module-specific components here */}
      </div>
    </div>
  );
}
