import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Posts} from "../models/Posts";
import {Config} from '../config';

@Injectable()
export class PostService {

  apiBaseURL: string = Config.API_SERVER_URL;

  constructor(public _http: HttpService) {   }

  public sendPost(post: Posts, auth0token: string): Observable<Response> {
    const url = `${this.apiBaseURL}/api/post/sendPost`;
    return this._http.post(url, post, auth0token);
  }

  public getAllPosts(profileId: number): Observable<Posts> {
    const url = `${this.apiBaseURL}/api/users/getAllPost?profileId=${profileId}`;
    return this._http.get(url);
  }

}
