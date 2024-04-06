import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, shareReplay} from "rxjs";
import {AppUser} from "../models/app-user.models";
import {environment} from "../../environments/environment";



const path = "users/";

@Injectable({
  providedIn: 'root'
})
export class AppUserService {

  public currentUser$ = this.getAccount().pipe(shareReplay(1));

  constructor(private http: HttpClient) { }


  public getAccount(): Observable<AppUser> {
    return this.http.get<AppUser>(environment.backendAPI  + "users/account")
  }



}
