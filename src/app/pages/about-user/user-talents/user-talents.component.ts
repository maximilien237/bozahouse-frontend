import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";

import {ActivatedRoute, Router, RouterLink} from "@angular/router";

import {TalentService} from "../../../services/talent/talent.service";
import {Talent} from "../../../models/talent.models";
import {AppUser} from "../../../models/app-user.models";
import {AppUserService} from "../../../services/app-user/app-user.service";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {Offer} from "../../../models/offer.models";
import { Page } from 'src/app/models/Page';
import {NavbarComponent} from "../../fragments/navbar/navbar.component";
import {AsyncPipe, DecimalPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FooterComponent} from "../../fragments/footer/footer.component";

@Component({
  selector: 'app-user-talents',
  templateUrl: './user-talents.component.html',
  styleUrls: ['./user-talents.component.css'],
  imports: [
    NavbarComponent,
    RouterLink,
    NgIf,
    AsyncPipe,
    DecimalPipe,
    FooterComponent,
    NgClass,
    NgForOf
  ],
  standalone: true
})
export class UserTalentsComponent implements OnInit {

  currentUser!: AppUser;
  errorMessageAppUser!:string;

  id!: number;
  errorMessage!:string;
  currentPage: number = 0;
  totalPages!: number;
  pageSize: number = 5;
  userTalents!: Observable<Page<Talent>>;
  userTalents1!: any;

  constructor(private router: Router, private authenticationService: AuthenticationService, private userService: AppUserService, private activatedRoute: ActivatedRoute, private talentService: TalentService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.handleGetTotalPageAppUserTalents();
    this.handleListAppUserTalents();


  }

  handleDeleteTalent(talent: Talent) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.talentService.deleteTalent(talent.id).subscribe({
      next: value => {
        this.userTalents = this.userTalents.pipe(
          map(data=>{
            let index = data.content.indexOf(talent)
            data.content.slice(index,1)
            return data;
          }))

      },
      error: err => {
        console.log(err);
      }
    })

  }

  handleDetailTalent(id: number){
    this.router.navigate(['detailTalent', id]);
  }

  handleUpdateTalent(id: number){
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
            let index = data.content.indexOf(talent)
            data.content.slice(index,1)
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
            let index = data.content.indexOf(talent)
            data.content.slice(index,1)
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
        this.totalPages = value.totalPages;
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
