import { Injectable } from '@angular/core';
import { BaseHttpService } from '../general/base-http.service';
import { HttpClient } from '@angular/common/http';
import { Endpoint } from '@core/enums/endpoint.enum';



@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseHttpService {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  create(data:
    {
      CategoryRef: number;
      ProductName: string;
      Price: number;
      DiscountPrice: number;
      Status: boolean;
    }) {
    return this.basePost<any>(data, Endpoint.product_create);
  }


  delete(data: { ProductRef: number }) {
    return this.basePost<any>(data, Endpoint.product_delete);
  }

  get(ProductRef: number) {
    return this.baseGet<any>(Endpoint.product_get + '/' + ProductRef);
  }

  list() {
    return this.baseGet<any>(Endpoint.product_list);
  }

  listByFirmRef(firmRef: number) {
    return this.baseGet<any>(Endpoint.product_list + '/' + firmRef);
  }

  listBySearch(data: { SearchTerm: string }) {
    return this.basePost<any>(data, Endpoint.product_listBySearch);
  }

  listPriceType() {
    return this.baseGet<any>(Endpoint.product_pricetype_list);
  }

}
