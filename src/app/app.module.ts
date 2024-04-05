import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import { FooterComponent } from './pages/fragments/footer/footer.component';
import {AuthInterceptor} from "./services/interceptor/AuthInterceptor";
import {NgOptimizedImage, registerLocaleData} from "@angular/common";
import * as fr from '@angular/common/locales/fr';
import {AuthorizeDirective} from "./directives/authorize.directive";
import {ThemeColorComponent} from "./pages/fragments/theme-color/theme-color.component";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    AuthorizeDirective,
    ThemeColorComponent,
    FooterComponent,


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
