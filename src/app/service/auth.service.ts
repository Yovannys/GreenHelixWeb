import {EventEmitter, Injectable} from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

//Mine
import { Observable, Observer } from 'rxjs';
import {AuthenticationService} from "./authentication.service";
import {Users} from "../models/Users";


@Injectable()
export class
AuthService {

  //Mine
  private observer: Observer<string>;
  useProfileChange$: Observable<string> = new Observable(obs => this.observer = obs);

  refreshComponet = new EventEmitter();

  public userProfile: any;

  /*Custom code*/
  //public userDataBase: Users;
  user = new Users();
  /*End Custom code*/

  auth0 = new auth0.WebAuth({
    clientID: 'EJZpI8xpms33jqymHpD8vD52APM6oHjz',
    domain: 'tructrack.auth0.com',
    responseType: 'token id_token',
    audience: 'https://tructrack.auth0.com/userinfo',
    redirectUri: 'http://localhost:8080/home',
    //redirectUri: 'http://142.93.92.179:8080/greenHelixGarden/home',
    scope: 'openid profile'
  });

  constructor(public router: Router, public _authenticationService: AuthenticationService ) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        //Mine
        this.getProfile();
        //this.router.navigate(['/protegida']);  // redireccion si esta autenticado
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  /*Mine*/
  public getProfile(): void {

    if (this.isAuthenticated()){

      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        console.log('Access token must exist to fetch profile');
      }else{

      }
      const self = this;
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if (profile) {
          //check in data base;
          this.checkUserInDB(profile);
          this.observer.next(profile);
        }else {}
      });

    }

  }

  public checkUserInDB(profile:any):void{
    if (profile){
      const accessToken = localStorage.getItem('access_token');
     // console.log("Si Profile y Token : "+accessToken);

      //Preparing user
      // this.user.username = this.profile.nickname;
      this.user.username = profile.nickname;
      this.user.firstname = profile.given_name;
      this.user.lastname = profile.family_name;
      this.user.email = profile.nickname+"@gmail.com";
      this.user.tipoUsuario = 2;
      this.user.token = accessToken;
      this.user.picture = profile.picture;

      this._authenticationService.getBackEndProfile(this.user,accessToken).subscribe(
        (data) => {

          console.log("setting up user profile in session", data )
          localStorage.setItem('userProfile',  JSON.stringify(data));
          this.refreshComponet.emit(true);

        },
        err => {
          console.error(err);
          this.router.navigate(['/']);
        },
        () => {});

    }else{
      console.log("No Profile");
      this.router.navigate(['/']);
    }

  }


  // public getProfile(cb): void {
  //   const accessToken = localStorage.getItem('access_token');
  //   if (!accessToken) {
  //     throw new Error('Access token must exist to fetch profile');
  //   }
  //
  //   const self = this;
  //   this.auth0.client.userInfo(accessToken, (err, profile) => {
  //     if (profile) {
  //       self.userProfile = profile;
  //     }
  //     cb(err, profile);
  //   });
  // }

  public getToken():String{
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.log('Access token must exist to fetch profile');
    }else{
      //console.log("Token : " + accessToken);
      return accessToken;
    }

  }

 }
