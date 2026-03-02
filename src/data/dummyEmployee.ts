import { EmployeeItem } from "./employee";

const baseEmployees: EmployeeItem[] = [
  
  
  
];

export const dummyEmployees: EmployeeItem[] = [
  ...baseEmployees,
  ...Array.from({ length: 40 - baseEmployees.length }, (_, i) => {
    const index = i + baseEmployees.length + 1;
    return {
      id: String(index),
      employeeNo: `EMP-${1000 + index}`,
      employeeName: `Employee ${index}`,
      dateOfBirth: "01-JAN-1992",
      gender: index % 2 === 0 ? "Male" : "Female",
      unit: "Demo Unit",
      department: index % 3 === 0 ? "Finance" : "Production",
      designation: "Engineer",
      category: index % 2 === 0 ? "Permanent" : "Contract",
      type: "Staff",
      grade: "",
      tier: "",
      group: "",
      state: "",
      lastUpdated: "01-JAN",
      status: "Active" ,
    };
  }),
];
