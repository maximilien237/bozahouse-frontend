import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication/authentication.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  username?: string;

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.username = this.authenticationService.getUsernameFromToken();
  }

  logout(): void {
    localStorage.clear();
    //window.location.reload();
    this.router.navigateByUrl("/login");
  }

}
