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
import {ToastComponent} from "../shares/toast/toast.component";
import {NotificationService} from "../../services/toastr/notification.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginFormGroup!: FormGroup;

  @ViewChild(ModalErrorComponent)
  private childError!: ModalErrorComponent ;
  errorMessageParent : string = "";

  @ViewChild(ToastComponent)
  private childToast!: ToastComponent;
  toastMessageParent: string = "";

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router, private notificationService: NotificationService) {
  }


  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({

      email: this.fb.control("",[Validators.required,Validators.pattern("^[a-z0-9_+&*-]+(?:\\.[a-z0-9_+&*-]+)*@(?:[a-z0-9-]+\\.)+[a-z]{2,15}$"),Validators.email]),
      password: this.fb.control("",[ Validators.required, Validators.minLength(4), Validators.maxLength(8)])
    })

  }
  get r() {
    return this.loginFormGroup.controls;
  }

  get password() {
    return this.loginFormGroup.get('password');
  }

  get email() {
    return this.loginFormGroup.get('email');
  }

  emailIsEmpty(): boolean {
    return !this.email?.value && this.email?.touched!;
  }

  passwordIsEmpty(): boolean {
    return !this.password?.value && this.password?.touched!;
  }

  handleLogin() {
    let login: Login = this.loginFormGroup.value;
    this.authenticationService.removeTokenInLocalstorage();

    this.authenticationService.signIn(login).subscribe({
      next: response => {
        console.log(response.value)
        // ajout du token dans le localstorage
        this.authenticationService.addTokenInLocalstorage(response.value);
        this.toastMessageParent = "Bienvenue chez Bozahouse, la maison des bozayeur ): !";

        this.router.navigateByUrl("/home").then( (): void => {
          this.notificationService.showSuccess("Bienvenue chez Bozahouse, \n\n\n la maison des bozayeur !");
        });

        setTimeout( () => {
          console.log("it's time to wait....");
        }, 10000)

      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.notificationService.showError("Connexion impossible !");
        }

       // this.errorMessageParent = err.error.error;
        // appel de la méthode handleError(error) situé dans ModalErrorComponent
       // this.childError?.handleError(err);
      }
    });
  }

  handleGetErrorMessageFromChild(fieldName: string, error: ValidationErrors) {
    return this.childError.getErrorMessage(fieldName, error);
  }

  showAndHidePassword() {
    let x:any = document.getElementById("pwd");
    x.type === "password"? x.type = "text": x.type = "password";
  }


}



