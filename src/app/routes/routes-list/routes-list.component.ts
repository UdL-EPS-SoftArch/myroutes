import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesService } from '../routes.service';
import { Routes } from '../routes';
import { PagedResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { UserService } from 'src/app/user/user.service';
import { Observable } from 'rxjs';
import { query } from '@angular/animations';
import { User } from 'src/app/login-basic/user';
import { AuthenticationBasicService } from 'src/app/login-basic/authentication-basic.service';
import { ThisReceiver } from '@angular/compiler';
import {routes} from "../../login-basic/login-basic.routing";

@Component({
  selector: 'app-list',
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.css']
})

export class RoutesListComponent implements OnInit {
  public routesPagedResource: PagedResourceCollection<Routes>;
  public routes: Routes[] = [];
  public pageSize = 5;
  public page = 1;
  public totalRoutes = 0;


  constructor(
    public router: Router,
    private routesService: RoutesService,
    private authenticationService: AuthenticationBasicService) {
  }

  ngOnInit(): void {
    this.routesService.getPage({ pageParams: { size: this.pageSize }, sort: { username: 'ASC' } }).subscribe(
      (page: PagedResourceCollection<Routes>) => {
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
    console.log(routes);
  }

  changePage(): void {
    this.routesPagedResource.customPage(
      {pageParams: {page: this.page - 1, size: this.pageSize},
      sort: {name: 'ASC'}}).subscribe(
      (page: PagedResourceCollection<Routes>) => {
        this.routes = page.resources;
      });
  }

  modifyList(routesPagedResource: PagedResourceCollection<Routes>): void {
    this.routesPagedResource = routesPagedResource;
    this.routes = this.routesPagedResource.resources;
    this.totalRoutes = this.routesPagedResource.totalElements;
  }

  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }
}
