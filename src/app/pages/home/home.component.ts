import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";

import {FormBuilder,FormGroup} from "@angular/forms";

import {Router} from "@angular/router";
import {Offer} from "../../models/offer.models";
import {Talent} from "../../models/talent.models";
import {TalentService} from "../../services/talent/talent.service";
import {OfferService} from "../../services/offer/offer.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {AppUserService} from "../../services/app-user/app-user.service";
import {AppUser} from "../../models/app-user.models";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  email: string = "contact@bozahouse.com";
  tel: string = "656832062";

  roles: string[] = [];
  isLoggedIn = false;
  isAdmin: boolean = false;
  isUser: boolean = false;
  isEditor: boolean = false;
  username?: string;
  errorOfferMessage!: string;
  currentUser!: AppUser;
  errorMessage!: string;
  totalPages!: number;
  pageSize: number = 5;

  threeOffers!: Observable<Array<Offer>>;
  threeTalents!: Observable<Array<Talent>>;
  errorTalentMessage!: string;
  searchFormGroup: FormGroup | undefined;

  constructor(private authenticationService: AuthenticationService, private userService: AppUserService, private talentService: TalentService, private offerService: OfferService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {

    this.lastThreeOffer();
    this.lastThreeTalent();
    this.handleCurrentAppUser();

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


    lastThreeOffer() {
      this.threeOffers = this.offerService.lastThreeOffer().pipe(
        catchError(err => {
          this.errorOfferMessage = err.message;
          return throwError(err);
        })
      );
    }

  handleDisableTalent(talent: Talent) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.talentService.disableTalent(talent.id).subscribe({
      next: value => {
        console.log(value);
        this.threeTalents = this.threeTalents.pipe(
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


  handleDisableOffer(offer: Offer) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.offerService.disableOffer(offer.id!).subscribe({
      next: value => {
        console.log(value);
        this.threeOffers = this.threeOffers.pipe(
          map(data=>{
            let index = data.indexOf(offer)
            data.slice(index,1)
            return data;
          }))

      },
      error: err => {
        console.log(err);
      }
    })

  }

    handleDeleteOffer(offer: Offer) {
      let conf = confirm("Are you sure ?");
      if (!conf) return;
      this.offerService.deleteOffer(offer.id!).subscribe({
        next: value => {
          console.log(value);
          this.threeOffers = this.threeOffers.pipe(
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

    handleDetailOffer(id: number) {
      this.router.navigate(['detailOffer', id]);
    }

    handleUpdateOffer(id: number) {
      this.router.navigate(['updateOffer', id]);
    }


    lastThreeTalent() {
      this.threeTalents = this.talentService.lastThreeTalent().pipe(
        catchError(err => {
          this.errorTalentMessage = err.message;
          return throwError(err);
        })
      );
    }

    handleDeleteTalent(talent: Talent) {
      let conf = confirm("Are you sure ?");
      if (!conf) return;
      this.talentService.deleteTalent(talent.id).subscribe({
        next: value => {
          console.log(value);
          this.threeTalents = this.threeTalents.pipe(
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

    handleDetailTalent(id: number) {
      this.router.navigate(['detailTalent', id]);
    }

    handleUpdateTalent(id: number) {
      this.router.navigate(['updateTalent', id]);
    }



  shared(){
    if (navigator.share){
      navigator.share({
        title: 'consulter les offres et les talents les plus récents',
        url: window.location.href
      }).then(()=>{
        console.log("thanks for sharing !");
      }).catch(console.error)
    }
  }

  }

