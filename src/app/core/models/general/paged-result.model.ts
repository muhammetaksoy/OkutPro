export interface PagedResult<T> {
  PageNumber: number;
  PageSize: number;
  TotalNumberOfPages: number;
  TotalNumberOfRecords: number;
  Results: T[];
}
