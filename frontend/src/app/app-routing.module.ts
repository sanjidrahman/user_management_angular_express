import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { HomeComponent } from './components/home/home.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { authGuardGuard } from './guard/auth-guard.guard';

const routes: Routes = [
  { path: '', title: 'Registration', component: LoginRegisterComponent },
  { path: 'register', title: 'Registration', component: LoginRegisterComponent },
  { path: 'otp', title: 'otp verification', component: OtpVerificationComponent },
  { path: 'home', title: 'Home', component: HomeComponent, canActivate: [authGuardGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
