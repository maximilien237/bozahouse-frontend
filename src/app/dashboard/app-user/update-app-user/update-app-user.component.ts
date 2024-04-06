import { Component, OnInit } from '@angular/core';
import {AppUser} from "../../../models/app-user.models";
import {ActivatedRoute, Router} from "@angular/router";
import {AppUserService} from "../../../services/app-user/app-user.service";
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-update-app-user',
  templateUrl: './update-app-user.component.html',
  styleUrls: ['./update-app-user.component.css']
})
export class UpdateAppUserComponent implements OnInit {

  id!: number;
  appUser!: AppUser ;
  updateUserFormGroup!: FormGroup;
  constructor(private userService: AppUserService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.userService.getAppUser(this.id).subscribe(
      {
        next: value => {
          console.log(value);
          this.appUser = value;
          this.updateUserFormGroup = this.fb.group({

            account : this.fb.control(this.appUser.account, [Validators.required]),
            howKnowUs: this.fb.control(this.appUser.howKnowUs, [Validators.required]),
            lastname : this.fb.control(this.appUser.lastname, [Validators.pattern("[A-Za-z-çèéàê' -]+"),Validators.required, Validators.minLength(3),Validators.maxLength(30)]),
            firstname: this.fb.control(this.appUser.firstname,[Validators.pattern("[A-Za-z-çèéàê' -]+"),Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
            sex: this.fb.control(this.appUser.sex,[Validators.required]),
            email: this.fb.control(this.appUser.email,[Validators.pattern("^[a-z0-9_+&*-]+(?:\\.[a-z0-9_+&*-]+)*@(?:[a-z0-9-]+\\.)+[a-z]{2,15}$"),Validators.required, Validators.email]),
            username : this.fb.control(this.appUser.username,[Validators.pattern("[A-Za-z0-9]+"),Validators.required, Validators.minLength(3), Validators.maxLength(12)]),
            password: this.fb.control(this.appUser.password,[Validators.pattern("[A-Za-z0-9]+"),Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
            confirmPassword: this.fb.control(this.appUser.confirmPassword,[Validators.pattern("[A-Za-z0-9]+"),Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
            birthday: this.fb.control(formatDate(this.appUser.birthday, 'yyyy-MM-dd', 'en'),[Validators.required]),
            acceptTerms: this.fb.control(this.appUser.acceptTerms,[Validators.requiredTrue]),
            referralCode: this.fb.control(this.appUser.referralCode,[Validators.pattern("[A-Za-z0-9]+"), Validators.minLength(6), Validators.maxLength(15)])

          });
        }, error: err => {
          console.log(err);
        }

    });
  }


  handleUpdateUser() {
    let user: AppUser = this.updateUserFormGroup.value;
    this.userService.updateAppUser(this.id, user).subscribe({
      next: value => {
        console.log(value);
        alert("Utilisateur modifié avec succès !");
        //this.newUserFormGroup.reset();
        this.router.navigateByUrl("/users");
      },
      error: err => {
        console.log(err);
      }
    })
  }


  getErrorMessage(fieldName: string, error: ValidationErrors) {
    if (error['required']){
      return "vous devez remplir champs !";
    }else if (error['requiredTrue']) {
      return "vous devez cocher cette case !" ;
    }else if (error['minlength']){
      return "ce champs doit comporter au moins" + " "+ error['minlength']['requiredLength'] + "  " + "caractères";
    }else if (error['maxlength']){
      return "ce champs doit comporter au plus " + "  " + error['maxlength']['requiredLength'] + "  " + "caractères";
    }else if (error['pattern']) {
      return "ce champs doit comporter soit des majuscules, soit des minuscules, soit des nombres, ou un mélange des trois" ;
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

  getErrorMessageName(fieldName: string, error: ValidationErrors) {
    if (error['required']){
      return "vous devez remplir champs !";
    }else if (error['minlength']){
      return "ce champs doit comporter au moins" + " "+ error['minlength']['requiredLength'] + "  " + "caractères";
    }else if (error['maxlength']){
      return "ce champs doit comporter au plus " + "  " + error['maxlength']['requiredLength'] + "  " + "caractères";
    }else if (error['pattern']) {
      return "ce champs doit comporter soit des majuscules, soit des minuscules, ou un mélange des deux" ;
    }else return "";
  }


  getErrorMessageTerms(fieldName: string, error: ValidationErrors) {
    if (error['required']){
      return "vous devez cocher cette case !" ;
    }else return "";

  }


}
