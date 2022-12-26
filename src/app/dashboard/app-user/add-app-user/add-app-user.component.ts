import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
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

  handleSaveUser() {
    let user: AppUser = this.newUserFormGroup.value;
    this.userService.saveAppUser(user).subscribe({
      next: value => {
        alert("user has been successfully saved");
        //this.newUserFormGroup.reset();
        this.router.navigateByUrl("/listUser");
      },
      error: err => {
        console.log(err);
      }
    })
  }



}
