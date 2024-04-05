import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./pages/home/home.component";


import {AddAppUserComponent} from "./dashboard/app-user/add-app-user/add-app-user.component";
import {DetailAppUserComponent} from "./dashboard/app-user/detail-app-user/detail-app-user.component";
import {UpdateAppUserComponent} from "./dashboard/app-user/update-app-user/update-app-user.component";
import {ListAppUserComponent} from "./dashboard/app-user/list-app-user/list-app-user.component";
import {ListOfferComponent} from "./pages/offer/list-offer/list-offer.component";
import {ListTalentComponent} from "./pages/talent/list-talent/list-talent.component";
import {UpdateTalentComponent} from "./pages/talent/update-talent/update-talent.component";
import {DetailTalentComponent} from "./pages/talent/detail-talent/detail-talent.component";
import {AddTalentComponent} from "./pages/talent/add-talent/add-talent.component";
import {UpdateOfferComponent} from "./pages/offer/update-offer/update-offer.component";
import {DetailOfferComponent} from "./pages/offer/detail-offer/detail-offer.component";
import {AddOfferComponent} from "./pages/offer/add-offer/add-offer.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {ListAppRoleComponent} from "./dashboard/app-role/list-app-role/list-app-role.component";
import {UpdateAppRoleComponent} from "./dashboard/app-role/update-app-role/update-app-role.component";
import {DetailAppRoleComponent} from "./dashboard/app-role/detail-app-role/detail-app-role.component";
import {AddAppRoleComponent} from "./dashboard/app-role/add-app-role/add-app-role.component";
import {ListNewsComponent} from "./dashboard/news/list-news/list-news.component";
import {UpdateNewsComponent} from "./dashboard/news/update-news/update-news.component";
import {DetailNewsComponent} from "./dashboard/news/detail-news/detail-news.component";
import {AddNewsComponent} from "./dashboard/news/add-news/add-news.component";

import {AccountComponent} from "./pages/account/account/account.component";
import {AdminComponent} from "./dashboard/admin/admin.component";

import {UserOffersComponent} from "./pages/about-user/user-offers/user-offers.component";
import {UserTalentsComponent} from "./pages/about-user/user-talents/user-talents.component";
import {AuthenticationGuard} from "./services/guards/authentication.guard";
import {IsAdminGuard} from "./services/guards/is-admin.guard";
import {IsEditorGuard} from "./services/guards/is-editor.guard";
import {ForgotPasswordComponent} from "./pages/forgot-password/forgot-password.component";
import {InfoComponent} from "./pages/info/info.component";
import {UserTestimoniesComponent} from "./pages/about-user/user-testimonies/user-testimonies.component";
import {PrivacyComponent} from "./pages/privacy/privacy.component";
import {PrivacyOutComponent} from "./pages/privacy-out/privacy-out.component";



const routes: Routes = [
  { path: "home", component: HomeComponent, canActivate: [AuthenticationGuard]},
  { path: "account", component: AccountComponent, canActivate: [AuthenticationGuard]},



  { path: "addOffer", component: AddOfferComponent, canActivate: [AuthenticationGuard] },
  { path: "detailOffer/:id", component: DetailOfferComponent, canActivate: [AuthenticationGuard] },
  { path: "updateOffer/:id", component: UpdateOfferComponent, canActivate: [AuthenticationGuard]},
  { path: "jobs", component: ListOfferComponent, canActivate: [AuthenticationGuard]},

  { path: "addTalent", component: AddTalentComponent, canActivate: [AuthenticationGuard] },
  { path: "detailTalent/:id", component: DetailTalentComponent, canActivate: [AuthenticationGuard] },
  { path: "updateTalent/:id", component: UpdateTalentComponent, canActivate: [AuthenticationGuard]},
  { path: "talents", component: ListTalentComponent, canActivate: [AuthenticationGuard] },


  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "info", component: InfoComponent },
  { path: "privacy", component: PrivacyComponent, canActivate: [AuthenticationGuard]  },
  { path: "privacyOut", component: PrivacyOutComponent },
  { path: "forgotPassword", component: ForgotPasswordComponent },

  { path: "admin", component: AdminComponent, canActivate: [AuthenticationGuard, IsAdminGuard]},
  { path: "addRole", component: AddAppRoleComponent, canActivate: [AuthenticationGuard, IsAdminGuard] },
  { path: "detailRole/:id", component: DetailAppRoleComponent, canActivate: [AuthenticationGuard, IsAdminGuard] },
  { path: "updateRole/:id", component: UpdateAppRoleComponent, canActivate: [AuthenticationGuard, IsAdminGuard]},
  { path: "listRole", component: ListAppRoleComponent, canActivate: [AuthenticationGuard, IsAdminGuard] },


  { path: "addNews", component: AddNewsComponent, canActivate: [AuthenticationGuard, IsAdminGuard] },
  { path: "detailNews/:id", component: DetailNewsComponent, canActivate: [AuthenticationGuard, IsAdminGuard] },
  { path: "updateNews/:id", component: UpdateNewsComponent, canActivate: [AuthenticationGuard, IsAdminGuard]},
  { path: "listNews", component: ListNewsComponent, canActivate: [AuthenticationGuard, IsAdminGuard] },

  { path: "addUser", component: AddAppUserComponent, canActivate: [AuthenticationGuard, IsAdminGuard] },
  { path: "detailUser/:id", component: DetailAppUserComponent, canActivate: [AuthenticationGuard, IsAdminGuard] },
  { path: "updateUser/:id", component: UpdateAppUserComponent, canActivate: [AuthenticationGuard, IsAdminGuard]},
  { path: "users", component: ListAppUserComponent, canActivate: [AuthenticationGuard, IsEditorGuard] },

  { path: "userOffers/:id", component: UserOffersComponent, canActivate: [AuthenticationGuard]},
  { path: "userTalents/:id", component: UserTalentsComponent, canActivate: [AuthenticationGuard]},
  { path: "userTestimonies/:id", component: UserTestimoniesComponent, canActivate: [AuthenticationGuard]},


  { path: "", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
