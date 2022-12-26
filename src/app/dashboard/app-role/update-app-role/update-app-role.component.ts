import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AppRole} from "../../../models/app-role.models";
import {AppRoleService} from "../../../services/app-role/app-role.service";

@Component({
  selector: 'app-update-app-role',
  templateUrl: './update-app-role.component.html',
  styleUrls: ['./update-app-role.component.css']
})
export class UpdateAppRoleComponent implements OnInit {

  id!: number;
  appRole!: AppRole ;
  updateRoleFormGroup!: FormGroup;
  constructor(private roleService: AppRoleService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.roleService.getRole(this.id).subscribe(
      {
        next: value => {
          console.log(value);
          this.appRole = value;
          this.updateRoleFormGroup = this.fb.group({
            name : this.fb.control(this.appRole.name,[Validators.pattern("[A-Z]+"),Validators.required, Validators.minLength(4),Validators.maxLength(18)])

          });
        }, error: err => {
          console.log(err);
        }

      });
  }


  handleUpdateRole() {
    let role: AppRole = this.updateRoleFormGroup.value;
    this.roleService.updateRole(this.id, role).subscribe({
      next: value => {
        console.log(value);
        alert("role has been successfully updated");
        //this.newUserFormGroup.reset();
        // this.router.navigateByUrl("/listRole");
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
