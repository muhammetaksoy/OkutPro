import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Students } from './students.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { environment } from 'environments/environment';
import { Endpoint } from '@core/enums/endpoint.enum';
@Injectable()
export class StudentsService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dataChange: BehaviorSubject<Students[]> = new BehaviorSubject<Students[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Students;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Students[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllStudentss(): void {
    this.subs.sink = this.httpClient.get<Students[]>(environment.apiUrl + Endpoint.student_GetAllStudents).subscribe({
      next: (data:any) => {
        console.log("data,",data.Students);
        this.isTblLoading = false;
        this.dataChange.next(data.Students);
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



  addStudents(students: Students): void {
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
  updateStudents(students: Students): void {
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
