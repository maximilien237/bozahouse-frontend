import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {AppUser} from "../../models/app-user.models";
import {Login} from "../../models/login.models";
import {jwtDecode} from "jwt-decode";
import {DataResponse} from "../../models/DataResponse";




const TOKEN_KEY = "token";
const path = "/auth/";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  //npm i jwt-decode

  forgotPassword(username : string): Observable<DataResponse> {
    return this.http.put<DataResponse> (environment.backendAPI + path +"forgotPassword/" , username);
  }

  public signIn(login: Login): Observable<DataResponse> {
    return this.http.post<DataResponse>(environment.backendAPI+ path +"signIn", login);
  }

  public signUp(appUser: FormData): Observable<AppUser> {
    return this.http.post<AppUser>(environment.backendAPI + path +"signUp", appUser);
  }

  //ajout du token dans le localstorage
  public addTokenInLocalstorage(token: string  | undefined): void {
    console.log('addTokenInLocalstorage', token)
    localStorage.removeItem(TOKEN_KEY);
    if (typeof token === "string") {
      localStorage.setItem(TOKEN_KEY, token);
    }
  }

  public removeTokenInLocalstorage(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  // obtention du token dans le localstorage
  public getToken(): any  {
    return localStorage.getItem(TOKEN_KEY);
  }

  // obtention des roles de l'utilisateur à partir du localstorage
  getRolesFromToken():any{
    return this.getClaimOfToken()?.authorities;
  }

  // obtention du username à partir du localstorage
  getUsernameFromToken(): string{
    return this.getClaimOfToken()?.sub;
  }

  // obtention du type de compte à partir du localstorage
  getAccountFromToken(): string{
    return this.getClaimOfToken()?.account;
  }

  hasAnyAuthority(authorities: string[] | string): boolean {

    // vérification de l'existence du token
    if (!localStorage.getItem(TOKEN_KEY)) {
      return false;
    }
    // on vérifie si authorities est un tableau
    if (!Array.isArray(authorities)) {
      // conversion du string authorities en tableau d'authorities
      authorities = [authorities];
    }

    //console.log("authorities...",this.getRoleFromToken());
    // retourne true si l'authority entré fait partie des autorities de l'utilisateur connecter
    console.log(this.getRolesFromToken())
    return this.getRolesFromToken().some((authority: string) => authorities.includes(authority) );
  }

  getClaimOfToken(): any{
    return this.decodeAccescToken(this.getToken());
  }

  decodeAccescToken(token: string){
    try {
      return jwtDecode(token);
    }catch (error){
      return null;
    }
  }


}
