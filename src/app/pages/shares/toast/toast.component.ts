import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnChanges {

  /**
   * toastMessageChild c'est le nom à mettre dans les accolades
   * du composant parent dans lequel je suis appelé
   */
  @Input()
  toastMessageChild: string = "";

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('toastMessageChild', this.toastMessageChild);
    }

  ngOnInit(): void {
  }

  handleShowToastMessage() {
/*    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')

    if (toastTrigger) {
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
      toastTrigger.addEventListener('click', () => {
        toastBootstrap.show()
      })
    }

    toastTrigger!.click();*/

    const toastTrigger = document.getElementById('toastTrigger');
    const toastAlert = document.getElementById('toastAlert');

    if (toastTrigger) {
      toastTrigger.addEventListener('click', () => {

        const toast = new bootstrap.Toast(toastAlert);
        toast.show();

      });
    }
  }




}
