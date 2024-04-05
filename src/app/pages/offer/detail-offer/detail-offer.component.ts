import { Component, OnInit } from '@angular/core';
import {Offer} from "../../../models/offer.models";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {OfferService} from "../../../services/offer/offer.service";
import {DatePipe, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {FooterComponent} from "../../fragments/footer/footer.component";
import {NavbarComponent} from "../../fragments/navbar/navbar.component";

@Component({
  selector: 'app-detail-offer',
  templateUrl: './detail-offer.component.html',
  styleUrls: ['./detail-offer.component.css'],
  imports: [
    NgForOf,
    DatePipe,
    DecimalPipe,
    RouterLink,
    FooterComponent,
    NgIf,
    NavbarComponent
  ],
  standalone: true
})
export class DetailOfferComponent implements OnInit {

  id!: number;
  offer!: Offer;
  constructor(private activatedRoute: ActivatedRoute, private offerService: OfferService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.offerService.getOffer(this.id).subscribe({
      next: value => {
        console.log(value);
        this.offer = value;
      }, error: err => {
        console.log(err);
      }
    });
  }

}
