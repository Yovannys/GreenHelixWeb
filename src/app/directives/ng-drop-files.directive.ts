import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {FileItem} from "../models/FileItem";
import {isUndefined} from "util";

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() files: FileItem[] = [];
  @Output() mouseover: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover',['$event'])
  public onDragEnter(event:any){
   this.mouseover.emit(true);
   this._preventOpenitByBrowser(event);
  }

  @HostListener('dragleave',['$event'])
  public onDragLeave(event:any){
    this.mouseover.emit(false);
  }

  @HostListener('drop',['$event'])
  public onDrop(event:any){

    //getting info about files
    const transfer = this.getTransfer(event);
    if (!transfer){
      return;
    }

    this.extractFiles(transfer.files);
    this._preventOpenitByBrowser(event);
    this.mouseover.emit(false);

  }

  //
  private getTransfer(event: any){
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private extractFiles(fileList : FileList){
    //console.log(fileList);

    // getOwnPropertyNames get properties and convert it in a Array
    for (const property in Object.getOwnPropertyNames(fileList)){

      //getting file and setting in final array
      const fileTmp = fileList[property];
      if (this.canBeLoaded(fileTmp)){
        const newFile = new FileItem(fileTmp);
        this.files.push(newFile);
      }
    }

    //console.log(this.files)
  }

  //Validations

  private canBeLoaded(file: File): boolean{
    if ( !this.fileWasDropped(file.name) && this.isImage(file.type) ){
     return true;
    }else{
      return false;
    }
  }

  //Avoid open the image by browser
  private _preventOpenitByBrowser(event){
    event.preventDefault();
    event.stopPropagation();
  }

  //Make sure to avoid dropped 2 times
  private fileWasDropped(fileName:string):boolean {
    for (const fil of this.files){
      if (fil.fileName == fileName){
       //console.log('El archivo esta agregado', fileName);
       return true;
      }
    }
    return false;
  }

  //Only images
  private isImage(filetype:string):boolean {
    return (filetype === '' || filetype === undefined) ? false : filetype.startsWith('image');
  }

}
