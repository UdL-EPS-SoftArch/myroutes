import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';
import { User } from '../login-basic/user';
import {Route} from "../routes/route";

@HateoasResource('routeFolloweds')
export class RouteFollowed extends Resource {
  creationDate: Date;
  duration: number;
  levelUp: number;
  levelDown: string;
  routeOrigin: Route;
  createdBy: User;
  uri: string

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }

  public get id() : string {
    let uriArray= this.uri.split('/');
    return uriArray.pop();
  }
}
