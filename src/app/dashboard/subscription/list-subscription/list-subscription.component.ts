import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";

import {FormBuilder, FormGroup} from "@angular/forms";

import {Router} from "@angular/router";
import {Subscription} from "../../../models/subscription.models";
import {SubscriptionService} from "../../../services/subscription/subscription.service";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {AppUserService} from "../../../services/app-user/app-user.service";
import {AppUser} from "../../../models/app-user.models";

@Component({
  selector: 'app-list-subscription',
  templateUrl: './list-subscription.component.html',
  styleUrls: ['./list-subscription.component.css']
})
export class ListSubscriptionComponent implements OnInit {


  roles: string[] = [];
  isLoggedIn = false;
  isAdmin : boolean = false;
  isUser : boolean = false;
  isEditor : boolean = false;
  username?: string;
  currentUser!: AppUser;
  errorMessageAppUser!:string;


  currentPage: number = 0;
  totalPages!: number;
  pageSize: number = 5;

  subscriptions1!:any;
  subscriptions!: Observable<Array<Subscription>>;
  errorMessage!:string;
  searchFormGroup: FormGroup | undefined;
  constructor(private subscriptionService: SubscriptionService, private fb: FormBuilder, private router: Router, private authenticationService: AuthenticationService, private userService: AppUserService) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(null)
    });
    this.listSubscription();
    this.handleGetTotalPageSubscriptions();

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


  goToPage(page: number) {
    this.currentPage = page;
    this.listSubscription();
  }


  handleGetTotalPageSubscriptions(){
    this.subscriptions1 = this.subscriptionService.listSubscription(this.currentPage, this.pageSize).subscribe({
      next: value => {
        this.totalPages = value[0].totalPages;
        console.log(this.totalPages);
      },
      error: err => {
        console.log(err);
      }
    });
  }


  listSubscription(){
    this.subscriptions = this.subscriptionService.listSubscription(this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  handleDeleteSubscription(subscription: Subscription) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.subscriptionService.deleteSubscriptionById(subscription.id).subscribe({
      next: value => {
        console.log(value);
        this.subscriptions = this.subscriptions.pipe(
          map(data=>{
            let index = data.indexOf(subscription)
            data.slice(index,1)
            return data;
          }))

      },
      error: err => {
        console.log(err);
      }
    })

  }

  handleUpdateSubscription(id: number) {

    this.router.navigate(['updateSubscription', id]);
  }

  handleDetailSubscription(id: number) {

    this.router.navigate(['detailSubscription', id]);
  }


  handleCurrentAppUser(){
    this.userService.getAccount().subscribe({
      next: value => {
        console.log(value);
        this.currentUser = value;
      },
      error: err => {
        console.log(err);
        this.errorMessageAppUser = err.error.message;
      }
    })
  }

  goToPreviousPage() {
    this.currentPage = this.currentPage - 1;
    this.listSubscription();
  }
}
