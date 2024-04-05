import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class IsEditorGuard  {
  constructor(private authenticationService: AuthenticationService, private router: Router) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let isEditor = this.authenticationService.hasAnyAuthority("EDITOR");

    if (!isEditor){
      this.router.navigateByUrl("/home");
      return false;
    }else {
      return true;
    }

  }

}
