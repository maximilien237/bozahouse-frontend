import { Component, OnInit } from '@angular/core';
import {NavbarComponent} from "../fragments/navbar/navbar.component";
import {FooterComponent} from "../fragments/footer/footer.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css'],
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterLink
  ],
  standalone: true
})
export class PrivacyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
