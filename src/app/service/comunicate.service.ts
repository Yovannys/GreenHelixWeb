import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class ComunicateService {

  // Preparing the emitter
  onSearchCompleted = new EventEmitter();

  constructor() { }

}
