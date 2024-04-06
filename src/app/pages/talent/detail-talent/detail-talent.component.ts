import { Component, OnInit } from '@angular/core';

import {ActivatedRoute} from "@angular/router";

import {Talent} from "../../../models/talent.models";
import {TalentService} from "../../../services/talent/talent.service";

@Component({
  selector: 'app-detail-talent',
  templateUrl: './detail-talent.component.html',
  styleUrls: ['./detail-talent.component.css']
})
export class DetailTalentComponent implements OnInit {

  id!: number;
  talent!: Talent;
  constructor(private activatedRoute: ActivatedRoute, private talentService: TalentService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.talentService.getTalent(this.id).subscribe({
      next: value => {
        console.log(value);
        this.talent = value;
      }, error: err => {
        console.log(err);
      }
    });
  }



  handleEnableTalent(talent: Talent){
    this.talentService.enableTalent(talent.id).subscribe({
      next: value => {
        console.log(value);
      },
      error: err => {
        console.log(err);
      }
    })
  }


  handleSetDisable(){
    this.talentService.disableTalent(this.id).subscribe({
      next: value => {
        console.log(value);
      },
      error: err => {
        console.log(err);
      }
    })
  }

}
