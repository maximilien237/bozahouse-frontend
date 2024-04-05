import { Component, OnInit } from '@angular/core';
import {AppUser} from "../../../models/app-user.models";
import {catchError, Observable, throwError} from "rxjs";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {AppUserService} from "../../../services/app-user/app-user.service";
import {TestimonyService} from "../../../services/testimony/testimony.service";
import {Testimony} from "../../../models/testimony.models";
import {NavbarComponent} from "../../fragments/navbar/navbar.component";
import {AsyncPipe, DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FooterComponent} from "../../fragments/footer/footer.component";

@Component({
  selector: 'app-user-testimonies',
  templateUrl: './user-testimonies.component.html',
  styleUrls: ['./user-testimonies.component.css'],
  imports: [
    NavbarComponent,
    AsyncPipe,
    NgForOf,
    NgIf,
    DatePipe,
    NgClass,
    RouterLink,
    FooterComponent
  ],
  standalone: true
})
export class UserTestimoniesComponent implements OnInit {

  currentUser!: AppUser;
  errorMessageAppUser!:string;


  id!: string;
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
