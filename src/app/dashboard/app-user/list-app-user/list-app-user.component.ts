import { Component, OnInit } from '@angular/core';
import {AppUserService} from "../../../services/app-user/app-user.service";
import {AppUser} from "../../../models/app-user.models";
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SubscriptionService} from "../../../services/subscription/subscription.service";
import {AppRoleService} from "../../../services/app-role/app-role.service";

import {AuthenticationService} from "../../../services/authentication/authentication.service";


@Component({
  selector: 'app-list-app-user',
  templateUrl: './list-app-user.component.html',
  styleUrls: ['./list-app-user.component.css']
})
export class ListAppUserComponent implements OnInit {

  roles: string[] = [];
  isLoggedIn = false;
  isAdmin : boolean = false;
  isUser : boolean = false;
  isEditor : boolean = false;
  username?: string;

  users!: AppUser[];
  users1: any;
  //users2: any;
  errorMessage!:string;
  searchFormGroup!: FormGroup;
  currentPage: number = 0;
  totalPages!: number;
  pageSize: number = 5;
  addRoleToUserFormGroup!: FormGroup;
  removeRoleToUserFormGroup!: FormGroup;
  appUserSize: number = 0;
  appUserSizeActivated: number = 0;


  constructor(private authenticationService: AuthenticationService,private userService: AppUserService,private roleService: AppRoleService, private fb: FormBuilder, private router: Router, private subscriptionService: SubscriptionService) { }

  ngOnInit(): void {

    this.searchFormGroup = this.fb.group({
   keyword: this.fb.control("", [Validators.pattern("[A-Za-z0-9]+"),Validators.required, Validators.minLength(3), Validators.maxLength(12)])

    });

    this.addRoleToUserFormGroup = this.fb.group({
      username: this.fb.control("", [Validators.pattern("[A-Za-z0-9]+"),Validators.required, Validators.minLength(3), Validators.maxLength(12)]),
      roleName: this.fb.control("", [Validators.required])

    });

    this.removeRoleToUserFormGroup = this.fb.group({
      username: this.fb.control("", [Validators.pattern("[A-Za-z0-9]+"),Validators.required, Validators.minLength(3), Validators.maxLength(12)]),
      roleName: this.fb.control("", [Validators.required])
    });

    this.handleSearchAppUserByUsername();

    this.getTotalPageAppUser();
//     this.getTotalActivatedAppUser();


    this.isLoggedIn = !!this.authenticationService.getToken();

    if (this.isLoggedIn) {
      const user = this.authenticationService.getUser();
      this.roles = user.roles;

      this.isAdmin = this.roles.indexOf("ADMIN") > -1;
      this.isEditor = this.roles.indexOf("EDITOR") > -1;
      this.isUser = this.roles.indexOf("USER") > -1;

      //this.username = user.username;

    }


  }


  handleSearchAppUserByUsername() {
    let kw = this.searchFormGroup?.value.keyword;
    this.userService.searchAppUserByUsername(kw,this.currentPage, this.pageSize).subscribe(({
      next: value => {
        this.users = value.content;
      }
    }));
  }

/*  listAppUsers(){
    this.users = this.userService.listAppUser(this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }*/



   getTotalPageAppUser(){
     let kw = this.searchFormGroup?.value.keyword;
    this.users1 = this.userService.searchAppUserByUsername(kw,this.currentPage, this.pageSize).subscribe({
      next: value => {
        this.totalPages = value.totalPages;
      },
      error: err => {
        console.log(err);
      }
    });
  }

/*      getTotalActivatedAppUser(){
      this.users2 = this.userService.listAppUser().subscribe({
        next: value => {
          this.appUserSize = value.length;
        },
        error: err => {
          console.log(err);
        }
      });
    } */


  handleDisableAppUser(appUser: AppUser) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.userService.disableAppUser(appUser.id).subscribe({
      next: value => {
        console.log(value);
        this.handleSearchAppUserByUsername();

      },
      error: err => {
        console.log(err);
      }
    })

  }

  handleDeleteUser(user: AppUser) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.userService.deleteAppUser(user.id).subscribe({
      next: value => {
        this.handleSearchAppUserByUsername();

      },
      error: err => {
        console.log(err);
      }
    })

  }


  handleListAppUserOffer(id: number) {
    this.router.navigate(['userOffers', id]);
  }

  handleListAppUserTalent(id: number) {
    this.router.navigate(['userTalents', id]);
  }

  handleDetailAppUser(id: number){
    this.router.navigate(['detailUser', id]);
  }

  handleUpdateAppUser(id: number){
    this.router.navigate(['updateUser', id]);
  }


  goToPage(page: number) {
    this.currentPage = page;
    this.handleSearchAppUserByUsername();
  }

  goToPreviousPage() {
    this.currentPage = this.currentPage - 1;
    this.handleSearchAppUserByUsername();
  }

  goToNextPage() {
    this.currentPage = this.currentPage + 1;
    this.handleSearchAppUserByUsername();
  }

  reloadPage(page: number) {
    this.currentPage = page - 1;
    this.handleSearchAppUserByUsername();
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

  getErrorMessage(fieldName: string, error: ValidationErrors) {
    if (error['required']){
      return "Vous devez remplir ce champs !";
    }else if (error['minlength']){
      return "Ce champs doit comporter au moins" + " "+ error['minlength']['requiredLength'] + "  "+ "caractères";
    }else if (error['maxlength']){
      return "Ce champs doit comporter au plus" + "  " + error['maxlength']['requiredLength'] + "  " + "caractères";
    }else if (error['pattern']) {
      return "Ce champs doit comporter uniquement des minuscules" ;
    }else return "";

  }

}
