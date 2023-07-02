import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-verify-phone-number',
  templateUrl: './verify-phone-number.component.html',
  styleUrls: ['./verify-phone-number.component.scss'],
})
export class VerifyPhoneNumberComponent implements OnInit {
  verifyPhoneNumberForm!: UntypedFormGroup;
  returnUrl!: string;
  isCodeSent:boolean=false;
  showSentCodeButton:boolean=false;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.verifyPhoneNumberForm = this.formBuilder.group({
      phone: ['',Validators.required],
      code: ['',Validators.required],
    });
    // get return url from route parameters or default to '/'
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.verifyPhoneNumberForm.controls;
  }

  onChangeNumber(event:any):void{
    if(this.verifyPhoneNumberForm.value.phone.length===10){
        this.showSentCodeButton=true;
    }else{
        this.showSentCodeButton=false;
    }
  }

  sendMobileCode():void{
    this.isCodeSent=true;
  }

  verifyCode():void{

  }
}
