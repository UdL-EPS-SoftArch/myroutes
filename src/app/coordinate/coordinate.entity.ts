import {HateoasResource, Resource} from '@lagoshny/ngx-hateoas-client';

@HateoasResource('coordinates')
export class Coordinate extends Resource {
  id: string;
  coordinate: string;
  creationDate: Date;
  uri: string;

  // routeVersion: RouteVersion;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }

}
