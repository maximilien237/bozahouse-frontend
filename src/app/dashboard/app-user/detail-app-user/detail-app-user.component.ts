import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppUserService} from "../../../services/app-user/app-user.service";
import {AppUser} from "../../../models/app-user.models";

@Component({
  selector: 'app-detail-app-user',
  templateUrl: './detail-app-user.component.html',
  styleUrls: ['./detail-app-user.component.css']
})
export class DetailAppUserComponent implements OnInit {

  id!: string;
  user!: AppUser;
  constructor(private activatedRoute: ActivatedRoute, private userService: AppUserService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.userService.getAppUser(this.id).subscribe({
      next: value => {
        console.log(value);
        this.user = value;
      }, error: err => {
        console.log(err);
      }
    });
  }

}
