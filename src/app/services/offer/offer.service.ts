import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Offer} from "../../models/offer.models";
import {Page} from "../../models/Page";
import {OfferCriteria} from "../../models/criteria/offerCriteria";

const path = "/api/v1/offers";

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) { }

  public offerSpecification(criteria: OfferCriteria): Observable<Page<Offer>> {
    return this.http.post<Page<Offer>>(environment.backendAPI +path +"/criteria", criteria)
  }

  public lastThreeOffer(): Observable<Array<Offer>> {
    return this.http.get<Array<Offer>>(environment.backendAPI + path +"/three")
  }

  public listOfferByAppUser(appUserId: number, page: number,size: number): Observable<Array<Offer>> {
    return this.http.get<Array<Offer>>(environment.backendAPI + "offers/user/" +appUserId + "?page=" +page + "&size=" +size)
  }

  public getOffer(id : number): Observable<Offer> {
    return this.http.get<Offer>(environment.backendAPI +path +id)
  }

  public saveOffer(offer: FormData):Observable<Offer>{
    return this.http.post<Offer>(environment.backendAPI +path, offer);
  }

  updateOffer(id: number, offer: FormData): Observable<Offer>{
    return this.http.put<Offer>(environment.backendAPI + path +"/"+id, offer);
  }

  public deleteOffer(id: number){
    return this.http.delete(environment.backendAPI + path+id);
  }

  public disableOffer(id: number){

    return this.http.delete(environment.backendAPI +path +"/disable/"+id);
  }

  public enableOffer(id: number){

    return this.http.delete(environment.backendAPI +path +"/enable/"+id);
  }

}
