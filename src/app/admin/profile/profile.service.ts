import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { environment } from 'environments/environment';
import { Endpoint } from '@core/enums/endpoint.enum';
@Injectable()
export class ProfileService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): any[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  getMyProfile(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + Endpoint.expert_GetMyProfile);
  }

}
