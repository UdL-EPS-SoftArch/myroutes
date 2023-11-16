import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';

@HateoasResource('waypoints')
export class Waypoint extends Resource {
  uri: string;
  title: string;
  description: string;
  type: string;
  beneficialFor: Waypoint[];
  _links: any;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }

  public get id(): string {
    let uriArray = this.uri.split('/');
    return uriArray.pop();
  }
}