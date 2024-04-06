import { Component, OnInit } from '@angular/core';
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

  }

  logout(): void {
   localStorage.clear();
    //window.location.reload();
    this.router.navigateByUrl("/login");
  }

}
