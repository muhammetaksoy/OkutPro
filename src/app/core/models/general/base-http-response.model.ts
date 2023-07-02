import { ServiceResult } from './service-result.model';

export interface BaseHttpResponse<T> {
  // pagingResult:PagingResult,
  ServiceResult: ServiceResult<T>;
}
