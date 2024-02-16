import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppServiceService } from '../../services/app-service.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { IUserModel } from '../../interfaces/app.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  userData!: IUserModel
  subscribe = new Subscription()

  constructor(
    private _service: AppServiceService,
    private _toastr: ToastrService,
  ){}

  ngOnInit(): void {
    this.subscribe.add(
      this._service.userDetails().subscribe({
        next: (res) => {
          this.userData = res.userData
        },
        error: (err) => {
          this._toastr.error(err.error.message)
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }

}
