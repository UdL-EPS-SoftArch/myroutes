import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { HateoasResourceOperation, ResourceCollection } from "@lagoshny/ngx-hateoas-client";
import { RouteFollowed } from "./routeFollowed";
import {Route} from "../routes/route";
import {User} from "../login-basic/user";

@Injectable({providedIn: "root"})
export class RouteFollowedService extends HateoasResourceOperation<RouteFollowed> {

  constructor() {
    super(RouteFollowed);
  }

  public findByCreatedBy(creator: User): Observable<ResourceCollection<RouteFollowed>> {
    return this.searchCollection("findByCreatedBy", { params: { creator: creator } })
  }

  public findByIdContaining(id: string): Observable<ResourceCollection<RouteFollowed>> {
    return this.searchCollection("findByIdContaining", { params: { id: id } })
  }

  public findByRouteOrigin(origin: Route): Observable<ResourceCollection<RouteFollowed>> {
    return this.searchCollection("findByRouteOrigin", { params: { origin: origin } })
  }

  public findByCreatedByAndRouteOrigin(creator: User, origin: Route): Observable<ResourceCollection<RouteFollowed>> {
    return this.searchCollection("findByCreatedByAndRouteOrigin", { params: { creator: creator, origin: origin } })
  }

}
