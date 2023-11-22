import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationBasicService } from 'src/app/login-basic/authentication-basic.service';
import { User } from 'src/app/login-basic/user';
import { Routes } from '../routes';
import { RoutesService } from '../routes.service';
import { Input } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { PagedResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-routes-create',
  templateUrl: './routes-create.component.html',
  styleUrls: ['./routes-create.component.css']
})
export class RoutesCreateComponent implements OnInit {

  public route: Routes = new Routes();
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

  constructor(private router: Router,
              private authenticationService: AuthenticationBasicService,
              private routeService: RoutesService,
              private userService: UserService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.createdBy.id = this.getCurrentUserName();
    this.creationDate = new Date();


    this.userService.getPage({ pageParams:  { size: this.pageSize }, sort: { username: 'ASC' } }).subscribe(
      (page: PagedResourceCollection<User>) => {
        this.users = page.resources;
        this.totalUsers = page.totalElements;
      });
  }

  onSubmit(): void {
    this.route.createdBy = this.authenticationService.getCurrentUser();
    this.routeService.createResource({ body: this.route }).subscribe(
        (route:Routes) => this.router.navigate([route.uri]));
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
