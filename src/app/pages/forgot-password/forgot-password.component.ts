import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators} from "@angular/forms";

import {Router, RouterLink} from "@angular/router";
import {AppUser} from "../../models/app-user.models";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  standalone: true
})
export class ForgotPasswordComponent implements OnInit {

  newPasswordFormGroup!: FormGroup;
  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.newPasswordFormGroup = this.fb.group({
    username : this.fb.control("",[Validators.pattern("^(?=.*[a-z]).{3,12}$"),Validators.required, Validators.minLength(4), Validators.maxLength(12)])

    });

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
    }else return "";

  }

  handleResetPassword() {
    let user: AppUser = this.newPasswordFormGroup.value;
    this.authenticationService.forgotPassword(user.username).subscribe({
      next: value => {
        alert("password has been successfully reset");
        alert("check your new password in your box mail");
        //this.newUserFormGroup.reset();
        this.router.navigateByUrl("/login");
      },
      error: err => {
        console.log(err);
      }
    })
  }

}
