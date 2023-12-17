import { Injectable } from '@angular/core';
import { Waypoint } from './waypoint';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

/* import { Observable } from 'rxjs/internal/Observable'; */
import {
  HateoasResourceOperation,
  ResourceCollection,
} from '@lagoshny/ngx-hateoas-client';

@Injectable({
  providedIn: 'root',
})
export class WaypointService extends HateoasResourceOperation<Waypoint> {
  constructor(private http: HttpClient) {
    super(Waypoint);
  }

  public findByTitle(
    query: string
  ): Observable<ResourceCollection<Waypoint>> {
    return this.searchCollection('findByTitle', {
      params: { text: query },
    });
  }

}
