import { LocaStoreService } from './../services/localStore/loca-store.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class MyGuardGuard implements CanActivate {
  token:any
  constructor(
    private router: Router,
    private authService: AuthService,
    private jwtHelper: JwtHelperService,
    private LocaStoreService: LocaStoreService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.LocaStoreService.getStore("userInfor").subscribe(
      (response)=>{
        this.token = response
      }
    )

    if (this.token.role) {
      console.log("decodedToken")
      // const decodedToken = this.jwtHelper.decodeToken(this.token.accessToken);
      // console.log(decodedToken)
      // const role = decodedToken.role;
      // console.log(role)
      if (this.token.role === 'admin') {
        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }

}
