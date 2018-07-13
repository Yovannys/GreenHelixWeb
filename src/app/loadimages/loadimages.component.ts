import { Component, OnInit } from '@angular/core';
import {FileItem} from "../models/FileItem";
import {LoadImagesService} from "../service/load-images.service";

@Component({
  selector: 'app-loadimages',
  templateUrl: './loadimages.component.html',
  styleUrls: ['./loadimages.component.css']
})
export class LoadimagesComponent implements OnInit {

  isOverElement : boolean = false;

  files : FileItem[] = [];

  constructor(public _loadImagesService: LoadImagesService) { }

  ngOnInit() {
  }

  saveImages(){

    this._loadImagesService.saveImageToDataBase(this.files);

   /* this._loadImagesService.saveImageToDataBase(this.files).subscribe(
      (data) => {
        console.log("Images List:  "+ JSON.stringify( data));

      },
      err => {
        console.error(err);
        //Go to 404
        //this._router.navigate(['/']);
      },
      () => {});*/



  }

  cleanFiles(){
    this.files = [];
  }

}
