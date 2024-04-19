import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ModalErrorComponent} from "../../../shares/modal-error/modal-error.component";
import {OfferService} from "../../../../services/offer/offer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-other-information',
  templateUrl: './other-information.component.html',
  styleUrls: ['./other-information.component.css']
})
export class OtherInformationComponent implements OnInit {

  errorMessage!:string;
  newOfferFormGroup!: FormGroup;
  @ViewChild(ModalErrorComponent)
  private childError!: ModalErrorComponent ;


  constructor(private fb: FormBuilder, private offerService: OfferService, private router: Router) { }

  ngOnInit(): void {

    this.newOfferFormGroup = this.fb.group({
      type: this.fb.control('', [Validators.required]),
      title: this.fb.control('', [Validators.pattern("[A-Za-z0-9-çèéàêô' ]+"),Validators.required,Validators.minLength(4),Validators.maxLength(30)]),
      mission: this.fb.control("", [Validators.required]),
      domain: this.fb.control('', [Validators.pattern("[A-Za-z-çèéàêô' ]+"),Validators.minLength(6),Validators.maxLength(30)]),
      // countryCode: this.fb.control("", [Validators.required]),
      profile: this.fb.control("", [Validators.required]),
      address: this.fb.control("", [Validators.required,Validators.pattern("[A-Z][a-z-0-9-çèéàêô'-]+, [A-Z][a-z-çèéàô]+, [A-Z][a-z-çèéàô]{4,30}")]),
      tel: this.fb.control("", [Validators.pattern("[0-9]+"),Validators.required,Validators.minLength(9),Validators.maxLength(9)]),
      whatsAppNumber: this.fb.control("", [Validators.pattern("[0-9]+"),Validators.minLength(9),Validators.maxLength(9)]),
      experience: this.fb.control('', [Validators.required]),
      salary: this.fb.control("", [Validators.pattern("[0-9]+")]),
      salaryChoice: this.fb.control("", [Validators.required]),
      endOffer: this.fb.control(null, [Validators.required]),
      needPeople: this.fb.control(1, [Validators.required,Validators.pattern("[0-9]+")]),
      name: this.fb.control("", [Validators.pattern("[A-Za-z0-9-çèéàêô' ]+"),Validators.minLength(4),Validators.maxLength(30)]),
      skills: this.fb.control("", [Validators.required]),
      fcb: this.fb.control("", [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
      web:  this.fb.control("", [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
      linkedin: this.fb.control("", [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
      email:  this.fb.control("", [Validators.required, Validators.pattern("^[a-z0-9_+&*-]+(?:\\.[a-z0-9_+&*-]+)*@(?:[a-z0-9-]+\\.)+[a-z]{2,15}$"),Validators.email]),
      contract:  this.fb.control('CDI', [Validators.required]),
      workMode: this.fb.control('Sur site', [Validators.required])

    });

  }

  get r(){
    return this.newOfferFormGroup.controls;
  }

  handleGetErrorMessageFromChild(fieldName: string, error: ValidationErrors) {
    return this.childError.getErrorMessage(fieldName, error);
  }

}
