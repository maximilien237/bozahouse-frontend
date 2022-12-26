import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {AppUserDates} from "../../../models/appUserDates.models";
import {ActivatedRoute} from "@angular/router";
import {AppUserService} from "../../../services/app-user/app-user.service";

@Component({
  selector: 'app-user-dates',
  templateUrl: './user-dates.component.html',
  styleUrls: ['./user-dates.component.css']
})
export class UserDatesComponent implements OnInit {

  id!: string;
  errorMessage!:string;
  currentPage: number = 0;
  totalPages!: number;
  pageSize: number = 5;
  userDates!: Observable<Array<AppUserDates>>;
  userDates1!: any;
  connexionNumber: number = 0;

  constructor(private activatedRoute: ActivatedRoute, private userService: AppUserService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.handleGetTotalPageAppUserDates();
    this.handleListAppUserConnexionDates();

  }

  goToPage(page: number) {
    this.currentPage = page;
    this.handleListAppUserConnexionDates();
  }


  handleGetTotalPageAppUserDates(){
    this.userDates1 = this.userService.listAppUserConnexionDates(this.id,this.currentPage, this.pageSize).subscribe({
      next: value => {
        this.totalPages = value[0].totalPages;
        this.connexionNumber = value[0].realSize
      },
      error: err => {
        console.log(err);
      }
    });
  }

  handleListAppUserConnexionDates(){
    this.userDates = this.userService.listAppUserConnexionDates(this.id, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  handleDeleteAppUserDates(userDates2: AppUserDates) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.userService.deleteAppUserDates(userDates2.id).subscribe({
      next: value => {
        console.log(value);
        this.userDates = this.userDates.pipe(
          map(data=>{
            let index = data.indexOf(userDates2)
            data.slice(index,1)
            return data;
          }))

      },
      error: err => {
        console.log(err);
      }
    })

  }

  reloadPage() {
    this.currentPage = this.currentPage - 1;
    this.handleListAppUserConnexionDates();
  }
}
