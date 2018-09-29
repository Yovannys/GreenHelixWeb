import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable()
export class ComunicateService {

  // Preparing the emitter
  onSearchCompleted = new EventEmitter();

  onvalidateWorkCompleted = new EventEmitter();

  onUserReqServ : any;

  onPostReqServ : any;

  constructor() { }

}
