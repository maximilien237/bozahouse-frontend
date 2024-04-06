import {Component, OnInit, ViewChild} from '@angular/core';
import {AppUserService} from "../../../services/app-user/app-user.service";
import { map} from "rxjs";
import {AppUser} from "../../../models/app-user.models";
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Subscription} from "../../../models/subscription.models";
import {SubscriptionService} from "../../../services/subscription/subscription.service";
import {AppRoleService} from "../../../services/app-role/app-role.service";

import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {UtilCriteria} from "../../../models/criteria/utilCriteria";
import {HttpErrorResponse} from "@angular/common/http";
import {ModalErrorComponent} from "../../../pages/shares/modal-error/modal-error.component";

@Component({
  selector: 'app-list-app-user',
  templateUrl: './list-app-user.component.html',
  styleUrls: ['./list-app-user.component.css']
})
export class ListAppUserComponent implements OnInit {

  @ViewChild(ModalErrorComponent) private childError!: any ;
  username?: string;
  users!: AppUser[];
  errorMessage!:string;
  currentPage: number = 1;
  totalElements!: number;
  pageSize: number = 6;

  searchFormGroup: FormGroup= this.fb.group({
    keyword: this.fb.control("", [Validators.pattern("^(?=.*[a-z]).{3,12}$"),Validators.required])
  });

  addRoleToUserFormGroup: FormGroup= this.fb.group({
    username: this.fb.control("", [Validators.pattern("^(?=.*[a-z]).{3,12}$"),Validators.required]),
    roleName: this.fb.control("", [Validators.required])  });

  removeRoleToUserFormGroup: FormGroup= this.fb.group({
    username: this.fb.control("", [Validators.pattern("^(?=.*[a-z]).{3,12}$"),Validators.required]),
    roleName: this.fb.control("", [Validators.required])  });


  constructor(private authenticationService: AuthenticationService,
              private userService: AppUserService,private roleService: AppRoleService,
              private fb: FormBuilder, private router: Router, private subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
    this.handleAppUserSpecification();
  }


  handleAppUserSpecification() {
    const {
      keyword,
    } = this.searchFormGroup.value;
    const criteria : UtilCriteria={};
    criteria.keyword = keyword || "";
    criteria.page = Number(this.currentPage - 1);
    criteria.size = Number(this.pageSize);

  this.userService.appUserSpecification(criteria).subscribe({
    next: value => {
      this.users = value.content;
      this.totalElements = value.totalElements;
    },
    error: (err: HttpErrorResponse) => {
      // appel de la méthode handleError(error) situé dans ErrorManagementComponent
      console.log("testet  hkdjdj")
      this.childError?.handleErrors(err);
    }
  });

  }



  handleDisableAppUser(appUser: AppUser) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.userService.disableAppUser(appUser.id).subscribe({
      next: value => {
        console.log(value);

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
        console.log(value)

      },
      error: err => {
        console.log(err);
      }
    })

  }

  handleListAppUserSubscription(id: string) {
    this.router.navigate(['userSubscriptions', id]);
  }

  handleListAppUserOffer(id: string) {
    this.router.navigate(['userOffers', id]);
  }

  handleListAppUserTalent(id: string) {
    this.router.navigate(['userTalents', id]);
  }

  handleAppUserDates(id: string){
    this.router.navigate(['userDates', id]);
  }

  handleDetailAppUser(id: number){
    this.router.navigate(['detailUser', id]);
  }

  handleUpdateAppUser(id: number){
    this.router.navigate(['updateUser', id]);
  }


  // navigation entre les pages
  goToPage(page: number){
    this.currentPage = page;
    this.handleAppUserSpecification();
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
