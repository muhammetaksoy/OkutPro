import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { environment } from 'environments/environment';
import { Endpoint } from '@core/enums/endpoint.enum';
import { AllCorporations } from './all-corporations.model';
@Injectable()
export class CorporationService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<
  any[]
  >([]);
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
  /** CRUD METHODS */
  getAllCorporations(): void {
    this.subs.sink = this.httpClient
      .get<any[]>(environment.apiUrl + Endpoint.admin_GetAllCorporations)
      .subscribe({
        next: (data:any) => {
          this.isTblLoading = false;
          this.dataChange.next(data.corporations);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }

  
  addCorporations(corporations: AllCorporations): void {
    this.dialogData = corporations;

    this.httpClient.post(environment.apiUrl + Endpoint.admin_AddCorporation, corporations)
      .subscribe({
        next: (data) => {
          this.dialogData = corporations;
        },
        error: (error: HttpErrorResponse) => {
           // error code here
        },
      });
  }












  // getTeacherInfoById(ExpertId: string): Observable<any> {
  //   return this.httpClient.get(environment.apiUrl + Endpoint.teacher_GetExpertProfile+'?expertId='+ExpertId);
  // }

  // getAddCreditToExpert(ExpertId: any,Credits:any): Observable<any> {
  //   return this.httpClient.get(environment.apiUrl + Endpoint.teacher_AddCreditToExpert+'?expertId='+ExpertId +'&credits='+Credits);
  // }



  // getAddCreditToExpert(teachers: AllTeachers): void {
  //   this.dialogData = teachers;

  //   this.httpClient.get(environment.apiUrl + Endpoint.teacher_AddCreditToExpert+'?expertId='+teachers.ExpertId +'&credits='+teachers.Credits)
  //     .subscribe({
  //       next: (data:any) => {
  //         this.dialogData = data;
  //       },
  //       error: (error: HttpErrorResponse) => {
  //          // error code here
  //       },
  //     });
  // }





}
