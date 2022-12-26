import { Component, OnInit } from '@angular/core';

import {ActivatedRoute} from "@angular/router";

import {Subscription} from "../../../models/subscription.models";
import {SubscriptionService} from "../../../services/subscription/subscription.service";

@Component({
  selector: 'app-detail-subscription',
  templateUrl: './detail-subscription.component.html',
  styleUrls: ['./detail-subscription.component.css']
})
export class DetailSubscriptionComponent implements OnInit {

  id!: number;
  subscription!: Subscription;
  constructor(private activatedRoute: ActivatedRoute, private subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.subscriptionService.getSubscription(this.id).subscribe({
      next: value => {
        console.log(value);
        this.subscription = value;
      }, error: err => {
        console.log(err);
      }
    });
  }

}
