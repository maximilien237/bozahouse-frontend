import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {environment} from "../../../environments/environment";
import {AppUser} from "../../models/app-user.models";
import {Login} from "../../models/login.models";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticateUser!: AppUser;
  authenticated!: boolean;

  constructor(private http: HttpClient) {
  }

  forgotPassword(username : string): Observable<any> {
    return this.http.put(environment.backendHostPublic + "forgotPassword/" , username);
  }

  public signIn(login: Login) {
    return this.http.post<any>(environment.backendAPI+ "/api/auth/v1/signIn", login);
  }

  public signUp(appUser: AppUser) {
    return this.http.post<AppUser>(environment.backendHostPublic + "signUp", appUser);
  }

  //manage token
  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  isAdmin(){
    if(this.authenticateUser){
      return this.authenticateUser.roles.indexOf("ADMIN")>-1;
    }
    else return false;
  }

  isEditor(){
    if(this.authenticateUser){
      return this.authenticateUser.roles.indexOf("EDITOR")>-1;
    }
    else return false;
  }

  isUser(){
    if(this.authenticateUser){
      return this.authenticateUser.roles.indexOf("USER")>-1;
    }
    else return false;
  }

  handleLogout(){
    this.authenticated=false;
    //this.authenticateUser=undefined;
    localStorage.removeItem(USER_KEY);
  }



}
