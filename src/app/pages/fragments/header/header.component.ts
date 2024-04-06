import { Component, OnInit } from '@angular/core';
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

  }

  logout(): void {
    localStorage.clear();
    //window.location.reload();
  }


}
