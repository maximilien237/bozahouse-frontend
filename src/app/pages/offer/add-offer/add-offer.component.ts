import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {OfferService} from "../../../services/offer/offer.service";
import {Router} from "@angular/router";
import {Offer} from "../../../models/offer.models";

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {

  errorMessage!:string;
  newOfferFormGroup!: FormGroup;
  constructor(private fb: FormBuilder, private offerService: OfferService, private router: Router) { }

  ngOnInit(): void {

    this.newOfferFormGroup = this.fb.group({
      type: this.fb.control('particular', [Validators.required]),
      title: this.fb.control('jardinier', [Validators.pattern("[A-Z][a-z0-9-']+"),Validators.required,Validators.minLength(6),Validators.maxLength(30)]),
      mission: this.fb.control("", [Validators.pattern("[A-Z][a-z0-9-çèéàê()+:!',. ]+"),Validators.minLength(50),Validators.maxLength(1000),Validators.required]),
      domain: this.fb.control('Agriculture', [Validators.pattern("[A-Z][a-z-çèéàê' ]+"),Validators.minLength(6),Validators.maxLength(30)]),
      countryCode: this.fb.control("", [Validators.required]),
      profile: this.fb.control("", [Validators.pattern("[A-Z][a-z0-9-çèéàê()+:!',. ]+"),Validators.minLength(50),Validators.maxLength(1000)]),
      address: this.fb.control("", [Validators.required,Validators.pattern("[A-Z][a-z-0-9-çèéàê'-]+,[A-Z][a-z-çèéà]+,[A-Z][a-z-çèéà]{4,30}")]),
      tel: this.fb.control("", [Validators.pattern("[0-9]+"),Validators.required,Validators.minLength(9),Validators.maxLength(9)]),
      whatsAppNumber: this.fb.control("", [Validators.pattern("[0-9]+"),Validators.minLength(9),Validators.maxLength(9)]),
      experience: this.fb.control('aucune', [Validators.required]),
      salary: this.fb.control("", [Validators.pattern("[0-9]+")]),
      salaryChoice: this.fb.control("", [Validators.required]),
      endOffer: this.fb.control(null, [Validators.required]),
      needPeople: this.fb.control(1, [Validators.required,Validators.pattern("[0-9]+")]),
      name: this.fb.control("", [Validators.required,Validators.pattern("[A-Z][a-z0-9-çèéàê()+:!',. ]+"),Validators.minLength(6),Validators.maxLength(30)]),
      skills: this.fb.control("", [Validators.pattern("[A-Z][a-z0-9-çèéàê()+:!',. ]+"),Validators.required,Validators.minLength(50),Validators.maxLength(1000)]),
      fcb: this.fb.control("", [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
      web:  this.fb.control("", [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
      linkedin: this.fb.control("", [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
      email:  this.fb.control("", [Validators.required, Validators.pattern("^[a-z0-9_+&*-]+(?:\\.[a-z0-9_+&*-]+)*@(?:[a-z0-9-]+\\.)+[a-z]{2,15}$"),Validators.email]),
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
        alert("offer has been successfully saved");
        //this.newUserFormGroup.reset();
        //this.router.navigateByUrl("/listEntOffer");
      },
      error: err => {
        console.log(err);
      }
    })
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
