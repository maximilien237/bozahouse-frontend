import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

import {Router} from "@angular/router";
import {Talent} from "../../../models/talent.models";
import {TalentService} from "../../../services/talent/talent.service";
import {FilterTalent} from "../../../models/filterTalent.models";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {AppUserService} from "../../../services/app-user/app-user.service";

import {AppUser} from "../../../models/app-user.models";




@Component({
  selector: 'app-list-talent',
  templateUrl: './list-talent.component.html',
  styleUrls: ['./list-talent.component.css']
})
export class ListTalentComponent implements OnInit {

  email: string = "contact@bozahouse.com";
  tel: string = "656832062";

  roles: string[] = [];
  isLoggedIn = false;
  isAdmin : boolean = false;
  isUser : boolean = false;
  isEditor : boolean = false;
  username?: string;
  talents: Talent[] = [];
  errorMessage!:string;
  errorMessageTalent!:string;
  talentFormGroup!: FormGroup ;
  currentUser!: AppUser;
  currentPage: number = 0;
  totalPages!: number;
  pageSize: number = 5;


  constructor(private authenticationService: AuthenticationService,private userService: AppUserService,
              private fb: FormBuilder, private router: Router,private talentService: TalentService) { }

  ngOnInit(): void {

    this.talentFormGroup = this.fb.group({
      title: this.fb.control(""),
      contract: this.fb.control(""),
      workMode: this.fb.control(""),
      address: this.fb.control(""),
      experience: this.fb.control(""),
      type: this.fb.control(""),
      domain: this.fb.control(""),
      startDate: this.fb.control(""),
      endDate: this.fb.control("")

    });

    this.handleCurrentAppUser();
    // this.listTalent();

   // this.handleSearchTalents();
    this.handleFilterTalents();



    this.isLoggedIn = !!this.authenticationService.getToken();

    if (this.isLoggedIn) {
      const user = this.authenticationService.getUser();
      this.roles = user.roles;

      this.isAdmin = this.roles.indexOf("ADMIN")>-1;
      this.isEditor = this.roles.indexOf("EDITOR")>-1;
      this.isUser = this.roles.indexOf("USER")>-1;

      //this.username = user.username;
    }
  }


  handleSetSearchTalentForm(){
    this.talentFormGroup.reset();
    this.handleFilterTalents();
  }



  handleFilterTalents() {
    const {
      title,
      contract,
      workMode,
      address,
      experience,
      type,
      domain,
      startDate,
      endDate
    } = this.talentFormGroup.value;
    const filterTalent:FilterTalent={};
    filterTalent.title = title;
    filterTalent.contract = contract;
    filterTalent.workMode = workMode;
    filterTalent.address = address;
    filterTalent.experience = experience;
    filterTalent.type = type;
    filterTalent.domain = domain;
    filterTalent.startDate = new Date(startDate);
    filterTalent.endDate = new Date(endDate);
    filterTalent.valid = true;
    filterTalent.page = Number(this.currentPage);
    filterTalent.size = Number(this.pageSize);

    this.talentService.filterTalent(filterTalent).subscribe({
      next: value => {
        this.talents = value.content;
      },
      error: err => {
        console.log(err)
      }
    })
    console.log(this.talents);
  }

  handleDeleteTalent(talent: Talent) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.talentService.deleteTalent(talent.id).subscribe({
      next: data => {
        console.log(data);

      },
      error: err => {
        console.log(err);
      }
    })

  }

  handleEnableTalent(talent: Talent) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.talentService.enableTalent(talent.id).subscribe({
      next: value => {
        console.log(value);
      },
      error: err => {
        console.log(err);
      }
    })

  }

  handleDisableTalent(talent: Talent) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.talentService.disableTalent(talent.id).subscribe({
      next: value => {
        console.log(value);

      },
      error: err => {
        console.log(err);
      }
    })

  }

  handleDetailTalent(id: number){
    this.router.navigate(['detailTalent', id]).then(()=>{
      console.log("welcome to profile detail !");
    }).catch(console.error)
  }

  handleUpdateTalent(id: number){
    this.router.navigate(['updateTalent', id]).then(()=>{
      console.log("update profile page !");
    }).catch(console.error)
  }
  

  goToPage(page: number){
    this.currentPage = page;
    this.handleFilterTalents();
  }



  handleCurrentAppUser(){
    this.userService.getAccount().subscribe({
      next: value => {
        console.log(value);
        this.currentUser = value;
      },
      error: err => {
        console.log(err);
        this.errorMessage = err.error.message;
      }
    })
  }


  shared(){
    if (navigator.share){
      navigator.share({
        title: 'consulter vos derniers talents',
        url: 'http://vps91824.serveur-vps.net/talents',
      }).then(()=>{
        console.log("thanks for sharing !");
      }).catch(console.error)
    }
  }

}


