import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup} from "@angular/forms";

import {Router} from "@angular/router";
import {Talent} from "../../../models/talent.models";
import {TalentService} from "../../../services/talent/talent.service";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {AppUserService} from "../../../services/app-user/app-user.service";
import {AppUser} from "../../../models/app-user.models";
import {TalentCriteria} from "../../../models/criteria/talentCriteria";




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
  talents!: Talent[];
  errorMessage!:string;
  errorMessageTalent!:string;
  talentFormGroup!: FormGroup ;
  currentUser!: AppUser;
  currentPage: number = 1;
  totalElements!: number;
  pageSize: number = 6;



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
      domain: this.fb.control("")
   /*   startDate: this.fb.control(moment().subtract(7,'days').format('YYYY-MM-DD'),[Validators.required]),
      endDate: this.fb.control(moment().format('YYYY-MM-DD'), [Validators.required])
*/

    });

    this.handleCurrentAppUser();
    // this.listTalent();

    this.handleFilterTalents();
  }


  handleSetSearchTalentForm(){
    this.talentFormGroup.reset();
  }

  handleFilterTalents() {
    //  let kw = this.searchFormGroup?.value.keyword;
    let criteria: TalentCriteria = this.talentFormGroup?.value;
    this.talentService.talentSpecification(criteria)
      .subscribe({
        next: value => {
          console.log(value);
          this.talents = value.content;
          this.totalElements = value.totalElements;
        },
        error: err => {
          console.log(err);
        }
      });
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
        url: window.location.href,
      }).then(()=>{
        console.log("thanks for sharing !");
      }).catch(console.error)
    }
  }

}
