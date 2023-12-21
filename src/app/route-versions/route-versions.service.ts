import { Injectable } from '@angular/core';
import {HateoasResourceOperation} from "@lagoshny/ngx-hateoas-client";
import {RouteVersion} from "./routeVersion.entity";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RouteVersionsService extends HateoasResourceOperation<RouteVersion> {

  constructor(private http: HttpClient) {
    super(RouteVersion);
  }
}
