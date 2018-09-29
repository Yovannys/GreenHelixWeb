import {Works} from "./Works";
import {Posts} from "./Posts";
export class Profile{
  public id: number;
  public title: string;
  public url: string;
  public language: string;
  public anotherServices: string;
  public description: string;
  public address: string;
  public works: Works[];
  public posts: Posts[]
  public signed: string;
  public phone: string;
}
