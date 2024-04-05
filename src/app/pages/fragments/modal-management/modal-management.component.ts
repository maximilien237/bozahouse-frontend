import { Component } from '@angular/core';



declare let $:any;

@Component({
  selector: 'app-modal-management',
  templateUrl: './modal-management.component.html',
  styleUrls: ['./modal-management.component.css']
})
export class ModalManagementComponent {
  //images = Images;
  messageToShow: string = "";


  showErrorMessageToModal(message:string){
    console.log('message', message)
    this.messageToShow = message;
    $("#modalError").modal("show");
  }

  showValidationMessageToModal(message:string){
    this.messageToShow = message;
    $("#modalvalidation").modal("show");
  }




}
