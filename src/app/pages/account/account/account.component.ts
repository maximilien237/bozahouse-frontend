import {Component, Input, OnInit} from '@angular/core';

import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {AppUser} from "../../../models/app-user.models";
import {AppUserService} from "../../../services/app-user/app-user.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {OfferService} from "../../../services/offer/offer.service";
import {TalentService} from "../../../services/talent/talent.service";
import {Offer} from "../../../models/offer.models";
import {Talent} from "../../../models/talent.models";
import {ActivatedRoute, Router} from "@angular/router";
import {FilterOffer} from "../../../models/filterOffer.models";
import { Page } from 'src/app/models/Page';
import {NavbarComponent} from "../../fragments/navbar/navbar.component";
import {DatePipe, NgIf} from "@angular/common";
import {FooterComponent} from "../../fragments/footer/footer.component";


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  imports: [
    NavbarComponent,
    NgIf,
    DatePipe,
    FooterComponent
  ],
  standalone: true
})
export class AccountComponent implements OnInit {
  id!: number;
  offers!: Observable<Array<Offer>>;
  errorOfferMessage!: string;
  @Input() currentUser!: AppUser;
  errorMessage!: string;

  pageSizeOffer: number = 5;
  pageSizeTalent: number = 5;
  currentPageOffer: number = 0;
  currentPageTalent: number = 0;

  talents!: Observable<Page<Talent>>;
  errorTalentMessage!: string;





  constructor(private talentService: TalentService,private offerService: OfferService
              ,private authenticationService: AuthenticationService
              , private userService: AppUserService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.listOfferByAppUser();
    this.listTalentByAppUser();

  }


  handleListAppUserSubscription(id: number) {
    this.router.navigate(['userSubscriptions', id]);
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



  goToNextPageOffer(page: number){
    this.currentPageOffer = page;
    this.listOfferByAppUser();
  }

  goToNextPageTalent(page: number){
    this.currentPageTalent = page;
    this.listTalentByAppUser();
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


  handleDeleteOffer(offer: Offer) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.offerService.deleteOffer(offer.id).subscribe({
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
        this.talents = this.talents.pipe(
          map(data => {
            let index = data.content.indexOf(talent)
            data.content.slice(index, 1)
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
