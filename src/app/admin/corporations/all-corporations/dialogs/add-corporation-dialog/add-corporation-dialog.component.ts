import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { formatDate } from '@angular/common';
import { CorporationService } from '../../corporations.service';
import { AllCorporations } from '../../all-corporations.model';


export interface DialogData {
  id: number;
  action: string;
  corporations: AllCorporations;
}

@Component({
  selector: 'app-add-corporation-dialog:not(f)',
  templateUrl: './add-corporation-dialog.component.html',
  styleUrls: ['./add-corporation-dialog.component.scss'],
})
export class AddCorporationDialogComponent {
  action: string;
  dialogTitle?: string;
  addCorporationForm: UntypedFormGroup;
  corporations?: AllCorporations;
  constructor(
    public dialogRef: MatDialogRef<AddCorporationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public corporationService: CorporationService,
    private fb: UntypedFormBuilder
  ) {

        // Set the defaults
        this.action = data.action;
        if (this.action === 'edit') {
          this.dialogTitle =data.corporations.CorporationName;
          this.corporations = data.corporations;
        } 
        // else {
        //   this.dialogTitle = 'Kredi Ekle';
        //   const blankObject = {} as any;
        //   this.teachers = new AllTeachers(blankObject);
        // }
        this.addCorporationForm = this.createCorporationForm();

  }


  createCorporationForm(): UntypedFormGroup {
    return this.fb.group({
      Name:[this.corporations?.CorporationName],
      PhoneNumber: [this.corporations?.PhoneNumber],
      BaseAddress: [this.corporations?.BaseAddress],
      Email:[this.corporations?.Email],
      City: [this.corporations?.City],
      Country: [this.corporations?.Country],
      Credits: [this.corporations?.Credits],
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if(this.action === 'add'){
      const addModel:any={
        Name:this.addCorporationForm.value.Name,
        PhoneNumber: this.addCorporationForm.value.PhoneNumber,
        BaseAddress: this.addCorporationForm.value.BaseAddress,
        Email:this.addCorporationForm.value.Email,
        City: this.addCorporationForm.value.City,
        Country: this.addCorporationForm.value.Country,
        Credits:this.addCorporationForm.value.Credits
      }
     this.corporationService.addCorporations(addModel);
    }else{
    //   const addModel:any={
    //     StudentId:this.stdForm.value.StudentId,
    //     StudentGrade: this.stdForm.value.StudentGrade,
    //     StudentNameSurname:this.stdForm.value.StudentNameSurname,
    //     ParentNameSurname: this.stdForm.value.ParentNameSurname,
    //     ParentEmail: this.stdForm.value.ParentEmail,
    //     ParentPhoneNumber: this.stdForm.value.ParentPhoneNumber
    //   }
    //  this.studentsService.updateStudents(addModel);
    //  //this.studentsService.getAllStudentss();
    }

  }
}
