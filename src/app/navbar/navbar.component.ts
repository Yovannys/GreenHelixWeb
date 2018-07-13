import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  profile: any;

  constructor(public auth: AuthService) {

  }

  ngOnDestroy (){}

  ngOnInit() {
    const data = this.auth.useProfileChange$.subscribe(value => this.profile = value);

    if (this.profile==null){
      //console.log("this.profile ANTES: "+this.profile);
      this.auth.getProfile();
      //console.log("this.profile DESPUES: "+this.profile);
    }
  }

  salir(){
    this.auth.logout();
    this.profile = null;
   }

  login(){
    this.auth.login();
  }

}
