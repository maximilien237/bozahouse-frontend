import {Component, OnInit, ViewChild} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {AppUserService} from "../../../services/app-user/app-user.service";
import {AppUser} from "../../../models/app-user.models";
import {Router} from "@angular/router";
import {ModalErrorComponent} from "../../../pages/shares/modal-error/modal-error.component";

@Component({
  selector: 'app-add-app-user',
  templateUrl: './add-app-user.component.html',
  styleUrls: ['./add-app-user.component.css']
})
export class AddAppUserComponent implements OnInit {

  newUserFormGroup!: FormGroup;
  @ViewChild(ModalErrorComponent)
  private childError!: ModalErrorComponent ;

  constructor(private fb: FormBuilder, private userService: AppUserService, private router: Router) { }

  ngOnInit(): void {
    this.newUserFormGroup = this.fb.group({
      account : this.fb.control("", [Validators.required]),
      howKnowUs: this.fb.control("", [Validators.required]),
      lastname : this.fb.control("", [Validators.required, Validators.minLength(3),Validators.maxLength(30)]),
      firstname: this.fb.control("",[Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      sex: this.fb.control("",[Validators.required]),
      username: this.fb.control("",[Validators.pattern("^[a-z0-9_+&*-]+(?:\\.[a-z0-9_+&*-]+)*@(?:[a-z0-9-]+\\.)+[a-z]{2,15}$"),Validators.required, Validators.email]),
      password: this.fb.control("",[Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: this.fb.control("",[Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      birthday: this.fb.control(null,[Validators.required]),
      acceptTerms: this.fb.control(false,[Validators.requiredTrue]),
    });

  }

  handleSaveUser() {
    let user: AppUser = this.newUserFormGroup.value;
    this.userService.saveAppUser(user).subscribe({
      next: value => {
        alert("Utilisateur enregistré avec succès !");
        //this.newUserFormGroup.reset();
        this.router.navigateByUrl("/users");
      },
      error: err => {
        console.log(err);
      }
    })
  }


  get r() {
    return this.newUserFormGroup.controls;
  }

  get password() {
    return this.newUserFormGroup.get('password');
  }

  get confirmPassword() {
    return this.newUserFormGroup.get('confirmPassword');
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
