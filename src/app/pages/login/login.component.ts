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



const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup!: FormGroup;
  errorMessage = '';
  roles: string[] = [];


  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({

      username: this.fb.control(null,[Validators.required,Validators.pattern("^(?=.*[a-z]).{3,12}$"),Validators.minLength(4), Validators.maxLength(12)]),
      password: this.fb.control(null,[ Validators.required, Validators.pattern("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$"), Validators.minLength(4), Validators.maxLength(8)])
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

          this.authenticationService.saveToken(value.accessToken);
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
          console.log(err);
          this.errorMessage = err.error.message;
        }
      })
    }

  getErrorMessage(fieldName: string, error: ValidationErrors) {
    if (error['required']){
      return fieldName + "  "+ " is required";
    }else if (error['minlength']){
      return fieldName + "  "+ "should have at least" + " "+ error['minlength']['requiredLength'] + "  "+ "characters";
    }else if (error['maxlength']){
      return fieldName + "  "+ "should have at the most" + "  " + error['maxlength']['requiredLength'] + "  " + "characters";
    }else if (error['pattern']) {
      return fieldName + "  "+ "required this pattern" + error['pattern']['requiredPattern'] ;
    }else if (error['email']) {
      return fieldName + "  " + "address is not valid "+ "  "+ error['email']['requiredEmail'];
    }else return "";

  }

}



