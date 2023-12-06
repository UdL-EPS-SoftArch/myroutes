import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';

@HateoasResource('coordinates')
export class Coordinate extends Resource {
    coordinate: string;
    // routeVersion: RouteVersion;

}
