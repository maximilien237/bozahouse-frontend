import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Talent} from "../../models/talent.models";
import { Page } from 'src/app/models/Page';
import { FilterTalent } from 'src/app/models/filterTalent.models';

const path = "TALENT-MICROSERVICE/api/v1/talents/";

@Injectable({
  providedIn: 'root'
})
export class TalentService {

  constructor(private http: HttpClient) { }

  public lastThreeTalent(): Observable<Array<Talent>> {
    return this.http.get<Array<Talent>>(environment.backendAPI +path +"three")
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
    return this.http.post<Page<Talent>>(environment.backendAPI +path + "filter", filterTalent);
  }

  public getTalent(id : number): Observable<Talent> {
    return this.http.get<Talent>(environment.backendAPI +path +id)
  }


  public saveTalent(talent: Talent):Observable<Talent>{
    return this.http.post<Talent>(environment.backendAPI+ path,talent);
  }

  updateTalent(id: number, talent: Talent): Observable<Talent>{
    return this.http.put<Talent>(environment.backendAPI + path+id, talent);
  }

  public deleteTalent(id: number){
    return this.http.delete(environment.backendAPI + path+id);
  }

  public disableTalent(id: number){

    return this.http.delete(environment.backendAPI +path +"disable/"+id);
  }

  public enableTalent(id: number){

    return this.http.delete(environment.backendAPI + path+ "enable/"+id);
  }

}
