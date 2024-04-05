import {Component, Input, OnInit} from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {Offer} from "../../../models/offer.models";
import {
  FormBuilder,
  FormGroup, ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {OfferService} from "../../../services/offer/offer.service";
import {Router, RouterLink} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication/authentication.service";


import {FilterOffer} from "../../../models/filterOffer.models";
import {AppUser} from "../../../models/app-user.models";
import {AppUserService} from "../../../services/app-user/app-user.service";
import {FilterTalent} from "../../../models/filterTalent.models";
import {Talent} from "../../../models/talent.models";
import {DatePipe, DecimalPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FooterComponent} from "../../fragments/footer/footer.component";
import {NavbarComponent} from "../../fragments/navbar/navbar.component";


@Component({
  selector: 'app-list-offer',
  templateUrl: './list-offer.component.html',
  styleUrls: ['./list-offer.component.css'],
  imports: [
    DecimalPipe,
    DatePipe,
    NgIf,
    NgClass,
    NgForOf,
    FooterComponent,
    RouterLink,
    NavbarComponent,
    ReactiveFormsModule
  ],
  standalone: true
})
export class ListOfferComponent implements OnInit {


  email: string = "contact@bozahouse.com";
  tel: string = "656832062";

  offers: Offer[] = [] ;
  errorMessage!:string;
  errorMessageOffer!:string;
  offerFormGroup!: FormGroup ;
  @Input() currentUser!: AppUser;
  currentPage: number = 0;
  totalPages!: number;
  pageSize: number = 5;


  constructor(private authenticationService: AuthenticationService, private offerService: OfferService,private userService: AppUserService,
              private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
   // this.handleCurrentAppUser();
    //this.datesCompare();


    //this.listCityByCountry();

    this.offerFormGroup = this.fb.group({
      title: this.fb.control(""),
      contract: this.fb.control(""),
      workMode: this.fb.control(""),
      address: this.fb.control(""),
      experience: this.fb.control(""),
      type: this.fb.control(""),
      domain: this.fb.control(""),
      startDate: this.fb.control("",[Validators.required]),
      endDate: this.fb.control("", [Validators.required])


    });

    this.handleFilterOffers();

  }


  handleSetOfferFormGroup(){
    this.offerFormGroup.reset();
  }

  handleFilterOffers() {
    const {
      title,
      contract,
      workMode,
      address,
      experience,
      type,
      domain,
      startDate,
      endDate
    } = this.offerFormGroup.value;
    const filterOffer: FilterOffer = {};
    filterOffer.title = title;
    filterOffer.contract = contract;
    filterOffer.workMode = workMode;
    filterOffer.address = address;
    filterOffer.experience = experience;
    filterOffer.type = type;
    filterOffer.domain = domain;
    filterOffer.startDate = new Date(startDate);
    filterOffer.endDate = new Date(endDate);
    filterOffer.valid = true;
    filterOffer.page = Number(this.currentPage);
    filterOffer.size = Number(this.pageSize);

    this.offerService.filterOffer(filterOffer).subscribe({
      next: value => {
        this.offers = value.content;
      },
      error: err => {
        console.log(err)
      }
    })
    console.log(this.offers);
  }

  datesCompare() {
    let dateBefore  = this.offerFormGroup?.value.startDate;
    let dateAfter  = this.offerFormGroup?.value.endDate;
  }


  handleDeleteOffer(offer: Offer) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.offerService.disableOffer(offer.id).subscribe({
      next: data => {
        console.log(data);

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




