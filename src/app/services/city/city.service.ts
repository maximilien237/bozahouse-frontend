import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Page} from "../../models/Page";
import {City} from "../../models/City";
import {DataResponse} from "../../models/DataResponse";


@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }
  public listCityByRegion(regionName: string): Observable<Array<City>> {
    return this.http.get<Array<City>>(environment.backendAPI + "cities/region/"+ "?regionName=" +regionName)
  }
  public citySpecification(criteria: City): Observable<Page<City>> {
    return this.http.post<Page<City>>(environment.backendAPI +"cities/criteria", criteria)
  }

  public getCity(id : number): Observable<City> {
    return this.http.get<City>(environment.backendAPI  + "cities/"+id)
  }

  public saveCity(region: City):Observable<City>{
    return this.http.post<City>(environment.backendAPI+"cities",region);
  }

  updateCity(id: number, region: City): Observable<City>{
    return this.http.put<City>(environment.backendAPI + "cities/"+id, region);
  }

  public deleteCity(id: number): Observable<DataResponse>{
    return this.http.delete<DataResponse>(environment.backendAPI + "cities/"+id);
  }



}
