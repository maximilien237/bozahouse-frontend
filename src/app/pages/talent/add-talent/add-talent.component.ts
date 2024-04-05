import {Component, OnInit, ViewChild} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup, ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {TalentService} from "../../../services/talent/talent.service";
import {Router, RouterLink} from "@angular/router";
import {Talent} from "../../../models/talent.models";
import {ErrorManagementComponent} from "../../fragments/error-management/error-management.component";
import {ModalManagementComponent} from "../../fragments/modal-management/modal-management.component";
import {NgIf} from "@angular/common";
import {FooterComponent} from "../../fragments/footer/footer.component";
import {NavbarComponent} from "../../fragments/navbar/navbar.component";


@Component({
  selector: 'app-add-talent',
  templateUrl: './add-talent.component.html',
  styleUrls: ['./add-talent.component.css'],
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    FooterComponent,
    NavbarComponent
  ],
  standalone: true
})
export class AddTalentComponent implements OnInit {

  newTalentFormGroup!: FormGroup;

  @ViewChild(ErrorManagementComponent) private childError !:any ;
  @ViewChild(ModalManagementComponent) private childModal !:any ;

  constructor(private fb: FormBuilder, private talentService: TalentService, private router: Router) { }

  ngOnInit(): void {

    this.newTalentFormGroup = this.fb.group({
      type: this.fb.control("", [Validators.required]),
      email:  this.fb.control("", [Validators.pattern("^[a-z0-9_+&*-]+(?:\\.[a-z0-9_+&*-]+)*@(?:[a-z0-9-]+\\.)+[a-z]{2,15}$"),Validators.email]),
      contract: this.fb.control("", [Validators.required]),
      linkedin: this.fb.control("", [Validators.pattern("^((((https?|ftps?|gopher|telnet|nntp)://)|(mailto:|news:))(%[0-9a-f]{2}|[-()_.!~*';/?:@&=+$,a-z0-9])+)([).!';/?:,][[:blank:|:blank:]])?$")]),
      github: this.fb.control("", [Validators.pattern("^((((https?|ftps?|gopher|telnet|nntp)://)|(mailto:|news:))(%[0-9a-f]{2}|[-()_.!~*';/?:@&=+$,a-z0-9])+)([).!';/?:,][[:blank:|:blank:]])?$")]),
      level: this.fb.control("", [Validators.required]),
      title: this.fb.control("", [Validators.required]),
      domain: this.fb.control("", [Validators.required]),
      address: this.fb.control("", [Validators.required,Validators.pattern("[A-Z][a-z-0-9-é]+, [A-Z][A-Za-z-]+, [A-Z][a-z]{4,30}")]),
      tel: this.fb.control("", [Validators.pattern("[0-9]+"),Validators.minLength(9),Validators.maxLength(9)]),
      whatsAppNumber: this.fb.control("", [Validators.pattern("[0-9]+"),Validators.minLength(9),Validators.maxLength(9)]),
      countryCode: this.fb.control("",[Validators.required]),
      cityName: this.fb.control("",[Validators.required]),
      quarterName: this.fb.control("",[Validators.required]),
      experience: this.fb.control("", [Validators.required]),
      salary: this.fb.control("", [Validators.pattern("[0-9]+")]),
      salaryChoice: this.fb.control("", [Validators.required]),
      skills: this.fb.control("", [Validators.required]),
      workMode: this.fb.control("", [Validators.required])

    });

  }

  /* Set County as Required, based on Country Selected */
  onCountryChange() {
    let salaryChoiceSelected = this.newTalentFormGroup.get('salaryChoice')?.value;
    if(salaryChoiceSelected === 'B') {
      this.newTalentFormGroup.get('salaryChoice')?.setValidators([Validators.required]); // 5.Set Required Validator
      this.newTalentFormGroup.get('salaryChoice')?.updateValueAndValidity();
    } else {
      this.newTalentFormGroup.get('salaryChoice')?.clearValidators(); // 6. Clear All Validators
      this.newTalentFormGroup.get('salaryChoice')?.updateValueAndValidity();
    }
  }

  get controlLinkedin() {
    return this.newTalentFormGroup.get('linkedin');
  }

  handleGetErrorMessageFromChild(fieldName: string, error: ValidationErrors) {
    return this.childError.getErrorMessage(fieldName, error);
  }

  // appel de la méthode showValidationMessageToModal situé dans le composant enfant ModalManagementComponent
  handleShowValidationMessageInModalOfChild(message:string){
    this.childModal.showValidationMessageToModal(message);

  }

  handleSaveTalent() {
    let talent: Talent = this.newTalentFormGroup.value;
    this.talentService.saveTalent(talent).subscribe({
      next: value => {
        console.log('after save talent', value);
        this.handleShowValidationMessageInModalOfChild("Votre profil a été crée avec succès !");
        //this.newUserFormGroup.reset();
        this.router.navigateByUrl("/talents");
      },
      error: err => {
        this.childError.handleErrors(err);
      }
    })
  }



}
