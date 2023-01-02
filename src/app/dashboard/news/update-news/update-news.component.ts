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

            subject : this.fb.control(this.email.subject, [Validators.required,Validators.pattern("[A-Z][a-z0-9-çèéàê()+:!',. ]+")]),
            frenchContent: this.fb.control(this.email.frenchContent, [Validators.required,Validators.pattern("[A-Za-z0-9-çèéàê()+:!',. ]+")]),
            englishContent : this.fb.control(this.email.englishContent, [Validators.required,Validators.pattern("[A-Za-z0-9-çèéàê()+:!',. ]+")]),
            sendingDate: this.fb.control(formatDate(this.email.sendingDate, 'yyyy-MM-dd', 'en'),[Validators.required])
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
        alert("news has been successfully updated");
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
      return fieldName + "  "+ " is required";
    }else if (error['minlength']){
      return fieldName + "  "+ "should have at least" + " "+ error['minlength']['requiredLength'] + "  "+ "characters";
    }else if (error['maxlength']){
      return fieldName + "  "+ "should have at the most" + "  " + error['maxlength']['requiredLength'] + "  " + "characters";
    }else if (error['pattern']) {
      return fieldName + "  "+ "required this pattern" + error['pattern']['requiredPattern'] ;
    }else if (error['email']) {
      return fieldName + "  " + "address is not valid "+ "  "+ error['email']['requiredEmail'];
    }else return "";

  }


}
