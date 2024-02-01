import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";

import {Login} from "../../models/login.models";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {ProblemDetail} from "../../models/ProblemDetail";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup!: FormGroup;
  errorMessage = '';
  roles: string[] = [];
  problemDetail!: ProblemDetail;


  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({

      username: this.fb.control("",[Validators.pattern("^[a-z0-9_+&*-]+(?:\\.[a-z0-9_+&*-]+)*@(?:[a-z0-9-]+\\.)+[a-z]{2,15}$"),Validators.required, Validators.email]),
      password: this.fb.control("",[ Validators.required, Validators.pattern("[A-Za-z0-9-@]+"), Validators.minLength(4), Validators.maxLength(8)])
    })

    if (this.authenticationService.getToken()) {
      this.roles = this.authenticationService.getUser().roles;
    }
  }


    handleLogin() {
      let login: Login = this.loginFormGroup.value;

      this.authenticationService.signIn(login).subscribe({
        next: value => {
          console.log(value);

          this.authenticationService.saveToken(value.token);
          this.authenticationService.saveUser(value);

          this.roles = this.authenticationService.getUser().roles;
          console.log(this.roles);

          if (this.roles.indexOf("EDITOR")>-1){
            this.router.navigateByUrl("/users");
          }else {
            this.router.navigateByUrl("/home");
          }

        },
        error: err => {
         this.handleErrors(err);
        }
      })
    }



  handleErrors(err: HttpErrorResponse) {
    this.problemDetail={
      type: err.error.type,
      title: err.error.title,
      status: err.error.status,
      detail: err.error.detail,
      instance: err.error.instance,
      error: err.error.error
    }
    console.log(this.problemDetail);
    alert(this.problemDetail.detail);
  }

  getErrorMessage(fieldName: string, error: ValidationErrors) {
    if (error['required']){
      return "vous devez remplir ce champs !";
    }else if (error['minlength']){
      return "ce champs doit comporter au moins" + "  "+ error['minlength']['requiredLength'] + "  "+ "caractères";
    }else if (error['maxlength']){
      return "ce champs doit comporter au plus" + "  " + error['maxlength']['requiredLength'] + "  " + "caractères";
    }else if (error['pattern']) {
      return "ce champs doit comporter soit des majuscules, soit des minuscules, soit des nombres, ou un mélange des trois" ;
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

}



