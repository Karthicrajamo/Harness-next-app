import {
  ClipboardCheck,
  ListChecks,
  FileText,
  FileSpreadsheet,
  FileChartColumn,
  Settings,
  Factory,
  Building,
  FileSearch,
  Boxes,
  NotebookText,
  ClipboardList,
  ClipboardSignature,
  BookUser,
  Workflow,
  Map,
  Scissors,
  QrCode,
  Fingerprint,
  BarChart3,
  Upload,
  FileEdit,
  CalendarDays,
  Clock4,
  TimerOff,
} from "lucide-react";

export interface ModuleItem {
  title: string;
  icon: any;
  color: string;
}

export const qualityModules: ModuleItem[] = [
  {
    title: "AQL Forms",
    icon: ClipboardCheck,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "All Quality Check Form",
    icon: ListChecks,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Quality Reports",
    icon: FileText,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    title: "Fabric Inspection Forms",
    icon: FileSpreadsheet,
    color: "bg-sky-100 text-sky-700",
  },
  {
    title: "Fabric Inspection Report",
    icon: FileText,
    color: "bg-teal-100 text-teal-700",
  },
  {
    title: "Fabric Inspection Entry Report",
    icon: FileChartColumn,
    color: "bg-rose-100 text-rose-700",
  },
  {
    title: "Rework",
    icon: Settings,
    color: "bg-orange-100 text-orange-700",
  },
  {
    title: "Mills Fabric Parameter Forms & Reports",
    icon: Factory,
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    title: "Fabric Inspection Miles/Supplier",
    icon: Building,
    color: "bg-cyan-100 text-cyan-700",
  },
  {
    title: "EDI Fabric Inspection Forms",
    icon: FileSearch,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Fabric Inspection Comparison Report",
    icon: FileChartColumn,
    color: "bg-violet-100 text-violet-700",
  },
  {
    title: "Needle Received Stock",
    icon: Boxes,
    color: "bg-amber-100 text-amber-700",
  },
  {
    title: "Needle Controlled Log",
    icon: NotebookText,
    color: "bg-red-100 text-red-700",
  },
  {
    title: "IDLE Needle Issue/Receive Details",
    icon: ClipboardList,
    color: "bg-lime-100 text-lime-700",
  },
  {
    title: "Needle Reports",
    icon: FileText,
    color: "bg-slate-100 text-slate-700",
  },
  {
    title: "Needle Reports View",
    icon: FileText,
    color: "bg-fuchsia-100 text-fuchsia-700",
  },
  {
    title: "Fabric Inspection Adhistam",
    icon: ClipboardSignature,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Adhistam Fabric Inspection Report",
    icon: FileText,
    color: "bg-teal-100 text-teal-700",
  },
  {
    title: "Inline Quality Audit Report",
    icon: ClipboardCheck,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Fabric Lab Inspection",
    icon: BookUser,
    color: "bg-rose-100 text-rose-700",
  },
];


export const cuttingModules: ModuleItem[] = [
  { title: "OPSEQ", icon: Workflow, color: "bg-indigo-100 text-indigo-700" },
  { title: "Operation Mapping", icon: Map, color: "bg-green-100 text-green-700" },
  { title: "Bundle Operation", icon: Scissors, color: "bg-rose-100 text-rose-700" },
  { title: "QR Code Building Reports", icon: QrCode, color: "bg-yellow-100 text-yellow-700" },
  { title: "Cut Panel Bundle Audit", icon: ClipboardCheck, color: "bg-purple-100 text-purple-700" },
  { title: "Style System Id Tracking", icon: Fingerprint, color: "bg-cyan-100 text-cyan-700" },
  { title: "Daily Cutting CPI", icon: BarChart3, color: "bg-blue-100 text-blue-700" },
  { title: "CPI QR Code Building Report", icon: FileChartColumn, color: "bg-orange-100 text-orange-700" },
  { title: "Print & Embroidery QR Gen Reports", icon: QrCode, color: "bg-emerald-100 text-emerald-700" },
  { title: "Print & Embroidery CPI QR Gen Uploader", icon: Upload, color: "bg-red-100 text-red-700" },
  { title: "Print & Embroidery CPI QR Gen Reports", icon: FileSearch, color: "bg-teal-100 text-teal-700" },
  { title: "Cutting Panel Audit Report", icon: ClipboardList, color: "bg-amber-100 text-amber-700" },
  { title: "QC Rework Operation QR", icon: ClipboardSignature, color: "bg-slate-100 text-slate-700" },
];


export const iEDepartmentModules: ModuleItem[] = [
  { title: "System Operation", icon: Settings, color: "bg-indigo-100 text-indigo-700" },
  { title: "Operation Master", icon: ListChecks, color: "bg-green-100 text-green-700" },
  { title: "Operation Report and Modification", icon: FileEdit, color: "bg-rose-100 text-rose-700" },
  { title: "Daily Forecast Report", icon: CalendarDays, color: "bg-yellow-100 text-yellow-700" },
  { title: "Operator Wise Hourly Production Reports", icon: Clock4, color: "bg-orange-100 text-orange-700" },
  { title: "QR Operation Reports", icon: QrCode, color: "bg-purple-100 text-purple-700" },
  { title: "Forecast Order", icon: ClipboardList, color: "bg-teal-100 text-teal-700" },
  { title: "ManPower Lost Time", icon: TimerOff, color: "bg-red-100 text-red-700" },
];