import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { StudentsService } from 'app/admin/students/all-students/students.service';

export interface DialogData {
  StudentId: number;
  StudentName: string;
  Grade: string;
  ParentPhoneNumber: string;
}

@Component({
  selector: 'app-delete:not(f)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public studentsService: StudentsService
  ) {
    console.log("data",data);
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.studentsService.deleteStudents(this.data.StudentId);
  }
}
