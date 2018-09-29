import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Config} from '../config';
import {Users} from "../models/Users";


@Injectable()
export class AuthenticationService {

  apiBaseURL: string = Config.API_SERVER_URL;

  constructor(public _http: HttpService) {   }

  public logIn(username: string, password: string) {
    //const url = `${this.apiBaseURL}/ShoppingCart/users/login`;
    const url = `${this.apiBaseURL}/api/users/register`;
    return this._http.post(url, {
      'username': username,
      'password': password
    });
  }

  public registerUser(user: Users, auth0token: string): Observable<Response> {
    const url = `${this.apiBaseURL}/api/users/register/`;
    return this._http.post(url, user, auth0token);
  }


  public getSingleUser(username: string, auth0token: string): Observable<Users> {
    const url = `${this.apiBaseURL}/api/users/findByUserName?username=${username}`;
    return this._http.get(url, auth0token);
  }

  public getBackEndProfile(user: Users, auth0token: string): Observable<Response> {
    const url = `${this.apiBaseURL}/api/users/getProfile/`;
    return this._http.post(url, user, auth0token);
  }

  public getHomeProfiles(page: number): Observable<any> {
    const url = `${this.apiBaseURL}/api/users/getProfilesHome?page=`+page;
    return this._http.get(url);
  }

  public searchProfilesByCrit(crit : string): Observable<Response> {
    const url = `${this.apiBaseURL}/api/users/getSearchHome?crit=`+crit;
    return this._http.get(url);
  }

  public setLike(id : number, uid: string): Observable<Response> {
    const url = `${this.apiBaseURL}/api/profile/setLike?id=`+id+`&uid=`+uid;
    return this._http.get(url);
  }

  public setUnLike(id : number, uid: string): Observable<Response> {
    const url = `${this.apiBaseURL}/api/profile/setUnLike?id=`+id+`&uid=`+uid;
    return this._http.get(url);
  }

}
