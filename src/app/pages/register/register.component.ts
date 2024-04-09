import {Component, OnInit, ViewChild} from '@angular/core';
import {

  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {Router} from "@angular/router";
import {AppUser} from "../../models/app-user.models";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {ModalErrorComponent} from "../shares/modal-error/modal-error.component";



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild(ModalErrorComponent)
  private childError!: ModalErrorComponent ;

  registerFormGroup!: FormGroup;
  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.registerFormGroup = this.fb.group({
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

  handleRegister() {
    let user: AppUser = this.registerFormGroup.value;
    this.authenticationService.signUp(user).subscribe({
      next: value => {
        console.log(value);
        alert("Compte crée avec succès !");
        alert("Consultez votre boite mail pour activer votre compte !");
        this.router.navigateByUrl("/login");
        //this.newUserFormGroup.reset();
      },
      error: err => {
        console.log(err);
      }
    })
  }

  get r() {
    return this.registerFormGroup.controls;
  }

  get password() {
    return this.registerFormGroup.get('password');
  }

  get confirmPassword() {
    return this.registerFormGroup.get('confirmPassword');
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
