import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../services/token/token-storage.service";
import {AuthenticationService} from "../../../services/authentication/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  isAdmin : boolean = false;
  isEditor : boolean = false;
  username?: string;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.authenticationService.getToken();

    if (this.isLoggedIn) {
      const user = this.authenticationService.getUser();
      this.roles = user.roles;


      this.isAdmin = this.roles.indexOf("ADMIN")>-1;
      this.isEditor = this.roles.indexOf("EDITOR")>-1;


      this.username = user.username;
    }
  }

  logout(): void {
    localStorage.clear();
    //window.location.reload();
  }


}
