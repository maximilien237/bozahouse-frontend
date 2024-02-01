import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {AppUser} from "../../../models/app-user.models";
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {AppUserService} from "../../../services/app-user/app-user.service";
import {AppRoleService} from "../../../services/app-role/app-role.service";
import {Router} from "@angular/router";
import {SubscriptionService} from "../../../services/subscription/subscription.service";
import {Subscription} from "../../../models/subscription.models";
import {Offer} from "../../../models/offer.models";

@Component({
  selector: 'app-list-app-user-disabled',
  templateUrl: './list-app-user-disabled.component.html',
  styleUrls: ['./list-app-user-disabled.component.css']
})
export class ListAppUserDisabledComponent implements OnInit {

  roles: string[] = [];
  isLoggedIn = false;
  isAdmin : boolean = false;
  isUser : boolean = false;
  isEditor : boolean = false;
  username?: string;

  users!: Observable<Array<AppUser>>;
  users1: any;
  errorMessage!:string;
  searchFormGroup: FormGroup | undefined;
  newSubscriptionFormGroup!: FormGroup;
  currentPage: number = 0;
  totalPages!: number;
  pageSize: number = 5;
  appUserSize: number = 0;
  appUserSizeDisabled: number = 0;



  constructor(private authenticationService: AuthenticationService,private userService: AppUserService,private roleService: AppRoleService, private fb: FormBuilder, private router: Router, private subscriptionService: SubscriptionService) { }

  ngOnInit(): void {

    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("", [Validators.pattern("^(?=.*[a-z0-9]).{3,12}$"),Validators.required, Validators.minLength(3), Validators.maxLength(12)])

    });

    this.handleSearchAppUsersDisabledByUsername();

    this.getTotalPageAppUser();


    this.isLoggedIn = !!this.authenticationService.getToken();

    if (this.isLoggedIn) {
      const user = this.authenticationService.getUser();
      this.roles = user.roles;

      this.isAdmin = this.roles.indexOf("ADMIN") > -1;
      this.isEditor = this.roles.indexOf("EDITOR") > -1;
      this.isUser = this.roles.indexOf("USER") > -1;

      //this.username = user.username;

    }


  }


  handleSearchAppUsersDisabledByUsername() {
    let kw = this.searchFormGroup?.value.keyword;
    this.users =  this.userService.searchAppUsersDisabledByUsername(kw,this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

/*  listAppUserDisabled(){
    this.users = this.userService.listAppUserDisabled(this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }*/



  getTotalPageAppUser(){
    let kw = this.searchFormGroup?.value.keyword;
    this.users1 = this.userService.searchAppUsersDisabledByUsername(kw,this.currentPage, this.pageSize).subscribe({
      next: value => {

        this.totalPages = value.length;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  handleEnableAppUser(appUser: AppUser) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.userService.enableAppUser(appUser.id).subscribe({
      next: value => {
        console.log(value);

      },
      error: err => {
        console.log(err);
      }
    })

  }



  handleDeleteUser(user: AppUser) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.userService.deleteAppUser(user.id).subscribe({
      next: value => {
        this.users = this.users.pipe(
          map(data=>{
            let index = data.indexOf(user)
            data.slice(index,1)
            return data;
          }))

      },
      error: err => {
        console.log(err);
      }
    })

  }

  handleListAppUserSubscription(id: number) {
    this.router.navigate(['userSubscriptions', id]);
  }

  handleListAppUserOffer(id: number) {
    this.router.navigate(['userOffers', id]);
  }

  handleListAppUserTalent(id: number) {
    this.router.navigate(['userTalents', id]);
  }

  handleAppUserDates(id: number){
    this.router.navigate(['userDates', id]);
  }

  handleDetailAppUser(id: number){
    this.router.navigate(['detailUser', id]);
  }

  handleUpdateAppUser(id: number){
    this.router.navigate(['updateUser', id]);
  }


  goToPage(page: number) {
    this.currentPage = page;
    this.handleSearchAppUsersDisabledByUsername();
  }

  goToPreviousPage() {
    this.currentPage = this.currentPage - 1;
    this.handleSearchAppUsersDisabledByUsername();
  }

  goToNextPage() {
    this.currentPage = this.currentPage + 1;
    this.handleSearchAppUsersDisabledByUsername();
  }

  reloadPage(page: number) {
    this.currentPage = page - 1;
    this.handleSearchAppUsersDisabledByUsername();
  }







}
