import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {AppUserService} from "../../services/app-user/app-user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppRoleService} from "../../services/app-role/app-role.service";
import {Router} from "@angular/router";
import {AppUser} from "../../models/app-user.models";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  addRoleToUserFormGroup!: FormGroup;
  removeRoleToUserFormGroup!: FormGroup;

  constructor(private authenticationService: AuthenticationService,private userService: AppUserService, private fb: FormBuilder, private roleService: AppRoleService,
              private router: Router) { }


  ngOnInit(): void {
    this.addRoleToUserFormGroup = this.fb.group({
      username: this.fb.control("", [Validators.pattern("^(?=.*[a-z]).{3,12}$"),Validators.required, Validators.minLength(3), Validators.maxLength(12)]),
      roleName: this.fb.control("", [Validators.required])

    });

    this.removeRoleToUserFormGroup = this.fb.group({
      username: this.fb.control("", [Validators.pattern("^(?=.*[a-z]).{3,12}$"),Validators.required, Validators.minLength(3), Validators.maxLength(12)]),
      roleName: this.fb.control("", [Validators.required])
    });
  }



  handleAddRoleToUser() {
    const { username, roleName } = this.addRoleToUserFormGroup.value;
    this.userService.addRoleToUser(username, roleName).subscribe({
      next: value => {
        console.log(value);
        alert("role ajouté à l\'utilisateur avec succès !");
        this.addRoleToUserFormGroup.reset();
      },
      error: err => {
        console.log(err);
      }
    })
  }



  handleRemoveRoleToUser() {
    const { username, roleName } = this.removeRoleToUserFormGroup.value;
    this.userService.removeRoleToUser(username, roleName).subscribe({
      next: value => {
        console.log(value);
        alert("role retiré à l\'utilisateur avec succès !");
        this.removeRoleToUserFormGroup.reset();
      },
      error: err => {
        console.log(err);
      }
    })
  }



}
