import {Profile} from "./Profile";
export class Works{
  constructor(
              public id: number,
              public beforePhoto: string,
              public afterPhoto: string,
              public showHomePage: boolean,
              public date: Date

  ){

  }
}
