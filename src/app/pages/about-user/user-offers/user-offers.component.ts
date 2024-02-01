import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";

import {ActivatedRoute, Router} from "@angular/router";

import {OfferService} from "../../../services/offer/offer.service";
import {Offer} from "../../../models/offer.models";
import {AppUserService} from "../../../services/app-user/app-user.service";
import {AppUser} from "../../../models/app-user.models";
import {AuthenticationService} from "../../../services/authentication/authentication.service";

@Component({
  selector: 'app-user-offers',
  templateUrl: './user-offers.component.html',
  styleUrls: ['./user-offers.component.css']
})
export class UserOffersComponent implements OnInit {

  roles: string[] = [];
  isLoggedIn = false;
  isAdmin : boolean = false;
  isUser : boolean = false;
  isEditor : boolean = false;
  username?: string;
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
        console.log("thanks for sharing !");
      }).catch(console.error)
    }
  }

  goToPreviousPageOffer() {
    this.currentPage = this.currentPage - 1;
    this.handleListAppUserOffers();
  }
}
