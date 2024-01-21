import { Injectable } from '@angular/core';
import {HateoasResourceOperation, ResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {RouteVersion} from "./routeVersion.entity";
import {HttpClient} from "@angular/common/http";
import {User} from "../login-basic/user";
import {Observable} from "rxjs/internal/Observable";
import {RouteFollowed} from "../routeFollowed/routeFollowed";

@Injectable({
  providedIn: 'root'
})
export class RouteVersionsService extends HateoasResourceOperation<RouteVersion> {

  constructor(private http: HttpClient) {
    super(RouteVersion);
  }

  public findByCreatedBy(creator: User): Observable<ResourceCollection<RouteVersion>> {
    return this.searchCollection("findByCreatedBy", { params: { creator: creator } })
  }
}
