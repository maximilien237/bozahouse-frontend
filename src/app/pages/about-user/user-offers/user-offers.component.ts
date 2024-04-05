import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";

import {ActivatedRoute, Router, RouterLink} from "@angular/router";

import {OfferService} from "../../../services/offer/offer.service";
import {Offer} from "../../../models/offer.models";
import {AppUserService} from "../../../services/app-user/app-user.service";
import {AppUser} from "../../../models/app-user.models";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {NavbarComponent} from "../../fragments/navbar/navbar.component";
import {AsyncPipe, DatePipe, DecimalPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FooterComponent} from "../../fragments/footer/footer.component";

@Component({
  selector: 'app-user-offers',
  templateUrl: './user-offers.component.html',
  styleUrls: ['./user-offers.component.css'],
  imports: [
    NavbarComponent,
    RouterLink,
    NgIf,
    AsyncPipe,
    DecimalPipe,
    DatePipe,
    NgForOf,
    NgClass,
    FooterComponent
  ],
  standalone: true
})
export class UserOffersComponent implements OnInit {


  currentUser!: AppUser;
  id!: number;
  errorMessageOffer!:string;
  errorMessageAppUser!:string;
  currentPage: number = 0;
  totalPages!: number;
  pageSize: number = 5;
  userOffers!: Observable<Array<Offer>>;
  userOffers1!: any;


  constructor(private authenticationService: AuthenticationService, private activatedRoute: ActivatedRoute, private offerService: OfferService, private router: Router, private userService: AppUserService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.handleGetTotalPageAppUserOffers();
    this.handleListAppUserOffers();


  }

  goToPage(page: number) {
    this.currentPage = page;
    this.handleListAppUserOffers();
  }

  handleDetailOffer(id: number) {

    this.router.navigate(['detailOffer', id]);
  }

  handleDeleteOffer(offer: Offer) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.offerService.deleteOffer(offer.id).subscribe({
      next: value => {
        console.log(value);
        this.userOffers = this.userOffers.pipe(
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

  handleUpdateOffer(id: number) {

    this.router.navigate(['updateOffer', id]);
  }

  handleGetTotalPageAppUserOffers(){
    this.userOffers1 = this.offerService.listOfferByAppUser(this.id,this.currentPage, this.pageSize).subscribe({
      next: value => {
        this.totalPages = value[0].totalPages;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  handleListAppUserOffers(){
    this.userOffers = this.offerService.listOfferByAppUser(this.id, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessageOffer = err.message;
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
        alert("thanks for sharing !");
      }).catch(console.error)
    }
  }

  goToPreviousPageOffer() {
    this.currentPage = this.currentPage - 1;
    this.handleListAppUserOffers();
  }
}
