declare var require: any;
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ContactService} from "../service/contact.service";
import {ComunicateService} from "../service/comunicate.service";
import {RequestServices} from "../models/RequestServices";
import {AuthService} from "../service/auth.service";
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
  selector: 'app-request-contact',
  templateUrl: './request-contact.component.html',
  styleUrls: ['./request-contact.component.css']
})
export class RequestContactComponent implements OnInit, OnDestroy{

  public mask: Array<string | RegExp>;
  public myModel: string;
  public modelWithValue: string;

  public profileIdRequestService: number;
  public profileTitleRequestService: string;
  public onUserReqServ : any;

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    indicateInvalidDate: true,
  };

  form = this._formBuilder.group( {
    requestContact: this._formBuilder.group( {

      //for more than one validation is required to use []. Else angular will take as asynchronous validation
      firstname : ['',[Validators.required, Validators.minLength(2), Validators.maxLength(35), Validators.pattern("[a-zA-Z0-9-_]+")] ],
      lastname : ['',[Validators.required, Validators.minLength(2), Validators.maxLength(35), Validators.pattern("[a-zA-Z0-9-_]+")] ],
      address : ['',Validators.pattern("[a-zA-Z0-9-_]+") ],
      phone : [''],
      email : ['',[Validators.required, Validators.email] ],
      myDate: [null, Validators.required],
      myservice : ['',Validators.required ]
    } )

    //To set default values (edit page) : this.form.setValue (object). object can be this.contact

    // To reset the form :
    // 1) this.form.reset ({ object });
    // 2) this.form.controls.['firstname'].setValue('NewFirstName');
  });

  ngOnInit(){
   this.getProfifromHomePage();
  }

  constructor(private _formBuilder: FormBuilder,
              public _router: Router,
              public _contactService: ContactService,
              public _comunicate: ComunicateService,
              public auth: AuthService,
              private toastyService:ToastyService, private toastyConfig: ToastyConfig
  ) {

    this.mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    this.myModel = '';
    this.modelWithValue = '5554441234';
  }

  isRequired(field){
    return this.form.get(`requestContact.${field}`).hasError('required');
  }

  onSubmit(event: Event){
    //para detener el submit
    event.preventDefault();
    console.log('Submit', this.form.value.requestContact);

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

    const contactSend = new RequestServices();
    contactSend.email = this.form.value.requestContact.email;

    contactSend.firstname = this.form.value.requestContact.firstname;
    contactSend.firstname = filter.clean(contactSend.firstname);

    contactSend.lastname = this.form.value.requestContact.lastname;
    contactSend.lastname = filter.clean(contactSend.lastname);

    contactSend.services = this.form.value.requestContact.myservice;
    contactSend.services = filter.clean(contactSend.services);

    contactSend.phone = this.form.value.requestContact.phone;
    contactSend.address = this.form.value.requestContact.address;

    contactSend.profileid = this.profileIdRequestService;

    if (this.form.value.requestContact.myDate.formatted!=null && this.form.value.requestContact.myDate.formatted!=''){
      contactSend.date = this.form.value.requestContact.myDate.formatted;
    }

    this._contactService.sendRequestServices(contactSend).subscribe(
      (data) => {
        console.log("Data from Contact API:  "+ JSON.stringify( data));

        //////////////////////////////

        // Or create the instance of ToastOptions
        var toastOptions:ToastOptions = {
          title: "Action",
          msg: "The information was sent successfully.",
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

        //////////////////////////////

        //this._router.navigate(['/home']);

      },
      err => {
        console.error(err);
      },
      () => {});
  }

  getProfifromHomePage(){
    this.onUserReqServ = this._comunicate.onUserReqServ;

      if (this.onUserReqServ!=null){
        //console.log("received from services : ", this.onProfileReqServ);
        this.profileIdRequestService = this.onUserReqServ.profile.id;
        this.profileTitleRequestService = this.onUserReqServ.profile.title;
      }else{
        this._router.navigate(['/home']);
      }

  }

  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    console.log('Formatted date: ', event.formatted);
  }

  ngOnDestroy(){
    //localStorage.removeItem('photoProfile');
  }

}
