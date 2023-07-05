export interface ServiceResult<T> {
  StatusCode: number;
  IsSuccess: boolean;
  ErrorMessage: any;
  Result: T;
  FileName?: any;
}
