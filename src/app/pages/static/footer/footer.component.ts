import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  version: string = "1.0.0";
  email: string = "support@bozahouse.com";
  tel: string = "656832062";
  constructor() { }

  ngOnInit(): void {
  }
}
