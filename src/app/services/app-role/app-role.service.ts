import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {AppRole} from "../../models/app-role.models";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AppRoleService {

  constructor(private http: HttpClient) { }

  getRole(id: number): Observable<AppRole>{
    return this.http.get<AppRole>(environment.backendHostAdmin + "roles/" +id);
  }

  updateRole(id: number, role: AppRole): Observable<AppRole>{
    return this.http.put<AppRole>(environment.backendHostAdmin + "roles/" +id, role);
  }

  public listRoles(page: number, size: number): Observable<Array<AppRole>> {
    return this.http.get<Array<AppRole>>(environment.backendHostAdmin + "roles?page=" + page + "&size=" + size)
  }

  public saveRole(role: AppRole):Observable<AppRole>{
    return this.http.post<AppRole>(environment.backendHostAdmin+"roles",role);
  }
  public deleteRoleById(id: number){
    return this.http.delete(environment.backendHostAdmin+"roles/"+id);
  }

}
