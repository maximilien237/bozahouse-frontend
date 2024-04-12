import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Page} from "../../models/Page";
import {Quarter} from "../../models/Quarter";
import {DataResponse} from "../../models/DataResponse";



@Injectable({
  providedIn: 'root'
})
export class QuarterService {

  constructor(private http: HttpClient) { }
  public listQuarterByCity(cityName: string): Observable<Array<Quarter>> {
    return this.http.get<Array<Quarter>>(environment.backendAPI + "quarters/city/"+ "?cityName=" +cityName)
  }
  public quarterSpecification(criteria: Quarter): Observable<Page<Quarter>> {
    return this.http.post<Page<Quarter>>(environment.backendAPI +"quarters/criteria", criteria)
  }

  public getQuarter(id : number): Observable<Quarter> {
    return this.http.get<Quarter>(environment.backendAPI  + "quarters/"+id)
  }

  public saveQuarter(quarter: Quarter):Observable<Quarter>{
    return this.http.post<Quarter>(environment.backendAPI+"quarters",quarter);
  }

  updateQuarter(id: number, quarter: Quarter): Observable<Quarter>{
    return this.http.put<Quarter>(environment.backendAPI + "quarters/"+id, quarter);
  }

  public deleteQuarter(id: number): Observable<DataResponse>{
    return this.http.delete<DataResponse>(environment.backendAPI + "quarters/"+id);
  }



}
