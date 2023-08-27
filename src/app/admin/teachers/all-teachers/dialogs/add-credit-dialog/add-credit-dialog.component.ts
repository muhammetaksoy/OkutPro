import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { formatDate } from '@angular/common';
import { AllTeachers } from '../../all-teachers.model';
import { TeacherService } from '../../teacher.service';

export interface DialogData {
  id: number;
  action: string;
  teachers: AllTeachers;
}

@Component({
  selector: 'app-add-credit-dialog:not(f)',
  templateUrl: './add-credit-dialog.component.html',
  styleUrls: ['./add-credit-dialog.component.scss'],
})
export class AddCreditDialogComponent {
  action: string;
  dialogTitle: string;
  stdForm: UntypedFormGroup;
  teachers: AllTeachers;
  constructor(
    public dialogRef: MatDialogRef<AddCreditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public teachersService: TeacherService,
    private fb: UntypedFormBuilder
  ) {


        // Set the defaults
        this.action = data.action;
        if (this.action === 'edit') {
          this.dialogTitle =data.teachers.NameSurname;
          this.teachers = data.teachers;
        } else {
          this.dialogTitle = 'Kredi Ekle';
          const blankObject = {} as AllTeachers;
          this.teachers = new AllTeachers(blankObject);
        }
        this.stdForm = this.createContactForm();

  }


  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      ExpertId:[this.teachers.ExpertId],
      Credits:[this.teachers.Credits],
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {    
    this.stdForm.value.ExpertId= this.data.teachers.ExpertId;
    if(this.action === 'add'){
      const model:any={
        ExpertId:this.stdForm.value.ExpertId,
        Credits:this.stdForm.value.Credits
      }
     this.teachersService.getAddCreditToExpert(model);
    }
  }
}
