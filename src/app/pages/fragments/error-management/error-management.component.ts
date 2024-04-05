import {Component, ViewChild} from '@angular/core';
import {ValidationErrors} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {ModalManagementComponent} from "../modal-management/modal-management.component";

declare let $:any;

@Component({
  selector: 'app-error-management',
  standalone: true,
  imports: [ModalManagementComponent],
  templateUrl: './error-management.component.html',
  styleUrls: ['./error-management.component.css']
})
export class ErrorManagementComponent {

  //problemDetail!: ProblemDetail;
  @ViewChild(ModalManagementComponent) private childModal !:any ;

  getErrorMessage(fieldName: string, error: ValidationErrors) {
    if (error['required']){
      return "Vous devez remplir ce champs !";
    }else if (error['minlength']){
      return "ce champs doit comporter au moins" + " "+ error['minlength']['requiredLength'] + "  "+ "caractères";
    }else if (error['maxlength']){
      return "ce champs doit comporter au plus" + "  " + error['maxlength']['requiredLength'] + "  " + "caractères";
    }else if (error['pattern'] && fieldName == "salary" || fieldName == "needPeople") {
      return "exemple d\'une entrée valide : 100000 ou 2" ;
    }else if (error['pattern'] && fieldName == "email") {
      return "exemple d\'un mail valide : john@example.com ou john.smith@example.com" ;
    }else if (error['pattern'] && fieldName == "address") {
      return "exemple d\'une adresse valide : Yaoundé, Centre, Cameroun" ;
    }else if (error['pattern'] && fieldName == "fcb" || fieldName == "web" || fieldName == "linkedin") {
      return "exemple d\'une url valide : https://www.monsite.com ou https://wwww.facebook.com/username" ;
    }else if (error['pattern'] && fieldName == "tel" || fieldName == "whatsAppNumber") {
      return "exemple d\'un numéro valide : 6511232XX" ;
    }else if (error['pattern'] && fieldName == "password") {
      return "ce champs doit comporter soit des majuscules, soit des minuscules, soit des nombres,soit un caractère spécial telque : @ ou un mélange des quatres" ;
    }else if (error['pattern']) {
      return "ce champs doit comporter soit des majuscules, soit des minuscules, soit des nombres, ou un mélange des trois";
    }else if (error['email']) {
      return "Entrez une adresse email valide !";
    }else return "";
  }

/*  handleErrors(err: HttpErrorResponse) {
    this.problemDetail = {
      type: err.error.type,
      title: err.error.title,
      status: err.error.status,
      detail: err.error.detail,
      instance: err.error.instance,
      error: err.error.error
    }
    console.log('this.problemDetail', this.problemDetail);

    // appel de la méthode showErrorMessageToModal situé dans le composant enfant ModalManagementComponent
    this.childModal.showErrorMessageToModal(this.problemDetail?.detail!);

  }*/

  // appel de la méthode showErrorMessageToModal situé dans le composant enfant ModalManagementComponent
  handleShowErrorMessageToModalFromChild(message:string){
    this.childModal.showErrorMessageToModal(message);

  }



}
