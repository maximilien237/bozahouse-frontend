import { Component, OnInit } from '@angular/core';

import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {AppUser} from "../../../models/app-user.models";
import {AppUserService} from "../../../services/app-user/app-user.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {OfferService} from "../../../services/offer/offer.service";
import {TalentService} from "../../../services/talent/talent.service";
import {Offer} from "../../../models/offer.models";
import {Talent} from "../../../models/talent.models";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  id!: number;
  username?: string;
  errorTalentMessage!: string;
  errorOfferMessage!: string;
  currentUser!: AppUser;
  errorMessage!: string;
  totalPagesOffer!: number;
  totalPagesTalent!: number;
  pageSizeOffer: number = 6;
  pageSizeTalent: number = 6;
  currentPageOffer: number = 1;
  currentPageTalent: number = 1;
  offers!: Offer[];
  talents!: Talent[];





  constructor(private talentService: TalentService,private offerService: OfferService
              , private authenticationService: AuthenticationService
              , private userService: AppUserService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.handleCurrentAppUser();

    this.listOfferByAppUser();
    this.listTalentByAppUser();

      this.username = this.authenticationService.getUsernameFromToken();

  }



  handleListAppUserOffer(id: number) {
    this.router.navigate(['userOffers', id]);
  }

  handleListAppUserTalent(id: number) {
    this.router.navigate(['userTalents', id]);
  }

  handleListAppUserTestimony(id: number) {
    this.router.navigate(['userTestimonies', id]);
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

  goToNextPageOffer(page: number){
    this.currentPageOffer = page;
    this.listOfferByAppUser();
  }

  goToNextPageTalent(page: number){
    this.currentPageTalent = page;
    this.listTalentByAppUser();
  }





  listOfferByAppUser() {
     this.offerService.listOfferByAppUser(this.currentUser.id!,this.currentPageOffer, this.pageSizeOffer).subscribe({
      next: value => {
        this.offers = value
      }
    })
  }

  listTalentByAppUser() {
     this.talentService.listTalentByAppUser(this.currentUser.id!,this.currentPageTalent, this.pageSizeTalent).subscribe({
       next: value => {
         this.talents = value
       }
     })
  }




  handleDeleteOffer(offer: Offer) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.offerService.deleteOffer(offer.id!).subscribe({
      next: value => {
        console.log(value);

      },
      error: err => {
        console.log(err);
      }
    })

  }

  handleDeleteTalent(talent: Talent) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.talentService.deleteTalent(talent.id).subscribe({
      next: value => {
        console.log(value);

      },
      error: err => {
        console.log(err);
      }
    })

  }

  handleDetailOffer(id: number) {
    this.router.navigate(['detailOffer', id]);
  }

  handleUpdateOffer(id: number) {
    this.router.navigate(['updateOffer', id]);
  }

  handleDetailTalent(id: number) {
    this.router.navigate(['detailTalent', id]);
  }

  handleUpdateTalent(id: number) {
    this.router.navigate(['updateTalent', id]);
  }



}
