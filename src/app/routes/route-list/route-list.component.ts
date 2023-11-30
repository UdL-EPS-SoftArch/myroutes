import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { RouteService } from '../route.service';
import { Route } from '../route';
import { PagedResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { User } from 'src/app/login-basic/user';
import { AuthenticationBasicService } from 'src/app/login-basic/authentication-basic.service';

@Component({
  selector: 'app-routes-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})

export class RouteListComponent implements OnInit {
  public routesPagedResource: PagedResourceCollection<Route>;
  public routes: Route[] = [];
  public pageSize = 5;
  public page = 1;
  public totalRoutes = 0;


  constructor(
    public router: Router,
    private routesService: RouteService,
    private authenticationService: AuthenticationBasicService) {
  }

  ngOnInit(): void {
    this.routesService.getPage({ pageParams: { size: this.pageSize }, sort: { username: 'ASC' } }).subscribe(
      (page: PagedResourceCollection<Route>) => {
      this.routes = page.resources;
      this.totalRoutes = page.totalElements;
      this.routesPagedResource = page;
        this.routes.map(routes => {
          routes.getRelation('createdBy')
            .subscribe((user: User) => {
              routes.createdBy = user;
            });
        });
    });
  }

  changePage(): void {
    this.routesPagedResource.customPage(
      {pageParams: {page: this.page - 1, size: this.pageSize},
      sort: {name: 'ASC'}}).subscribe(
      (page: PagedResourceCollection<Route>) => {
        this.routes = page.resources;
        this.routes.map(routes => {
          routes.getRelation('createdBy')
            .subscribe((user: User) => {
              routes.createdBy = user;
            });
        });
      });
  }

  modifyList(routesPagedResource: PagedResourceCollection<Route>): void {
    this.routesPagedResource = routesPagedResource;
    this.routes = this.routesPagedResource.resources;
    this.totalRoutes = this.routesPagedResource.totalElements;
  }

  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }

  getCurrentUserName(): string {
    return this.authenticationService.getCurrentUser().id;
  }

  currentUserEdit(username: string){
    return this.getCurrentUserName() == username;
  }

  detail(route: Route): void {
    this.router.navigate([route.uri]);
  }

  reBind(routes: any): void {
    this.modifyList(routes);
  }
}
