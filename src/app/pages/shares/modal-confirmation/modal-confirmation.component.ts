import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Images} from "../../../enums/Images";

declare let $:any;

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.css']
})
export class ModalConfirmationComponent implements OnInit, OnChanges {

  images = Images;
  /**
   * messageChild c'est le nom à mettre dans les accolades
   * du composant parent dans lequel je suis appelé
   */
  @Input()
  confMessageChild: string = "";

  constructor() { }

  ngOnInit(): void {
    console.log("confMessageChild",this.confMessageChild)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    // appel le modal uniquement lorsque confMessageChild change de valeur
    if (changes['confMessageChild']?.currentValue) {
      $("#deleteModal").modal('show');
    }
  }


}
