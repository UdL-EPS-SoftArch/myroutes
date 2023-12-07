import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {HateoasResourceOperation, PagedResourceCollection, ResourceCollection,} from '@lagoshny/ngx-hateoas-client';
import {Coordinate} from "./coordinate.entity";
import {Observable} from "rxjs/internal/Observable";
import {Route} from "../routes/route";

@Injectable({
  providedIn: 'root'
})
export class CoordinateService extends HateoasResourceOperation<Coordinate> {
  constructor(private http: HttpClient) {
    super(Coordinate);
  }

  //public findByCoordinate(cooridnate: string, pageSize: number, currentPage: number): Observable<ResourceCollection<Coordinate>> {
  public findByCoordinateContainingIgnoreCase(cooridnate: string): Observable<ResourceCollection<Coordinate>> {
    // return this.searchPage("findByCoordinate", { pageParams: {size: pageSize, page: currentPage}, params: { coordinate: cooridnate } })
    return this.searchCollection("findByCoordinateContainingIgnoreCase", { params: { coordinate: cooridnate } })
  }

  /*public findByRouteVersion(routeVersion: RouteVersion): Observable<ResourceCollection<Coordinate>> {
    return this.searchCollection("findByRouteVersion", { params: { routeVersion: routeVersion } })
  }*/
}
