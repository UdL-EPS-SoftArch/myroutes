import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {HateoasResourceOperation,} from '@lagoshny/ngx-hateoas-client';
import {Coordinate} from "./coordinate.entity";

@Injectable({
  providedIn: 'root'
})
export class CoordinateService extends HateoasResourceOperation<Coordinate> {
  constructor(private http: HttpClient) {
    super(Coordinate);
  }
}
