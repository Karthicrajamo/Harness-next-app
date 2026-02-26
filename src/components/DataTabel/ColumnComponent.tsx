import React, { FC } from "react";
import { Column } from "primereact/column";
// import SvgSortIcon from "../../assets/icons/SvgSortIcon";
import "./datatabel.scss";

export interface ColumnConfig {
  id?: string | number;
  field: string;
  header: string;
  sortable?: boolean;
}

interface ColumnComponentProps extends ColumnConfig {
  removableSort?: boolean;
}

const ColumnComponent: FC<ColumnComponentProps> = ({
  field,
  header,
  sortable = false,
  removableSort = false,
}) => {
  const HeaderTemplate = () => (
    <div className="column__header">
      <div>{header}</div>
    </div>
  );

  return <Column field={field} sortable={sortable} header={HeaderTemplate} />;
};

export default ColumnComponent;
