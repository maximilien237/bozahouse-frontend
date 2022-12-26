import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../environments/environment";
import {News} from "../../models/newsletter.models";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) {
  }

  getNews(id: number): Observable<News> {
    return this.http.get<News>(environment.backendHostAdmin + "news/" + id);
  }

  updateNews(id: number, news: News): Observable<News> {
    return this.http.put<News>(environment.backendHostAdmin + "news/" + id, news);
  }

  public listNews(page: number, size: number): Observable<Array<News>> {
    return this.http.get<Array<News>>(environment.backendHostAdmin + "news?page=" + page +"&size=" + size);
  }

  public saveNews(news: News): Observable<News> {
    return this.http.post<News>(environment.backendHostAdmin + "news", news);
  }

  public deleteNewsById(id: number) {
    return this.http.delete(environment.backendHostAdmin + "news/" + id);
  }

  public searchNews(keyword : string): Observable<Array<News>> {
    return this.http.get<Array<News>>(environment.backendHostAdmin  + "news/search?keyword="+keyword)
  }
}
