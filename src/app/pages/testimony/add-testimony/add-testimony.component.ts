import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {NewsService} from "../../../services/news/news.service";
import {Router} from "@angular/router";
import {News} from "../../../models/newsletter.models";
import {TestimonyService} from "../../../services/testimony/testimony.service";
import {Testimony} from "../../../models/testimony.models";

@Component({
  selector: 'app-add-testimony',
  templateUrl: './add-testimony.component.html',
  styleUrls: ['./add-testimony.component.css']
})
export class AddTestimonyComponent implements OnInit {

  newTestimonyFormGroup!: FormGroup;
  constructor(private fb: FormBuilder, private testimonyService: TestimonyService, private router: Router) { }


  ngOnInit(): void {
    this.newTestimonyFormGroup = this.fb.group({
   message: this.fb.control("", [Validators.required,Validators.minLength(4), Validators.maxLength(500)])

    });

  }

  handleSaveTestimony() {
    let testimony: Testimony = this.newTestimonyFormGroup.value;
    this.testimonyService.saveTestimony(testimony).subscribe({
      next: value => {
        alert("Testimony has been successfully saved");
        //this.newTestimonyFormGroup.reset();
        this.router.navigateByUrl("/testimonies");
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

}
