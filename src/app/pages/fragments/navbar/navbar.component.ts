import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../services/token/token-storage.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication/authentication.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  roles: string[] = [];
  isLoggedIn = false;
  isAdmin : boolean =false;
  isUser : boolean =false;
  isEditor : boolean =false;
  username?: string;

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.authenticationService.getToken();

    if (this.isLoggedIn) {
      const user = this.authenticationService.getUser();
      this.roles = user.roles;

      this.isAdmin = this.roles.indexOf("ADMIN")>-1;
      this.isEditor = this.roles.indexOf("EDITOR")>-1;
      this.isUser = this.roles.indexOf("USER")>-1;

      this.username = user.username;
    }
  }

  logout(): void {
   localStorage.clear();
    //window.location.reload();
    this.router.navigateByUrl("/login");
  }

}
