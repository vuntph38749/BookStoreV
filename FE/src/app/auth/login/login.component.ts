import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { LocaStoreService } from 'src/app/services/localStore/loca-store.service';
import { CartsService } from 'src/app/services/carts/carts.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent {
  constructor(
    private AuthService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private LocaStoreService: LocaStoreService,
    private CartsService: CartsService,
  ) {

  }
  dataUpload: any = {}
  submitted = false
  regex: any = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  isEmail(email: any): boolean {
    return this.regex.test(email)
  }
  onsubmit() {
    this.submitted = true

    if (this.dataUpload.email && this.dataUpload.password && this.isEmail(this.dataUpload.email)) {
      this.AuthService.checkLogin(this.dataUpload).subscribe(
        (response: any) => {
          console.log(response)
          const a = {
            accessToken: response.accessToken,
            email: response.user.email,
            name: response.user.name,
            id: response.user._id,
            status: response.user.status,
            role: response.user.role
          }
          this.AuthService.setToken(a.accessToken)
          this.LocaStoreService.setStore('userInfor', a)

          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Login successfully', life: 2000 });
          if (response.user.role === 'user') {
            setTimeout(() => this.router.navigate(['/home']), 2000)
          } else {
            setTimeout(() => this.router.navigate(['/admin']), 2000)
          }
          this.CartsService.getcartUser(response.user._id).subscribe(
            (response1: any) => {
              console.log(response1)

              this.LocaStoreService.setStore('cart', response1.data)
            },
            (error) => {
              console.log(error)
            }
          )
        },
        (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        }
      )
    }
  }
  ngOnInit() {
    this.LocaStoreService.getStore("userInfor").subscribe(
      (response) => {
        if (response.accessToken) {
          this.router.navigate(['/home']);
        }
      }
    )
  }
}
