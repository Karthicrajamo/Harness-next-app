export interface EmployeeItem {
  id: string;
  employeeNo: string;
  employeeName: string;
  dateOfBirth: string;
  gender: "Male" | "Female" | "Transgender" | "";
  unit: string;
  department: string;
  designation: string;
  category: string; // Contract, Permanent, etc
  type: string; // Worker, Staff, Shift Worker
  grade: string; // Grade 1, Grade 4 etc
  tier: string;
  group1: string; // Sewing, Account, etc
  state: string;
  lastUpdated: string;
  profilePercent: number | null; // 0–100
}
