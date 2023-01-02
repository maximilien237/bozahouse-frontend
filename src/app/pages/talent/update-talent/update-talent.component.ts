import { Component, OnInit } from '@angular/core';
import {catchError, throwError} from "rxjs";

import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {TalentService} from "../../../services/talent/talent.service";
import {ActivatedRoute, Router} from "@angular/router";

import {Talent} from "../../../models/talent.models";

@Component({
  selector: 'app-update-talent',
  templateUrl: './update-talent.component.html',
  styleUrls: ['./update-talent.component.css']
})
export class UpdateTalentComponent implements OnInit {

  id!: string;
  talent!: Talent ;
  errorMessage!:string;
  updateTalentFormGroup!: FormGroup;
  constructor(private activatedRoute: ActivatedRoute,private fb: FormBuilder, private talentService: TalentService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.talentService.getTalent(this.id).subscribe({
        next: value => {
          console.log(value);
          this.talent = value;
    this.updateTalentFormGroup = this.fb.group({

      type: this.fb.control(this.talent.type, [Validators.required]),
      email:  this.fb.control(this.talent.email, [Validators.pattern("^[a-z0-9_+&*-]+(?:\\.[a-z0-9_+&*-]+)*@(?:[a-z0-9-]+\\.)+[a-z]{2,15}$"),Validators.email]),
      contract: this.fb.control(this.talent.contract, [Validators.required]),
      linkedin: this.fb.control(this.talent.linkedin, [Validators.pattern("^((((https?|ftps?|gopher|telnet|nntp)://)|(mailto:|news:))(%[0-9a-f]{2}|[-()_.!~*';/?:@&=+$,a-z0-9])+)([).!';/?:,][[:blank:|:blank:]])?$")]),
      github: this.fb.control(this.talent.github, [Validators.pattern("^((((https?|ftps?|gopher|telnet|nntp)://)|(mailto:|news:))(%[0-9a-f]{2}|[-()_.!~*';/?:@&=+$,a-z0-9])+)([).!';/?:,][[:blank:|:blank:]])?$")]),
      level: this.fb.control(this.talent.level, [Validators.required]),
      title: this.fb.control(this.talent.title, [Validators.pattern("[A-Za-z0-9-çèéàêâô;-']+"),Validators.required,Validators.minLength(6),Validators.maxLength(30)]),
      domain: this.fb.control(this.talent.domain, [Validators.pattern("[A-Za-z-çèéàêô-;' ]+"),Validators.required,Validators.minLength(6),Validators.maxLength(30)]),
      address: this.fb.control(this.talent.address, [Validators.required,Validators.pattern("[A-Z][a-z-0-9-çèéàê'-]+,[A-Z][a-z-çèéà]+,[A-Z][a-z-çèéà]{4,30}")]),
      tel: this.fb.control(this.talent.tel, [Validators.pattern("[0-9]+"),Validators.required,Validators.minLength(9),Validators.maxLength(9)]),
      whatsAppNumber: this.fb.control(this.talent.whatsAppNumber, [Validators.pattern("[0-9]+"),Validators.minLength(9),Validators.maxLength(9)]),
      // countryCode: this.fb.control(this.talent.countryCode, [Validators.required]),
      experience: this.fb.control(this.talent.experience, [Validators.required]),
      salary: this.fb.control(this.talent.salary, [Validators.pattern("[0-9]+")]),
      salaryChoice: this.fb.control(this.talent.salaryChoice, [Validators.required]),
      skills: this.fb.control(this.talent.skills, [Validators.pattern("[A-Za-z0-9-çèéàêâô()+:!',-;. ]+"),Validators.required]),
      workMode: this.fb.control(this.talent.workMode, [Validators.required])

    });
        }, error: err => {
        console.log(err);
      }

    });
  }

  handleUpdateTalent() {
    let talent: Talent = this.updateTalentFormGroup.value;
    this.talentService.updateTalent(this.id, talent).subscribe({
      next: value => {
        console.log(value);
        alert("talent has been successfully updated");
        //this.newUserFormGroup.reset();
        this.router.navigateByUrl("/talents");
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
      return "exemple d\'un mail valide : youremail@gmail.com" ;
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
      return "exemple d\'une adresse valide : Simbock,Yaoundé,Cameroun" ;
    }else return "";
  }

  getErrorMessageSalary(salary: string, error: ValidationErrors) {
    if (error['pattern']) {
      return "exemple d\'un salaire valide : 100000" ;
    }else return "";
  }

}
