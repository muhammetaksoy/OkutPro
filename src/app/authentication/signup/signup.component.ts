import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '@core/services/general/authentication.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  authForm!: UntypedFormGroup;
  submitted = false;
  returnUrl!: string;
  hide = true;
  chide = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private toasterService: ToastrService
  ) {}
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      NameSurname: ['', Validators.required],
      Email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      Pwd: ['', Validators.required],
      ConfirmPwd: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    } else {
      if (this.authForm.value.Pwd !== this.authForm.value.ConfirmPwd) {
        this.toasterService.error('Girilen şifreler aynı olmalı');
      } else {

        const model: any = {
          NameSurname: this.authForm.value.NameSurname,
          Email: this.authForm.value.Email,
          Pwd: this.authForm.value.Pwd,
          Lang: 'tr',
        };

        this.authService.register(model).subscribe({
          next: (res) => {
            if (res && res.isSuccess) {
              this.router.navigate(['/authentication/signin']);
              this.toasterService.success(res.status_tr);
            } else {
              this.toasterService.error(res.status_tr);
            }
          },
          error: (error) => {
            this.toasterService.error(error);
            this.submitted = false;
          },
        });
      }
    }
  }
}
