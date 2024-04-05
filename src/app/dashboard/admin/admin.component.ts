import { Component, OnInit } from '@angular/core';
import {DatePipe, DecimalPipe, NgClass, NgForOf} from "@angular/common";
import {FooterComponent} from "../../pages/fragments/footer/footer.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [
    NgClass,
    NgForOf,
    FooterComponent,
    DatePipe,
    DecimalPipe
  ],
  standalone: true
})
export class AdminComponent  {



}
