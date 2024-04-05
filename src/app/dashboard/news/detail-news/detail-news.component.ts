import { Component, OnInit } from '@angular/core';
import {AppUser} from "../../../models/app-user.models";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AppUserService} from "../../../services/app-user/app-user.service";
import {News} from "../../../models/newsletter.models";
import {NewsService} from "../../../services/news/news.service";
import {HeaderComponent} from "../../../pages/fragments/header/header.component";
import {DatePipe, NgIf} from "@angular/common";
import {FooterComponent} from "../../../pages/fragments/footer/footer.component";

@Component({
  selector: 'app-detail-news',
  templateUrl: './detail-news.component.html',
  styleUrls: ['./detail-news.component.css'],
  imports: [
    HeaderComponent,
    NgIf,
    DatePipe,
    FooterComponent,
    RouterLink
  ],
  standalone: true
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
