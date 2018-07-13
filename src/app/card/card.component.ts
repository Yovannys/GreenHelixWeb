import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {DomSanitizer} from '@angular/platform-browser';
import {SliderComponent} from "../slider/slider.component";
import {ComunicateService} from "../service/comunicate.service";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css']
})
export class CardComponent implements OnInit {

  private page: number = 0;

  //DomSanitizer helps preventing Cross Site Scripting Security bugs (XSS) by sanitizing values to be safe to use in the
  // different DOM contexts.
  private sanitizer: DomSanitizer;
  private image : any;
  private readonly imageType : string = 'data:image/PNG;base64,';

  dataProf: Array<any>;
  pages: Array<number>;

  datasearch : any;

  hideme=[];

  sessionProfileId : any;

  searchButtonPressed : boolean = false;

   constructor(public _authenticationService: AuthenticationService, public _comunicate: ComunicateService, public auth: AuthService, private _router: Router) {
    if (this.datasearch == null || this.datasearch == undefined ){
      this.showAllItems ();
    }
  }

  setSessionProfileId(){
    if (this.auth.isAuthenticated()){
      let item = localStorage.getItem('userProfile');
      let dataSession = JSON.parse(item); //var test is now re-loaded!
      this.sessionProfileId = dataSession.profile.id;
    }

  }

  ngOnInit() {

    this.showAllItems ();
    this.showSearch();

    this.auth.refreshComponet.subscribe(
      (datasearch : any)=>{

         this.setSessionProfileId()
         this.showAllItems ();
      },
      err => {
        console.error(err);
      }
    )
  }

  generateID():string{
    let nav = window.navigator;
    let screen = window.screen;
    let guid = String(nav.mimeTypes.length);
    guid += nav.userAgent.replace(/\D+/g, '');
    guid += nav.plugins.length;
    guid += nav.productSub||'';
    guid += screen.height || '';
    guid += screen.width || '';
    guid += screen.pixelDepth || '';

    return guid;
  }

  setLike(id:number , event:any){
    event.preventDefault();

    let paramUid = this.generateID();

    this._authenticationService.setLike(id, paramUid).subscribe(
      (data) => {
        this.showAllItems ();
      },
      err => {
        console.error(err);
      },
      () => {});
  }

  setUnLike(id:number , event:any){
    event.preventDefault();

    let paramUid = this.generateID();

    this._authenticationService.setUnLike(id, paramUid).subscribe(
      (data) => {
        this.showAllItems ();
      },
      err => {
        console.error(err);
      },
      () => {});
  }

  setPage(i,event:any){
    event.preventDefault();
    this.page = i;
    this.showAllItems ();
  }

  showAllItems (){
    this.setSessionProfileId();
    this._authenticationService.getHomeProfiles(this.page).subscribe(
      (data) => {

        this.dataProf = data.data;
        this.pages = new Array(data.total_pages);

      },
      err => {
        console.error(err);
      },
      () => {});
  }

  showSearch (){
      // receiving data from slider component and Catching the notification
      this._comunicate.onSearchCompleted.subscribe(
        (datasearch : any)=>{
          //any action
            this.searchButtonPressed = true;
            this.datasearch = datasearch;
            console.log("Receiving datasearch from Search Component : ", this.datasearch);
            this.dataProf = this.datasearch;
            console.log("Assing datasearch to dataProf : ", this.dataProf);

            if (this.datasearch==null){
              this.showAllItems ();
            }

           this._router.navigate(['/home']);

        }
      )
  }

}
