import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Route} from 'src/app/routes/route';
import {User} from "../../login-basic/user";
import {RouteFollowed} from "../routeFollowed";
import {RouteFollowedService} from "../routeFollowed.service";
import {AuthenticationBasicService} from "../../login-basic/authentication-basic.service";
import { HttpClient} from '@angular/common/http';
import {environment} from "../../../environments/environment";
import {RouteService} from "../../routes/route.service";
import {UserService} from "../../user/user.service";
import {PagedResourceCollection} from "@lagoshny/ngx-hateoas-client";

@Component({
  selector: 'app-route-followed-create',
  templateUrl: './route-followed-create.component.html',
  styleUrls: ['./route-followed-create.component.css']
})
export class RouteFollowedCreateComponent implements OnInit {
  public routeOrigin: Route = new Route();
  public routeFollowed: RouteFollowed = new RouteFollowed();
  public createdBy: User = new User();
  public creationDate: Date;
  public duration: number;
  public levelUp: string;
  public levelDown: string;
  public authserv: AuthenticationBasicService;
  public users: User[] = [];
  public pageSize = 5;
  public totalUsers = 0;

  constructor(private router: Router,
              private authenticationService: AuthenticationBasicService,
              private routeService: RouteService,
              private userService: UserService,
              private routeFollowedService: RouteFollowedService,
              private http: HttpClient) { }
  ngOnInit(): void {
    this.createdBy = this.getCurrentUserName();
    this.creationDate = new Date();
    this.http.get<any>(`${environment.API}/profile/routes`);

    this.userService.getPage({ pageParams:  { size: this.pageSize }, sort: { username: 'ASC' } }).subscribe(
      (page: PagedResourceCollection<User>) => {
        this.users = page.resources;
        this.totalUsers = page.totalElements;
      });
  }

  onSubmit(): void {
    this.routeFollowed.createdBy = this.authenticationService.getCurrentUser();
    //this.routeFollowed.routeOrigin = this.authenticationService.getCurrentRoute();
    this.routeFollowedService.createResource({ body: this.routeFollowed }).subscribe(
      (routeFollowed:RouteFollowed) => this.router.navigate([routeFollowed.uri]));
  }

  getCurrentUserName(): User {
    return this.authenticationService.getCurrentUser();
  }

}
