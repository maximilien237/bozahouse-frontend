import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {ModalErrorComponent} from "../shares/modal-error/modal-error.component";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerFormGroup: FormGroup = this.fb.group({
    account : this.fb.control("", [Validators.required]),
    howKnowUs: this.fb.control("", [Validators.required]),
    lastname : this.fb.control("", [Validators.required, Validators.minLength(3),Validators.maxLength(30)]),
    firstname: this.fb.control("",[Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    sex: this.fb.control("",[Validators.required]),
    email: this.fb.control("",[Validators.pattern("^[a-z0-9_+&*-]+(?:\\.[a-z0-9_+&*-]+)*@(?:[a-z0-9-]+\\.)+[a-z]{2,15}$"),Validators.required, Validators.email]),
    password: this.fb.control("",[Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    confirmPassword: this.fb.control("",[Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    birthday: this.fb.control(null,[Validators.required]),
    acceptTerms: this.fb.control(false,[Validators.requiredTrue]),

    name : this.fb.control(""),
    web : this.fb.control(""),
    linkedin : this.fb.control(""),
    logo : this.fb.control(""),
  });

  @ViewChild(ModalErrorComponent)
  private childError!: ModalErrorComponent ;
  // pour les validations dynamiques
  subscriptions: Subscription[] = [];
  logo!:File;
  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) { }

  /**
   * on détruit les suscriptions
   */
  ngOnDestroy(): void {
// on désouscrit à toutes les suuscriptions
    if(this.subscriptions.length){
      this.subscriptions.forEach(subscription=>subscription.unsubscribe())
      ;
    }
    }

  ngOnInit(): void {

    // reproduire ce bloc de code autant de fois que j'ai d'attributs qui changent
    this.subscriptions.push(
      this.registerFormGroup.get("account")!.valueChanges.subscribe(value=>{

        console.log("account : ",value);
        if(value === 'Entreprise'){
          this.registerFormGroup.get('name')?.addValidators(Validators.required);
          this.registerFormGroup.get('web')?.addValidators(Validators.required);
          this.registerFormGroup.get('linkedin')?.addValidators(Validators.required);
          this.registerFormGroup.get('logo')?.addValidators(Validators.required);
        } else {
          this.registerFormGroup.get('name')?.clearValidators();
          this.registerFormGroup.get('web')?.clearValidators();
          this.registerFormGroup.get('linkedin')?.clearValidators();
          this.registerFormGroup.get('logo')?.clearValidators();
        }
        this.registerFormGroup.get('name')?.setValue(null);
        this.registerFormGroup.controls['name'].updateValueAndValidity();
        this.registerFormGroup.get('web')?.setValue(null);
        this.registerFormGroup.controls['web'].updateValueAndValidity();
        this.registerFormGroup.get('linkedin')?.setValue(null);
        this.registerFormGroup.controls['linkedin'].updateValueAndValidity();
        this.registerFormGroup.get('logo')?.setValue(null);
        this.registerFormGroup.controls['logo'].updateValueAndValidity();
      })
    );

    // pour un autre attribut
    /*    this.sub.push(
          this.formuleFormGroup.get("typeFormule")!.valueChanges.subscribe(value=>{

            if(value === 'AVEC_TP'){
              this.formuleFormGroup.get('pourcentageTP')?.addValidators(Validators.required);
            } else {
              this.formuleFormGroup.get('pourcentageTP')?.clearValidators();
            }
          })
        );*/

  }

  handleRegister() {
    const {
      acceptTerms,
      account,
      birthday,
      email,
      firstname,
      howKnowUs,
      lastname,
      password,
      sex,
      name,
      web,
      linkedin,

    } = this.registerFormGroup.value;

    const formdata: FormData = new FormData();
    formdata.append("acceptTerms",acceptTerms)
    formdata.append("account",account)
    formdata.append("birthday",birthday)
    formdata.append("email",email)
    formdata.append("firstname",firstname)
    formdata.append("howKnowUs",howKnowUs)
    formdata.append("lastname",lastname)
    formdata.append("password",password)
    formdata.append("sex",sex)
    formdata.append("name",name)
    formdata.append("web",web)
    formdata.append("linkedin",linkedin)
    formdata.append("logo",this.logo)

/*    let user: AppUser = {
      acceptTerms: false,
      account: "",
      birthday: new Date(),
      email: "",
      firstname: "",
      howKnowUs: "",
      lastname: "",
      password: "",
      sex: ""
    };
    user.acceptTerms = acceptTerms;
    user.account = account;
    user.birthday = birthday;
    user.email = email;
    user.firstname =firstname;
    user.lastname = lastname;
    user.howKnowUs = howKnowUs;
    user.password = password;
    user.sex = sex;

    user.enterpriseRequest = {
      name: this.registerFormGroup.get("name")?.value,
      web: this.registerFormGroup.get("web")?.value,
      linkedin: this.registerFormGroup.get("linkedin")?.value,
      logo: this.registerFormGroup.get("logo")?.value
    };*/

    console.log('user => : ', formdata)

    this.authenticationService.signUp(formdata).subscribe({
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

  get email() {
    return this.registerFormGroup.get('username');
  }

  get confirmPassword() {
    return this.registerFormGroup.get('confirmPassword');
  }

  passwordsMatch() : boolean {
    return this.password?.value === this.confirmPassword?.value;
  }

  emailIsEmpty(): boolean {
    return this.email?.value;
  }

  passwordIsEmpty(): boolean {
    return this.password?.value;
  }

  confirmPasswordIsEmpty(): boolean {
    return this.confirmPassword?.value;
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


  /**
   *  cette fonction permet de récupérer le dernier fichier sélectionné
   */
  getFile(event: any): void {
    this.logo = event.target.files[0];
    this.registerFormGroup.get('logo')?.setValue(this.logo);
    console.log('file: =>', this.registerFormGroup.get('logo')?.value)
  }


}
