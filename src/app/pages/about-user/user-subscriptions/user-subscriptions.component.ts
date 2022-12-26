import { Component, OnInit } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {Subscription} from "../../../models/subscription.models";
import {ActivatedRoute, Router} from "@angular/router";
import {SubscriptionService} from "../../../services/subscription/subscription.service";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {AppUserService} from "../../../services/app-user/app-user.service";
import {AppUser} from "../../../models/app-user.models";

@Component({
  selector: 'app-user-subscriptions',
  templateUrl: './user-subscriptions.component.html',
  styleUrls: ['./user-subscriptions.component.css']
})
export class UserSubscriptionsComponent implements OnInit {

  roles: string[] = [];
  isLoggedIn = false;
  isAdmin : boolean = false;
  isUser : boolean = false;
  isEditor : boolean = false;
  username?: string;
  currentUser!: AppUser;
  errorMessageAppUser!:string;


  id!: string;
  errorMessage!:string;
  currentPage: number = 0;
  totalPages!: number;
  pageSize: number = 5;
  userSubscriptions!: Observable<Array<Subscription>>;
  userSubscriptions1!: any;

  constructor(private activatedRoute: ActivatedRoute, private subscriptionService: SubscriptionService, private router: Router,
              private authenticationService: AuthenticationService, private userService: AppUserService,) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.handleGetTotalPageAppUserSubscriptions();
    this.handleListAppUserSubscriptions();

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
    this.handleListAppUserSubscriptions();
  }

  goToPreviousPage() {
    this.currentPage = this.currentPage -1;
    this.handleListAppUserSubscriptions();
  }

  handleGetTotalPageAppUserSubscriptions(){
    this.userSubscriptions1 = this.subscriptionService.listSubscriptionByAppUser(this.id,this.currentPage, this.pageSize).subscribe({
      next: value => {
        this.totalPages = value[0].totalPages;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  handleListAppUserSubscriptions(){
    this.userSubscriptions = this.subscriptionService.listSubscriptionByAppUser(this.id, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
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
}
