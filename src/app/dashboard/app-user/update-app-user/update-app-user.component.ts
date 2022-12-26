import { Component, OnInit } from '@angular/core';
import {AppUser} from "../../../models/app-user.models";
import {ActivatedRoute, Router} from "@angular/router";
import {AppUserService} from "../../../services/app-user/app-user.service";
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-update-app-user',
  templateUrl: './update-app-user.component.html',
  styleUrls: ['./update-app-user.component.css']
})
export class UpdateAppUserComponent implements OnInit {

  id!: string;
  appUser!: AppUser ;
  updateUserFormGroup!: FormGroup;
  constructor(private userService: AppUserService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.userService.getAppUser(this.id).subscribe(
      {
        next: value => {
          console.log(value);
          this.appUser = value;
          this.updateUserFormGroup = this.fb.group({

            account : this.fb.control(this.appUser.account, [Validators.required]),
            howKnowUs: this.fb.control(this.appUser.howKnowUs, [Validators.required]),
            lastname : this.fb.control(this.appUser.lastname, [Validators.pattern("[A-Z' -]+"),Validators.required, Validators.minLength(4),Validators.maxLength(30)]),
            firstname: this.fb.control(this.appUser.firstname,[Validators.pattern("[A-Z][a-z' -]+"),Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
            sex: this.fb.control(this.appUser.sex,[Validators.required]),
            email: this.fb.control(this.appUser.email,[Validators.pattern("^[a-z0-9_+&*-]+(?:\\.[a-z0-9_+&*-]+)*@(?:[a-z0-9-]+\\.)+[a-z]{2,15}$"),Validators.required, Validators.email]),
            username : this.fb.control(this.appUser.username,[Validators.pattern("^(?=.*[a-z]).{3,12}$"),Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
            password: this.fb.control(this.appUser.password,[Validators.pattern("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$"),Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
            confirmPassword: this.fb.control(this.appUser.confirmPassword,[Validators.pattern("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$"),Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
            birthday: this.fb.control(formatDate(this.appUser.birthday, 'yyyy-MM-dd', 'en'),[Validators.required]),
            referralCode: this.fb.control(this.appUser.referralCode,[Validators.pattern("^(?=.*[a-z0-9]).{6,20}$"), Validators.minLength(6), Validators.maxLength(15)])

          });
        }, error: err => {
          console.log(err);
        }

    });
  }


  handleUpdateUser() {
    let user: AppUser = this.updateUserFormGroup.value;
    this.userService.updateAppUser(this.id, user).subscribe({
      next: value => {
        console.log(value);
        alert("user has been successfully updated");
        //this.newUserFormGroup.reset();
        this.router.navigateByUrl("/listUser");
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
