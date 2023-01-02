import { Component, OnInit } from '@angular/core';
import {Testimony} from "../../../models/testimony.models";
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {TestimonyService} from "../../../services/testimony/testimony.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-testimony',
  templateUrl: './update-testimony.component.html',
  styleUrls: ['./update-testimony.component.css']
})
export class UpdateTestimonyComponent implements OnInit {

  id!: number;
  testimony!: Testimony ;
  updateTestimonyFormGroup!: FormGroup;
  constructor(private testimonyService: TestimonyService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.testimonyService.getTestimony(this.id).subscribe(
      {
        next: value => {
          console.log(value);
          this.testimony = value;
          this.updateTestimonyFormGroup = this.fb.group({

            message : this.fb.control(this.testimony.message, [Validators.required,Validators.minLength(4), Validators.maxLength(500),Validators.pattern("[A-Za-z0-9-çèéàêô()+:!',-. ]+")])

          });
        }, error: err => {
          console.log(err);
        }

      });
  }


  handleUpdateTestimony() {
    let testimony1: Testimony = this.updateTestimonyFormGroup.value;
    this.testimonyService.updateTestimony(this.id, testimony1).subscribe({
      next: value => {
        console.log(value);
        alert("testimony has been successfully updated");
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
