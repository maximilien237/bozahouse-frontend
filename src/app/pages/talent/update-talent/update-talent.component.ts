import {Component, OnInit, ViewChild} from '@angular/core';

import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {TalentService} from "../../../services/talent/talent.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Talent} from "../../../models/talent.models";
import {ModalErrorComponent} from "../../shares/modal-error/modal-error.component";

@Component({
  selector: 'app-update-talent',
  templateUrl: './update-talent.component.html',
  styleUrls: ['./update-talent.component.css']
})
export class UpdateTalentComponent implements OnInit {

  id!: number;
  talent!: Talent ;
  errorMessage!:string;
  updateTalentFormGroup!: FormGroup;
  @ViewChild(ModalErrorComponent)
  private childError!: ModalErrorComponent ;
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
      title: this.fb.control(this.talent.title, [Validators.pattern("[A-Za-z0-9-çèéàêâô']+"),Validators.required,Validators.minLength(4),Validators.maxLength(30)]),
      domain: this.fb.control(this.talent.domain, [Validators.pattern("[A-Za-z-çèéàêô' ]+"),Validators.required,Validators.minLength(4),Validators.maxLength(30)]),
      address: this.fb.control(this.talent.address, [Validators.required,Validators.pattern("[A-Z][a-z-0-9-çèéàê'-]+, [A-Z][a-z-çèéà]+, [A-Z][a-z-çèéà]{4,30}")]),
      tel: this.fb.control(this.talent.tel, [Validators.pattern("[0-9]+"),Validators.required,Validators.minLength(9),Validators.maxLength(9)]),
      whatsAppNumber: this.fb.control(this.talent.whatsAppNumber, [Validators.pattern("[0-9]+"),Validators.minLength(9),Validators.maxLength(9)]),
      // countryCode: this.fb.control(this.talent.countryCode, [Validators.required]),
      experience: this.fb.control(this.talent.experience, [Validators.required]),
      salary: this.fb.control(this.talent.salary, [Validators.pattern("[0-9]+")]),
      salaryChoice: this.fb.control(this.talent.salaryChoice, [Validators.required]),
      skills: this.fb.control(this.talent.skills, [Validators.required]),
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
        alert("Votre profil a bien été mise à jour !");
        //this.newUserFormGroup.reset();
        this.router.navigateByUrl("/talents");
      },
      error: err => {
        console.log(err);
      }
    })
  }


  get r(){
    return this.updateTalentFormGroup.controls;
  }

  handleGetErrorMessageFromChild(fieldName: string, error: ValidationErrors) {
    return this.childError.getErrorMessage(fieldName, error);
  }
}
