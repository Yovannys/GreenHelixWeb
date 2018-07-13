import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Config} from '../config';
import {Users} from "../models/Users";


@Injectable()
export class HttpService {

  constructor(public _http: HttpClient) { }

  public get(url, token?): Observable<any> {
    const headers = !!token ?
    new HttpHeaders().set('Content-Type', 'application/json').set('Api-Token', token ) :
    new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(url, {headers});
  }

  public post(url, params, token?): Observable<any> {
      const headers = !!token ?
      new HttpHeaders().set('Content-Type', 'application/json').set('Api-Token', token ) :
      new HttpHeaders().set('Content-Type', 'application/json');

     return this._http.post(url, params,{headers});
  }

  public delete(url, token): Observable<any> {
     const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Api-Token', token );
     return this._http.delete(url, {headers});
  }

}
