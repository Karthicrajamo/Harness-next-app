import React from "react";
import "./datatabel.scss";
import { DataTable, DataTableValueArray } from "primereact/datatable";
import ColumnComponent, { ColumnConfig } from "./ColumnComponent";
import "../sidebar.css";

interface DataTableComponentProps<T extends DataTableValueArray> {
  value: T;
  columns: ColumnConfig[];
  removableSort?: boolean;
}

const DataTableComponent = <T extends DataTableValueArray>({
  value,
  columns,
  removableSort = false,
}: DataTableComponentProps<T>) => {
  return (
    <div className="custom__datatable ">
      <DataTable
        value={value}
        tableStyle={{ minWidth: "50rem" }}
        removableSort={removableSort}
      >
        {columns.map((column, index) => (
          <ColumnComponent
            key={column.id ?? index}
            {...column}
            removableSort={removableSort}
          />
        ))}
      </DataTable>
    </div>
  );
};

export default DataTableComponent;
