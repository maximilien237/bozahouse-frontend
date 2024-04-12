import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Page} from "../../models/Page";
import {DataResponse} from "../../models/DataResponse";
import {Country} from "../../models/Country";


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  public countrySpecification(criteria: Country): Observable<Page<Country>> {
    return this.http.post<Page<Country>>(environment.backendAPI +"countries/criteria", criteria)
  }

  public getCountry(id : number): Observable<Country> {
    return this.http.get<Country>(environment.backendAPI  + "countries/"+id)
  }

  public saveCountry(country: Country):Observable<Country>{
    return this.http.post<Country>(environment.backendAPI+"countries",country);
  }

  updateCountry(id: number, country: Country): Observable<Country>{
    return this.http.put<Country>(environment.backendAPI + "countries/"+id, country);
  }

  public deleteCountry(id: number): Observable<DataResponse>{
    return this.http.delete<DataResponse>(environment.backendAPI + "countries/"+id);
  }



}
