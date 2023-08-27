import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {AllTeachers } from './all-teachers.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { environment } from 'environments/environment';
import { Endpoint } from '@core/enums/endpoint.enum';
@Injectable()
export class TeacherService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dataChange: BehaviorSubject<AllTeachers[]> = new BehaviorSubject<
  AllTeachers[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: AllTeachers;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): AllTeachers[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllStaffAttendances(): void {
    this.subs.sink = this.httpClient
      .get<AllTeachers[]>(environment.apiUrl + Endpoint.teacher_GetExpertList)
      .subscribe({
        next: (data:any) => {
          this.isTblLoading = false;
          this.dataChange.next(data.Experts);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }

  getTeacherInfoById(ExpertId: string): Observable<any> {
    return this.httpClient.get(environment.apiUrl + Endpoint.teacher_GetExpertProfile+'?expertId='+ExpertId);
  }

  // getAddCreditToExpert(ExpertId: any,Credits:any): Observable<any> {
  //   return this.httpClient.get(environment.apiUrl + Endpoint.teacher_AddCreditToExpert+'?expertId='+ExpertId +'&credits='+Credits);
  // }


  getAddCreditToExpert(teachers: AllTeachers): void {
    this.dialogData = teachers;

    this.httpClient.get(environment.apiUrl + Endpoint.teacher_AddCreditToExpert+'?expertId='+teachers.ExpertId +'&credits='+teachers.Credits)
      .subscribe({
        next: (data:any) => {
          this.dialogData = data;
        },
        error: (error: HttpErrorResponse) => {
           // error code here
        },
      });
  }




}
