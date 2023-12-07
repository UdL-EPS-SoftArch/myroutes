import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';
import {User} from "../login-basic/user";

@HateoasResource('coordinates')
export class Coordinate extends Resource {
    id: string;
    coordinate: string;
    creationDate: Date;
    uri: string;
    // routeVersion: RouteVersion;
}
