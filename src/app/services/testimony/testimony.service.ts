import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Testimony} from "../../models/testimony.models";


@Injectable({
  providedIn: 'root'
})
export class TestimonyService {

  constructor(private http: HttpClient) {
  }

  getTestimony(id: number): Observable<Testimony> {
    return this.http.get<Testimony>(environment.backendHostAppUser + "testimonies/" + id);
  }

  updateTestimony(id: number, testimony: Testimony): Observable<Testimony> {
    return this.http.put<Testimony>(environment.backendHostAppUser + "testimonies/" + id, testimony);
  }

  public listTestimony(page: number, size: number): Observable<Array<Testimony>> {
    return this.http.get<Array<Testimony>>(environment.backendHostAppUser + "testimonies?page=" + page +"&size=" + size);
  }

  public listTestimonyByAppUser(appUserId: string, page: number,size: number): Observable<Array<Testimony>> {
    return this.http.get<Array<Testimony>>(environment.backendHostAppUser + "testimonies/user/" +appUserId + "?page=" +page + "&size=" +size)
  }

  public saveTestimony(testimony: Testimony): Observable<Testimony> {
    return this.http.post<Testimony>(environment.backendHostAppUser + "testimonies", testimony);
  }

  public deleteTestimonyById(id: number) {
    return this.http.delete(environment.backendHostAdmin + "testimonies/" + id);
  }
}
