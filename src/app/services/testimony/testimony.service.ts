import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Testimony} from "../../models/testimony.models";
import {UtilCriteria} from "../../models/criteria/utilCriteria";
import {Page} from "../../models/Page";


@Injectable({
  providedIn: 'root'
})
export class TestimonyService {

  constructor(private http: HttpClient) {
  }

  getTestimony(id: number): Observable<Testimony> {
    return this.http.get<Testimony>(environment.backendAPI + "testimonies/" + id);
  }

  updateTestimony(id: number, testimony: Testimony): Observable<Testimony> {
    return this.http.put<Testimony>(environment.backendAPI + "testimonies/" + id, testimony);
  }


  public testimonySpecification(criteria: UtilCriteria): Observable<Page<Testimony>> {
    return this.http.post<Page<Testimony>>(environment.backendAPI +"/testimonies/criteria", criteria)
  }
  public listTestimony(page: number, size: number): Observable<Array<Testimony>> {
    return this.http.get<Array<Testimony>>(environment.backendAPI + "testimonies?page=" + page +"&size=" + size);
  }

  public listTestimonyByAppUser(appUserId: number, page: number,size: number): Observable<Array<Testimony>> {
    return this.http.get<Array<Testimony>>(environment.backendAPI + "testimonies/user/" +appUserId + "?page=" +page + "&size=" +size)
  }

  public saveTestimony(testimony: Testimony): Observable<Testimony> {
    return this.http.post<Testimony>(environment.backendAPI + "testimonies", testimony);
  }

  public deleteTestimonyById(id: number) {
    return this.http.delete(environment.backendAPI + "testimonies/" + id);
  }
}
