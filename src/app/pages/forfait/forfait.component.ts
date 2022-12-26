import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {AppUserService} from "../../services/app-user/app-user.service";

import {AppUser} from "../../models/app-user.models";


@Component({
  selector: 'app-forfait',
  templateUrl: './forfait.component.html',
  styleUrls: ['./forfait.component.css']
})
export class ForfaitComponent implements OnInit {


  roles: string[] = [];
  isLoggedIn = false;
  isAdmin: boolean = false;
  isUser: boolean = false;
  isEditor: boolean = false;
  username?: string;
  errorMessage!: string;
  currentUser!: AppUser;



  constructor(private authenticationService: AuthenticationService, private userService: AppUserService) {
  }

  ngOnInit(): void {

    this.handleCurrentAppUser();
    this.isLoggedIn = !!this.authenticationService.getToken();

    if (this.isLoggedIn) {
      const user = this.authenticationService.getUser();
      this.roles = user.roles;

      this.isAdmin = this.roles.indexOf("ADMIN") > -1;
      this.isEditor = this.roles.indexOf("EDITOR") > -1;
      this.isUser = this.roles.indexOf("USER") > -1;

      this.username = user.username;


    }

  }

  handleCurrentAppUser(){
    this.userService.getAccount().subscribe({
      next: value => {
        console.log(value);
        this.currentUser = value;
      },
      error: err => {
        console.log(err);
        this.errorMessage = err.error.message;
      }
    })
  }




}
