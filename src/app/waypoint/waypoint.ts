import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';
import {Coordinate} from "../coordinate/coordinate.entity";

@HateoasResource('waypoints')
export class Waypoint extends Resource {
  uri: string;
  id: string;
  title: string;
  description: string;
  type: string;
  location: Coordinate;
  _links: any;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }

  // public get id(): string {
  //   let uriArray = this.uri.split('/');
  //   return uriArray.pop();
  // }
}
