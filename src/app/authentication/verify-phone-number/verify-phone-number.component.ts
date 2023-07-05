import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '@core/services/general/authentication.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-verify-phone-number',
  templateUrl: './verify-phone-number.component.html',
  styleUrls: ['./verify-phone-number.component.scss'],
})
export class VerifyPhoneNumberComponent implements OnInit {
  verifyPhoneNumberForm!: UntypedFormGroup;
  returnUrl!: string;
  isCodeSent: boolean = false;
  showSentCodeButton: boolean = false;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private toasterService: ToastrService
  ) {}
  ngOnInit() {
    this.verifyPhoneNumberForm = this.formBuilder.group({
      phone: ['', Validators.required],
      code: ['', Validators.required],
    });
    // get return url from route parameters or default to '/'
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.verifyPhoneNumberForm.controls;
  }

  onChangeNumber(event: any): void {
    if (this.verifyPhoneNumberForm.value.phone.length === 10) {
      this.showSentCodeButton = true;
    } else {
      this.showSentCodeButton = false;
    }
  }

  sendMobileCode(): void {
    this.isCodeSent = true;
    this.authService
      .addPhoneNumber(this.verifyPhoneNumberForm.value.phone)
      .subscribe((res: any) => {
        if (res && res.smsSent) {
          this.toasterService.success(res.status_tr);
        } else {
          this.toasterService.error(res.status_tr);
        }
      });
  }

  verifyCode(): void {
    this.authService
      .verifySms(this.verifyPhoneNumberForm.value.code)
      .subscribe((res: any) => {
        if (res && res.isSuccess) {
          this.router.navigate(['/authentication/signin']);
          this.toasterService.success(res.status_tr);
        } else {
          this.toasterService.error(res.status_tr);
        }
      });
  }
}
