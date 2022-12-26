import { Component, OnInit } from '@angular/core';
import {AppUser} from "../../../models/app-user.models";
import {ActivatedRoute} from "@angular/router";
import {AppUserService} from "../../../services/app-user/app-user.service";
import {News} from "../../../models/newsletter.models";
import {NewsService} from "../../../services/news/news.service";

@Component({
  selector: 'app-detail-news',
  templateUrl: './detail-news.component.html',
  styleUrls: ['./detail-news.component.css']
})
export class DetailNewsComponent implements OnInit {

  id!: number;
  news!: News;
  constructor(private activatedRoute: ActivatedRoute, private newsService: NewsService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.newsService.getNews(this.id).subscribe({
      next: value => {
        console.log(value);
        this.news = value;
      }, error: err => {
        console.log(err);
      }
    });
  }

}
