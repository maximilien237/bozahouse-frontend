import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {AppUserService} from "../../../services/app-user/app-user.service";
import {AppUser} from "../../../models/app-user.models";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-app-user',
  templateUrl: './add-app-user.component.html',
  styleUrls: ['./add-app-user.component.css']
})
export class AddAppUserComponent implements OnInit {

  newUserFormGroup!: FormGroup;
  constructor(private fb: FormBuilder, private userService: AppUserService, private router: Router) { }

  ngOnInit(): void {
    this.newUserFormGroup = this.fb.group({

        account : this.fb.control("", [Validators.required]),
        howKnowUs: this.fb.control("", [Validators.required]),
        lastname : this.fb.control("", [Validators.pattern("[A-Za-z-çèéàê' -]+"),Validators.required, Validators.minLength(3),Validators.maxLength(30)]),
        firstname: this.fb.control("",[Validators.pattern("[A-Za-z-çèéàê' -]+"),Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
        sex: this.fb.control("",[Validators.required]),
        email: this.fb.control("",[Validators.pattern("^[a-z0-9_+&*-]+(?:\\.[a-z0-9_+&*-]+)*@(?:[a-z0-9-]+\\.)+[a-z]{2,15}$"),Validators.required, Validators.email]),
        username : this.fb.control("",[Validators.pattern("[A-Za-z0-9]+"),Validators.required, Validators.minLength(3), Validators.maxLength(12)]),
        password: this.fb.control("",[Validators.pattern("[A-Za-z0-9-@]+"),Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
        confirmPassword: this.fb.control("",[Validators.pattern("[A-Za-z0-9-@]+"),Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
        birthday: this.fb.control(null,[Validators.required]),
        acceptTerms: this.fb.control(false,[Validators.requiredTrue]),
        referralCode: this.fb.control("",[Validators.pattern("[A-Za-z0-9]+"), Validators.minLength(6), Validators.maxLength(15)])

      });

  }

  handleSaveUser() {
    let user: AppUser = this.newUserFormGroup.value;
    this.userService.saveAppUser(user).subscribe({
      next: value => {
        alert("Utilisateur enregistré avec succès !");
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

    getErrorMessagePassword(fieldName: string, error: ValidationErrors) {
      if (error['required']){
        return "vous devez remplir champs !";
      }else if (error['minlength']){
        return "ce champs doit comporter au moins" + " "+ error['minlength']['requiredLength'] + "  " + "caractères";
      }else if (error['maxlength']){
        return "ce champs doit comporter au plus " + "  " + error['maxlength']['requiredLength'] + "  " + "caractères";
      }else if (error['pattern']) {
          return "ce champs doit comporter soit des majuscules, soit des minuscules, soit des nombres,soit un caractère spécial telque : @ ou un mélange des quatres" ;
      }else return "";
    }

  getErrorMessageTerms(fieldName: string, error: ValidationErrors) {
    if (error['required']){
      return "vous devez cocher cette case !" ;
    }else return "";

  }

}
