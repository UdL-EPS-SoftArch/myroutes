import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';

@HateoasResource('coordinates')
export class Coordinate extends Resource {
  id: number
  coordinate: string
  // routeVersion: RouteVersion

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
