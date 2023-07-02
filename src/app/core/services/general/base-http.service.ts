import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { CoreHttpService } from './core-http.service';
import { environment } from 'environments/environment';
import { HeaderParameter } from '@core/models/general/header-parameter.model';
import { BaseHttpResponse } from '@core/models/general/base-http-response.model';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService extends CoreHttpService {
  apiUrl: string;

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.apiUrl = environment.apiUrl;
  }

  basePost<T>(
    data: any,
    endPointUrl: string,
    headerParameters?: HeaderParameter[],
    isFileRelatedRequest?: boolean
  ): Observable<BaseHttpResponse<T>> {
    return this.httpPost<T>(
      this.generateAPIUrl(endPointUrl),
      data,
      headerParameters,
      isFileRelatedRequest
    );
  }

  baseGet<T>(
    endPointUrl: string,
    headerParameters?: HeaderParameter[]
  ): Observable<BaseHttpResponse<T>> {
    return this.httpGet<T>(this.generateAPIUrl(endPointUrl), headerParameters);
  }

  baseGetFileByPost<T>(
    data: any,
    endPointUrl: string,
    headerParameters?: HeaderParameter[]
  ) {
    return this.httpGetFileByPost<T>(
      this.generateAPIUrl(endPointUrl),
      data,
      headerParameters
    );
  }

  baseGetFile<T>(endPointUrl: string, headerParameters?: HeaderParameter[]) {
    return this.httpGetFile<T>(
      this.generateAPIUrl(endPointUrl),
      headerParameters
    );
  }

  generateAPIUrl(endPointUrl: string, apiUrl?: string): string {
    return (apiUrl || this.apiUrl) + '/' + endPointUrl;
  }
}
