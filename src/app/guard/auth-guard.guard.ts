import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "../service/auth.service";
import {AuthenticationService} from "../service/authentication.service";
import {Users} from "../models/Users";

@Injectable()
export class AuthGuardGuard implements CanActivate {

  constructor(private _authService: AuthService, public _router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if(this._authService.isAuthenticated()){
      return true;
    }

    console.log('Access denied!');
    this._router.navigate(['/home']);
    return false;
  }

}
