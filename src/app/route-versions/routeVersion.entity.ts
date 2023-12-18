import {HateoasResource, Resource} from "@lagoshny/ngx-hateoas-client";
import {User} from "../login-basic/user";
import {Route} from "../routes/route";

@HateoasResource('routeVersions')
export class RouteVersion extends Resource {
  id: string;
  title:string;
  creationDate: Date
  createdBy: User
  versionOf: Route
  uri: string

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }

}
