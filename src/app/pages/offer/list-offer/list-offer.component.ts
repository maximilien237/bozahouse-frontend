import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {Offer} from "../../../models/offer.models";
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {OfferService} from "../../../services/offer/offer.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication/authentication.service";

import {Subscription} from "../../../models/subscription.models";
import {FilterOffer} from "../../../models/filterOffer.models";
import {AppUser} from "../../../models/app-user.models";
import {AppUserService} from "../../../services/app-user/app-user.service";


@Component({
  selector: 'app-list-offer',
  templateUrl: './list-offer.component.html',
  styleUrls: ['./list-offer.component.css']
})
export class ListOfferComponent implements OnInit {


  email: string = "contact@bozahouse.com";
  tel: string = "656832062";


  roles: string[] = [];
  isLoggedIn = false;
  isAdmin : boolean = false;
  isUser : boolean = false;
  isEditor : boolean = false;
  username?: string;
  offers!: Observable<Array<Offer>>;
  errorMessage!:string;
  errorMessageOffer!:string;
  offerFormGroup!: FormGroup ;
  currentUser!: AppUser;
  currentPage: number = 0;
  totalPages!: number;
  pageSize: number = 5;
  offers1!: any;

  offerSize : number = 0;
  constructor(private authenticationService: AuthenticationService, private offerService: OfferService,private userService: AppUserService,
              private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.handleCurrentAppUser();
    this.datesCompare();


    //this.listCityByCountry();

    this.offerFormGroup = this.fb.group({
      title: this.fb.control(""),
      contract: this.fb.control(""),
      workMode: this.fb.control(""),
      address: this.fb.control(""),
      experience: this.fb.control(""),
      type: this.fb.control(""),
      domain: this.fb.control("")
/*
      startDate: this.fb.control(moment().subtract(7,'days').format('YYYY-MM-DD'),[Validators.required]),
      endDate: this.fb.control(moment().format('YYYY-MM-DD'), [Validators.required])
*/


    });
    //this.listOffer();
    this.handleSearchOffers();
    this.handleFilterOffers();


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


  handleSetOfferFormGroup(){
    this.offerFormGroup.reset();
  }



  handleSearchOffers() {
    //  let kw = this.searchFormGroup?.value.keyword;
    let filterOffer: FilterOffer = this.offerFormGroup.value;
    this.offers =  this.offerService.filterOffer(filterOffer.title, filterOffer.contract, filterOffer.workMode, filterOffer.address, filterOffer.experience, filterOffer.type, filterOffer.domain, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessageOffer = err.message;
        return throwError(err);
      })
    );
  }

  handleFilterOffers() {
    //  let kw = this.searchFormGroup?.value.keyword;
    let filterOffer: FilterOffer = this.offerFormGroup.value;
    this.offers1 =  this.offerService.filterOffer(filterOffer.title, filterOffer.contract, filterOffer.workMode, filterOffer.address, filterOffer.experience, filterOffer.type, filterOffer.domain,this.currentPage, this.pageSize)
      .subscribe({
        next: value => {
          console.log(value);
          this.totalPages = value[0].totalPages;
        },
        error: err => {
          console.log(err);
        }
      });
  }

  datesCompare() {
    let dateBefore  = this.offerFormGroup?.value.startDate;
    let dateAfter  = this.offerFormGroup?.value.endDate;
  }

/*
    handleSearchOffers() {
    //  let kw = this.searchFormGroup?.value.keyword;
      let filterOffer: FilterOffer = this.offerFormGroup.value;
      this.offers =  this.offerService.filterOffer(filterOffer.title, filterOffer.contract, filterOffer.workMode, filterOffer.address, filterOffer.experience, filterOffer.type, filterOffer.domain, this.currentPage, this.pageSize).pipe(
        catchError(err => {
          this.errorMessage = err.message;
          return throwError(err);
        })
      );
    }

  handleFilterOffers() {
    //  let kw = this.searchFormGroup?.value.keyword;
    let filterOffer: FilterOffer = this.offerFormGroup.value;
    this.offers1 =  this.offerService.filterOffer(filterOffer.title, filterOffer.contract, filterOffer.workMode, filterOffer.address, filterOffer.experience, filterOffer.type, filterOffer.domain,this.currentPage, this.pageSize)
     .subscribe({
      next: value => {
        console.log(value);
        this.totalPages = value[0].totalPages;
      },
      error: err => {
        console.log(err);
      }
    });
  }*/



  listOffer(){
    this.offers = this.offerService.listOffer().pipe(
      catchError(err => {
        this.errorMessage = err.message;
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


  handleEnableOffer(offer: Offer) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.offerService.enableOffer(offer.id).subscribe({
      next: value => {
        console.log(value);
        this.offers = this.offers.pipe(
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



  handleDisableOffer(offer: Offer) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.offerService.disableOffer(offer.id).subscribe({
      next: value => {
        console.log(value);
        this.offers = this.offers.pipe(
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

  handleUpdateOffer(id: string) {

    this.router.navigate(['updateOffer', id]);
  }

  handleDetailOffer(id: string) {

    this.router.navigate(['detailOffer', id]);
  }


  goToPage(page: number){
    this.currentPage = page;
    this.handleSearchOffers();
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


  shared(){
    if (navigator.share){
      navigator.share({
        title: 'consulter les derniers jobs sur Bozahouse',
        url: 'http://vps91824.serveur-vps.net/jobs'
      }).then(()=>{
        console.log("thanks for sharing !");
      }).catch(console.error)
    }
  }


  getErrorMessage(fieldName: string, error: ValidationErrors) {
    if (error['required']){
      return fieldName + "  "+ " is required";
    }else if (error['minlength']){
      return fieldName + "  "+ "should have at least" + " "+ error['minlength']['requiredLength'] + "  "+ "characters";
    }else if (error['maxlength']){
      return fieldName + "  "+ "should have at the most" + "  " + error['maxlength']['requiredLength'] + "  " + "characters";
    }else if (error['pattern']) {
      return fieldName + "  "+ "required this pattern" + error['pattern']['requiredPattern'] ;
    }else if (error['email']) {
      return fieldName + "  " + "address is not valid "+ "  "+ error['email']['requiredEmail'];
    }else return "";

  }

}




