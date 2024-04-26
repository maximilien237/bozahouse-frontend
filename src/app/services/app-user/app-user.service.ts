import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppUser} from "../../models/app-user.models";
import {environment} from "../../../environments/environment";
import {Page} from "../../models/Page";
import {UtilCriteria} from "../../models/criteria/utilCriteria";


const path = "/api/v1/users";

@Injectable({
  providedIn: 'root'
})
export class AppUserService {

  constructor(private http: HttpClient) { }

  public getAppUser(id : number): Observable<AppUser> {
    return this.http.get<AppUser>(environment.backendAPI  +id)
  }

  public getAccount(): Observable<AppUser> {
    return this.http.get<AppUser>(environment.backendAPI  + "users/account")
  }

  public appUserSpecification(criteria: UtilCriteria): Observable<Page<AppUser>> {
    return this.http.post<Page<AppUser>>(environment.backendAPI +path +"/criteria", criteria)
  }

  public saveAppUser(user: AppUser):Observable<AppUser>{
    return this.http.post<AppUser>(environment.backendAPI+"users",user);
  }

  public updateAppUser(id: number, appUser: AppUser): Observable<AppUser>{
    return this.http.put<AppUser>(environment.backendAPI + "users/"+id, appUser);
  }

  public deleteAppUser(id: number){
    return this.http.delete(environment.backendAPI+"users/"+id);
  }

  public deleteAppUserDates(id: number){
    return this.http.delete(environment.backendAPI+"users/dates/"+id);
  }


  public addRoleToUser(username: string, roleName: string): Observable<AppUser>{
    return this.http.get<AppUser>(environment.backendAPI + "users/add?username=" + username + "&roleName=" + roleName);
  }

  public removeRoleToUser(username: string, roleName: string): Observable<AppUser>{
    return this.http.get<AppUser>(environment.backendAPI + "users/remove?username=" + username + "&roleName=" + roleName);
  }


  public disableAppUser(id: number){

    return this.http.delete(environment.backendAPI + "users/disabled/"+id);
  }

  public enableAppUser(id: number){

    return this.http.delete(environment.backendAPI + "users/enabled/"+id);
  }


}
