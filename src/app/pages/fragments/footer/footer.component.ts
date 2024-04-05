import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators} from "@angular/forms";
import {TestimonyService} from "../../../services/testimony/testimony.service";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {Testimony} from "../../../models/testimony.models";
import {ErrorManagementComponent} from "../error-management/error-management.component";
import {ModalManagementComponent} from "../modal-management/modal-management.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  standalone: true
})
export class FooterComponent implements OnInit{

  version: string = "1.0.0";
  email: string = "support@bozahouse.com";
  tel: string = "656832062";

  @ViewChild(ErrorManagementComponent) private childError !:any ;
  @ViewChild(ModalManagementComponent) private childModal !:any ;

  testimonyFormGroup: FormGroup = this.fb.group({
    message: this.fb.control("", [Validators.required,Validators.minLength(4), Validators.maxLength(500)])

  });
  constructor(private fb: FormBuilder, private testimonyService: TestimonyService, private router: Router) { }

  ngOnInit(): void {
  }

  handleGetErrorMessageFromChild(fieldName: string, error: ValidationErrors) {
   return this.childError.getErrorMessage(fieldName, error);
  }

  // appel de la méthode showValidationMessageToModal situé dans le composant enfant ModalManagementComponent
  handleShowValidationMessageInModalOfChild(message:string){
    this.childModal.showValidationMessageToModal(message);

  }


  handleSaveTestimony() {
    let testimony: Testimony = this.testimonyFormGroup.value;
    this.testimonyService.saveTestimony(testimony).subscribe({
      next: value => {
        console.log('after save advice', value)
        this.handleShowValidationMessageInModalOfChild("Testimony has been successfully saved");
        //alert("Testimony has been successfully saved");
        //this.newTestimonyFormGroup.reset();
       // this.router.navigateByUrl("/testimonies");
      },
      error: err => {
        this.childError.handleErrors(err);
      }
    })
  }




}
