import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationBasicService } from 'src/app/login-basic/authentication-basic.service';
import { User } from 'src/app/login-basic/user';
import { Route } from '../route';
import { RouteService } from '../route.service';
import { Input } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { PagedResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-routes-create',
  templateUrl: './route-create.component.html',
  styleUrls: ['./route-create.component.css']
})
export class RouteCreateComponent implements OnInit {

  public route: Route = new Route();
  public createdBy: User = new User();
  public title: string;
  public description: string;
  public type: string;
  public creationDate: Date;
  public users: User[] = [];
  public pageSize = 5;
  public page = 1;
  public totalUsers = 0;
  public authserv: AuthenticationBasicService;
  public types: [];

  constructor(private router: Router,
              private authenticationService: AuthenticationBasicService,
              private routeService: RouteService,
              private userService: UserService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.createdBy.id = this.getCurrentUserName();
    this.creationDate = new Date();
    this.http.get<any>(`${environment.API}/profile/routes`)
      .subscribe(data => {
      this.types = (data.alps.descriptor[0].descriptor[2].doc.value).split(',');
    });


    this.userService.getPage({ pageParams:  { size: this.pageSize }, sort: { username: 'ASC' } }).subscribe(
      (page: PagedResourceCollection<User>) => {
        this.users = page.resources;
        this.totalUsers = page.totalElements;
      });
  }

  onSubmit(): void {
    this.route.createdBy = this.authenticationService.getCurrentUser();
    this.routeService.createResource({ body: this.route }).subscribe(
        (route:Route) => this.router.navigate([route.uri]));
  }


  getCurrentUserName(): string {
    return this.authenticationService.getCurrentUser().id;
  }

  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }

  defaultRoute(endpoint: string): string {
    //return `http://192.168.1.95:8080/${endpoint}`;
    return `http://localhost:8080/${endpoint}`;
  }
}
