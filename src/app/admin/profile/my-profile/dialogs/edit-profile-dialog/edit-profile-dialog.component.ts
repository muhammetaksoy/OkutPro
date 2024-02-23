import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { formatDate } from '@angular/common';
import { ProfileService } from 'app/admin/profile/profile.service';

@Component({
  selector: 'app-edit-profile-dialog:not(f)',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss'],
})
export class EditProfileDialogComponent {
  dialogTitle?: string;
  stdForm: UntypedFormGroup;
  profileData: any;
  constructor(
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public profileService: ProfileService,
    private fb: UntypedFormBuilder
  ) {
    console.log('data', this.data);
    this.dialogTitle = data.NameSurname;
    this.profileData = data;

    this.stdForm = this.createContactForm();
  }

  createContactForm(): UntypedFormGroup {


    return this.fb.group({
      NameSurname: [this.profileData.NameSurname],
      Email: [this.profileData.Email],
      PhoneNumber: [this.profileData.PhoneNumber],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
      const model:any={
        NameSurname: this.stdForm.value.NameSurname,
        Email:this.stdForm.value.Email,
        PhoneNumber: this.stdForm.value.PhoneNumber,
      }
       this.profileService.updateProfile(model);
  
  }
}
