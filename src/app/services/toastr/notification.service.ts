
import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr:ToastrService) { }

  showSuccess(message: string, title: string="Success", position: string = "toast-top-right"): void {
    this.toastr.success(message, title, {
      progressBar: true,
      positionClass : position,
      progressAnimation: "decreasing",
      timeOut: 5000,

    });
  }


  showInfo(message: string, title: string="Info", position: string = "toast-top-right"): void {
    this.toastr.info(message, title, {
      progressBar: true,
      positionClass : position,
      progressAnimation: "decreasing",
      timeOut: 5000
    });
  }

  showWarning(message: string, title: string="Warning", position: string = "toast-top-right"): void {
    this.toastr.warning(message, title, {
      progressBar: true,
      positionClass : position,
      progressAnimation: "decreasing",
      timeOut: 5000
    });
  }


  showError(message: string, title: string="Error", position: string = "toast-top-right"): void {
    this.toastr.error(message, title, {

      positionClass : position,
      closeButton: true,
      disableTimeOut: true
    });
  }



}
