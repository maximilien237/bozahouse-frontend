import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";

import {Router} from "@angular/router";

import {News} from "../../../models/newsletter.models";
import {NewsService} from "../../../services/news/news.service";

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {

  newEmailFormGroup!: FormGroup;
  constructor(private fb: FormBuilder, private newsService: NewsService, private router: Router) { }


  ngOnInit(): void {
    this.newEmailFormGroup = this.fb.group({
      subject : this.fb.control("", [Validators.required,Validators.pattern("[A-Z][a-z0-9-çèéàê()+:!',. ]+")]),
      frenchContent: this.fb.control("", [Validators.required,Validators.pattern("[A-Z][a-z0-9-çèéàê()+:!',. ]+")]),
      englishContent : this.fb.control("", [Validators.required,Validators.pattern("[A-Z][a-z0-9-çèéàê()+:!',. ]+")]),
      sendingDate: this.fb.control('')

    });

  }

  handleSaveEmail() {
    let news: News = this.newEmailFormGroup.value;
    this.newsService.saveNews(news).subscribe({
      next: value => {
        alert("email has been successfully saved");
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
