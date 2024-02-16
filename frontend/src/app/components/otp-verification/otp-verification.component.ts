import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from '../../services/app-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit, OnDestroy {

  otpVerify!: FormGroup
  subscribe = new Subscription()

  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _service: AppServiceService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.otpVerify = this._fb.group({
      otp: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  onSubmit() {
    if (this.otpVerify.invalid) {
      return
    } else {
      let otp = this.otpVerify.getRawValue()
      this.subscribe.add(
        this._service.verifyOtp(otp).subscribe({
          next: (res) => {
            console.log(res, 'otp comp');
            
            localStorage.setItem('usertoken', res.token)
            this._router.navigate(['home'])
          },
          error: (err) => {
            this._toastr.error(err.error.message)
          }
        })
      )
    }
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}





