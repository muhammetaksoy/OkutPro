import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../profile.service';
import { Direction } from '@angular/cdk/bidi';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { EditProfileDialogComponent } from './dialogs/edit-profile-dialog/edit-profile-dialog.component';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  // breadscrums = [
  //   {
  //     title: 'Admin',
  //     items: ['Öğrenci'],
  //     active: 'Profil Detay',
  //   },
  // ];

  detayVeri?: any;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  ngOnInit(): any {
    this.getDetayData();
  }

  getDetayData(): void {
    this.profileService.getMyProfile().subscribe((data) => {
      console.log('data', data);

      this.detayVeri = data;
    });
  }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  editProfile() {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      data:this.detayVeri,
      direction: tempDirection,
    });
    
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      console.log('result', result);

      if (result === 1) {
        this.profileService?.dataChange.value.unshift(
          this.profileService.getDialogData()
        );
        this.getDetayData();
        this.showNotification(
          'snackbar-success',
          'Profil başarıyla güncellendi...!!!',
          'bottom',
          'center'
        );
      }
    });
  }
}
