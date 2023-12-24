import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';
import { User } from '../login-basic/user';

@HateoasResource('routeFolloweds')
export class RouteFollowed extends Resource {
  creationDate: Date;
  duration: number;
  levelUp: number;
  levelDown: string;
  follows: string;
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
