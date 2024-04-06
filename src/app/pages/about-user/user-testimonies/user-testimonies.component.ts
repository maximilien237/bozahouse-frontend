import { Component, OnInit } from '@angular/core';
import {AppUser} from "../../../models/app-user.models";
import {catchError, Observable, throwError} from "rxjs";
import {Subscription} from "../../../models/subscription.models";
import {ActivatedRoute, Router} from "@angular/router";
import {SubscriptionService} from "../../../services/subscription/subscription.service";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {AppUserService} from "../../../services/app-user/app-user.service";
import {TestimonyService} from "../../../services/testimony/testimony.service";
import {Testimony} from "../../../models/testimony.models";

@Component({
  selector: 'app-user-testimonies',
  templateUrl: './user-testimonies.component.html',
  styleUrls: ['./user-testimonies.component.css']
})
export class UserTestimoniesComponent implements OnInit {

  roles: string[] = [];
  isLoggedIn = false;
  isAdmin : boolean = false;
  isUser : boolean = false;
  isEditor : boolean = false;
  username?: string;
  currentUser!: AppUser;
  errorMessageAppUser!:string;


  id!: number;
  errorMessage!:string;
  currentPage: number = 0;
  totalPages!: number;
  pageSize: number = 5;
  userTestimonies!: Observable<Array<Testimony>>;
  userTestimonies1!: any;

  constructor(private activatedRoute: ActivatedRoute, private testimonyService: TestimonyService, private router: Router,
              private authenticationService: AuthenticationService, private userService: AppUserService,) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.handleGetTotalPageAppUserTestimonies();
    this.handleListAppUserTestimonies();


  }

  goToPage(page: number) {
    this.currentPage = page;
    this.handleListAppUserTestimonies();
  }

  goToPreviousPage() {
    this.currentPage = this.currentPage -1;
    this.handleListAppUserTestimonies();
  }

  handleGetTotalPageAppUserTestimonies(){
    this.userTestimonies1 = this.testimonyService.listTestimonyByAppUser(this.id,this.currentPage, this.pageSize).subscribe({
      next: value => {
        this.totalPages = value[0].totalPages;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  handleListAppUserTestimonies(){
    this.userTestimonies = this.testimonyService.listTestimonyByAppUser(this.id, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
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


  handleUpdateTestimony(id: number) {
    this.router.navigate(['updateTestimony', id]);
  }
}
