import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";

import {ActivatedRoute, Router} from "@angular/router";
import {Offer} from "../../../models/offer.models";
import {OfferService} from "../../../services/offer/offer.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-update-offer',
  templateUrl: './update-offer.component.html',
  styleUrls: ['./update-offer.component.css']
})
export class UpdateOfferComponent implements OnInit {

  id!: string;
  offer!: Offer ;
  errorMessage!:string;
  updateOfferFormGroup!: FormGroup;
  constructor(private activatedRoute: ActivatedRoute,private fb: FormBuilder, private offerService: OfferService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.offerService.getOffer(this.id).subscribe({
      next: value => {
        console.log(value);
        this.offer = value;
        this.updateOfferFormGroup = this.fb.group({

          type: this.fb.control(this.offer.type, [Validators.required]),
          title: this.fb.control(this.offer.title, [Validators.pattern("[A-Z][a-z0-9-']+"),Validators.required,Validators.minLength(6),Validators.maxLength(30)]),
          mission: this.fb.control(this.offer.mission, [Validators.pattern("[A-Z][a-z0-9-çèéàê()+:!',. ]+"),Validators.minLength(50),Validators.maxLength(1000),Validators.required]),
          domain: this.fb.control(this.offer.domain, [Validators.pattern("[A-Z][a-z-çèéàê' ]+"),Validators.minLength(6),Validators.maxLength(30)]),
          profile: this.fb.control(this.offer.profile, [Validators.pattern("[A-Z][a-z0-9-çèéàê()+:!',. ]+"),Validators.minLength(50),Validators.maxLength(1000)]),
          address: this.fb.control(this.offer.address, [Validators.required,Validators.pattern("[A-Z][a-z-0-9-çèéàê'-]+,[A-Z][a-z-çèéà]+,[A-Z][a-z-çèéà]{4,30}")]),
          tel: this.fb.control(this.offer.tel, [Validators.pattern("[0-9]+"),Validators.required,Validators.minLength(9),Validators.maxLength(9)]),
          whatsAppNumber: this.fb.control(this.offer.whatsAppNumber, [Validators.pattern("[0-9]+"),Validators.minLength(9),Validators.maxLength(9)]),
          experience: this.fb.control(this.offer.experience, [Validators.required]),
          salary: this.fb.control(this.offer.salary, [Validators.pattern("[0-9]+")]),
          salaryChoice: this.fb.control(this.offer.salaryChoice, [Validators.required]),
          endOffer: this.fb.control(formatDate(this.offer.endOffer, 'yyyy-MM-dd', 'en'), [Validators.required]),
          needPeople: this.fb.control(this.offer.needPeople, [Validators.required,Validators.pattern("[0-9]+")]),
          name: this.fb.control(this.offer.name, [Validators.required,Validators.pattern("[A-Z][a-z0-9-çèéàê()+:!',. ]+"),Validators.minLength(6),Validators.maxLength(30)]),
          skills: this.fb.control(this.offer.skills, [Validators.pattern("[A-Z][a-z0-9-çèéàê()+:!',. ]+"),Validators.required,Validators.minLength(50),Validators.maxLength(1000)]),
          fcb: this.fb.control(this.offer.fcb, [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
          web:  this.fb.control(this.offer.web, [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
          linkedin: this.fb.control(this.offer.linkedin, [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
          email:  this.fb.control(this.offer.email, [Validators.required, Validators.pattern("^[a-z0-9_+&*-]+(?:\\.[a-z0-9_+&*-]+)*@(?:[a-z0-9-]+\\.)+[a-z]{2,15}$"),Validators.email]),
          contract:  this.fb.control(this.offer.contract, [Validators.required]),
          countryCode: this.fb.control(this.offer.countryCode, [Validators.required]),
          workMode: this.fb.control(this.offer.workMode, [Validators.required])

        });
      }, error: err => {
        console.log(err);
      }

    });
  }

  handleUpdateOffer() {
    let offer: Offer = this.updateOfferFormGroup.value;
    this.offerService.updateOffer(this.id, offer).subscribe({
      next: value => {
        console.log(value);
        alert("offer has been successfully updated");
        //this.newUserFormGroup.reset();
        this.router.navigateByUrl("/jobs");
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
