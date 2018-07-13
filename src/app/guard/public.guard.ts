import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "../service/auth.service";

@Injectable()
export class PublicGuard implements CanActivate {
  constructor(private _authService: AuthService, public _router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if(!this._authService.isAuthenticated()){
      return true;
    }

    console.log('you are login!');
    this._router.navigate(['/home']);
    return false;
  }
}
