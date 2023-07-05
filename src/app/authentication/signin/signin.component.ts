import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Role, AuthService } from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { AuthenticationService } from '@core/services/general/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private toasterService: ToastrService
  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      Email: ['', Validators.required],
      Pwd: ['', Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';
    if (this.authForm.invalid) {
      this.error = 'Username and Password not valid !';
      return;
    } else {
      this.subs.sink = this.authService.login(this.authForm.value).subscribe({
        next: (res) => {
          if (res && res.isSuccess) {
            this.loading = false;
            this.toasterService.success(res.status_tr);
            this.router.navigate(['/admin/dashboard/main']);
            
          } else {
            this.loading = false;
            this.toasterService.error(res.status_tr);
            if (res.needPhoneNumberVerification) {
              this.router.navigate(['/authentication/verify-phone-number']);
            } 
          }
        },
        error: (error) => {
          this.error = error;
          this.toasterService.error(this.error);
          this.submitted = false;
          this.loading = false;
        },
      });
    }
  }
}
