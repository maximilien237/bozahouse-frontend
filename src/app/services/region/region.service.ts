import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Page} from "../../models/Page";
import {Region} from "../../models/Region";
import {DataResponse} from "../../models/DataResponse";


@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(private http: HttpClient) { }
  public listRegionByCountry(countryName: string): Observable<Array<Region>> {
    return this.http.get<Array<Region>>(environment.backendAPI + "regions/country/"+ "?countryName=" +countryName)
  }
  public regionSpecification(criteria: Region): Observable<Page<Region>> {
    return this.http.post<Page<Region>>(environment.backendAPI +"regions/criteria", criteria)
  }

  public getRegion(id : number): Observable<Region> {
    return this.http.get<Region>(environment.backendAPI  + "regions/"+id)
  }

  public saveRegion(region: Region):Observable<Region>{
    return this.http.post<Region>(environment.backendAPI+"regions",region);
  }

  updateRegion(id: number, region: Region): Observable<Region>{
    return this.http.put<Region>(environment.backendAPI + "regions/"+id, region);
  }

  public deleteRegion(id: number): Observable<DataResponse>{
    return this.http.delete<DataResponse>(environment.backendAPI + "regions/"+id);
  }



}
