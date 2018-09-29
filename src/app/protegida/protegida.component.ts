declare var require: any;
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {Users} from "../models/Users";
import {AuthenticationService} from "../service/authentication.service";
import {Profile} from "../models/Profile";
import {UserProfileService} from "../service/user-profile.service";
import {Router} from "@angular/router";
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';


@Component({
  selector: 'app-protegida',
  templateUrl: './protegida.component.html',
  styleUrls: ['./protegida.component.css']
})
export class ProtegidaComponent implements OnInit, OnDestroy {

  public mask: Array<string | RegExp>;
  public modelWithValue: string;
  public myModel: string;

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    indicateInvalidDate: true,
  };

  // Initialized to specific date (09.10.2018).
  public model: any = { date: { year: 2011, month: 10, day: 9 } };

   userData: any;

   showsucess : boolean = false;

  form = this._formBuilder.group( {
    myprofile: this._formBuilder.group( {

      //for more than one validation is required to use []. Else angular will take as asynchronous validation
      title : ['',[Validators.required, Validators.minLength(2), Validators.maxLength(35), Validators.pattern("^[A-Za-z0-9-_,. ]+$")]],
      myDate: [null, Validators.required],
      description : ['',Validators.required ],
      another_services : ['',Validators.required],
      phone : ['',Validators.required],
      url : ['', Validators.pattern("^(http:\/\/|https:\/\/)?(www.)?([a-zA-Z0-9]+).[a-zA-Z0-9]*.[a-z]{3}.?([a-z]+)?$")],
      address : ['',[Validators.required, Validators.pattern("[a-zA-Z0-9,.-_ ]+")] ]
    } )



  });



  clearDate(): void {
    // Clear the date using the patchValue function
    this.form.patchValue({myDate: null});
  }


  constructor(private _router: Router,
              private auth: AuthService,
              public _authenticationService: AuthenticationService,
              private _formBuilder: FormBuilder,
              private _userProfileService: UserProfileService,
              private toastyService:ToastyService, private toastyConfig: ToastyConfig) {

    this.toastyConfig.theme = 'material';

    this.mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    this.myModel = '';
    this.modelWithValue = '5554441234';

  }

  ngOnDestroy(){
    //this.auth.refreshComponet.unsubscribe();
  }
  ngOnInit() {

    this.auth.refreshComponet.subscribe(
      (data : any)=>{

        this.init();
        console.log("Inside Refresh");
      },
      err => {

        console.log("ERROR :Inside Refresh");
        console.error(err);
      }
    )
    this.init();
  }

  init(){
    //Getting Profile

    let item = localStorage.getItem('userProfile');
    let data = JSON.parse(item); //var test is now re-loaded!

    console.log("Protegida Component : getting data from user profile session",data);
    console.log("Protegida Component : getting data ",data);

    if (data!=null){



    const accessToken = localStorage.getItem('access_token');

    //console.log("Param username :", data.username);
    //console.log("Param access Token :", accessToken);

    this._authenticationService.getSingleUser(data.username,accessToken).subscribe(
      (userData) => {
        this.userData = userData;

         //console.log("Method : getSingleUser", userData)

        // Filling out the form with default values

        let date = new Date(userData.profile.signed);

        if (userData.profile!=null){

        console.log("date before show", date);

        this.form.setValue(
          {
            myprofile :  {
              title : userData.profile.title,
              myDate: {
                date: {
                  year: date.getFullYear(),
                  month: date.getMonth() + 1,
                  day: date.getDate()}
              },
              description : userData.profile.description,
              another_services :  userData.profile.anotherServices,
              url :  userData.profile.url,
              address: userData.profile.address,
              phone: userData.profile.phone
            }
          }
        )

        }



      },
      err => {
        console.error(err);
        //this._router.navigate(['/']);
      },
      () => {});

    }
  }

  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    console.log('Formatted date: ', event.formatted);
  }



  onSubmit(event: Event){

    event.preventDefault();

    //console.log('Submited', this.form.value.myprofile);


    this.save();
   // this._router.navigate(['/home']);


    //The new one

    // Just add default Toast with title only
   // this.toastyService.default('Hi there');

    // Or create the instance of ToastOptions
    var toastOptions:ToastOptions = {
      title: "Action",
      msg: "The information was updated successfully.",
      showClose: true,
      timeout: 5000,
      theme: 'material',
      onAdd: (toast:ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function(toast:ToastData) {
        console.log('Toast ' + toast.id + ' has been removed!');
      }
    };
    // Add see all possible types in one shot
  // this.toastyService.info(toastOptions);
    this.toastyService.success(toastOptions);
    //this.toastyService.wait(toastOptions);
  //  this.toastyService.error(toastOptions);
   // this.toastyService.warning(toastOptions);


    //End The new one

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
    //event.preventDefault();
   // console.log('Submited', this.form.value.myprofile);

    let item = localStorage.getItem('userProfile');
    let data = JSON.parse(item); //var test is now re-loaded!

    //test bad word
    var Filter = require('bad-words'),
    filter = new Filter();

    //Adding to black list
    filter.addWords([
      'pinga',
      'cojone',
      'fuck',
      'joder',
      'fana',
      'mierda',
      'come mierda',
      'palestino',
      'oriental',
      'bajanda',
      'singao',
      'la madre',
      'motherfucker',
      'coño',
      'son of a bitch',
      'hijo de puta',
      'berk',
      'coward',
      'pussy',
      'cunt',
      'fanny',
      'twat',
      'canaille',
      'twat',
      'shit',
      'cagada',
      'crap',
      'poop',
      'bullshit',
      'muck',
      'estupideces',
      'estupido',
      'estupidez',
      'Fuck you',
      'Piss off',
      'muck',
      'Dick head',
      'Asshole',
      'Damn',
      'Cunt',
      'bastard',
      'darn',
      'slut',
      'douche',
      'stupid',
      'idiot',
      'homosexual',
      'bollo'
    ]);
    //filter.removeWords('hells');

    const profileSend = new Profile();
    profileSend.id = data.id;

    //Applying Filter
    profileSend.title = this.form.value.myprofile.title;
    profileSend.title = filter.clean(profileSend.title);

    profileSend.url = this.form.value.myprofile.url;
    profileSend.language = 'en_US';

    //Applying Filter
    profileSend.anotherServices = this.form.value.myprofile.another_services;
    profileSend.anotherServices = filter.clean(profileSend.anotherServices);
    profileSend.anotherServices = profileSend.anotherServices.trim();

    //Applying Filter
    profileSend.description = this.form.value.myprofile.description;
    profileSend.description = filter.clean(profileSend.description);

    profileSend.works = null;
    profileSend.address = this.form.value.myprofile.address;
    profileSend.phone = this.form.value.myprofile.phone;

   if (this.form.value.myprofile.myDate.formatted!=null && this.form.value.myprofile.myDate.formatted!=''){
     profileSend.signed = this.form.value.myprofile.myDate.formatted;
   }else if(this.userData.profile.signed!=null && this.userData.profile.signed!=''){
     profileSend.signed = this.userData.profile.signed;
   }else{
     let customdate = new Date();
     let customyear = customdate.getFullYear();
     let custommonth = customdate.getMonth() + 1;
     let customday = customdate.getDate();
     profileSend.signed = customyear+ '-'+custommonth+'-'+customday;
   }


    this._userProfileService.update(profileSend).subscribe(
      (data) => {
        this.showsucess = true;

        // console.log("Data from Save Profile API:  "+ JSON.stringify( data));
        //this._router.navigate(['/home']);
       },
      err => {
        console.error(err);
        //Go to 404
        //this._router.navigate(['/']);
      },
      () => {});
  }

}
