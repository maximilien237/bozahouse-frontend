import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";

import {HomeComponent} from "./pages/home/home.component";


import { LoginComponent } from './pages/login/login.component';

import { ListAppUserComponent } from './dashboard/app-user/list-app-user/list-app-user.component';
import { DetailAppUserComponent } from './dashboard/app-user/detail-app-user/detail-app-user.component';
import { UpdateAppUserComponent } from './dashboard/app-user/update-app-user/update-app-user.component';
import { AddAppUserComponent } from './dashboard/app-user/add-app-user/add-app-user.component';

import { ListTalentComponent } from './pages/talent/list-talent/list-talent.component';
import { ListOfferComponent } from './pages/offer/list-offer/list-offer.component';


import { DetailNewsComponent } from './dashboard/news/detail-news/detail-news.component';
import { AddNewsComponent } from './dashboard/news/add-news/add-news.component';
import { ListNewsComponent } from './dashboard/news/list-news/list-news.component';
import { UpdateNewsComponent } from './dashboard/news/update-news/update-news.component';

import { AddOfferComponent } from './pages/offer/add-offer/add-offer.component';
import { DetailOfferComponent } from './pages/offer/detail-offer/detail-offer.component';
import { UpdateOfferComponent } from './pages/offer/update-offer/update-offer.component';
import { AddTalentComponent } from './pages/talent/add-talent/add-talent.component';

import { UpdateTalentComponent } from './pages/talent/update-talent/update-talent.component';
import { DetailTalentComponent } from './pages/talent/detail-talent/detail-talent.component';
import { AddAppRoleComponent } from './dashboard/app-role/add-app-role/add-app-role.component';
import { DetailAppRoleComponent } from './dashboard/app-role/detail-app-role/detail-app-role.component';
import { UpdateAppRoleComponent } from './dashboard/app-role/update-app-role/update-app-role.component';
import { ListAppRoleComponent } from './dashboard/app-role/list-app-role/list-app-role.component';
import {RegisterComponent} from "./pages/register/register.component";



import { AccountComponent } from './pages/account/account/account.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import {AuthInterceptor} from "./services/interceptor/AuthInterceptor";
import { UserOffersComponent } from './pages/about-user/user-offers/user-offers.component';
import {UserTalentsComponent} from "./pages/about-user/user-talents/user-talents.component";
import {registerLocaleData} from "@angular/common";
import * as fr from '@angular/common/locales/fr';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { UserTestimoniesComponent } from './pages/about-user/user-testimonies/user-testimonies.component';
import { AddTestimonyComponent } from './pages/testimony/add-testimony/add-testimony.component';
import { ListTestimonyComponent } from './pages/testimony/list-testimony/list-testimony.component';
import { UpdateTestimonyComponent } from './pages/testimony/update-testimony/update-testimony.component';
import { ModalValidationComponent } from './pages/shares/modal-validation/modal-validation.component';
import { ModalConfirmationComponent } from './pages/shares/modal-confirmation/modal-confirmation.component';
import { ModalErrorComponent } from './pages/shares/modal-error/modal-error.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import {NgxPaginationModule} from "ngx-pagination";
import { NavBarComponent } from './pages/static/nav-bar/nav-bar.component';
import { ColorModeComponent } from './pages/static/color-mode/color-mode.component';
import {FooterComponent} from "./pages/static/footer/footer.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ListAppUserComponent,
    DetailAppUserComponent,
    UpdateAppUserComponent,
    AddAppUserComponent,
    ListTalentComponent,
    ListOfferComponent,
    DetailNewsComponent,
    AddNewsComponent,
    ListNewsComponent,
    UpdateNewsComponent,
    AddOfferComponent,
    DetailOfferComponent,
    UpdateOfferComponent,
    AddTalentComponent,
    UpdateTalentComponent,
    DetailTalentComponent,
    AddAppRoleComponent,
    DetailAppRoleComponent,
    UpdateAppRoleComponent,
    ListAppRoleComponent,
    AccountComponent,
    AdminComponent,
    UserTalentsComponent,
    UserOffersComponent,
    ForgotPasswordComponent,
    UserTestimoniesComponent,
    AddTestimonyComponent,
    ListTestimonyComponent,
    UpdateTestimonyComponent,
    ModalValidationComponent,
    ModalConfirmationComponent,
    ModalErrorComponent,
    ConfigurationComponent,
    NavBarComponent,
    ColorModeComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgxPaginationModule,


    ],

  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true},
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR',
    },],


  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
