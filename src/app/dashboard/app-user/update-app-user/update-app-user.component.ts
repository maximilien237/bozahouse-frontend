import {Component, OnInit, ViewChild} from '@angular/core';
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
import {ModalErrorComponent} from "../../../pages/shares/modal-error/modal-error.component";

@Component({
  selector: 'app-update-app-user',
  templateUrl: './update-app-user.component.html',
  styleUrls: ['./update-app-user.component.css']
})
export class UpdateAppUserComponent implements OnInit {

  id!: number;
  appUser!: AppUser ;
  updateUserFormGroup!: FormGroup;
  @ViewChild(ModalErrorComponent)
  private childError!: ModalErrorComponent ;

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
            lastname : this.fb.control(this.appUser.lastname, [Validators.pattern("[A-Za-z-çèéàê' -]+"),Validators.required, Validators.minLength(3),Validators.maxLength(30)]),
            firstname: this.fb.control(this.appUser.firstname,[Validators.pattern("[A-Za-z-çèéàê' -]+"),Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
            sex: this.fb.control(this.appUser.sex,[Validators.required]),
            username : this.fb.control(this.appUser.username,[Validators.pattern("[A-Za-z0-9]+"),Validators.required, Validators.minLength(3), Validators.maxLength(12)]),
            password: this.fb.control(this.appUser.password,[Validators.pattern("[A-Za-z0-9]+"),Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
            confirmPassword: this.fb.control(this.appUser.password,[Validators.pattern("[A-Za-z0-9]+"),Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
            birthday: this.fb.control(formatDate(this.appUser.birthday, 'yyyy-MM-dd', 'en'),[Validators.required]),
            acceptTerms: this.fb.control(this.appUser.acceptTerms,[Validators.requiredTrue]),
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
        alert("Utilisateur modifié avec succès !");
        //this.newUserFormGroup.reset();
        this.router.navigateByUrl("/users");
      },
      error: err => {
        console.log(err);
      }
    })
  }

  get r() {
    return this.updateUserFormGroup.controls;
  }

  get password() {
    return this.updateUserFormGroup.get('password');
  }

  get confirmPassword() {
    return this.updateUserFormGroup.get('confirmPassword');
  }

  passwordsMatch() : boolean {
    return this.password?.value === this.confirmPassword?.value;
  }

  handleGetErrorMessageFromChild(fieldName: string, error: ValidationErrors) {
    return this.childError.getErrorMessage(fieldName, error);
  }

  showAndHidePassword() {
    let x:any = document.getElementById("pwd");
    x.type === "password"? x.type = "text": x.type = "password";
  }

  showAndHideConfirmPassword() {
    let x:any = document.getElementById("confPwd");
    x.type === "password"? x.type = "text": x.type = "password";
  }


}
