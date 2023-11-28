import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';
import { User } from '../login-basic/user';
import {Route} from "../routes/route";

@HateoasResource('routes')
export class RouteFollowed extends Resource {
  id: string;
  creationDate: Date;
  duration: number;
  levelUp: string;
  levelDown: string;
  routeOrigin: Route;
  createdBy: User;
  uri: string

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
