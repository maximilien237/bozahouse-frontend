import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators} from "@angular/forms";
import {AppRoleService} from "../../../services/app-role/app-role.service";
import {AppRole} from "../../../models/app-role.models";
import {Router} from "@angular/router";
import {NavbarComponent} from "../../../pages/fragments/navbar/navbar.component";
import {FooterComponent} from "../../../pages/fragments/footer/footer.component";

@Component({
  selector: 'app-add-app-role',
  templateUrl: './add-app-role.component.html',
  styleUrls: ['./add-app-role.component.css'],
  imports: [
    NavbarComponent,
    ReactiveFormsModule,
    FooterComponent
  ],
  standalone: true
})
export class AddAppRoleComponent implements OnInit {

  newRoleFormGroup!: FormGroup;
  constructor(private fb: FormBuilder, private roleService: AppRoleService,
              private router: Router) { }

  ngOnInit(): void {
    this.newRoleFormGroup = this.fb.group({
      name : this.fb.control("",[Validators.pattern("[A-Z]+"),Validators.required, Validators.minLength(4),Validators.maxLength(18)])
    });

  }

  handleSaveRole() {
    let role: AppRole = this.newRoleFormGroup.value;
    this.roleService.saveRole(role).subscribe({
      next: value => {
        console.log(value);
        alert("role has been successfully saved");
        this.router.navigateByUrl("/listRole");
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
