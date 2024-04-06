import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Images} from "../../../enums/Images";
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
  images = Images;
  problemDetail!: ProblemDetail;

  /**
   * errorMessageChild c'est le nom à mettre dans les accolades
   * du composant parent dans lequel je suis appelé
   */
  @Input()
  errorMessageChild: string = "";

  constructor() { }

  ngOnInit(): void {
    console.log("errorMessageChild",this.errorMessageChild)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    // appel le modal uniquement lorsque errorMessageChild change de valeur
    if (changes['errorMessageChild']?.currentValue) {
      $("#modalError").modal('show');
    }
  }



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
