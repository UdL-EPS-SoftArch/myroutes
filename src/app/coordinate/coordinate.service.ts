import {Injectable} from '@angular/core';
import {CoordinateModule} from './coordinate.module';
import {HttpClient} from '@angular/common/http';

/* import { Observable } from 'rxjs/internal/Observable'; */
import {HateoasResourceOperation,} from '@lagoshny/ngx-hateoas-client';

@Injectable({
  providedIn: 'root'
})
export class CoordinateService extends HateoasResourceOperation<CoordinateModule> {
  constructor(private http: HttpClient) {
    super(CoordinateModule);
  }
}
