import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {TalentService} from "../../../services/talent/talent.service";
import {Router} from "@angular/router";
import {Talent} from "../../../models/talent.models";


@Component({
  selector: 'app-add-talent',
  templateUrl: './add-talent.component.html',
  styleUrls: ['./add-talent.component.css']
})
export class AddTalentComponent implements OnInit {

  errorMessage!:string;
  newTalentFormGroup!: FormGroup;
  constructor(private fb: FormBuilder, private talentService: TalentService, private router: Router) { }

  ngOnInit(): void {


    this.newTalentFormGroup = this.fb.group({
      type: this.fb.control("", [Validators.required]),
      email:  this.fb.control("", [Validators.pattern("^[a-z0-9_+&*-]+(?:\\.[a-z0-9_+&*-]+)*@(?:[a-z0-9-]+\\.)+[a-z]{2,15}$"),Validators.email]),
      contract: this.fb.control("", [Validators.required]),
      linkedin: this.fb.control("", [Validators.pattern("^((((https?|ftps?|gopher|telnet|nntp)://)|(mailto:|news:))(%[0-9a-f]{2}|[-()_.!~*';/?:@&=+$,a-z0-9])+)([).!';/?:,][[:blank:|:blank:]])?$")]),
      github: this.fb.control("", [Validators.pattern("^((((https?|ftps?|gopher|telnet|nntp)://)|(mailto:|news:))(%[0-9a-f]{2}|[-()_.!~*';/?:@&=+$,a-z0-9])+)([).!';/?:,][[:blank:|:blank:]])?$")]),
      level: this.fb.control("", [Validators.required]),
      title: this.fb.control("", [Validators.pattern("[A-ZA-Za-z0-9-çèéàêâô' ]+"),Validators.required,Validators.minLength(4),Validators.maxLength(30)]),
      domain: this.fb.control("", [Validators.pattern("[A-Za-z-çèéàêô' ]+"),Validators.required,Validators.minLength(4),Validators.maxLength(30)]),
      address: this.fb.control("", [Validators.required,Validators.pattern("[A-Z][a-z-0-9-çèéàê'-]+, [A-Z][a-z-çèéà]+, [A-Z][a-z-çèéà]{4,30}")]),
      tel: this.fb.control("", [Validators.pattern("[0-9]+"),Validators.required,Validators.minLength(9),Validators.maxLength(9)]),
      whatsAppNumber: this.fb.control("", [Validators.pattern("[0-9]+"),Validators.minLength(9),Validators.maxLength(9)]),
      // countryCode: this.fb.control("",[Validators.required]),
      experience: this.fb.control("", [Validators.required]),
      salary: this.fb.control("", [Validators.pattern("[0-9]+")]),
      salaryChoice: this.fb.control("", [Validators.required]),
      skills: this.fb.control("", [Validators.required]),
      workMode: this.fb.control("", [Validators.required])

    });

  }

  handleSaveTalent() {
    let talent: Talent = this.newTalentFormGroup.value;
    this.talentService.saveTalent(talent).subscribe({
      next: value => {
        console.log(value);
        alert("Votre profil a été crée avec succès !");
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


  getErrorMessageSalary(fieldName: string, error: ValidationErrors) {
    if (error['pattern']) {
      return "exemple d\'un salaire valide : 100000" ;
    }else return "";
  }


}
