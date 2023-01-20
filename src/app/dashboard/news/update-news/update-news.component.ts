import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";

import {ActivatedRoute, Router} from "@angular/router";
import {News} from "../../../models/newsletter.models";
import {NewsService} from "../../../services/news/news.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-update-news',
  templateUrl: './update-news.component.html',
  styleUrls: ['./update-news.component.css']
})
export class UpdateNewsComponent implements OnInit {

  id!: number;
  email!: News ;
  updateEmailFormGroup!: FormGroup;
  constructor(private newsService: NewsService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.newsService.getNews(this.id).subscribe(
      {
        next: value => {
          console.log(value);
          this.email = value;
          this.updateEmailFormGroup = this.fb.group({

            subject : this.fb.control(this.email.subject, [Validators.required]),
            frenchContent: this.fb.control(this.email.frenchContent, [Validators.required]),
            englishContent : this.fb.control(this.email.englishContent, [Validators.required]),
            sendingDate: this.fb.control(formatDate(this.email.sendingDate, 'yyyy-MM-dd', 'en'))
           // sendingDate: [formatDate(this.email.sendingDate, 'yyyy-MM-dd', 'en'),[Validators.required]]

          });
        }, error: err => {
          console.log(err);
        }

      });
  }


  handleUpdateEmail() {
    let news: News = this.updateEmailFormGroup.value;
    this.newsService.updateNews(this.id, news).subscribe({
      next: value => {
        console.log(value);
        alert("La newsletter a été modifiée avec succès !");
        //this.newUserFormGroup.reset();
        this.router.navigateByUrl("/listNews");
      },
      error: err => {
        console.log(err);
      }
    })
  }


  getErrorMessage(fieldName: string, error: ValidationErrors) {
    if (error['required']){
      return "Vous devez remplir ce champs !";
    }else return "";

  }

}
