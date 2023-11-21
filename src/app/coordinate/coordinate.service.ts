import { Injectable } from '@angular/core';
import { Coordinate } from './coordinate';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

/* import { Observable } from 'rxjs/internal/Observable'; */
import {
  HateoasResourceOperation,
  ResourceCollection,
} from '@lagoshny/ngx-hateoas-client';

@Injectable({
  providedIn: 'root'
})
export class CoordinateService  extends HateoasResourceOperation<Coordinate> {
  constructor(private http: HttpClient) {
    super(Coordinate);
  }
}
