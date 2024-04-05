import {Component, Input, OnInit} from '@angular/core';
import {async, catchError, map, Observable, throwError} from "rxjs";

import {FormBuilder,FormGroup} from "@angular/forms";

import {Router} from "@angular/router";
import {Offer} from "../../models/offer.models";
import {Talent} from "../../models/talent.models";
import {TalentService} from "../../services/talent/talent.service";
import {OfferService} from "../../services/offer/offer.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {AppUserService} from "../../services/app-user/app-user.service";
import {AppUser} from "../../models/app-user.models";
import {Testimony} from "../../models/testimony.models";
import {TestimonyService} from "../../services/testimony/testimony.service";
import {NavbarComponent} from "../fragments/navbar/navbar.component";
import {AuthorizeDirective} from "../../directives/authorize.directive";
import {AsyncPipe, DatePipe, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {FooterComponent} from "../fragments/footer/footer.component";
import {ThemeColorComponent} from "../fragments/theme-color/theme-color.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    NavbarComponent,
    AuthorizeDirective,
    NgForOf,
    NgIf,
    DecimalPipe,
    DatePipe,
    FooterComponent,
    ThemeColorComponent,
    AsyncPipe
  ],
  standalone: true
})
export class HomeComponent implements OnInit {

  //@Input() currentUser!: AppUser;

  errorOfferMessage!: string;

  errorMessage!: string;
  testimonyList!: Array<Testimony>;
  errorTestimonyMessage!:string;
  currentPage: number = 0;
  totalPages!: number;
  pageSize: number = 5;

  threeOffers!: Observable<Array<Offer>>;
  threeTalents!: Observable<Array<Talent>>;
  errorTalentMessage!: string;
  searchFormGroup: FormGroup | undefined;

  constructor(private authenticationService: AuthenticationService, private userService: AppUserService,private testimonyService: TestimonyService, private talentService: TalentService, private offerService: OfferService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {

    this.lastThreeOffer();
    this.lastThreeTalent();

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
    this.offerService.disableOffer(offer.id).subscribe({
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
      this.offerService.deleteOffer(offer.id).subscribe({
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

  listTestimony(){
     this.testimonyService.listTestimony(this.currentPage, this.pageSize).subscribe({
      next: value => {
        this.testimonyList = value;
      },
       error: err => {
         console.log(err)
       }
    })
  }

  handleDeleteTestimony(testimony1: Testimony) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.testimonyService.deleteTestimonyById(testimony1.id).subscribe({
      next: value => {
        console.log(value)

      },
      error: err => {
        console.log(err);
      }
    })

  }

  shared(){
    if (navigator.share){
      navigator.share({
        title: 'consulter les offres et les talents les plus récents',
        url: 'http://localhost:4200/home'
      }).then(()=>{
        console.log("thanks for sharing !");
      }).catch(console.error)
    }
  }

}

