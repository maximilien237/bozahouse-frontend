import {Component, OnInit, ViewChild} from '@angular/core';
import {Offer} from "../../../models/offer.models";
import {
  FormBuilder,
  FormGroup,
  ValidationErrors, Validators,
} from "@angular/forms";
import {OfferService} from "../../../services/offer/offer.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication/authentication.service";


import {AppUser} from "../../../models/app-user.models";
import {AppUserService} from "../../../services/app-user/app-user.service";
import {OfferCriteria} from "../../../models/criteria/offerCriteria";
import {ModalErrorComponent} from "../../shares/modal-error/modal-error.component";
import {formatDate} from "@angular/common";

declare let $: any;

@Component({
  selector: 'app-list-offer',
  templateUrl: './list-offer.component.html',
  styleUrls: ['./list-offer.component.css']
})
export class ListOfferComponent implements OnInit {

  offerFormGroup: FormGroup= this.fb.group({
    title: this.fb.control(""),
    domain: this.fb.control(""),
    skills: this.fb.control(""),
    workMode: this.fb.control(""),
    experience: this.fb.control(""),
    address: this.fb.control(""),
    contract: this.fb.control(""),
    salary: this.fb.control(""),
    startDate: this.fb.control(null),
    endDate: this.fb.control(null)
  });

  newOfferFormGroup: FormGroup = this.fb.group({
    title: this.fb.control('', [Validators.required,Validators.minLength(4),Validators.maxLength(30)]),
    mission: this.fb.control("", [Validators.required]),
    domain: this.fb.control('', [Validators.minLength(6),Validators.maxLength(30)]),
    profile: this.fb.control("", [Validators.required]),
    address: this.fb.control("Bertoua, Est", [Validators.required]),
    tel: this.fb.control("620178549", [Validators.pattern("[0-9]+"),Validators.required]),
    experience: this.fb.control('2-5 ans', [Validators.required]),
    salary: this.fb.control("", [Validators.pattern("[0-9]+")]),
    endOffer: this.fb.control(null, [Validators.required]),
    needPeople: this.fb.control(1, [Validators.required,Validators.pattern("[0-9]+")]),
    skills: this.fb.control("java, css, html", [Validators.required]),
    email:  this.fb.control("css@gmail.com", [Validators.required, Validators.pattern("^[a-z0-9_+&*-]+(?:\\.[a-z0-9_+&*-]+)*@(?:[a-z0-9-]+\\.)+[a-z]{2,15}$"),Validators.email]),
    contract:  this.fb.control('CDI', [Validators.required]),
    workMode: this.fb.control('Sur site', [Validators.required]),
    candidatureInstruction: this.fb.control(''),

  });

  @ViewChild(ModalErrorComponent)
  private childError!: ModalErrorComponent ;
  file: File | undefined;
  offerId: number | undefined;
  offers!: Offer[];
  currentPage: number = 1;
  totalElements!: number;
  pageSize: number = 12;

  email: string = "contact@bozahouse.com";
  tel: string = "656832062";
  username?: string;
  errorMessage!:string;
  currentUser!: AppUser;


  constructor(private authenticationService: AuthenticationService, private offerService: OfferService,private userService: AppUserService,
              private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.handleFilterOffers();
  }

  handleSaveOrUpdateOffer(): void {
    //let offer: Offer = this.newOfferFormGroup.value;
    const {
      title,
      mission,
      domain,
      profile,
      address,
      tel,
      experience,
      salary,
      endOffer,
      needPeople,
      skills,
      email,
      contract,
      workMode,
      candidatureInstruction,

    } = this.newOfferFormGroup.value;

    const formdata: FormData = new FormData();
    formdata.append("title",title)
    formdata.append("mission",mission)
    formdata.append("domain",domain)
    formdata.append("profile",profile)
    formdata.append("address",address)
    formdata.append("tel",tel)
    formdata.append("experience",experience)
    formdata.append("salary",salary)
    formdata.append("endOffer",endOffer)
    formdata.append("needPeople",needPeople)
    formdata.append("skills",skills)
    formdata.append("email",email)
    formdata.append("contract",contract)
    formdata.append("workMode",workMode)
    formdata.append("candidatureInstruction",candidatureInstruction)

    if (this.file != null) {
      formdata.append("file",this.file)
    }

    console.log('offer', formdata)

    if (this.offerId) {

      this.offerService.updateOffer(this.offerId, formdata).subscribe({
        next: value => {
          this.handleResetOfferFormGroup();
          this.closeOfferModal();
          console.log(value);
          alert("offre d\'emploi publié avec succès !");
          this.router.navigateByUrl("/jobs");
        },
        error: err => {
          console.log(err);
        }
      })

    } else {

      this.offerService.saveOffer(formdata).subscribe({
        next: value => {
          this.handleResetOfferFormGroup();
          this.closeOfferModal();
          console.log(value);
          alert("offre d\'emploi publié avec succès !");
          this.router.navigateByUrl("/jobs");
        },
        error: err => {
          console.log(err);
        }
      })
    }




  }

  handleGetErrorMessageFromChild(fieldName: string, error: ValidationErrors) {
    return this.childError.getErrorMessage(fieldName, error);
  }

  /**
   *  cette fonction permet de récupérer
   *  le dernier fichier sélectionné
   */
  getFile(event: any): void {
    this.file = event.target.files[0];
  }

  get r(){
    return this.newOfferFormGroup.controls;
  }

  handleResetOfferFormGroup(){
    this.offerFormGroup.reset();
    this.newOfferFormGroup.reset();
    this.file = undefined;
    this.offerId = undefined;
  }



  handleFilterOffers() {

/*    const {
      title,
      domain,
      skills,
      workMode,
      experience,
      address,
      contract,
      salary,
      startDate,
      endDate

    } = this.offerFormGroup.value;*/
    //const criteria:OfferCriteria={};
    let criteria:OfferCriteria = this.offerFormGroup.value;

    criteria.page = Number(this.currentPage - 1);
    criteria.size = Number(this.pageSize);
    console.log('OfferCriteria',criteria);
     this.offerService.offerSpecification(criteria).subscribe({
      next: value => {
        console.log(value)
        this.offers = value.content;
        this.totalElements = value.totalElements;
      }
    })
  }



  openNewOfferModal() {
    $("#newOffer").modal('show');
    this.newOfferFormGroup.reset();
    this.offerId = undefined;

  }

  closeOfferModal() {
    $("#newOffer").modal('hide');
    this.newOfferFormGroup.reset();
    this.offerId = undefined;
    this.file = undefined;
  }

  openUpdateOfferModal(offer: Offer): void {
    this.offerId = offer.id!
    $("#newOffer").modal('show');

    this.newOfferFormGroup = this.fb.group({
      title: this.fb.control(offer.title, [Validators.required,Validators.minLength(4),Validators.maxLength(30)]),
      mission: this.fb.control(offer.mission, [Validators.required]),
      domain: this.fb.control(offer.domain, [Validators.minLength(6),Validators.maxLength(30)]),
      profile: this.fb.control(offer.profile, [Validators.required]),
      address: this.fb.control(offer.address, [Validators.required]),
      tel: this.fb.control(offer.tel, [Validators.pattern("[0-9]+"),Validators.required]),
      experience: this.fb.control(offer.experience, [Validators.required]),
      salary: this.fb.control(offer.salary, [Validators.pattern("[0-9]+")]),
      endOffer: this.fb.control(formatDate(offer.endOffer!,'yyyy-MM-dd','en'), [Validators.required]),
      needPeople: this.fb.control(offer.needPeople, [Validators.required,Validators.pattern("[0-9]+")]),
      skills: this.fb.control(offer.skills, [Validators.required]),
      email:  this.fb.control(offer.email, [Validators.required, Validators.pattern("^[a-z0-9_+&*-]+(?:\\.[a-z0-9_+&*-]+)*@(?:[a-z0-9-]+\\.)+[a-z]{2,15}$"),Validators.email]),
      contract:  this.fb.control(offer.contract, [Validators.required]),
      workMode: this.fb.control(offer.workMode, [Validators.required]),
      candidatureInstruction: this.fb.control(offer.candidatureInstruction),

    });
  }



  handleDeleteOffer(offer: Offer) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.offerService.deleteOffer(offer.id!).subscribe({
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
    this.offerService.enableOffer(offer.id!).subscribe({
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
    this.offerService.disableOffer(offer.id!).subscribe({
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



}




