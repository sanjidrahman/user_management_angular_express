import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../validators/validators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppServiceService } from '../../services/app-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup
  registerForm!: FormGroup
  hide = true;
  hideConfirm = true;
  hideLogin = true;
  StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  subscribe = new Subscription()

  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _router: Router,
    private _service: AppServiceService,
  ) { }

  ngOnInit() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.registerForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.StrongPasswordRegx)]],
      confirmPass: ['', [Validators.required]]
    }, { validators: passwordMatchValidator('password', 'confirmPass') });

  }

  onLogin() {
    if (this.loginForm.invalid) {
      return
    } else {
      let logUser = this.loginForm.getRawValue()
      this.subscribe.add(
        this._service.loginUser(logUser).subscribe({
          next: (res) => {
            localStorage.setItem('usertoken', res.token)
            this._router.navigate(['/home'])
          },
          error: (err) => {
            if (err.status == 302) {
              this._router.navigate(['/otp'])
            } else {       
              this._toastr.error(err.error.message)
            }
          },
        })
      )
    }
  }


  onRegister() {
    if (this.registerForm.invalid) {
      return
    } else {
      let regUser = this.registerForm.value
      this.subscribe.add(
        this._service.registerUser(regUser).subscribe({
          next: () => {
            this._router.navigate(['/otp'])
          },
          error: (err) => {
            this._toastr.error(err.error.message)
          }
        }
        )
      )
    }
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }

}
