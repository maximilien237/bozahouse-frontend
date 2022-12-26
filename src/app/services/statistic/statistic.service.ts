import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../environments/environment";
import {SubscriptionStatistic} from "../../models/subscription-statistic.models";
import {TalentStatistic} from "../../models/talent-statistic.models";
import {OfferStatistic} from "../../models/offer-statistic.models";
import {AppUserStatistic} from "../../models/app-user-statistic.models";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http: HttpClient) {
  }

  listSubscriptionStatistics(page: number,size: number): Observable<Array<SubscriptionStatistic>> {
    return this.http.get<Array<SubscriptionStatistic>>(environment.backendHostAdmin + "subscriptions/stats?page=" +page + "&size=" +size);
  }

  listTalentStatistics(page: number,size: number): Observable<Array<TalentStatistic>> {
    return this.http.get<Array<TalentStatistic>>(environment.backendHostAdmin + "talents/stats?page=" +page + "&size=" +size);
  }

  listOfferStatistics(page: number,size: number): Observable<Array<OfferStatistic>> {
    return this.http.get<Array<OfferStatistic>>(environment.backendHostAdmin + "offers/stats?page=" +page + "&size=" +size);
  }

  listAppUserStatistics(page: number,size: number): Observable<Array<AppUserStatistic>> {
    return this.http.get<Array<AppUserStatistic>>(environment.backendHostAdmin + "users/stats?page=" +page + "&size=" +size);
  }
}
