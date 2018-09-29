import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProtegidaComponent } from './protegida/protegida.component';
import {RouterModule} from "@angular/router";
import {routes} from "./app.routes";
import {AuthService} from "./service/auth.service";
import {AuthGuardGuard} from "./guard/auth-guard.guard";
import { ContactoComponent } from './contacto/contacto.component';
import { CardComponent } from './card/card.component';
import { FooterComponent } from './footer/footer.component';
import { SliderComponent } from './slider/slider.component';
import { AboutComponent } from './about/about.component';
import {AuthenticationService} from "./service/authentication.service";
import {HttpService} from "./service/http.service";
import {ContactService} from "./service/contact.service";
import {TextMaskModule} from "angular2-text-mask";
import {ComunicateService} from "./service/comunicate.service";
import { WorksComponent } from './works/works.component';
import {UserProfileService} from "./service/user-profile.service";
import {LoadImagesService} from "./service/load-images.service";
import { LoadimagesComponent } from './loadimages/loadimages.component';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';
import { NotFoundComponent } from './not-found/not-found.component';
import { SafePipe } from './pipes/safe.pipe';
import { RequestContactComponent } from './request-contact/request-contact.component';
import { AllworkComponent } from './allwork/allwork.component';
import { MyDatePickerModule } from 'mydatepicker';
import {ToastyModule} from 'ng2-toasty';
import { NgxEditorModule } from 'ngx-editor';
import {ScrollTopService} from "./service/scroll-top.service";
import {MyAppErrorHandlerService} from "./service/my-app-error-handler.service";
import { CommentsComponent } from './comments/comments.component';
import {PostService} from "./service/post.service";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProtegidaComponent,
    ContactoComponent,
    CardComponent,
    FooterComponent,
    SliderComponent,
    AboutComponent,
    WorksComponent,
    LoadimagesComponent,
    NgDropFilesDirective,
    NotFoundComponent,
    SafePipe,
    RequestContactComponent,
    AllworkComponent,
    CommentsComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    TextMaskModule ,
    ReactiveFormsModule,
    MyDatePickerModule,
    NgxEditorModule,
    ToastyModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService,
              AuthenticationService,
              HttpService,
              AuthGuardGuard,
              ContactService,
              PostService,
              ComunicateService,
              UserProfileService,
              ScrollTopService,
              MyAppErrorHandlerService,
              LoadImagesService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
