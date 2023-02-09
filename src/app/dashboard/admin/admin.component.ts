import { Component, OnInit } from '@angular/core';
import {StatisticService} from "../../services/statistic/statistic.service";
import {catchError, Observable, throwError} from "rxjs";

import {SubscriptionStatistic} from "../../models/subscription-statistic.models";
import {OfferStatistic} from "../../models/offer-statistic.models";
import {TalentStatistic} from "../../models/talent-statistic.models";
import {AppUserStatistic} from "../../models/app-user-statistic.models";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  currentPageUser: number = 0;
  totalPagesUser!: number;
  pageSizeUser: number = 5;
  currentPageSubscription: number = 0;
  totalPagesSubscription!: number;
  pageSizeSubscription: number = 5;
  currentPageOffer: number = 0;
  totalPagesOffer!: number;
  pageSizeOffer: number = 5;
  currentPageTalent: number = 0;
  totalPagesTalent!: number;
  pageSizeTalent: number = 5;
  subscriptionStatistics!: Observable<Array<SubscriptionStatistic>>;
  subscriptionStatistics1!: any;
  offerStatistics!: Observable<Array<OfferStatistic>>;
  offerStatistics1!: any;
  talentStatistics!: Observable<Array<TalentStatistic>>;
  talentStatistics1!: any;
  appUserStatistics!: Observable<Array<AppUserStatistic>>;
  appUserStatistics1!: any;
  errorMessageTalent!:string;
  errorMessageUser!:string;
  errorMessageOffer!:string;
  errorMessageSubscription!:string;


  constructor(private statisticService: StatisticService) { }

  ngOnInit(): void {
    this.listSubscriptionStatistic();
    this.listAppUserStatistics();
    this.listTalentStatistics();
    this.listOfferStatistics();
    this.getTotalPageAppUser();
    this.getTotalPageOffer();
    this.getTotalPageSubscription();
    this.getTotalPageTalent();
  }


  goToPreviousPageSubscriptionStatistics() {
    this.currentPageSubscription = this.currentPageSubscription - 1;
    this.listSubscriptionStatistic();
  }

  goToPreviousPageAppUserStatistics() {
    this.currentPageUser = this.currentPageUser - 1;
    this.listAppUserStatistics();
  }

  goToPreviousPageOfferStatistics() {
    this.currentPageOffer = this.currentPageOffer - 1;
    this.listOfferStatistics();
  }

  goToPreviousPageTalentStatistics() {
    this.currentPageTalent = this.currentPageTalent - 1;
    this.listTalentStatistics();
  }

  goToPageOffer(page: number) {
    this.currentPageOffer = page;
    this.listOfferStatistics();
  }

  goToPageTalent(page: number) {
    this.currentPageTalent = page;
    this.listTalentStatistics();
  }

  goToPageSubscription(page: number) {
    this.currentPageSubscription = page;
    this.listSubscriptionStatistic();
  }

  goToPageAppUser(page: number) {
    this.currentPageUser = page;
    this.listAppUserStatistics();
  }

  goToNextPageSubscriptionStatistics() {
    this.currentPageSubscription = this.currentPageSubscription + 1;
    this.listSubscriptionStatistic();
  }

  goToNextPageAppUserStatistics() {
    this.currentPageUser = this.currentPageUser + 1;
    this.listAppUserStatistics();
  }

  goToNextPageOfferStatistics() {
    this.currentPageOffer = this.currentPageOffer + 1;
    this.listOfferStatistics();
  }

  goToNextPageTalentStatistics() {
    this.currentPageTalent = this.currentPageTalent + 1;
    this.listTalentStatistics();
  }

  getTotalPageAppUser(){
    this.appUserStatistics1 = this.statisticService.listAppUserStatistics(this.currentPageUser, this.pageSizeUser).subscribe({
      next: value => {
        this.totalPagesUser = value[0].totalPages;
      },
      error: err => {
        console.log(err);
      }
    });
  }


  getTotalPageTalent(){
    this.talentStatistics1 = this.statisticService.listTalentStatistics(this.currentPageTalent, this.pageSizeTalent).subscribe({
      next: value => {
        this.totalPagesTalent = value[0].totalPages;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  getTotalPageOffer(){
    this.offerStatistics1 = this.statisticService.listOfferStatistics(this.currentPageOffer, this.pageSizeOffer).subscribe({
      next: value => {
        this.totalPagesOffer = value[0].totalPages;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  getTotalPageSubscription(){
    this.subscriptionStatistics1 = this.statisticService.listSubscriptionStatistics(this.currentPageSubscription, this.pageSizeSubscription).subscribe({
      next: value => {
        this.totalPagesSubscription = value[0].totalPages;
        console.log(this.totalPagesSubscription);
        console.log(value);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  listSubscriptionStatistic(){
    this.subscriptionStatistics = this.statisticService.listSubscriptionStatistics(this.currentPageSubscription, this.pageSizeSubscription).pipe(
      catchError(err => {
        this.errorMessageSubscription = err.message;
        return throwError(err);
      })
    );
  }

  listOfferStatistics(){
    this.offerStatistics = this.statisticService.listOfferStatistics(this.currentPageOffer, this.pageSizeOffer).pipe(
      catchError(err => {
        this.errorMessageOffer = err.message;
        return throwError(err);
      })
    );
  }

  listTalentStatistics(){
    this.talentStatistics = this.statisticService.listTalentStatistics(this.currentPageTalent, this.pageSizeTalent).pipe(
      catchError(err => {
        this.errorMessageTalent = err.message;
        return throwError(err);
      })
    );
  }

  listAppUserStatistics(){
    this.appUserStatistics = this.statisticService.listAppUserStatistics(this.currentPageUser, this.pageSizeUser).pipe(
      catchError(err => {
        this.errorMessageUser = err.message;
        return throwError(err);
      })
    );
  }



}
