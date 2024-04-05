import { Component, OnInit } from '@angular/core';
import {AppUser} from "../../../models/app-user.models";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AppUserService} from "../../../services/app-user/app-user.service";
import {AppRoleService} from "../../../services/app-role/app-role.service";
import {AppRole} from "../../../models/app-role.models";
import {HeaderComponent} from "../../../pages/fragments/header/header.component";
import {FooterComponent} from "../../../pages/fragments/footer/footer.component";

@Component({
  selector: 'app-detail-app-role',
  templateUrl: './detail-app-role.component.html',
  styleUrls: ['./detail-app-role.component.css'],
  imports: [
    HeaderComponent,
    RouterLink,
    FooterComponent
  ],
  standalone: true
})
export class DetailAppRoleComponent implements OnInit {

  id!: number;
  role!: AppRole;
  constructor(private activatedRoute: ActivatedRoute, private roleService: AppRoleService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.roleService.getRole(this.id).subscribe({
      next: value => {
        console.log(value);
        this.role = value;
      }, error: err => {
        console.log(err);
      }
    });
  }

}
