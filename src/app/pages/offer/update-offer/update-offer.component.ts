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

  id!: number;
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
          title: this.fb.control(this.offer.title, [Validators.pattern("[A-Za-z-çèéàêô' ]+"),Validators.required,Validators.minLength(6),Validators.maxLength(30)]),
          mission: this.fb.control(this.offer.mission, [Validators.required]),
          domain: this.fb.control(this.offer.domain, [Validators.pattern("[A-Za-z-çèéàêô' ]+"),Validators.minLength(6),Validators.maxLength(30)]),
          profile: this.fb.control(this.offer.profile, [Validators.required]),
          address: this.fb.control(this.offer.address, [Validators.required,Validators.pattern("[A-Z][a-z-0-9-çèéàêô']+, [A-Z][a-z-çèéàô]+, [A-Z][a-z-çèéàô]{4,30}")]),
          tel: this.fb.control(this.offer.tel, [Validators.pattern("[0-9]+"),Validators.required,Validators.minLength(9),Validators.maxLength(9)]),
          whatsAppNumber: this.fb.control(this.offer.whatsAppNumber, [Validators.pattern("[0-9]+"),Validators.minLength(9),Validators.maxLength(9)]),
          experience: this.fb.control(this.offer.experience, [Validators.required]),
          salary: this.fb.control(this.offer.salary, [Validators.pattern("[0-9]+")]),
          salaryChoice: this.fb.control(this.offer.salaryChoice, [Validators.required]),
          endOffer: this.fb.control(formatDate(this.offer.endOffer, 'yyyy-MM-dd', 'en'), [Validators.required]),
          needPeople: this.fb.control(this.offer.needPeople, [Validators.required,Validators.pattern("[0-9]+")]),
          name: this.fb.control(this.offer.name, [Validators.pattern("[A-Za-z0-9-çèéàêô' ]+"),Validators.minLength(4),Validators.maxLength(50)]),
          skills: this.fb.control(this.offer.skills, [Validators.required]),
          fcb: this.fb.control(this.offer.fcb, [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
          web:  this.fb.control(this.offer.web, [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
          linkedin: this.fb.control(this.offer.linkedin, [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
          email:  this.fb.control(this.offer.email, [Validators.required, Validators.pattern("^[a-z0-9_+&*-]+(?:\\.[a-z0-9_+&*-]+)*@(?:[a-z0-9-]+\\.)+[a-z]{2,15}$"),Validators.email]),
          contract:  this.fb.control(this.offer.contract, [Validators.required]),
          // countryCode: this.fb.control(this.offer.countryCode, [Validators.required]),
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
        alert("Votre offre d\'emploi a été mise à jour avec succès !");
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
      return "Vous devez remplir ce champs !";
    }else if (error['minlength']){
      return "ce champs doit comporter au moins" + " "+ error['minlength']['requiredLength'] + "  "+ "caractères";
    }else if (error['maxlength']){
      return "ce champs doit comporter au plus" + "  " + error['maxlength']['requiredLength'] + "  " + "caractères";
    }else if (error['pattern']) {
      return "ce champs doit comporter soit des majuscules, soit des minuscules, soit des nombres, ou un mélange des trois";
    }else return "";

  }

  getErrorMessageEmail(fieldName: string, error: ValidationErrors) {
    if (error['required']){
      return "vous devez remplir champs !";
    }else if (error['pattern']) {
      return "exemple d\'un mail valide : john@example.com ou john.smith@example.com" ;
    }else if (error['email']) {
      return "Entrez une adresse email valide !";
    }else return "";
  }

  getErrorMessageUrl(fieldName: string, error: ValidationErrors) {
    if (error['pattern']) {
      return "exemple d\'une url valide : https://www.monsite.com ou https://wwww.facebook.com/username" ;
    }else return "";
  }

  getErrorMessageTel(fieldName: string, error: ValidationErrors) {
    if (error['required']){
      return "vous devez remplir champs !";
    }else if (error['pattern']) {
      return "exemple d\'un numéro valide : 6511232XX" ;
    }else if (error['minlength']){
      return "ce champs doit comporter au moins" + " "+ error['minlength']['requiredLength'] + "  "+ "nombres";
    }else if (error['maxlength']){
      return "ce champs doit comporter au plus" + "  " + error['maxlength']['requiredLength'] + "  " + "nombres";
    }else return "";
  }

  getErrorMessageAdress(fieldName: string, error: ValidationErrors) {
    if (error['required']){
      return "vous devez remplir champs !";
    }else if (error['pattern']) {
      return "exemple d\'une adresse valide : Simbock, Yaoundé, Cameroun" ;
    }else return "";
  }

  getErrorMessageSalary(salary: string, error: ValidationErrors) {
    if (error['pattern']) {
      return "exemple d\'un salaire valide : 100000" ;
    }else return "";
  }



}
