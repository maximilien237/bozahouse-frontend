import { Component, OnInit } from '@angular/core';
import {Offer} from "../../../models/offer.models";
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
} from "@angular/forms";
import {OfferService} from "../../../services/offer/offer.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication/authentication.service";


import {AppUser} from "../../../models/app-user.models";
import {AppUserService} from "../../../services/app-user/app-user.service";
import {OfferCriteria} from "../../../models/criteria/offerCriteria";


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
  offers!: Offer[];
  errorMessage!:string;
  errorMessageOffer!:string;
  offerFormGroup!: FormGroup ;
  currentUser!: AppUser;
  currentPage: number = 1;
  totalElements!: number;
  pageSize: number = 6;

  constructor(private authenticationService: AuthenticationService, private offerService: OfferService,private userService: AppUserService,
              private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.handleCurrentAppUser();


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

    this.handleFilterOffers();

  }


  handleSetOfferFormGroup(){
    this.offerFormGroup.reset();
  }



  handleFilterOffers() {
    //  let kw = this.searchFormGroup?.value.keyword;
    let criteria: OfferCriteria = this.offerFormGroup.value;
     this.offerService.offerSpecification(criteria).subscribe({
      next: value => {
        this.offers = value.content;
        this.totalElements = value.totalElements;
      }
    })
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


  handleEnableOffer(offer: Offer) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.offerService.enableOffer(offer.id).subscribe({
      next: value => {
        console.log(value);

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

      },
      error: err => {
        console.log(err);
      }
    })

  }

  handleUpdateOffer(id: number) {

    this.router.navigate(['updateOffer', id]);
  }

  handleDetailOffer(id: number) {

    this.router.navigate(['detailOffer', id]);
  }


  goToPage(page: number){
    this.currentPage = page;
    this.handleFilterOffers();
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




