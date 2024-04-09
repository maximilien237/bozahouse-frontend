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

      username: this.fb.control("",[Validators.required,Validators.pattern("^[a-z0-9_+&*-]+(?:\\.[a-z0-9_+&*-]+)*@(?:[a-z0-9-]+\\.)+[a-z]{2,15}$"),Validators.email]),
      password: this.fb.control("",[ Validators.required, Validators.minLength(4), Validators.maxLength(8)])
    })

  }


  handleLogin() {
    let login: Login = this.loginFormGroup.value;

    this.authenticationService.signIn(login).subscribe({
      next: response => {
        // ajout du token dans le localstorage
        this.authenticationService.addTokenInLocalstorage(response.value);
        this.errorMessageParent = "Bienvenue chez Bozahouse, la maison des bozayeur :):";

        setTimeout( () => {
          console.log("it is time to wait....")
        }, 10000)

        this.router.navigateByUrl("/home");
        /*        if (this.authenticationService.hasAnyAuthority('EDITOR')){
                  this.router.navigateByUrl("/users");
                }else {
                  this.router.navigateByUrl("/home");
                }*/

      },
      error: (err: HttpErrorResponse) => {
        console.log('jentre bien')
        this.errorMessageParent = err.error.error;
        // appel de la méthode handleError(error) situé dans ModalErrorComponent
        this.childError?.handleError(err);
      }
    });
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

/*  function password_show_hide() {
    var x = document.getElementById("password");
    var show_eye = document.getElementById("show_eye");
    var hide_eye = document.getElementById("hide_eye");
    hide_eye.classList.remove("d-none");
    if (x.type === "password") {
      x.type = "text";
      show_eye.style.display = "none";
      hide_eye.style.display = "block";
    } else {
      x.type = "password";
      show_eye.style.display = "block";
      hide_eye.style.display = "none";
    }
  }*/

   password_show_hide() {
    let x: any = document.getElementById("password");
    let show_eye = document.getElementById("show_eye");
    let hide_eye = document.getElementById("hide_eye");
    hide_eye?.classList.remove("d-none");
    if (x.type === "password") {
      x.type = "text";
      show_eye!.style.display = "none";
      hide_eye!.style.display = "block";
    } else {
      x.type = "password";
      show_eye!.style.display = "block";
      hide_eye!.style.display = "none";
    }
  }

}



