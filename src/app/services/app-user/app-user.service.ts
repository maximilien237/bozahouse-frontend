import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppUser} from "../../models/app-user.models";
import {environment} from "../../../environments/environment";
import { Page } from 'src/app/models/Page';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AppUserService {

  constructor(private http: HttpClient) { }
/*
  public listAppUser(): Observable<Array<AppUser>> {
    return this.http.get<Array<AppUser>>(environment.backendHostAdmin + "users")
  }

  public listAppUserDisabled(page: number, size: number): Observable<Array<AppUser>> {
    return this.http.get<Array<AppUser>>(environment.backendHostAdmin + "users/disabled?page=" + page + "&size=" + size)
  }*/

  public getAppUser(id : number): Observable<AppUser> {
    return this.http.get<AppUser>(environment.backendHostAdmin  + "users/"+id)
  }

  public getAccount(): Observable<AppUser> {
    return this.http.get<AppUser>(environment.backendHostAppUser  + "users/account")
  }

  public searchAppUserByUsername(keyword : string,page: number, size: number): Observable<Page<AppUser>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("keyword",keyword);
    queryParams = queryParams.append("page",page);
    queryParams = queryParams.append("size",size);
    return this.http.get<Page<AppUser>>(environment.backendAPI +"/api/editor/v1/users/username/", {params: queryParams})
  }

  public searchAppUsersDisabledByUsername(keyword : string,page: number, size: number): Observable<Array<AppUser>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("keyword",keyword);
    queryParams = queryParams.append("page",page);
    queryParams = queryParams.append("size",size);
    return this.http.get<Array<AppUser>>(environment.backendHostAdmin  + "users/disabled/username", {params: queryParams})
  }


  public saveAppUser(user: AppUser):Observable<AppUser>{
    return this.http.post<AppUser>(environment.backendHostAdmin+"users",user);
  }

  public updateAppUser(id: number, appUser: AppUser): Observable<AppUser>{
    return this.http.put<AppUser>(environment.backendHostAdmin + "users/"+id, appUser);
  }

  public deleteAppUser(id: number){
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


  public disableAppUser(id: number){

    return this.http.delete(environment.backendHostAdmin + "users/disabled/"+id);
  }

  public enableAppUser(id: number){

    return this.http.delete(environment.backendHostAdmin + "users/enabled/"+id);
  }



}
