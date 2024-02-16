import { Injectable } from '@angular/core';
import { AppModule } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ISuccessResp, IUserLogModel, IUserModel, IUserRegModel } from '../interfaces/app.interface';

@Injectable()
export class AppServiceService {

  commonUrl = environment.API_URL

  constructor(
    private _http: HttpClient
  ) { }

  registerUser(regData: IUserRegModel): Observable<any> {
    return this._http.post(`${this.commonUrl}/register`, regData)
  }

  loginUser(logData: IUserLogModel): Observable<ISuccessResp> {
    return this._http.post<ISuccessResp>(`${this.commonUrl}/login`, logData)
  }

  verifyOtp(otp: string): Observable<ISuccessResp> {
    return this._http.post<ISuccessResp>(`${this.commonUrl}/verify`, otp)
  }

  userDetails(): Observable<IUserModel> {
    return this._http.get<IUserModel>(`${this.commonUrl}/user`)
  }

}
