import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {AppRole} from "../../../models/app-role.models";
import {AppRoleService} from "../../../services/app-role/app-role.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AppUser} from "../../../models/app-user.models";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {AppUserService} from "../../../services/app-user/app-user.service";
import {Page} from "../../../models/Page";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {HeaderComponent} from "../../../pages/fragments/header/header.component";
import {FooterComponent} from "../../../pages/fragments/footer/footer.component";

@Component({
  selector: 'app-list-app-role',
  templateUrl: './list-app-role.component.html',
  styleUrls: ['./list-app-role.component.css'],
  imports: [
    NgIf,
    HeaderComponent,
    AsyncPipe,
    NgForOf,
    NgClass,
    ReactiveFormsModule,
    RouterLink,
    FooterComponent
  ],
  standalone: true
})
export class ListAppRoleComponent implements OnInit {


  //roles1: any;
  searchFormGroup: FormGroup | undefined;
  currentPage: number = 0;
  totalPages!: number;
  pageSize: number = 5;


  roles!: Observable<Page<AppRole>>;
  errorMessage!:string;
  newRoleFormGroup!: FormGroup;
  constructor(private authenticationService: AuthenticationService,private userService: AppUserService, private fb: FormBuilder, private roleService: AppRoleService,
              private router: Router) { }

  ngOnInit(): void {
    this.listRoles();
    //this.getTotalPage();
    this.newRoleFormGroup = this.fb.group({
      name : this.fb.control("",[Validators.pattern("[A-Z]+"),Validators.required, Validators.minLength(4),Validators.maxLength(18)])

    });


  }

/*  getTotalPage(){
    this.roles1 = this.roleService.listRoles(this.currentPage, this.pageSize).subscribe({
      next: value => {
        this.totalPages = value.totalPages;
      },
      error: err => {
        console.log(err);
      }
    });
  }*/

  reloadPage() {
    this.currentPage = this.currentPage -1;
    this.listRoles();
  }

  listRoles() {
    this.roles = this.roleService.listRoles(this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );

  }

  handleSaveRole() {
    let role: AppRole = this.newRoleFormGroup.value;
    this.roleService.saveRole(role).subscribe({
      next: value => {
        console.log(value);
        alert("role has been successfully saved");
      },
      error: err => {
        console.log(err);
      }
    })
  }


  handleDetailAppRole(id: number){
    this.router.navigate(['detailRole', id]);
  }

  handleUpdateAppRole(id: number){
    this.router.navigate(['updateRole', id]);
  }

  handleDeleteRole(role: AppRole) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.roleService.deleteRoleById(role.id).subscribe({
      next: value => {
        console.log(value)

      },
      error: err => {
        console.log(err);
      }
    })

  }

  goToPage(page: number) {
    this.currentPage = page;
    this.listRoles();
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
