import { Component, OnInit } from '@angular/core';
import {Offer} from "../../../models/offer.models";
import {ActivatedRoute} from "@angular/router";
import {OfferService} from "../../../services/offer/offer.service";

@Component({
  selector: 'app-detail-offer',
  templateUrl: './detail-offer.component.html',
  styleUrls: ['./detail-offer.component.css']
})
export class DetailOfferComponent implements OnInit {

  id!: string;
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
