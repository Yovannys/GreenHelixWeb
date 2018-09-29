import {ErrorHandler, Injectable} from '@angular/core';
import {UNAUTHORIZED, BAD_REQUEST, FORBIDDEN} from "http-status-codes";
import {Router} from "@angular/router";
//import {ToastsManager, Toast, ToastOptions} from "ng2-toastr";
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Injectable()
export class MyAppErrorHandlerService implements ErrorHandler{

  REFRESH_PAGE_ON_TOAST_CLICK_MESSAGE: string = "An error occurred: Please click this message to refresh";
  DEFAULT_ERROR_TITLE: string = "Something went wrong";

  //constructor(private router: Router,private toastManager: ToastsManager){};
  constructor(private router: Router, private toastyService:ToastyService, private toastyConfig: ToastyConfig){};

  public handleError(error: any) {
    console.error(error);
    let httpErrorCode = error.httpErrorCode;
    switch (httpErrorCode) {
      case UNAUTHORIZED:
        this.router.navigateByUrl("/home");
        break;
      case FORBIDDEN:
        //this.router.navigateByUrl("/unauthorized");
        this.router.navigateByUrl("/home");
        break;
      case BAD_REQUEST:
        this.showError(error.message);
        break;
      default:
        this.showError(this.REFRESH_PAGE_ON_TOAST_CLICK_MESSAGE);
    }
  }

  private showError(message:string){

    var toastOptions:ToastOptions = {
      title: "Error",
      msg: message,
      showClose: true,
      timeout: 5000,
      theme: 'material',
      onAdd: (toast:ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function(toast:ToastData) {
        console.log('Toast ' + toast.id + ' has been removed!');
      }
    };
    // Add see all possible types in one shot
    // this.toastyService.info(toastOptions);
    this.toastyService.error(toastOptions);


    /////////////////////


  }

}
