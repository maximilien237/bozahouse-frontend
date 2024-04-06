import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Talent} from "../../models/talent.models";
import {Page} from "../../models/Page";
import {TalentCriteria} from "../../models/criteria/talentCriteria";

@Injectable({
  providedIn: 'root'
})
export class TalentService {

  constructor(private http: HttpClient) { }


  public lastThreeTalent(): Observable<Array<Talent>> {
    return this.http.get<Array<Talent>>(environment.backendHostAppUser + "talents/three")
  }


  public listTalentByAppUser(appUserId: number, page: number,size: number): Observable<Array<Talent>> {
    return this.http.get<Array<Talent>>(environment.backendHostAppUser + "talents/user/" +appUserId + "?page=" +page + "&size=" +size)
  }


  public talentSpecification(criteria: TalentCriteria): Observable<Page<Talent>> {
    return this.http.post<Page<Talent>>(environment.backendAPI +"/talents/criteria", criteria)
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
