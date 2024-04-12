import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Page} from "../../models/Page";
import {DataResponse} from "../../models/DataResponse";

@Injectable({
  providedIn: 'root'
})
export class CrudOperationService {

  constructor(private http: HttpClient) { }

  public getOperation(path: string, id: number): Observable<any> {
    return this.http.get<any>(environment.backendAPI +path  +"/"+id)
  }

  public saveOperation(path: string, data: any):Observable<any>{
    return this.http.post<any>(environment.backendAPI + path, data);
  }

  public updateOperation(path: string, id: number, data: any): Observable<any>{
    return this.http.put<any>(environment.backendAPI +path  +"/" +id, data);
  }

  public deleteOperation(path: string, id: number):Observable<DataResponse>{
    return this.http.delete<DataResponse>(environment.backendAPI +path +"/" +id);
  }

  public specificationOperation(path: string, criteria: any): Observable<Page<any>> {
    return this.http.post<Page<any>>(environment.backendAPI +path +"/criteria", criteria)
  }

}
