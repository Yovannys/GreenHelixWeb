import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {AuthenticationService} from "../service/authentication.service";
import {FormBuilder} from "@angular/forms";
import {UserProfileService} from "../service/user-profile.service";
import {LoadImagesService} from "../service/load-images.service";
import {ComunicateService} from "../service/comunicate.service";

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit, OnDestroy {

  dataWorks : any;
  filesave : boolean = false;
  isFullCupFlag: Boolean = false;

  constructor(private _router: Router,
              private auth: AuthService,
              public _authenticationService: AuthenticationService,
              private _formBuilder: FormBuilder,
              private _userProfileService: UserProfileService,
              private _loadImagesService : LoadImagesService,
              public _comunicate: ComunicateService
  ) {

  }

  ngOnInit() {

  this.fullCup();



    this._loadImagesService.fileSaved.subscribe(
      (data: any) => {
        if(data){
          this.filesave = data;
          this.getProf();
          return;
        }

      });
    this.getProf();
  }

  fullCup(){
    let item = localStorage.getItem('userProfile');
    let data = JSON.parse(item); //var test is now re-loaded!
    this.isFullCup(data.profile.id);
  }



  getProf(){

    //Getting Profile

    let item = localStorage.getItem('userProfile');
    let data = JSON.parse(item); //var test is now re-loaded!

    const accessToken = localStorage.getItem('access_token');

    this._userProfileService.getWorksbyUsername(data.username,accessToken).subscribe(
      (data) => {
        //console.log("Work List:  "+ JSON.stringify( data));
        this.dataWorks = data;
      },
      err => {
        console.error(err);
        //Go to 404
        this._router.navigate(['/']);
      },
      () => {});

  }

  deleteWork(id:number){
    //para detener el submit
    event.preventDefault();
    const accessToken = localStorage.getItem('access_token');
    this._userProfileService.deleteWork(id,accessToken).subscribe(
      (data) => {
        //console.log("Work List:  "+ JSON.stringify( data));
        console.log("Delete : ",data);
        this.getProf();

      },
      err => {
        console.error(err);
        //Go to 404
        this._router.navigate(['/']);
      },
      () => {});
  }

  setHome(id:number){
    //para detener el submit
    event.preventDefault();
    const accessToken = localStorage.getItem('access_token');
    this._userProfileService.setHome(id,accessToken).subscribe(
      (data) => {
        //console.log("Work List:  "+ JSON.stringify( data));
        console.log("SetHome : ",data);
        this.fullCup();
        this.getProf();

      },
      err => {
        console.error(err);
        //Go to 404
        this._router.navigate(['/']);
      },
      () => {});



  }

  isFullCup(id:number){

    const accessToken = localStorage.getItem('access_token');
    this._userProfileService.isFullCup(id,accessToken).subscribe(
      (data) => {
        //console.log("Work List:  "+ JSON.stringify( data));
        this.isFullCupFlag = data;
        console.log("Is Full Cup : ",this.isFullCupFlag);
        this.getProf();

      },
      err => {
        this.isFullCupFlag = false;
        console.error(err);
        //Go to 404
        this._router.navigate(['/']);
      },
      () => {});
  }



  onValidateShowHome(){

    let item = localStorage.getItem('userProfile');
    let data = JSON.parse(item); //var test is now re-loaded!

    const accessToken = localStorage.getItem('access_token');
    this._userProfileService.onValidateShowHome(Number(data.id), accessToken).subscribe(
      (data) => {
        // console.log("Saliendo del boton");
        // fire a notification
        this._comunicate.onvalidateWorkCompleted.emit(true);

      },
      err => {

        console.error(err);
        //Go to 404
        this._router.navigate(['/']);
      },
      () => {});



  }

  ngOnDestroy(){
    if (this.filesave){
      this._loadImagesService.fileSaved.unsubscribe();
    }

   this.onValidateShowHome();

  }

}
