import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppUser} from "../../models/app-user.models";
import {environment} from "../../../environments/environment";
import {AppUserDates} from "../../models/appUserDates.models";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AppUserService {

  constructor(private http: HttpClient) { }

/*  public listAppUser(page: number, size: number): Observable<Array<AppUser>> {
    return this.http.get<Array<AppUser>>(environment.backendHostEditor + "users?page=" + page + "&size=" + size)
  }

  public listAppUserDisabled(page: number, size: number): Observable<Array<AppUser>> {
    return this.http.get<Array<AppUser>>(environment.backendHostAdmin + "users/disabled?page=" + page + "&size=" + size)
  }*/

  public getAppUser(id : string): Observable<AppUser> {
    return this.http.get<AppUser>(environment.backendHostAdmin  + "users/"+id)
  }

  public getAccount(): Observable<AppUser> {
    return this.http.get<AppUser>(environment.backendHostAppUser  + "users/account")
  }

  public searchAppUserByUsername(keyword : string,page: number, size: number): Observable<Array<AppUser>> {
    return this.http.get<Array<AppUser>>(environment.backendHostEditor  + "users/username?keyword="+keyword+ "&page=" + page + "&size=" + size)
  }

  public searchAppUsersDisabledByUsername(keyword : string,page: number, size: number): Observable<Array<AppUser>> {
    return this.http.get<Array<AppUser>>(environment.backendHostAdmin  + "users/disabled/username?keyword="+keyword+ "&page=" + page + "&size=" + size)
  }

  public listAppUserConnexionDates(id : string,page: number, size: number): Observable<Array<AppUserDates>> {
    return this.http.get<Array<AppUserDates>>(environment.backendHostAdmin  + "users/dates/" +id + "?page=" + page + "&size=" + size)
  }

  public saveAppUser(user: AppUser):Observable<AppUser>{
    return this.http.post<AppUser>(environment.backendHostAdmin+"users",user);
  }

  public updateAppUser(id: string, appUser: AppUser): Observable<AppUser>{
    return this.http.put<AppUser>(environment.backendHostAdmin + "users/"+id, appUser);
  }

  public deleteAppUser(id: string){
    return this.http.delete(environment.backendHostAdmin+"users/"+id);
  }

  public deleteAppUserDates(id: number){
    return this.http.delete(environment.backendHostAdmin+"users/dates/"+id);
  }


  public addRoleToUser(username: string, roleName: string): Observable<AppUser>{
    return this.http.put<AppUser>(environment.backendHostAdmin + "users/add?username=" + username + "&roleName=" + roleName, httpOptions);
  }

  public removeRoleToUser(username: string, roleName: string): Observable<AppUser>{
    return this.http.put<AppUser>(environment.backendHostAdmin + "users/remove?username=" + username + "&roleName=" + roleName,httpOptions);
  }


  public disableAppUser(id: string){

    return this.http.delete(environment.backendHostAdmin + "users/disabled/"+id);
  }

  public enableAppUser(id: string){

    return this.http.delete(environment.backendHostAdmin + "users/enabled/"+id);
  }



}
