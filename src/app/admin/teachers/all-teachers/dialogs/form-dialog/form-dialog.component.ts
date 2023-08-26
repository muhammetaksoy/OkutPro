import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { formatDate } from '@angular/common';
import { Students } from 'app/admin/students/all-students/students.model';
import { StudentsService } from 'app/admin/students/all-students/students.service';

export interface DialogData {
  id: number;
  action: string;
  students: Students;
}

@Component({
  selector: 'app-form-dialog:not(f)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  stdForm: UntypedFormGroup;
  students: Students;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public studentsService: StudentsService,
    private fb: UntypedFormBuilder
  ) {


        // Set the defaults
        this.action = data.action;
        if (this.action === 'edit') {
          
          this.dialogTitle =data.students.StudentName;
          this.students = data.students;
        } else {
          this.dialogTitle = 'Yeni Öğrenci';
          const blankObject = {} as Students;
          this.students = new Students(blankObject);
        }
        this.stdForm = this.createContactForm();
  }


  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      StudentId:[this.students.StudentId],
      StudentNameSurname: [this.students.StudentName],
      StudentGrade: [this.students.Grade],
      SchoolName:[null],
      ParentNameSurname: [this.students.ParentNameSurname],
      ParentPhoneNumber: [this.students.ParentPhoneNumber],
      ParentEmail: [this.students.ParentEmail,[Validators.email, Validators.minLength(5)]],
      isDiagnosed: [null],
      DiagnoseType: [null],
      Lang: ["tr"],
      Notes:[null]
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if(this.action === 'add'){
      const addModel:any={
        StudentNameSurname:this.stdForm.value.StudentNameSurname,
        Grade: this.stdForm.value.StudentGrade,
        SchoolName:this.stdForm.value.SchoolName,
        ParentNameSurname: this.stdForm.value.ParentNameSurname,
        ParentPhoneNumber: this.stdForm.value.ParentPhoneNumber,
        ParentEmail: this.stdForm.value.ParentEmail,
        isDiagnosed: this.stdForm.value.isDiagnosed == "true" ? true :false,
        DiagnoseType: this.stdForm.value.isDiagnosed == "true" ? "Dyslexia" : "",
        Lang: "tr",
        Notes: this.stdForm.value.Notes
      }
     this.studentsService.addStudents(addModel);
    }else{
      const addModel:any={
        StudentId:this.stdForm.value.StudentId,
        StudentGrade: this.stdForm.value.StudentGrade,
        StudentNameSurname:this.stdForm.value.StudentNameSurname,
        ParentNameSurname: this.stdForm.value.ParentNameSurname,
        ParentEmail: this.stdForm.value.ParentEmail,
        ParentPhoneNumber: this.stdForm.value.ParentPhoneNumber
      }
     this.studentsService.updateStudents(addModel);
     //this.studentsService.getAllStudentss();
    }

  }
}
