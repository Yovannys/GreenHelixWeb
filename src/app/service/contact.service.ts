import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Config} from '../config';
import {Contact} from "../models/Contact";

@Injectable()
export class ContactService {

  apiBaseURL: string = Config.API_SERVER_URL;

  constructor(public _http: HttpService) {   }

   public sendContact(contact: Contact): Observable<Response> {
    const url = `${this.apiBaseURL}/api/contact/sendContact`;
    return this._http.post(url, contact);
  }
}
