import {Component, OnInit, ViewChild} from '@angular/core';
import {
  FormBuilder,
  FormGroup, ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {OfferService} from "../../../services/offer/offer.service";
import {Router, RouterLink} from "@angular/router";
import {Offer} from "../../../models/offer.models";
import {ErrorManagementComponent} from "../../fragments/error-management/error-management.component";
import {NavbarComponent} from "../../fragments/navbar/navbar.component";
import {NgIf} from "@angular/common";
import {FooterComponent} from "../../fragments/footer/footer.component";

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css'],
  imports: [
    NavbarComponent,
    RouterLink,
    ReactiveFormsModule,
    NgIf,
    FooterComponent
  ],
  standalone: true
})
export class AddOfferComponent implements OnInit {

  errorMessage!:string;
  newOfferFormGroup!: FormGroup;
  // permet de définir ErrorManagementComponent comme enfant de AddOfferComponent
  @ViewChild(ErrorManagementComponent) private childError !:any ;
  constructor(private fb: FormBuilder, private offerService: OfferService, private router: Router) { }

  ngOnInit(): void {

    this.newOfferFormGroup = this.fb.group({
      type: this.fb.control('', [Validators.required]),
      title: this.fb.control('', [Validators.required]),
      mission: this.fb.control("", [Validators.required]),
      domain: this.fb.control('', [Validators.required]),
      // countryCode: this.fb.control("", [Validators.required]),
      profile: this.fb.control("", [Validators.required]),
      address: this.fb.control("", [Validators.required,Validators.pattern("[A-Z][a-z-0-9-é]+, [A-Z][A-Za-z-]+, [A-Z][a-z]{4,30}")]),
      tel: this.fb.control("", [Validators.pattern("[0-9]+"),Validators.minLength(9),Validators.maxLength(9)]),
      whatsAppNumber: this.fb.control("", [Validators.pattern("[0-9]+"),Validators.minLength(9),Validators.maxLength(9)]),
      experience: this.fb.control('', [Validators.required]),
      salary: this.fb.control("", [Validators.pattern("[0-9]+")]),
      salaryChoice: this.fb.control("", [Validators.required]),
      endOffer: this.fb.control(null, [Validators.required]),
      needPeople: this.fb.control(1, [Validators.required,Validators.pattern("[0-9]+")]),
      name: this.fb.control(""),
      skills: this.fb.control("", [Validators.required]),
      fcb: this.fb.control("", [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
      web:  this.fb.control("", [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
      linkedin: this.fb.control("", [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
      email:  this.fb.control("", [Validators.pattern("^[a-z0-9_+&*-]+(?:\\.[a-z0-9_+&*-]+)*@(?:[a-z0-9-]+\\.)+[a-z]{2,15}$"),Validators.email]),
      contract:  this.fb.control('CDI', [Validators.required]),
      workMode: this.fb.control('Sur site', [Validators.required])

    });

  }

  get o(){
    return this.newOfferFormGroup.controls;
  }

  handleSaveOffer() {
    let offer: Offer = this.newOfferFormGroup.value;
    this.offerService.saveOffer(offer).subscribe({
      next: value => {
        console.log(value);
        alert("offre d\'emploi publié avec succès !");
        //this.newUserFormGroup.reset();
        this.router.navigateByUrl("/jobs");
      },
      error: err => {
        this.childError.handleErrors(err);
      }
    })
  }


  handleGetErrorMessageFromChild(fieldName: string, error: ValidationErrors) {
    return this.childError.getErrorMessage(fieldName, error);
  }
}
