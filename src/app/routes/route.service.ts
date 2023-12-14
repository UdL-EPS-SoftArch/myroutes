import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { HateoasResourceOperation, ResourceCollection } from "@lagoshny/ngx-hateoas-client";
import { Route } from "./route";

@Injectable({providedIn: "root"})
export class RouteService extends HateoasResourceOperation<Route> {

  constructor() {
    super(Route);
  }

  public findByCreatedBy(creator: string): Observable<ResourceCollection<Route>> {
    return this.searchCollection("findByCreatedBy", { params: { creator: creator } })
  }

  public findByTitle(title: string): Observable<ResourceCollection<Route>> {
    return this.searchCollection("findByTitle", { params: { title: title } })
  }

  public findByTitleContainingIgnoreCase(title: string): Observable<ResourceCollection<Route>> {
    return this.searchCollection("findByTitleContainingIgnoreCase", { params: { title: title } })
  }

  public findByType(type: string): Observable<ResourceCollection<Route>> {
    return this.searchCollection("findByType", { params: { type: type } })
  }
}
