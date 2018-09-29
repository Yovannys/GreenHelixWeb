import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../service/authentication.service";
import {ComunicateService} from "../service/comunicate.service";


@Component({
  selector: 'app-slider',
  templateUrl: 'slider.component.html',
  styleUrls: ['slider.component.css']
})
export class SliderComponent implements OnInit{

  dataProf:any;

  form = this._formBuilder.group( {
    searchprofile: this._formBuilder.group( {

      //for more than one validation is required to use []. Else angular will take as asynchronous validation
      crit : ['',[Validators.minLength(1), Validators.maxLength(35), Validators.pattern("[a-zA-Z][a-zA-Z ]+")] ]

    } )

  });

  ngOnInit() {


  }

  constructor(private _formBuilder: FormBuilder, public _authenticationService: AuthenticationService, public _comunicate: ComunicateService) {

  }

  onSubmit(event: Event) {
    //para detener el submit
    event.preventDefault();
    console.log('Submit', this.form.value.searchprofile);

    this._authenticationService.searchProfilesByCrit(this.form.value.searchprofile.crit).subscribe(
     (data) => {
     //console.log("Data:  "+ data );
     this.dataProf = data;

     // fire a notification
     this._comunicate.onSearchCompleted.emit(this.dataProf);
     },
     err => {
     console.error(err);
     },
     () => {
       console.log("subscrito");
     });

  }



}
