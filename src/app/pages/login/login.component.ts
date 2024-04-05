import {Component, OnInit, ViewChild} from '@angular/core';
import {
  FormBuilder,
  FormGroup, ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";

import {Login} from "../../models/login.models";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {Router, RouterLink} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorManagementComponent} from "../fragments/error-management/error-management.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    ReactiveFormsModule,
    ErrorManagementComponent,
    CommonModule,
    RouterLink
  ],
  standalone: true
})
export class LoginComponent implements OnInit {

  loginFormGroup!: FormGroup;
  @ViewChild(ErrorManagementComponent) private childError !:any ;


  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({

      username: this.fb.control("",[Validators.pattern("^[a-z0-9_+&*-]+(?:\\.[a-z0-9_+&*-]+)*@(?:[a-z0-9-]+\\.)+[a-z]{2,15}$"),Validators.required, Validators.email]),
      password: this.fb.control("",[ Validators.required, Validators.pattern("[A-Za-z0-9-@]+"), Validators.minLength(4), Validators.maxLength(8)])
    })

  }


    handleLogin() {
      let login: Login = this.loginFormGroup.value;

      this.authenticationService.signIn(login).subscribe({
        next: token => {
          console.log('after login',token);

          // ajout du token dans le localstorage
          this.authenticationService.addTokenInLocalstorage(token.accessToken);

          console.log('after addTokenInLocalstorage',token);

          if (this.authenticationService.hasAnyAuthority('EDITOR')){
            this.router.navigateByUrl("/users");
          }else {
            this.router.navigateByUrl("/home");
          }

        },
        error: (err: HttpErrorResponse) => {
          // appel de la méthode handleError(error) situé dans ErrorManagementComponent
          console.log("testet  hkdjdj")
         this.childError?.handleErrors(err);
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


}



