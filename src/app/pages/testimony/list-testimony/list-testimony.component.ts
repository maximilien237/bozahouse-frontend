import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {AppUser} from "../../../models/app-user.models";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {AppUserService} from "../../../services/app-user/app-user.service";
import {Router} from "@angular/router";
import {Testimony} from "../../../models/testimony.models";
import {TestimonyService} from "../../../services/testimony/testimony.service";

@Component({
  selector: 'app-list-testimony',
  templateUrl: './list-testimony.component.html',
  styleUrls: ['./list-testimony.component.css']
})
export class ListTestimonyComponent implements OnInit {

  roles: string[] = [];
  isLoggedIn = false;
  isAdmin : boolean = false;
  isUser : boolean = false;
  isEditor : boolean = false;
  username?: string;
  testimonies!: any;
  testimonyData!: Observable<Array<Testimony>>;
  errorTestimonyMessage!:string;
  currentUser!: AppUser;
  currentPage: number = 0;
  totalPages!: number;
  pageSize: number = 5;


  testimonyList!: Observable<Array<Testimony>>;
  errorMessage!:string;

  constructor(private authenticationService: AuthenticationService,private userService: AppUserService,private testimonyService: TestimonyService, private router: Router) { }

  ngOnInit(): void {

    this.listTestimony();
    this.handleCurrentAppUser();
    this.handleGetTotalPageTestimony();



  }

  listTestimony(){
    this.testimonyData = this.testimonyService.listTestimony(this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorTestimonyMessage = err.message;
        return throwError(err);
      })
    );
  }

  handleDeleteTestimony(testimony1: Testimony) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.testimonyService.deleteTestimonyById(testimony1.id).subscribe({
      next: value => {
        this.testimonyList = this.testimonyList.pipe(
          map(data=>{
            let index = data.indexOf(testimony1)
            data.slice(index,1)
            return data;
          }))

      },
      error: err => {
        console.log(err);
      }
    })

  }

  handleUpdateTestimony(id: number){
    this.router.navigate(['updateTestimony', id]);
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


  goToPage(page: number) {
    this.currentPage = page;
    this.listTestimony();
  }

  reloadPage(page: number) {
    this.currentPage = page - 1;
    this.listTestimony();
  }


  handleGetTotalPageTestimony(){
    this.testimonies = this.testimonyService.listTestimony(this.currentPage, this.pageSize).subscribe({
      next: value => {
        this.totalPages = value[0].totalPages;
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
