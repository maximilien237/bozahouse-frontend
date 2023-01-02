import { Component, OnInit } from '@angular/core';

import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {AppUser} from "../../../models/app-user.models";
import {AppUserService} from "../../../services/app-user/app-user.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {SubscriptionService} from "../../../services/subscription/subscription.service";
import {OfferService} from "../../../services/offer/offer.service";
import {TalentService} from "../../../services/talent/talent.service";
import {Offer} from "../../../models/offer.models";
import {Talent} from "../../../models/talent.models";
import {Subscription} from "../../../models/subscription.models";
import {ActivatedRoute, Router} from "@angular/router";
import {FilterOffer} from "../../../models/filterOffer.models";


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  id!: string;
  roles: string[] = [];
  isLoggedIn = false;
  isAdmin: boolean = false;
  isUser: boolean = false;
  isEditor: boolean = false;
  username?: string;
  offers!: Observable<Array<Offer>>;
  errorOfferMessage!: string;
  currentUser!: AppUser;
  errorMessage!: string;
  totalPagesOffer!: number;
  totalPagesTalent!: number;
  totalPagesSubscription!: number;
  pageSizeOffer: number = 5;
  pageSizeTalent: number = 5;
  pageSizeSubscription: number = 5;
  offers1!: any;
  subscriptions1!: any;
  talents1!: any;
  currentPageOffer: number = 0;
  currentPageTalent: number = 0;
  currentPageSubscription: number = 0;


  subscriptions!: Observable<Array<Subscription>>;
  talents!: Observable<Array<Talent>>;
  errorTalentMessage!: string;
  errorSubscriptionMessage!: string;




  constructor(private talentService: TalentService,private offerService: OfferService
              ,private subscriptionService: SubscriptionService, private authenticationService: AuthenticationService
              , private userService: AppUserService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.handleCurrentAppUser();

    this.listOfferByAppUser();
    this.listTalentByAppUser();
    this.listSubscriptionByAppUser();
    this.getTotalPageOffers();
    this.getTotalPageSubscriptions();
    this.getTotalPageTalents();

    this.isLoggedIn = !!this.authenticationService.getToken();

    if (this.isLoggedIn) {
      const user = this.authenticationService.getUser();
      this.roles = user.roles;

      this.isAdmin = this.roles.indexOf("ADMIN") > -1;
      this.isEditor = this.roles.indexOf("EDITOR") > -1;
      this.isUser = this.roles.indexOf("USER") > -1;

      this.username = user.username;


    }

  }


  handleListAppUserSubscription(id: string) {
    this.router.navigate(['userSubscriptions', id]);
  }

  handleListAppUserOffer(id: string) {
    this.router.navigate(['userOffers', id]);
  }

  handleListAppUserTalent(id: string) {
    this.router.navigate(['userTalents', id]);
  }

  handleListAppUserTestimony(id: string) {
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

  goToNextPageSubscription(page: number){
    this.currentPageSubscription = page;
    this.listSubscriptionByAppUser();
  }

  getTotalPageOffers() {
    this.offers1 =  this.offerService.listOfferByAppUser(this.currentUser.id,this.currentPageOffer, this.pageSizeOffer)
      .subscribe({
        next: value => {
          console.log(value);
          this.totalPagesOffer = value[0].totalPages;
        },
        error: err => {
          console.log(err);
        }
      });
  }


  getTotalPageTalents() {
    this.talents1 =  this.talentService.listTalentByAppUser(this.currentUser.id,this.currentPageTalent, this.pageSizeTalent)
      .subscribe({
        next: value => {
          console.log(value);
          this.totalPagesTalent = value[0].totalPages;
        },
        error: err => {
          console.log(err);
        }
      });
  }



  getTotalPageSubscriptions() {
    this.subscriptions1 =  this.subscriptionService.listSubscriptionByAppUser(this.currentUser.id, this.currentPageSubscription, this.pageSizeSubscription)
      .subscribe({
        next: value => {
          console.log(value);
          this.totalPagesSubscription = value[0].totalPages;
        },
        error: err => {
          console.log(err);
        }
      });
  }

  listOfferByAppUser() {
    this.offers = this.offerService.listOfferByAppUser(this.currentUser.id,this.currentPageOffer, this.pageSizeOffer).pipe(
      catchError(err => {
        this.errorOfferMessage = err.message;
        return throwError(err);
      })
    );
  }

  listTalentByAppUser() {
    this.talents = this.talentService.listTalentByAppUser(this.currentUser.id,this.currentPageTalent, this.pageSizeTalent).pipe(
      catchError(err => {
        this.errorTalentMessage = err.message;
        return throwError(err);
      })
    );
  }


  listSubscriptionByAppUser() {
    this.subscriptions = this.subscriptionService.listSubscriptionByAppUser(this.currentUser.id,this.currentPageSubscription, this.pageSizeSubscription).pipe(
      catchError(err => {
        this.errorSubscriptionMessage = err.message;
        return throwError(err);
      })
    );
  }

  handleDeleteOffer(offer: Offer) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.offerService.deleteOffer(offer.id).subscribe({
      next: value => {
        console.log(value);
        this.offers = this.offers.pipe(
          map(data => {
            let index = data.indexOf(offer)
            data.slice(index, 1)
            return data;
          }))

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
        this.talents = this.talents.pipe(
          map(data => {
            let index = data.indexOf(talent)
            data.slice(index, 1)
            return data;
          }))

      },
      error: err => {
        console.log(err);
      }
    })

  }

  handleDetailOffer(id: string) {
    this.router.navigate(['detailOffer', id]);
  }

  handleUpdateOffer(id: string) {
    this.router.navigate(['updateOffer', id]);
  }

  handleDetailTalent(id: string) {
    this.router.navigate(['detailTalent', id]);
  }

  handleUpdateTalent(id: string) {
    this.router.navigate(['updateTalent', id]);
  }



}
