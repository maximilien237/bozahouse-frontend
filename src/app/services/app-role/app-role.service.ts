import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {AppRole} from "../../models/app-role.models";


@Injectable({
  providedIn: 'root'
})
export class AppRoleService {

  constructor(private http: HttpClient) { }

  getRole(id: number): Observable<AppRole>{
    return this.http.get<AppRole>(environment.backendAPI + "roles/" +id);
  }

  updateRole(id: number, role: AppRole): Observable<AppRole>{
    return this.http.put<AppRole>(environment.backendAPI + "roles/" +id, role);
  }

  public listRoles(page: number, size: number): Observable<Array<AppRole>> {
    return this.http.get<Array<AppRole>>(environment.backendAPI + "roles?page=" + page + "&size=" + size)
  }

  public saveRole(role: AppRole):Observable<AppRole>{
    return this.http.post<AppRole>(environment.backendAPI+"roles",role);
  }
  public deleteRoleById(id: number){
    return this.http.delete(environment.backendAPI+"roles/"+id);
  }

}
