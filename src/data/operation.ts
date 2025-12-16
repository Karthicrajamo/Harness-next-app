// ./data/operation.ts

export interface OperationItem {
  id: number | string;
  operationCode: string;
  operation: string;
  hindi: string;
  tamil: string;
  smv: number; // Stitched Minutes Value
  machineCode: string; // The Machine Code column
  masterOperation: string;
  skillGrade: string;
  comments: string; // Added Comments column from the image
}