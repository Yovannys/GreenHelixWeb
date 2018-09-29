import { Injectable } from '@angular/core';
import {Profile} from "../models/Profile";
import {HttpService} from "./http.service";
import {Observable} from "rxjs/Observable";
import {Config} from "../config";
import {Users} from "../models/Users";
import {Works} from "../models/Works";

@Injectable()
export class UserProfileService {

  apiBaseURL: string = Config.API_SERVER_URL;

  constructor(public _http: HttpService) {   }

  public update(userProfile: Profile): Observable<Response> {
    const url = `${this.apiBaseURL}/api/profile/saveprofile`;
    const accessToken = localStorage.getItem('access_token');
    return this._http.post(url, userProfile, accessToken);
  }

  public getWorksbyUsername(username: string, auth0token: string): Observable<Users> {
    const url = `${this.apiBaseURL}/api/profile/getWorks?username=${username}`;
    return this._http.get(url, auth0token);
  }


  public deleteWork(id: number, auth0token: string): Observable<Boolean> {
    const url = `${this.apiBaseURL}/api/profile/works/delete?id=${id}`;
    return this._http.get(url, auth0token);
  }

  public setHome(id: number, auth0token: string): Observable<Users> {
    const url = `${this.apiBaseURL}/api/profile/works/setHome?id=${id}`;
    return this._http.get(url, auth0token);
  }

  public isFullCup(id: number, auth0token: string): Observable<Boolean> {
    const url = `${this.apiBaseURL}/api/profile/works/isFullCup?id=${id}`;
    return this._http.get(url, auth0token);
  }

  public findallWorks(idprofile: number): Observable<Response> {
    const url = `${this.apiBaseURL}/api/profile/works/findAll?idprofile=${idprofile}`;
    return this._http.get(url);
  }

  public onValidateShowHome(idprofile: number, auth0token: string): Observable<Boolean> {
    const url = `${this.apiBaseURL}/api/profile/works/validateShowHome?idprofile=${idprofile}`;
    return this._http.get(url, auth0token);
  }


}
