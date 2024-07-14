import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocaStoreService } from 'src/app/services/localStore/loca-store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  check: boolean = true;
  user: any
  constructor(private router: Router, private LocaStoreService: LocaStoreService, private cdr: ChangeDetectorRef) {
  }
  ngOnInit() {
    this.LocaStoreService.getStore("userInfor").subscribe(
      (response) => {
        console.log(response);
        this.user = response
        if (response.accessToken) {
          // location.reload();
          this.check = true
          console.log(this.check)
          this.cdr.detectChanges();
          console.log('Change detection triggered');
        } else {
          this.check = false
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }
  logout() {
    this.LocaStoreService.removeStore("userInfor")
    this.check = false
    this.router.navigate(['/login']);
  }
}
