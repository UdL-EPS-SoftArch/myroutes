import {Component, OnInit} from '@angular/core';
import {PagedResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {RouteVersion} from "../routeVersion.entity";
import {Router} from "@angular/router";
import {RouteVersionsService} from "../route-versions.service";
import {AuthenticationBasicService} from "../../login-basic/authentication-basic.service";
import {HttpClient} from "@angular/common/http";
import {User} from "../../login-basic/user";

@Component({
  selector: 'app-route-versions-list',
  templateUrl: './route-versions-list.component.html',
  styleUrls: ['./route-versions-list.component.scss']
})
export class RouteVersionsListComponent implements OnInit {

  public routesPagedResource: PagedResourceCollection<RouteVersion>;
  public routeVersions: RouteVersion[] = [];
  public pageSize = 5;
  public page = 1;
  public totalRoutes = 0;
  public types: [];
  public type: string;
  public params: any;

  constructor(
    public router: Router,
    private routeVersionService: RouteVersionsService,
    private authenticationService: AuthenticationBasicService,
    private http: HttpClient) {
    //this.params = this.router.getCurrentNavigation().extras.state?.['param']
  }

  ngOnInit(): void {
    this.routeVersionService.getPage({ pageParams: { size: this.pageSize }, sort: { username: 'ASC' } }).subscribe(
      async (page: PagedResourceCollection<RouteVersion>) => {
        function delay(ms: number) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }

        await delay(2000)
        this.routeVersions = page.resources; //Comprovar si hi es o no, i si no hi es li afegeix-ho jo.
        this.totalRoutes = page.totalElements;
        this.routesPagedResource = page;
        this.routeVersions.map(routes => {
          routes.getRelation('createdBy')
            .subscribe((user: User) => {
              routes.createdBy = user;
            });
        });
      });
  }

  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }

  delete(version : RouteVersion ): void {
    this.routeVersionService.deleteResource(version).subscribe();
  }
}
