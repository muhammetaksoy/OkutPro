export enum ColumnType {
  Text,
  Date,
  Button,
}

export interface RequestOptions {
  RequestUrl: string;
}

export interface PageParameters {
  PageNumber: number;
  PageSize: number;
  OrderBy: string;
  Ascending: boolean;
}

export interface ButtonSettings {
  Tooltip: string;
  Color: string;
  Disabled?: boolean;
  Icon: string;
  Click?: (rowData) => void;
}

export interface TableColumn {
  Header?: string;
  Field?: string;
  Connector?: string;
  Type: ColumnType;
  Hidden?: boolean;
  Settings?: ButtonSettings | any;
}

export interface TableOptions {
  ShowFilterButton?: boolean;
  ShowAddButton?: boolean;
  ShowCheckboxColumn?: boolean;
  Columns: TableColumn[];
  RequestOptions?: RequestOptions;
  PageParameters: PageParameters;
  FilterData?: any;
  // EnableStaticDataSource?: boolean;
}
