import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Offer} from "../../models/offer.models";
import {Page} from "../../models/Page";
import {OfferCriteria} from "../../models/criteria/offerCriteria";


@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) { }

  public offerSpecification(criteria: OfferCriteria): Observable<Page<Offer>> {
    return this.http.post<Page<Offer>>(environment.backendAPI +"/offers/criteria", criteria)
  }

  public lastThreeOffer(): Observable<Array<Offer>> {
    return this.http.get<Array<Offer>>(environment.backendAPI + "offers/three")
  }

  public listOfferByAppUser(appUserId: number, page: number,size: number): Observable<Array<Offer>> {
    return this.http.get<Array<Offer>>(environment.backendAPI + "offers/user/" +appUserId + "?page=" +page + "&size=" +size)
  }

  public getOffer(id : number): Observable<Offer> {
    return this.http.get<Offer>(environment.backendAPI  + "offers/"+id)
  }

  public saveOffer(offer: Offer):Observable<Offer>{
    return this.http.post<Offer>(environment.backendAPI+"offers/",offer);
  }

  updateOffer(id: number, offer: Offer): Observable<Offer>{
    return this.http.put<Offer>(environment.backendAPI + "offers/"+id, offer);
  }

  public deleteOffer(id: number){
    return this.http.delete(environment.backendAPI + "offers/"+id);
  }

  public disableOffer(id: number){

    return this.http.delete(environment.backendAPI + "offers/disable/"+id);
  }

  public enableOffer(id: number){

    return this.http.delete(environment.backendAPI + "offers/enable/"+id);
  }

}
