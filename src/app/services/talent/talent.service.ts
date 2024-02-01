import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Talent} from "../../models/talent.models";
import { Page } from 'src/app/models/Page';
import { FilterTalent } from 'src/app/models/filterTalent.models';

@Injectable({
  providedIn: 'root'
})
export class TalentService {

  constructor(private http: HttpClient) { }

/*  public listTalent(page: number,size: number): Observable<Array<Talent>> {
    return this.http.get<Array<Talent>>(environment.backendHostAppUser + "talents?page=" +page + "&size=" +size)
  }

  public listProfessionalTalent(): Observable<Array<Talent>> {
    return this.http.get<Array<Talent>>(environment.backendHostAppUser + "talents/professional")
  }

  public listSimpleTalent(): Observable<Array<Talent>> {
    return this.http.get<Array<Talent>>(environment.backendHostAppUser + "talents/simple")
  }*/

  public lastThreeTalent(): Observable<Array<Talent>> {
    return this.http.get<Array<Talent>>(environment.backendHostAppUser + "talents/three")
  }

  public lastThreeSimpleTalent(): Observable<Array<Talent>> {
    return this.http.get<Array<Talent>>(environment.backendHostAppUser + "talents/free/three")
  }

  public listTalentByAppUser(appUserId: number, page: number,size: number): Observable<Page<Talent>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("appUserId",appUserId);
    queryParams = queryParams.append("page",page);
    queryParams = queryParams.append("size",size);
    return this.http.get<Page<Talent>>(environment.backendHostAppUser + "talents/user/", {params: queryParams});
  }

  public filterTalent(filterTalent: FilterTalent ): Observable<Page<Talent>> {
    return this.http.post<Page<Talent>>(environment.backendHostAppUser + "talents/filter", filterTalent);
  }


  public filterTalentValidFalse(filterTalent: FilterTalent ): Observable<Page<Talent>> {
    return this.http.post<Page<Talent>>(environment.backendHostAdmin + "talents/disabled/filter", filterTalent)
  }

  public searchTalents(keyword : string): Observable<Array<Talent>> {
    return this.http.get<Array<Talent>>(environment.backendHostAppUser  + "talents/search?keyword="+keyword)
  }

  public getTalent(id : number): Observable<Talent> {
    return this.http.get<Talent>(environment.backendHostAppUser  + "talents/"+id)
  }


  public saveTalent(talent: Talent):Observable<Talent>{
    return this.http.post<Talent>(environment.backendHostAppUser+"talents",talent);
  }

  updateTalent(id: number, talent: Talent): Observable<Talent>{
    return this.http.put<Talent>(environment.backendHostAppUser + "talents/"+id, talent);
  }

  public deleteTalent(id: number){
    return this.http.delete(environment.backendHostAdmin + "talents/"+id);
  }

  public disableTalent(id: number){

    return this.http.delete(environment.backendHostAppUser + "talents/disable/"+id);
  }

  public enableTalent(id: number){

    return this.http.delete(environment.backendHostAdmin + "talents/enable/"+id);
  }

}
