import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ContactService} from "../service/contact.service";
import {Contact} from "../models/Contact";

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {

  public mask: Array<string | RegExp>;
  public myModel: string;
  public modelWithValue: string;

  form = this._formBuilder.group( {
    contact: this._formBuilder.group( {

      //for more than one validation is required to use []. Else angular will take as asynchronous validation
      firstname : ['',[Validators.required, Validators.minLength(2), Validators.maxLength(35), Validators.pattern("[a-zA-Z0-9-_]+")] ],
      lastname : ['',[Validators.required, Validators.minLength(2), Validators.maxLength(35), Validators.pattern("[a-zA-Z0-9-_]+")] ],
      subject : ['',Validators.required ],
      phone : [''],
      email : ['',[Validators.required, Validators.email] ],
      message : ['',Validators.required ]
    } )

    //To set default values (edit page) : this.form.setValue (object). object can be this.contact

    // To reset the form :
    // 1) this.form.reset ({ object });
    // 2) this.form.controls.['firstname'].setValue('NewFirstName');
  });

  constructor(private _formBuilder: FormBuilder, public _router: Router, public _contactService: ContactService) {
    this.mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    this.myModel = '';
    this.modelWithValue = '5554441234';
  }

  isRequired(field){
    return this.form.get(`contact.${field}`).hasError('required');
  }

  onGoHome(){
    localStorage.removeItem('profileid');
  }

  onSubmit(event: Event){
    //para detener el submit
    event.preventDefault();
    console.log('Submit', this.form.value.contact);

    /*
    *
    *   public email: string;
     public firstname: string;
     public lastname: string;
     public message: string;
     public phone: string;
     public subject: string;
    * */

    const contactSend = new Contact();
    contactSend.email = this.form.value.contact.email;
    contactSend.firstname = this.form.value.contact.firstname;
    contactSend.lastname = this.form.value.contact.lastname;
    contactSend.message = this.form.value.contact.message;
    contactSend.phone = this.form.value.contact.phone;
    contactSend.subject = this.form.value.contact.subject;

    this._contactService.sendContact(contactSend).subscribe(
      (data) => {
       console.log("Data from Contact API:  "+ JSON.stringify( data));
      this._router.navigate(['/home']);

      },
      err => {
        console.error(err);
      },
      () => {});
  }

}
