import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Offer} from "../../models/offer.models";
import {FilterOffer} from "../../models/filterOffer.models";
import {FilterTalent} from "../../models/filterTalent.models";
import {Page} from "../../models/Page";
import {Talent} from "../../models/talent.models";




@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) { }

  public listOffer(): Observable<Array<Offer>> {
    return this.http.get<Array<Offer>>(environment.backendHostAppUser + "offers")
  }

  public listEnterpriseOffer(): Observable<Array<Offer>> {
    return this.http.get<Array<Offer>>(environment.backendHostAppUser + "offers/enterprise")
  }

  public listEmployerOffer(): Observable<Array<Offer>> {
    return this.http.get<Array<Offer>>(environment.backendHostAppUser + "offers/employer")
  }

  public lastThreeOffer(): Observable<Array<Offer>> {
    return this.http.get<Array<Offer>>(environment.backendHostAppUser + "offers/three")
  }

  public listOfferByAppUser(appUserId: number, page: number,size: number): Observable<Array<Offer>> {
    return this.http.get<Array<Offer>>(environment.backendHostAppUser + "offers/user/" +appUserId + "?page=" +page + "&size=" +size)
  }

/*  public filterOffer(title: string, contract: string, workMode: string, address: string,
                     experience: string, type: string, domain: string, page: number,size: number ): Observable<Array<Offer>> {
    return this.http.get<Array<Offer>>(environment.backendHostAppUser + "offers/filter?title=" + title + "&contract=" + contract + "&workMode=" +workMode + "&address="+ address + "&experience=" +experience  + "&type=" +type + "&domain=" +domain + "&page=" +page + "&size=" +size)
  }*/

  public filterOffer(filterOffer: FilterOffer ): Observable<Page<Offer>> {
    return this.http.post<Page<Offer>>(environment.backendHostAppUser + "offers/filter", filterOffer);
  }

  public searchOffers(keyword : string): Observable<Array<Offer>> {
    return this.http.get<Array<Offer>>(environment.backendHostAppUser  + "offers/search?keyword="+keyword)
  }

  public getOffer(id : number): Observable<Offer> {
    return this.http.get<Offer>(environment.backendHostAppUser  + "offers/"+id)
  }


  public saveOffer(offer: Offer):Observable<Offer>{
    return this.http.post<Offer>(environment.backendHostAppUser+"offers/",offer);
  }

  updateOffer(id: number, offer: Offer): Observable<Offer>{
    return this.http.put<Offer>(environment.backendHostAppUser + "offers/"+id, offer);
  }

  public deleteOffer(id: number){
    return this.http.delete(environment.backendHostAdmin + "offers/"+id);
  }

  public disableOffer(id: number){

    return this.http.delete(environment.backendHostAppUser + "offers/disable/"+id);
  }

  public enableOffer(id: number){

    return this.http.delete(environment.backendHostAdmin + "offers/enable/"+id);
  }

}
