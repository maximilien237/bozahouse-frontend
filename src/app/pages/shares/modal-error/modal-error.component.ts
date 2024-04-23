import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ValidationErrors} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {ProblemDetail} from "../../../models/ProblemDetail";

declare let $:any;

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.css'],

})
export class ModalErrorComponent implements OnInit, OnChanges {

  problemDetail!: ProblemDetail;

  /**
   * errorMessageChild c'est le nom à mettre dans les accolades
   * du composant parent dans lequel je suis appelé
   */
  @Input()
  errorMessageChild: string = "";

  ngOnInit(): void {
    console.log("errorMessageChild",this.errorMessageChild)
  }

  ngOnChanges(changes: SimpleChanges): void {
    // appel le modal uniquement lorsque errorMessageChild change de valeur
  //  if (changes['errorMessageChild']?.currentValue) {
      console.log('errorMessageChild', this.errorMessageChild);
      if (this.errorMessageChild) {
        $("#modalError").modal('show');
      }

   // }
  }

  closeModale() {
    $("#modalError").modal('hide');
  }

  getErrorMessage(fieldName: string, error: ValidationErrors) {

    if (error['required'] ){
      return "Vous devez remplir ce champs !";
    }
    if (error['minlength']){
      return "ce champs doit comporter au moins" + " "+ error['minlength']['requiredLength'] + "  "+ "caractères";
    }

    if (error['maxlength']){
      return "ce champs doit comporter au plus" + "  " + error['maxlength']['requiredLength'] + "  " + "caractères";
    }

    if (error['pattern'] && fieldName == "salary" || fieldName == "needPeople") {
      return "exemple d\'une entrée valide : 100000 ou 2" ;
    }

    if (error['pattern'] && fieldName == "email") {
      return "exemple d\'un mail valide : yoan@example.com ou yoan.svelt@example.com" ;
    }

    if (error['pattern'] && fieldName == "username") {
      return "exemple d\'un mail valide : john@example.com ou john.smith@example.com" ;
    }

    if (error['pattern'] && fieldName == "fcb" || fieldName == "web" || fieldName == "linkedin") {
      return "exemple d\'une url valide : https://www.monsite.com ou https://wwww.facebook.com/username" ;
    }

/*    if (error['pattern'] && fieldName == "tel" || fieldName == "whatsAppNumber") {
      return "exemple d\'un numéro valide : 6511232XX" ;
    }*/
    if (error['pattern'] && fieldName == "password") {
      return "ce champs doit comporter soit des majuscules, soit des minuscules, soit des nombres,soit un caractère spécial telque : @ ou un mélange des quatres" ;
    }
    if (error['pattern']) {
      return "ce champs doit comporter soit des majuscules, soit des minuscules, soit des nombres, ou un mélange des trois";
    }
    if (error['email']) {
      return "Entrez une adresse email valide !";
    }
    return "";
  }

  handleError(err: HttpErrorResponse) {
    this.problemDetail={
      type: err.error.type,
      title: err.error.title,
      status: err.error.status,
      detail: err.error.detail,
      instance: err.error.instance,
      error: err.error.error
    }
    console.log(this.problemDetail);
  }



}
