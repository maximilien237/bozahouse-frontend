import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class IsEditorGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let isEditor = this.authenticationService.getUser().roles.indexOf("EDITOR")>-1;

    if (!isEditor){
      this.router.navigateByUrl("/home");
      return false;
    }else {
      return true;
    }

  }

}
