import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Images} from "../../../enums/Images";
import {CrudOperationService} from "../../../services/crud-operation/crud-operation.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ModalErrorComponent} from "../modal-error/modal-error.component";

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

  @Input()
  idChild!: number ;

  @Input()
  pathChild: string = "";

  errorMessageParent: string = "";

  @ViewChild(ModalErrorComponent)
  private childError!: ModalErrorComponent ;

  constructor(private crudOperationService: CrudOperationService) { }


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

  closeModale() {
    $("#deleteModal").modal('hide');
  }


  onDeleteOperation() {
    this.crudOperationService.deleteOperation(this.pathChild, this.idChild).subscribe({
      next: value => {
        console.log(value);
      },
      error: (err: HttpErrorResponse) => {
        console.log('jentre bien')
        this.errorMessageParent = err.error.error;
        // appel de la méthode handleError(error) situé dans ModalErrorComponent
        this.childError?.handleError(err);
      }
    });
  }
}
