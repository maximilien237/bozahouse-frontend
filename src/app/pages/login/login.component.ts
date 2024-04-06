import { Component, OnInit, ViewChild} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";

import {Login} from "../../models/login.models";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {Router} from "@angular/router";
import {ModalErrorComponent} from "../shares/modal-error/modal-error.component";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessageParent : string = "";
  loginFormGroup!: FormGroup;

  @ViewChild(ModalErrorComponent)
  private childError!: ModalErrorComponent ;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {
  }


  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({

      username: this.fb.control("",[Validators.required,Validators.pattern("[A-Za-z0-9]+"),Validators.minLength(3), Validators.maxLength(12)]),
      password: this.fb.control("",[ Validators.required, Validators.pattern("[A-Za-z0-9]+"), Validators.minLength(4), Validators.maxLength(8)])
    })

  }


  handleLogin() {
    let login: Login = this.loginFormGroup.value;

    this.authenticationService.signIn(login).subscribe({
      next: response => {
        // ajout du token dans le localstorage
        this.authenticationService.addTokenInLocalstorage(response.value);

        this.router.navigateByUrl("/home");
        /*        if (this.authenticationService.hasAnyAuthority('EDITOR')){
                  this.router.navigateByUrl("/users");
                }else {
                  this.router.navigateByUrl("/home");
                }*/

      },
      error: (err: HttpErrorResponse) => {
        this.errorMessageParent = err.error.detail;
        // appel de la méthode handleError(error) situé dans ModalErrorComponent
        this.childError?.handleError(err);
      }
    });
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



  // appel de la méthode handleError(error) situé dans ErrorManagementComponent
  handleErrorFromChild(error: HttpErrorResponse) {
    this.childError.handleError(error);
  }


  handleGetErrorMessageFromChild(fieldName: string, error: ValidationErrors) {
    return this.childError.getErrorMessage(fieldName, error);
  }

  showAndHidePassword() {
    let x:any = document.getElementById("pwd");
    x.type === "password"? x.type = "text": x.type = "password";
  }

}



