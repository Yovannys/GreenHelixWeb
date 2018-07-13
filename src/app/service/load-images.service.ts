import {EventEmitter, Injectable, Output} from '@angular/core';
import {FileItem} from "../models/FileItem";
import {HttpService} from "./http.service";
import {Config} from "../config";
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import {isBoolean} from "util";

@Injectable()
export class LoadImagesService {

  apiBaseURL: string = Config.API_SERVER_URL;

  fileSaved = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {
   // this.fileSaved = false;
  }

  //Save in database
  saveImage(image : {name: string, url: string} ){

  }

  saveImageToDataBase(images : FileItem[]): any {
   //console.log("images received ", images);

   for (const item of images){
     item.isLoading = true;
      if (item.progress >=100){
       continue;
      }

     this.sendImage(item.file).subscribe(
       (data) => {
         console.log("Images Saved:  "+ JSON.stringify( data));
         item.progress = 100;
         this.fileSaved.emit(true);
       },
       err => {
         console.error(err);
         //Go to 404
         //this._router.navigate(['/']);
       },
       () => {});

   }


  }


  public sendImage(file : File): Observable<any> {

    const accessToken = localStorage.getItem('access_token');
    const url = `${this.apiBaseURL}/api/profile/works/upload`;

    const formdata: FormData = new FormData();
    formdata.append('file', file);

    const headers = new HttpHeaders().set('Api-Token', accessToken );


   // return this._http.post(url, formdata, accessToken);

    const req = new HttpRequest('POST', url, formdata, {
        reportProgress: true,
        responseType: 'text',
        headers: headers
      }
    );
    return this.http.request(req);

  }

}
