import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocaStoreService } from 'src/app/services/localStore/loca-store.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent {
  constructor(private AuthService: AuthService, private router: Router, private messageService: MessageService, private LocaStoreService:LocaStoreService) {

  }
  dataUpload: any = {}
  submitted = false
  regex: any = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  isEmail(email: any): boolean {
    return this.regex.test(email)
  }
  isrepass(password: string, rePassword: string): boolean {
    return rePassword === password
  }
  onsubmit() {
    this.submitted = true
    console.log(this.dataUpload)
    if (this.dataUpload.name && this.dataUpload.email && this.dataUpload.password && this.dataUpload.confirmPassword && this.isEmail(this.dataUpload.email)) {
      this.AuthService.register(this.dataUpload).subscribe(
        (response) => {
          console.log(response)
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Logup successfully', life: 2000 });
          setTimeout(() => this.router.navigate(['/login']), 2000)
        },
        (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        }
      )
    }

  }
  ngOnInit(){
    this.LocaStoreService.getStore("userInfor").subscribe(
      (response)=>{
        if(response.accessToken){
          this.router.navigate(['/home']);
        }
      }
    )
  }
}
