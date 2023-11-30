import {Component, EventEmitter, Output} from '@angular/core';
import {RouteService} from "../route.service";
import {PagedResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {Route} from "../route";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../../login-basic/user";

@Component({
  selector: 'app-route-filter',
  templateUrl: './route-filter.component.html',
  styleUrls: ['./route-filter.component.css']
})
export class RouteFilterComponent {
  @Output() emitResults: EventEmitter<Route> = new EventEmitter();
  private routes: Array<Route>;
  public types: [];
  private pageSize: 5;
  private routesPagedResource: PagedResourceCollection<Route>;

  constructor(private routeService: RouteService, private http: HttpClient) {
    this.http.get<any>(`${environment.API}/profile/routes`)
      .subscribe(data => {
        this.types = (data.alps.descriptor[0].descriptor[2].doc.value).split(',').sort().reverse();
        // @ts-ignore
        this.types.push('Choose a type to filter');
        this.types.reverse()
      });
  }

  filterRoutes(type: String) {
    if (typeof type === 'string' &&   type.trim() != 'Choose a type to filter') {
      this.routeService.findByType(type)
        .subscribe((page: PagedResourceCollection<Route>) => {
          this.routes = page.resources;
          this.routesPagedResource = page;
          this.routes.map(routes => {
            routes.getRelation('createdBy')
              .subscribe((user: User) => {
                routes.createdBy = user;
              });
          });
          this.emitResults.emit(this.routesPagedResource as any);
        });
    }
    else {
      this.routeService.getPage({ pageParams: { size: this.pageSize }, sort: { username: 'ASC' } }).subscribe(
        (page: PagedResourceCollection<Route>) => {
          this.routes = page.resources;
          this.routesPagedResource = page;
          this.routes.map(routes => {
            routes.getRelation('createdBy')
              .subscribe((user: User) => {
                routes.createdBy = user;
              });
          });
          this.emitResults.emit(this.routesPagedResource as any);
        });
    }
  }
}
