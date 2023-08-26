import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { environment } from 'environments/environment';
import { Endpoint } from '@core/enums/endpoint.enum';
import { Teachers } from './teachers.model';
@Injectable()
export class TeachersService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dataChange: BehaviorSubject<Teachers[]> = new BehaviorSubject<Teachers[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Teachers;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Teachers[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  getAllTeachers(): void {
    this.subs.sink = this.httpClient.get<Teachers[]>(environment.apiUrl + Endpoint.teacher_GetExpertList).subscribe({
      next: (data:any) => {
        console.log("data,",data.Experts);
        this.isTblLoading = false;
        this.dataChange.next(data.Experts);
      },
      error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      },
    });
  }





  // getStudentInfoById(StudentId:number): void {
  //   this.subs.sink = this.httpClient.get<Students[]>(environment.apiUrl + Endpoint.student_GetStudentInfo+'?='+StudentId).subscribe({
  //     next: (data:any) => {
  //       this.isTblLoading = false;
  //       this.dataChange.next(data.Students);
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       this.isTblLoading = false;
  //       console.log(error.name + ' ' + error.message);
  //     },
  //   });
  // }




  getStudentInfoById(StudentId: string): Observable<any> {
    return this.httpClient.get(environment.apiUrl + Endpoint.student_GetStudentInfo+'?studentId='+StudentId);
  }



  addStudents(students: Teachers): void {
    this.dialogData = students;

    this.httpClient.post(environment.apiUrl + Endpoint.student_AddStudent, students)
      .subscribe({
        next: (data) => {
          this.dialogData = students;
        },
        error: (error: HttpErrorResponse) => {
           // error code here
        },
      });
  }
  updateStudents(students: Teachers): void {
    this.dialogData = students;

    this.httpClient.post(environment.apiUrl + Endpoint.student_EditStudent, students)
        .subscribe({
          next: (data) => {
            this.dialogData = students;
          },
          error: (error: HttpErrorResponse) => {
             // error code here
          },
        });
  }
  deleteStudents(id: number): void {
    console.log(id);

    // this.httpClient.delete(this.API_URL + id)
    //     .subscribe({
    //       next: (data) => {
    //         console.log(id);
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
}
