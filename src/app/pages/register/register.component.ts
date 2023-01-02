import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors, ValidatorFn,
  Validators
} from "@angular/forms";
import {Router} from "@angular/router";
import {AppUser} from "../../models/app-user.models";
import {AuthenticationService} from "../../services/authentication/authentication.service";



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerFormGroup!: FormGroup;
  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.registerFormGroup = this.fb.group({
      account : this.fb.control("", [Validators.required]),
      howKnowUs: this.fb.control("", [Validators.required]),
      lastname : this.fb.control("", [Validators.pattern("[A-Za-z-çèéàê' -]+"),Validators.required, Validators.minLength(4),Validators.maxLength(30)]),
      firstname: this.fb.control("",[Validators.pattern("[A-Za-z-çèéàê' -]+"),Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      sex: this.fb.control("",[Validators.required]),
      email: this.fb.control("",[Validators.pattern("^[a-z0-9_+&*-]+(?:\\.[a-z0-9_+&*-]+)*@(?:[a-z0-9-]+\\.)+[a-z]{2,15}$"),Validators.required, Validators.email]),
      username : this.fb.control("",[Validators.pattern("[A-Za-z0-9]+"),Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
      password: this.fb.control("",[Validators.pattern("[A-Za-z0-9]+"),Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: this.fb.control("",[Validators.pattern("[A-Za-z0-9]+"),Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      birthday: this.fb.control(null,[Validators.required]),
      acceptTerms: this.fb.control(false,[Validators.requiredTrue]),
      referralCode: this.fb.control("",[Validators.pattern("[A-Za-z0-9]+"), Validators.minLength(6), Validators.maxLength(15)])
    });

  }

  handleRegister() {
    let user: AppUser = this.registerFormGroup.value;
    this.authenticationService.signUp(user).subscribe({
      next: value => {
        console.log(value);
        alert("user has been successfully saved");
        alert("consult your mailbox to validate you account");
        this.router.navigateByUrl("/login");
        //this.newUserFormGroup.reset();
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
      return "exemple d\'un mail valide : youremail@gmail.com" ;
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
