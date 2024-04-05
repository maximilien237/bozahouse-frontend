import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard  {

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let isAdmin = this.authenticationService.hasAnyAuthority("ADMIN");

    if (!isAdmin){
      this.router.navigateByUrl("/users");
      return false;
    }else {
      return true;
    }


  }

}
