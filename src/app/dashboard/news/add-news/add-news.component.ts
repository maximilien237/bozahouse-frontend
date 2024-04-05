import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup, ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";

import {Router} from "@angular/router";

import {News} from "../../../models/newsletter.models";
import {NewsService} from "../../../services/news/news.service";
import {HeaderComponent} from "../../../pages/fragments/header/header.component";
import {NgIf} from "@angular/common";
import {FooterComponent} from "../../../pages/fragments/footer/footer.component";

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css'],
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    NgIf,
    FooterComponent
  ],
  standalone: true
})
export class AddNewsComponent implements OnInit {

  newEmailFormGroup!: FormGroup;
  constructor(private fb: FormBuilder, private newsService: NewsService, private router: Router) { }


  ngOnInit(): void {
    this.newEmailFormGroup = this.fb.group({
      subject : this.fb.control("", [Validators.required]),
      frenchContent: this.fb.control("", [Validators.required]),
      englishContent : this.fb.control("", [Validators.required]),
      sendingDate: this.fb.control('')

    });

  }

  handleSaveEmail() {
    let news: News = this.newEmailFormGroup.value;
    this.newsService.saveNews(news).subscribe({
      next: value => {
        alert("La newsletter a été crée avec succès !");
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
