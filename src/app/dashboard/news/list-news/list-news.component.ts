import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";

import {FormBuilder, FormGroup} from "@angular/forms";

import {Router} from "@angular/router";
import {News} from "../../../models/newsletter.models";
import {NewsService} from "../../../services/news/news.service";

import {AppUser} from "../../../models/app-user.models";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {AppUserService} from "../../../services/app-user/app-user.service";

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.css']
})
export class ListNewsComponent implements OnInit {

  roles: string[] = [];
  isLoggedIn = false;
  isAdmin : boolean = false;
  isUser : boolean = false;
  isEditor : boolean = false;
  username?: string;
  email1!: any;
  newsData!: Observable<Array<News>>;
  errorNewsMessage!:string;
  currentUser!: AppUser;
  currentPage: number = 0;
  totalPages!: number;
  pageSize: number = 5;


  news!: Observable<Array<News>>;
  errorMessage!:string;
  searchFormGroup: FormGroup | undefined;
  constructor(private authenticationService: AuthenticationService,private userService: AppUserService,private newsService: NewsService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(null)
    });
    this.listNews();
    this.handleCurrentAppUser();
    this.handleGetTotalPageNews();



  }


  handleSearchNews() {
    let kw = this.searchFormGroup?.value.keyword;
    this.news =  this.newsService.searchNews(kw).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  listNews(){
    this.newsData = this.newsService.listNews(this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorNewsMessage = err.message;
        return throwError(err);
      })
    );
  }

  handleDeleteNews(email: News) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.newsService.deleteNewsById(email.id).subscribe({
      next: value => {
        this.news = this.news.pipe(
          map(data=>{
            let index = data.indexOf(email)
            data.slice(index,1)
            return data;
          }))

      },
      error: err => {
        console.log(err);
      }
    })

  }

  handleDetailNews(id: number){
    this.router.navigate(['detailNews', id]);
  }

  handleUpdateNews(id: number){
    this.router.navigate(['updateNews', id]);
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
    this.listNews();
  }

  reloadPage(page: number) {
    this.currentPage = page - 1;
    this.listNews();
  }


  handleGetTotalPageNews(){
    this.email1 = this.newsService.listNews(this.currentPage, this.pageSize).subscribe({
      next: value => {
        this.totalPages = value[0].totalPages;
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
