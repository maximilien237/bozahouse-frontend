import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
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
      lastname : this.fb.control("", [Validators.pattern("[A-Z' -]+"),Validators.required, Validators.minLength(4),Validators.maxLength(30)]),
      firstname: this.fb.control("",[Validators.pattern("[A-Z][a-z' -]+"),Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      sex: this.fb.control("",[Validators.required]),
      email: this.fb.control("",[Validators.pattern("^[a-z0-9_+&*-]+(?:\\.[a-z0-9_+&*-]+)*@(?:[a-z0-9-]+\\.)+[a-z]{2,15}$"),Validators.required, Validators.email]),
      username : this.fb.control("",[Validators.pattern("^(?=.*[a-z]).{3,12}$"),Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
      password: this.fb.control("",[Validators.pattern("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$"),Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: this.fb.control("",[Validators.pattern("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$"),Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      birthday: this.fb.control(null,[Validators.required]),
      referralCode: this.fb.control("",[Validators.pattern("^(?=.*[a-z0-9]).{6,20}$"), Validators.minLength(6), Validators.maxLength(15)])

    });

  }

  handleRegister() {
    let user: AppUser = this.registerFormGroup.value;
    this.authenticationService.signUp(user).subscribe({
      next: value => {
        console.log(value);
        alert("user has been successfully saved");
        alert("consult your email account to validate you account");
        //this.newUserFormGroup.reset();
       // this.router.navigateByUrl("/login");
      },
      error: err => {
        console.log(err);
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
