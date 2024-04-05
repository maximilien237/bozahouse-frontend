import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {OfferService} from "../../../services/offer/offer.service";
import {TalentService} from "../../../services/talent/talent.service";
import {AppUserService} from "../../../services/app-user/app-user.service";
import {AppUser} from "../../../models/app-user.models";
import {ErrorManagementComponent} from "../error-management/error-management.component";
import {NgOptimizedImage} from "@angular/common";
import {AuthorizeDirective} from "../../../directives/authorize.directive";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [
    RouterLinkActive,
    RouterLink,
    NgOptimizedImage,
    AuthorizeDirective
  ],
  standalone: true
})
export class NavbarComponent implements OnInit {

  currentUser!: AppUser;
  @ViewChild(ErrorManagementComponent) private childError !:any ;

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private offerService: OfferService, private talentService: TalentService, private appUserService: AppUserService) { }

  ngOnInit(): void {
    this.handleCurrentAppUser();
  }

  handleCurrentAppUser(){
    this.appUserService.getAccount().subscribe({
      next: value => {
        console.log(value);
        this.currentUser = value;
      },
      error: err => {
        this.childError.handleErrors(err);
      }
    })
  }


  logout(): void {
   localStorage.clear();
    //window.location.reload();
    this.router.navigateByUrl("/login");
  }

}
