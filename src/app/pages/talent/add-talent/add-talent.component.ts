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
      title: this.fb.control("", [Validators.pattern("[A-Z][a-z0-9-']+"),Validators.required,Validators.minLength(6),Validators.maxLength(30)]),
      domain: this.fb.control("", [Validators.pattern("[A-Z][a-z-çèéàê' ]+"),Validators.required,Validators.minLength(6),Validators.maxLength(30)]),
      address: this.fb.control("", [Validators.required,Validators.pattern("[A-Z][a-z-0-9-çèéàê'-]+,[A-Z][a-z-çèéà]+,[A-Z][a-z-çèéà]{4,30}")]),
      tel: this.fb.control("", [Validators.pattern("[0-9]+"),Validators.required,Validators.minLength(9),Validators.maxLength(9)]),
      whatsAppNumber: this.fb.control("", [Validators.pattern("[0-9]+"),Validators.minLength(9),Validators.maxLength(9)]),
      countryCode: this.fb.control("",[Validators.required]),
      experience: this.fb.control("", [Validators.required]),
      salary: this.fb.control("", [Validators.pattern("[0-9]+")]),
      salaryChoice: this.fb.control("", [Validators.required]),
      skills: this.fb.control("", [Validators.pattern("[A-Z][a-z0-9-çèéàê()+:!',. ]+"),Validators.required,Validators.minLength(50),Validators.maxLength(1000)]),
      workMode: this.fb.control("", [Validators.required])

    });

  }

  handleSaveTalent() {
    let talent: Talent = this.newTalentFormGroup.value;
    this.talentService.saveTalent(talent).subscribe({
      next: value => {
        console.log(value);
        alert("talent has been successfully saved");
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
