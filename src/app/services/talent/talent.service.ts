import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Talent} from "../../models/talent.models";

@Injectable({
  providedIn: 'root'
})
export class TalentService {

  constructor(private http: HttpClient) { }

  public listTalent(page: number,size: number): Observable<Array<Talent>> {
    return this.http.get<Array<Talent>>(environment.backendHostAppUser + "talents?page=" +page + "&size=" +size)
  }

  public listProfessionalTalent(): Observable<Array<Talent>> {
    return this.http.get<Array<Talent>>(environment.backendHostAppUser + "talents/professional")
  }

  public listSimpleTalent(): Observable<Array<Talent>> {
    return this.http.get<Array<Talent>>(environment.backendHostAppUser + "talents/simple")
  }

  public lastThreeTalent(): Observable<Array<Talent>> {
    return this.http.get<Array<Talent>>(environment.backendHostAppUser + "talents/three")
  }

  public lastThreeSimpleTalent(): Observable<Array<Talent>> {
    return this.http.get<Array<Talent>>(environment.backendHostAppUser + "talents/free/three")
  }

  public listTalentByAppUser(appUserId: string, page: number,size: number): Observable<Array<Talent>> {
    return this.http.get<Array<Talent>>(environment.backendHostAppUser + "talents/user/" +appUserId + "?page=" +page + "&size=" +size)
  }

  public filterTalent(title: string, contract: string, workMode: string, address: string,
                     experience: string, type: string, domain: string, page: number,size: number ): Observable<Array<Talent>> {
    return this.http.get<Array<Talent>>(environment.backendHostAppUser + "talents/filter?title=" + title + "&contract=" + contract + "&workMode=" +workMode + "&address="+ address + "&experience=" +experience  + "&type=" +type + "&domain=" +domain + "&page=" +page + "&size=" +size)
  }


  public filterTalentWithDates(title: string, contract: string, workMode: string, address: string,
                              experience: string, type: string, domain: string,startDate: Date, endDate: Date, page: number,size: number ): Observable<Array<Talent>> {
    return this.http.get<Array<Talent>>(environment.backendHostAppUser + "talents/filterDates?title=" + title + "&contract=" + contract + "&workMode=" +workMode + "&address="+ address + "&experience=" +experience  + "&type=" +type + "&domain=" +domain +"&startDate=" +startDate + "&endDate=" +endDate + "&page=" +page + "&size=" +size)
  }

  public searchTalents(keyword : string): Observable<Array<Talent>> {
    return this.http.get<Array<Talent>>(environment.backendHostAppUser  + "talents/search?keyword="+keyword)
  }

  public getTalent(id : string): Observable<Talent> {
    return this.http.get<Talent>(environment.backendHostAppUser  + "talents/"+id)
  }


  public saveTalent(talent: Talent):Observable<Talent>{
    return this.http.post<Talent>(environment.backendHostAppUser+"talents",talent);
  }

  updateTalent(id: string, talent: Talent): Observable<Talent>{
    return this.http.put<Talent>(environment.backendHostAppUser + "talents/"+id, talent);
  }

  public deleteTalent(id: string){
    return this.http.delete(environment.backendHostAdmin + "talents/"+id);
  }

  public disableTalent(id: string){

    return this.http.delete(environment.backendHostAppUser + "talents/disable/"+id);
  }

  public enableTalent(id: string){

    return this.http.delete(environment.backendHostAdmin + "talents/enable/"+id);
  }

}
