import { Component, OnInit } from '@angular/core';
import {UserProfileService} from "../service/user-profile.service";
import {Router} from "@angular/router";
import {ComunicateService} from "../service/comunicate.service";
import {Works} from "../models/Works";

@Component({
  selector: 'app-allwork',
  templateUrl: './allwork.component.html',
  styleUrls: ['./allwork.component.css']
})
export class AllworkComponent implements OnInit {

  public datainfo  ;
  public firstRow: number ;

  constructor(private _userProfileService: UserProfileService,private _router: Router, public _comunicate: ComunicateService) { }

  onGoHome(){
    localStorage.removeItem('profileid');
  }


  ngOnInit() {

    // this.onProfileReqServ = this._comunicate.onProfileReqServ;


    const profileid = localStorage.getItem('profileid');
    if (!profileid){

      let profile = this._comunicate.onUserReqServ.profile;

      if(profile!=null){

        this._userProfileService.findallWorks(profile.id).subscribe(
          (data) => {

            this.datainfo = data;
            this.firstRow = data[0].id;

            console.log("ID From Data", this.datainfo);
            console.log("First ID", this.firstRow);

          },
          err => {
            console.error(err);
            //Go to 404
            this._router.navigate(['/']);
          },
          () => {});

      }

    }else{

      this._userProfileService.findallWorks(Number(profileid)).subscribe(
        (data) => {

          this.datainfo = data;
          this.firstRow = data[0].id;

          console.log("ID From Data", this.datainfo);
          console.log("First ID", this.firstRow);

        },
        err => {
          console.error(err);
          //Go to 404
          this._router.navigate(['/']);
        },
        () => {});


    }



  }

}
