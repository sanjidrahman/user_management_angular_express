import { Component } from '@angular/core';
import { AppServiceService } from '../../services/app-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isAuth = false
  token: any

  constructor(
    private _router: Router,
    private _toastr: ToastrService,
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('usertoken')
    if (token) this.isAuth = true
  }

  logout() {
    localStorage.removeItem('usertoken')
    this._router.navigate([''])
    this._toastr.success('Logged out successfully')
  }

}
