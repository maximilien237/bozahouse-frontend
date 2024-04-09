import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Images} from "../../../enums/Images";

declare let $:any;

@Component({
  selector: 'app-modal-validation',
  templateUrl: './modal-validation.component.html',
  styleUrls: ['./modal-validation.component.css']
})
export class ModalValidationComponent implements OnInit , OnChanges {

  images = Images;
  /**
   * messageChild c'est le nom à mettre dans les accolades
   * du composant parent dans lequel je suis appelé
   */
  @Input()
  validationMessageChild: string = "";

  constructor() { }

  ngOnInit(): void {
    console.log("validationMessageChild",this.validationMessageChild)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    // appel le modal uniquement lorsque validationMessageChild change de valeur
    if (changes['validationMessageChild']?.currentValue) {
      $("#modalvalidation").modal('show');
    }
  }

  closeModale() {
    $("#modalvalidation").modal('hide');
  }


}
