import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";

import {ActivatedRoute, Router} from "@angular/router";

import {TalentService} from "../../../services/talent/talent.service";
import {Talent} from "../../../models/talent.models";
import {AppUser} from "../../../models/app-user.models";
import {AppUserService} from "../../../services/app-user/app-user.service";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {Offer} from "../../../models/offer.models";

@Component({
  selector: 'app-user-talents',
  templateUrl: './user-talents.component.html',
  styleUrls: ['./user-talents.component.css']
})
export class UserTalentsComponent implements OnInit {

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
  userTalents!: Observable<Array<Talent>>;
  userTalents1!: any;

  constructor(private router: Router, private authenticationService: AuthenticationService, private userService: AppUserService, private activatedRoute: ActivatedRoute, private talentService: TalentService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.handleGetTotalPageAppUserTalents();
    this.handleListAppUserTalents();



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

  handleDeleteTalent(talent: Talent) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.talentService.deleteTalent(talent.id).subscribe({
      next: value => {
        this.userTalents = this.userTalents.pipe(
          map(data=>{
            let index = data.indexOf(talent)
            data.slice(index,1)
            return data;
          }))

      },
      error: err => {
        console.log(err);
      }
    })

  }

  handleDetailTalent(id: string){
    this.router.navigate(['detailTalent', id]);
  }

  handleUpdateTalent(id: string){
    this.router.navigate(['updateTalent', id]);
  }



  handleEnableTalent(talent: Talent) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.talentService.enableTalent(talent.id).subscribe({
      next: value => {
        console.log(value);
        this.userTalents = this.userTalents.pipe(
          map(data=>{
            let index = data.indexOf(talent)
            data.slice(index,1)
            return data;
          }))

      },
      error: err => {
        console.log(err);
      }
    })

  }



  handleDisableTalent(talent: Talent) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.talentService.disableTalent(talent.id).subscribe({
      next: value => {
        console.log(value);
        this.userTalents = this.userTalents.pipe(
          map(data=>{
            let index = data.indexOf(talent)
            data.slice(index,1)
            return data;
          }))

      },
      error: err => {
        console.log(err);
      }
    })

  }

  goToPage(page: number) {
    this.currentPage = page;
    this.handleListAppUserTalents();
  }


  handleGetTotalPageAppUserTalents(){
    this.userTalents1 = this.talentService.listTalentByAppUser(this.id,this.currentPage, this.pageSize).subscribe({
      next: value => {
        this.totalPages = value[0].totalPages;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  handleListAppUserTalents(){
    this.userTalents = this.talentService.listTalentByAppUser(this.id, this.currentPage, this.pageSize).pipe(
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

  shared(){
    if (navigator.share){
      navigator.share({
        title: 'the link to share',
        url: 'http://localhost:59423/'
      }).then(()=>{
        console.log("thanks for sharing !");
      }).catch(console.error)
    }
  }

}
