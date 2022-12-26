import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../environments/environment";
import {Subscription} from "../../models/subscription.models";
import {Offer} from "../../models/offer.models";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) {
  }

  getSubscription(id: number): Observable<Subscription> {
    return this.http.get<Subscription>(environment.backendHostEditor + "subscriptions/" + id );
  }

  getLastSubscriptionByUser(id: string): Observable<Subscription> {
    return this.http.get<Subscription>(environment.backendHostEditor + "subscriptions/" + id + "/lastUser");
  }


  public listSubscriptionByAppUser(appUserId: string, page: number,size: number): Observable<Array<Subscription>> {
    return this.http.get<Array<Subscription>>(environment.backendHostAppUser + "subscriptions/user/" +appUserId + "?page=" +page + "&size=" +size)
  }

  updateSubscription(id: number, subscription: Subscription): Observable<Subscription> {
    return this.http.put<Subscription>(environment.backendHostEditor + "subscriptions/" + id, subscription);
  }

  public listSubscription(page: number,size: number): Observable<Array<Subscription>> {
    return this.http.get<Array<Subscription>>(environment.backendHostEditor + "subscriptions?page=" +page + "&size=" +size)
  }



  public listSubscriptionByUser(id: string): Observable<Array<Subscription>> {
    return this.http.get<Array<Subscription>>(environment.backendHostEditor + "subscriptions/" + id +"/user")
  }


  public saveSubscription(subscription: Subscription): Observable<Subscription> {
    return this.http.post<Subscription>(environment.backendHostEditor + "subscriptions" , subscription);
  }

  public deleteSubscriptionById(id: number) {
    return this.http.delete(environment.backendHostAdmin + "subscriptions/" + id);
  }


}
