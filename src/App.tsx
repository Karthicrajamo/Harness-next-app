import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./app/dashboard/page";
import CutPanelBundleAuditPage from "./pages/CutPanelBundleAudit";

// Create placeholder pages for other routes (you'll create actual files later)
const DailyCuttingCpiPage = () => <div>Daily Cutting CPI Page</div>;
const CpiQrReportPage = () => <div>CPI QR Report Page</div>;
const StyleTrackingPage = () => <div>Style Tracking Page</div>;
const BundleOperationPage = () => <div>Bundle Operation Page</div>;
const StyleOperationPage = () => <div>Style Operation Page</div>;
const OperationMasterPage = () => <div>Operation Master Page</div>;
const IeReportPage = () => <div>IE Report Page</div>;
const DailyForecastPage = () => <div>Daily Forecast Page</div>;
const QrOperationReportsPage = () => <div>QR Operation Reports Page</div>;
const ManpowerLostTimePage = () => <div>Manpower Lost Time Page</div>;
const AqlFormsPage = () => <div>AQL Forms Page</div>;
const QualityCheckFormsPage = () => <div>Quality Check Forms Page</div>;
const QualityReportPage = () => <div>Quality Report Page</div>;
const ReworkPage = () => <div>Rework Page</div>;
const FabricInspectionPage = () => <div>Fabric Inspection Page</div>;
const InlineQualityAuditPage = () => <div>Inline Quality Audit Page</div>;
const AdminPage = () => <div>Admin Page</div>;
const MaintenancePage = () => <div>Maintenance Page</div>;

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Dashboard */}
        <Route path="/" element={<DashboardPage />} />

        {/* Cutting Modules */}
        <Route
          path="/cut-panel-bundle-audit"
          element={<CutPanelBundleAuditPage />}
        />
        <Route path="/daily-cutting-cpi" element={<DailyCuttingCpiPage />} />
        <Route path="/cpi-qr-report" element={<CpiQrReportPage />} />
        <Route path="/style-tracking" element={<StyleTrackingPage />} />
        <Route path="/bundle-operation" element={<BundleOperationPage />} />

        {/* IE Department */}
        <Route path="/style-operation" element={<StyleOperationPage />} />
        <Route path="/operation-master" element={<OperationMasterPage />} />
        <Route path="/ie-report" element={<IeReportPage />} />
        <Route path="/daily-forecast" element={<DailyForecastPage />} />
        <Route
          path="/qr-operation-reports"
          element={<QrOperationReportsPage />}
        />
        <Route path="/manpower-lost-time" element={<ManpowerLostTimePage />} />

        {/* Quality Modules */}
        <Route path="/aql-forms" element={<AqlFormsPage />} />
        <Route
          path="/quality-check-forms"
          element={<QualityCheckFormsPage />}
        />
        <Route path="/quality-report" element={<QualityReportPage />} />
        <Route path="/rework" element={<ReworkPage />} />
        <Route path="/fabric-inspection" element={<FabricInspectionPage />} />
        <Route
          path="/inline-quality-audit"
          element={<InlineQualityAuditPage />}
        />

        {/* System */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/maintenance" element={<MaintenancePage />} />

        {/* Fallback route for 404 */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
