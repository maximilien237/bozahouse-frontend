import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {News} from "../../models/newsletter.models";
import {Page} from "../../models/Page";
import {UtilCriteria} from "../../models/criteria/utilCriteria";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) {
  }

  getNews(id: number): Observable<News> {
    return this.http.get<News>(environment.backendAPI + "news/" + id);
  }

  updateNews(id: number, news: News): Observable<News> {
    return this.http.put<News>(environment.backendAPI + "news/" + id, news);
  }

  public newsSpecification(criteria: UtilCriteria): Observable<Page<News>> {
    return this.http.post<Page<News>>(environment.backendAPI +"/news/criteria", criteria)
  }


  public listNews(page: number, size: number): Observable<Array<News>> {
    return this.http.get<Array<News>>(environment.backendAPI + "news?page=" + page +"&size=" + size);
  }

  public saveNews(news: News): Observable<News> {
    return this.http.post<News>(environment.backendAPI + "news", news);
  }

  public deleteNewsById(id: number) {
    return this.http.delete(environment.backendAPI + "news/" + id);
  }

  public searchNews(keyword : string): Observable<Array<News>> {
    return this.http.get<Array<News>>(environment.backendAPI  + "news/search?keyword="+keyword)
  }
}
