import { Component } from '@angular/core';
import {AuthService} from "./service/auth.service";
import {ScrollTopService} from "./service/scroll-top.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(public auth: AuthService, public scrollTopService:ScrollTopService ) {
    auth.handleAuthentication();
  }

  ngOnInit() {
    this.scrollTopService.setScrollTop();
  }
}
