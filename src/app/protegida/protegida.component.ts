import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {Users} from "../models/Users";
import {AuthenticationService} from "../service/authentication.service";
import {Profile} from "../models/Profile";
import {UserProfileService} from "../service/user-profile.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-protegida',
  templateUrl: './protegida.component.html',
  styleUrls: ['./protegida.component.css']
})
export class ProtegidaComponent implements OnInit {

   // myProf : Object = {
   //  title : "El titulo"
   // }

  customtitle : string = "El titulo de ahora";
  myProf : Profile;

  form = this._formBuilder.group( {
    myprofile: this._formBuilder.group( {

      //for more than one validation is required to use []. Else angular will take as asynchronous validation
      title : ['',[Validators.required, Validators.minLength(2), Validators.maxLength(35), Validators.pattern("[a-zA-Z0-9-_ ]+")] ],
      description : ['',Validators.required ],
      another_services : [''],
      url : ['', Validators.pattern("^(http:\/\/|https:\/\/)?(www.)?([a-zA-Z0-9]+).[a-zA-Z0-9]*.[a-z]{3}.?([a-z]+)?$")]

    } )

  });


  constructor(private _router: Router, private auth: AuthService, public _authenticationService: AuthenticationService, private _formBuilder: FormBuilder, private _userProfileService: UserProfileService) {

  }


  ngOnInit() {

    //Getting Profile

    let item = localStorage.getItem('userProfile');
    let data = JSON.parse(item); //var test is now re-loaded!

    console.log("Protegida Component : getting data from user profile session",data)

    const accessToken = localStorage.getItem('access_token');

    this._authenticationService.getSingleUser(data.username,accessToken).subscribe(
      (userData) => {

        console.log("Method : getSingleUser", userData)

        // Filling out the form with default values

          this.form.setValue(
            {
              myprofile :  {
                title : userData.profile.title,
                description : userData.profile.description,
                another_services :  userData.profile.anotherServices,
                url :  userData.profile.url,
              }
            }
          )

      },
      err => {
        console.error(err);
        this._router.navigate(['/']);
      },
      () => {});

  }

  onSubmit(event: Event){
    this.save();
    this._router.navigate(['/home']);
  }

  isRequired(field){
    return this.form.get(`myprofile.${field}`).hasError('required');
  }

  public saveAndContinue(){
    this.save();
    this._router.navigate(['/works']);
  }

  save(){
    //para detener el submit
    event.preventDefault();
    console.log('Submited', this.form.value.myprofile);

    let item = localStorage.getItem('userProfile');
    let data = JSON.parse(item); //var test is now re-loaded!

    const profileSend = new Profile();
    profileSend.id = data.id;
    profileSend.title = this.form.value.myprofile.title;
    profileSend.url = this.form.value.myprofile.url;
    profileSend.language = 'en_US';
    profileSend.anotherServices = this.form.value.myprofile.another_services;
    profileSend.description = this.form.value.myprofile.description;
    profileSend.works = null;

    this._userProfileService.update(profileSend).subscribe(
      (data) => {
        console.log("Data from Save Profile API:  "+ JSON.stringify( data));
       },
      err => {
        console.error(err);
        //Go to 404
        this._router.navigate(['/']);
      },
      () => {});
  }

}
