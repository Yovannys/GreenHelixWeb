import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ComunicateService} from "../service/comunicate.service";
import {Posts} from "../models/Posts";
import {PostService} from "../service/post.service";
import {AuthService} from "../service/auth.service";
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  public onPostReqServ : any;
  public profileIdRequestService: number;
  public sessionProfileId : any;

  public dataPost : any;

  form = this._formBuilder.group( {
    post: this._formBuilder.group( {
      message : ['',Validators.required ]
    } )

  });

  constructor(private _formBuilder: FormBuilder,
              public _comunicate: ComunicateService,
              public _postService: PostService,
              public auth: AuthService,
              private toastyService:ToastyService, private toastyConfig: ToastyConfig,
              private _router: Router) {

    this.toastyConfig.theme = 'material';

  }

  isRequired(field){
    return this.form.get(`post.${field}`).hasError('required');
  }

  setSessionProfileId(){
    if (this.auth.isAuthenticated()){
      let item = localStorage.getItem('userProfile');
      let dataSession = JSON.parse(item); //var test is now re-loaded!
      this.sessionProfileId = dataSession.profile.id;
    }

  }

  ngOnInit() {
    this.setSessionProfileId();
    this.ngShowAllPost();
  }

  onGoHome(){
    localStorage.removeItem('profileid');
  }

  onSubmit(event: Event){
    //para detener el submit
    event.preventDefault();
    console.log('Submit', this.form.value.contact);

    let item = localStorage.getItem('userProfile');
    let data = JSON.parse(item);

    const postSend = new Posts();

    console.log("Data from session : ",data);

    const accessToken = localStorage.getItem('access_token');

    postSend.post = this.form.value.post.message;
    postSend.username = data.username;
    postSend.date = new Date();
    postSend.id = data.id;

    this._postService.sendPost(postSend, accessToken).subscribe(
      (data) => {

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
       this.toastyService.success(toastOptions);

       this.ngShowAllPost();

        //console.log("Data from Contact API:  "+ JSON.stringify( data));
        //this._router.navigate(['/home']);

      },
      err => {
        console.error(err);
      },
      () => {});
  }

  ngShowAllPost(){

    this.onPostReqServ = this._comunicate.onPostReqServ;

    if (this.onPostReqServ!=null ){
      this.profileIdRequestService = this.onPostReqServ.profile.id;
    }else{
      this._router.navigate(['/home']);
    }

    if (typeof this.profileIdRequestService === 'undefined') {
       this._router.navigate(['/home']);
     }else{
       this._postService.getAllPosts(this.profileIdRequestService).subscribe(
         (userData) => {
           this.dataPost = userData;
           console.log("data post", this.dataPost);
         },
         err => {
           console.error(err);
           //Redirect to the Error page
         },
         () => {});
    }
  }


  ////////////////////////////////////////////

}
